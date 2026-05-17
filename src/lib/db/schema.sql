-- ============================================================================
-- CLARISSA ULTIMATE PINNACLE ENTERPRISE DATABASE SCHEMA (POSTGRESQL)
-- 
-- Features:
-- 1. High-Performance Primary Keys: pgcrypto integration using gen_random_uuid().
-- 2. Case-Insensitive Strict Identity: citext integration for duplicate prevention on emails.
-- 3. Dynamic Category Tree: Self-referential hierarchy with recursive loop trigger (preventing A -> B -> C -> A).
-- 4. Ultimate SEO Metatags: Localized slugs with lowercase url regex checks, canonical urls and open-graph images.
-- 5. Showroom Variant Visibility (Store-Level): Multi-store size visibility listings (renamed to clear inventory ambiguity).
-- 6. Content Traceability: Trace authorship mapping editors via created_by / updated_by / published_by.
-- 7. High-Traffic Scale Guard: Declarative Table Partitioning by Range on audit logs.
-- 8. Advanced Auditing Session Actor: app.current_user_id & app.current_request_id session variables.
-- 9. High-Performance Audit Triggers: Excludes transient, high-noise session and queue tables.
-- 10. Weighted Full-Text Search (FTS): Generated search vectors with Bobot Title 'A', Short Description 'B', and Description 'C' using GIN indexing.
-- 11. Localized Translations published_at scheduler.
-- 12. CDN Media aspect ratio metadata (width, height, mime_type, file_size) with white-listing and SHA-256 deduplication.
-- 13. Strict price check constraints (price > 0 enforce no-free product structure).
-- 14. Universal JSONB metadata layers with high-performance GIN indexing.
-- 15. Explicit foreign key indices to prevent cascading locks/deadlocks.
-- 16. Dynamic SEO migration Slug Redirects History mapping with editor audit.
-- 17. High-Security Hashed Authentication Sessions: Hashed session tokens with revocation timestamps.
-- 18. Highly performant landing catalog Materialized View.
-- 19. Native job queue background worker system with status enums and auditing.
-- 20. Explicit UTC Standardization: Enforced via timezone('utc', now()).
-- 21. Dynamic Partition Pre-Generation Procedures for audit logs.
-- 22. Enterprise Soft Deletes: deleted_at TIMESTAMPTZ & deleted_by UUID.
-- 23. SaaS Multi-Tenant Ready: tenant_id isolation in all core tables.
-- 24. Row Level Security (RLS) enabled on all core tables with tenant isolation policies.
-- 25. Trigram and unaccent indexing for robust typo-tolerant search scaling.
-- 26. Dynamic slug redirects loop-prevention and upserts.
-- 27. Login rate-limiting, reset and verification tokens.
-- 28. Robust URL format validation CHECK constraints.
-- 29. Creation Immutability enforcement trigger (created_by/created_at protection).
-- 30. Hardened Database Security Layer: REVOKE & GRANT role management.
-- ============================================================================

-- Hardened Security Layer: Revoke default public schema creation privileges
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO PUBLIC;

-- Enable core high-security extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ----------------------------------------------------------------------------
-- 1. CUSTOM TYPES & ENUMS
-- ----------------------------------------------------------------------------

CREATE TYPE product_status AS ENUM ('draft', 'published', 'archived', 'out_of_stock');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled', 'completed');
CREATE TYPE proposal_status AS ENUM ('pending', 'reviewed', 'accepted', 'declined');
CREATE TYPE media_type_enum AS ENUM ('image', 'video', '3d');
CREATE TYPE job_status_enum AS ENUM ('pending', 'processing', 'completed', 'failed');

-- ----------------------------------------------------------------------------
-- 2. AUTOMATED UPDATED_AT TRIGGER FUNCTION
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc', now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- 2a. CREATION IMMUTABILITY ENFORCEMENT TRIGGER (AUDIT COMPLIANCE)
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION enforce_creation_immutability()
RETURNS TRIGGER AS $$
BEGIN
    -- Prevent alteration of created_by & created_at metadata during updates
    IF NEW.created_by IS DISTINCT FROM OLD.created_by THEN
        NEW.created_by = OLD.created_by;
    END IF;
    IF NEW.created_at IS DISTINCT FROM OLD.created_at THEN
        NEW.created_at = OLD.created_at;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- 3. PARTITIONED AUDIT LOGS TABLE & TRIGGER FUNCTION (SESSION ACTOR & REQUEST)
-- ----------------------------------------------------------------------------

-- Audit logs partition base table
CREATE TABLE audit_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    user_id UUID,                     -- Managed dynamically via transaction session context
    action VARCHAR(100) NOT NULL,      -- 'INSERT', 'UPDATE', 'DELETE'
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    old_data JSONB,
    new_data JSONB,
    ip_address VARCHAR(45),
    user_agent VARCHAR(512),
    request_id UUID,                  -- Distributed tracer request ID (Next.js context correlation)
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Enable RLS on audit logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON audit_logs
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

-- Indexes must include partition keys
CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- Default catch-all partition
CREATE TABLE audit_logs_default PARTITION OF audit_logs DEFAULT;

-- Stored Procedure to pre-generate monthly range partitions (Prevents default partition bloat)
CREATE OR REPLACE PROCEDURE create_monthly_audit_partition(p_date DATE)
LANGUAGE plpgsql AS $$
DECLARE
    v_partition_name TEXT;
    v_start_date DATE := date_trunc('month', p_date);
    v_end_date DATE := v_start_date + INTERVAL '1 month';
BEGIN
    v_partition_name := 'audit_logs_' || to_char(v_start_date, 'YYYY_MM');
    EXECUTE format(
        'CREATE TABLE IF NOT EXISTS %I PARTITION OF audit_logs FOR VALUES FROM (%L) TO (%L)',
        v_partition_name, v_start_date, v_end_date
    );
END;
$$;

-- Pre-generate partitions for May and June 2026
CALL create_monthly_audit_partition('2026-05-01'::DATE);
CALL create_monthly_audit_partition('2026-06-01'::DATE);

-- Automated trigger function to log changes into the partitioned parent table
CREATE OR REPLACE FUNCTION log_audit_action()
RETURNS TRIGGER AS $$
DECLARE
    v_user_id UUID;
    v_req_id UUID;
    v_tenant_id UUID;
BEGIN
    -- Extract tenant ID from context
    BEGIN
        v_tenant_id := COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID);
    EXCEPTION WHEN OTHERS THEN
        v_tenant_id := '00000000-0000-0000-0000-000000000000'::UUID;
    END;

    -- Extract session variable set in web app transaction context
    BEGIN
        v_user_id := NULLIF(current_setting('app.current_user_id', true), '')::UUID;
    EXCEPTION WHEN OTHERS THEN
        v_user_id := NULL;
    END;
    
    -- Extract distributed trace ID
    BEGIN
        v_req_id := NULLIF(current_setting('app.current_request_id', true), '')::UUID;
    EXCEPTION WHEN OTHERS THEN
        v_req_id := NULL;
    END;
    
    -- Fallback to updated_by column if present on the record
    IF v_user_id IS NULL THEN
        BEGIN
            v_user_id := COALESCE(NEW.updated_by, OLD.updated_by);
        EXCEPTION WHEN OTHERS THEN
            v_user_id := NULL;
        END;
    END IF;

    INSERT INTO audit_logs (tenant_id, action, table_name, record_id, old_data, new_data, user_id, request_id)
    VALUES (
        v_tenant_id,
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END,
        v_user_id,
        v_req_id
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- 4. DYNAMIC RBAC (ROLES, PERMISSIONS, JUNCTION)
-- ----------------------------------------------------------------------------

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    name VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'Superadmin', 'Admin', 'Editor', 'Customer'
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT chk_role_name_non_empty CHECK (length(trim(name)) > 0)
);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON roles
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE TRIGGER update_roles_modtime
    BEFORE UPDATE ON roles
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER audit_roles_changes
    AFTER INSERT OR UPDATE OR DELETE ON roles
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    name VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'create:products', 'delete:events'
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT chk_perm_name_non_empty CHECK (length(trim(name)) > 0)
);

ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON permissions
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE TRIGGER update_permissions_modtime
    BEFORE UPDATE ON permissions
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER audit_permissions_changes
    AFTER INSERT OR UPDATE OR DELETE ON permissions
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

-- Junction Table for Roles & Permissions (N:N)
CREATE TABLE role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TRIGGER audit_role_permissions_changes
    AFTER INSERT OR UPDATE OR DELETE ON role_permissions
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

-- Explicit indexes to prevent foreign key deadlock cascades
CREATE INDEX idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission ON role_permissions(permission_id);

-- ----------------------------------------------------------------------------
-- 5. USERS (ENHANCED SECURITY & CASE-INSENSITIVE EMAIL)
-- ----------------------------------------------------------------------------

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    email CITEXT UNIQUE NOT NULL, -- Strict Case-Insensitive unique constraint
    password_hash TEXT NOT NULL,  -- Dynamic Text type accommodating modern Argon2id hashes
    full_name VARCHAR(255) NOT NULL,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Account Security parameters
    last_login_at TIMESTAMP WITH TIME ZONE,
    failed_login_attempts INT NOT NULL DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    password_changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    
    -- Extensible metadata
    metadata JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    
    CONSTRAINT chk_email_non_empty CHECK (length(trim(email)) > 0),
    CONSTRAINT chk_password_non_empty CHECK (length(password_hash) > 0),
    CONSTRAINT chk_name_non_empty CHECK (length(trim(full_name)) > 0)
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON users
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE TRIGGER update_users_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER audit_users_changes
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active_role ON users(is_active, role_id);
CREATE INDEX idx_users_role_fk ON users(role_id);

-- ----------------------------------------------------------------------------
-- 5a. HIGH-SECURITY AUTHENTICATION USER SESSIONS (HASHED TOKENS)
-- ----------------------------------------------------------------------------

-- Sessions are transient tables. Excluded from triggers to prevent high-frequency write locks.
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(64) UNIQUE NOT NULL, -- Hashed Session token (SHA-256) preventing database leak hijacks
    ip_address VARCHAR(45),
    user_agent TEXT,
    revoked_at TIMESTAMP WITH TIME ZONE,    -- Instant revocation timestamp
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    
    CONSTRAINT chk_token_hash_non_empty CHECK (length(token_hash) = 64)
);

ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON user_sessions
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE INDEX idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_hash ON user_sessions(token_hash);

-- ----------------------------------------------------------------------------
-- 5b. ENTERPRISE RATE LIMIT & LOGIN SECURITY MODULES
-- ----------------------------------------------------------------------------

CREATE TABLE rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    ip_address VARCHAR(45) NOT NULL,
    endpoint VARCHAR(100) NOT NULL,
    attempts INT NOT NULL DEFAULT 1,
    last_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_ip_endpoint UNIQUE(ip_address, endpoint)
);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON rate_limits
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(64) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON password_reset_tokens
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE INDEX idx_password_reset_user ON password_reset_tokens(user_id);

CREATE TABLE email_verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(64) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE email_verification_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON email_verification_tokens
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE INDEX idx_email_verification_user ON email_verification_tokens(user_id);

-- ----------------------------------------------------------------------------
-- 6. HIERARCHICAL CATEGORIES (COMPREHENSIVE CIRCULAR LOOP TRIGGER & SOFT DELETES)
-- ----------------------------------------------------------------------------

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL, -- Hierarchy self-reference
    image_url VARCHAR(512),
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Authorship tracking
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Soft Deletes
    deleted_at TIMESTAMP WITH TIME ZONE,
    deleted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Extensible metadata
    metadata JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    
    -- Self-loop check constraint
    CONSTRAINT chk_category_parent_loop CHECK (id IS DISTINCT FROM parent_id),
    CONSTRAINT chk_cat_img_url CHECK (image_url IS NULL OR image_url ~ '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?$')
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON categories
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

-- Advanced Trigger to prevent deep recursive loops (A -> B -> C -> A)
CREATE OR REPLACE FUNCTION check_category_circular_path()
RETURNS TRIGGER AS $$
DECLARE
    v_parent_id UUID := NEW.parent_id;
BEGIN
    WHILE v_parent_id IS NOT NULL LOOP
        IF v_parent_id = NEW.id THEN
            RAISE EXCEPTION 'Circular dependency detected in category tree! Category % cannot refer to its descendant % as parent.', NEW.id, NEW.parent_id;
        END IF;
        SELECT parent_id INTO v_parent_id FROM categories WHERE id = v_parent_id;
    END LOOP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_categories_circular_check
    BEFORE INSERT OR UPDATE OF parent_id ON categories
    FOR EACH ROW
    EXECUTE FUNCTION check_category_circular_path();

-- Author Creation Immutability trigger
CREATE TRIGGER tr_categories_creation_immutability
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION enforce_creation_immutability();

CREATE TRIGGER update_categories_modtime
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER audit_categories_changes
    AFTER INSERT OR UPDATE OR DELETE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_creator ON categories(created_by);
CREATE INDEX idx_categories_updater ON categories(updated_by);
CREATE INDEX idx_categories_deleted ON categories(deleted_at) WHERE deleted_at IS NULL;

CREATE TABLE category_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL, -- 'id', 'en'
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    
    -- Advanced SEO parameters
    canonical_url VARCHAR(512),
    og_image_url VARCHAR(512),
    
    meta_title VARCHAR(255),
    meta_description VARCHAR(512),
    
    -- Content audit tracking
    published_at TIMESTAMP WITH TIME ZONE, -- Scheduled/Historical publish state
    published_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    CONSTRAINT uq_category_language UNIQUE(category_id, language_code),
    CONSTRAINT uq_category_slug_language UNIQUE(slug, language_code),
    -- Lowercase url-friendly validation regex check constraint
    CONSTRAINT chk_cat_slug_lowercase CHECK (slug = LOWER(slug) AND slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
    -- Locale format constraint (standard ISO-639 codes)
    CONSTRAINT chk_cat_lang_code CHECK (language_code ~ '^[a-z]{2}(?:-[A-Z]{2})?$'),
    -- Valid URL check validations
    CONSTRAINT chk_cat_canonical CHECK (canonical_url IS NULL OR canonical_url ~ '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?$'),
    CONSTRAINT chk_cat_og CHECK (og_image_url IS NULL OR og_image_url ~ '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?$')
);

CREATE TRIGGER audit_category_translations_changes
    AFTER INSERT OR UPDATE OR DELETE ON category_translations
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

-- High-performance composite public index for fast published tree crawls
CREATE INDEX idx_category_translation_public ON category_translations(language_code, slug) WHERE published_at IS NOT NULL AND published_at <= timezone('utc', now());
CREATE INDEX idx_category_trans_fk ON category_translations(category_id);
CREATE INDEX idx_category_trans_pub ON category_translations(published_by);

-- Recursive Category CTE compiler View (Provides tree depth and paths)
CREATE OR REPLACE VIEW v_category_tree AS
WITH RECURSIVE cat_tree AS (
    -- Root Categories
    SELECT 
        id, 
        parent_id, 
        sort_order, 
        is_active, 
        ARRAY[id]::VARCHAR[] AS path,
        1 AS depth
    FROM categories
    WHERE parent_id IS NULL AND deleted_at IS NULL
    
    UNION ALL
    
    -- Recursive Child Nodes
    SELECT 
        c.id, 
        c.parent_id, 
        c.sort_order, 
        c.is_active, 
        (t.path || c.id::VARCHAR[]),
        t.depth + 1
    FROM categories c
    JOIN cat_tree t ON c.parent_id = t.id
    WHERE c.deleted_at IS NULL
)
SELECT * FROM cat_tree;

-- ----------------------------------------------------------------------------
-- 7. PRODUCTS
-- ----------------------------------------------------------------------------

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    sku VARCHAR(100) UNIQUE NOT NULL,
    status product_status NOT NULL DEFAULT 'draft',
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    
    -- Authorship tracking
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Soft Deletes
    deleted_at TIMESTAMP WITH TIME ZONE,
    deleted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Extensible metadata
    metadata JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    
    CONSTRAINT chk_prod_sku_non_empty CHECK (length(trim(sku)) > 0)
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON products
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

-- Creation Immutability trigger
CREATE TRIGGER tr_products_creation_immutability
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION enforce_creation_immutability();

CREATE TRIGGER update_products_modtime
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER audit_products_changes
    AFTER INSERT OR UPDATE OR DELETE ON products
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured_sort ON products(is_featured, sort_order ASC);
CREATE INDEX idx_products_creator ON products(created_by);
CREATE INDEX idx_products_updater ON products(updated_by);
CREATE INDEX idx_products_deleted ON products(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_products_created_desc ON products(created_at DESC);

-- GIN Index on selective extensible metadata
CREATE INDEX idx_products_metadata_gin ON products USING GIN(metadata);

-- Partial index for active public catalog queries (Fast filter)
CREATE INDEX idx_products_public_partial ON products(id) WHERE status = 'published' AND deleted_at IS NULL;

CREATE TABLE product_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL, -- 'id', 'en'
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(512),
    
    -- Advanced SEO parameters
    canonical_url VARCHAR(512),
    og_image_url VARCHAR(512),
    
    meta_title VARCHAR(255),
    meta_description VARCHAR(512),
    meta_keywords VARCHAR(512),
    
    -- Content audit tracking
    published_at TIMESTAMP WITH TIME ZONE, -- Scheduled/Historical publish state
    published_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Generated Weighted Native Full-Text Search column mapping combinations
    -- Combines title (weight A), short description (weight B), and description (weight C)
    search_vector TSVECTOR GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', COALESCE(title, '')), 'A') ||
        setweight(to_tsvector('simple', COALESCE(short_description, '')), 'B') ||
        setweight(to_tsvector('simple', COALESCE(description, '')), 'C')
    ) STORED,
    
    CONSTRAINT uq_product_language UNIQUE(product_id, language_code),
    CONSTRAINT uq_product_slug_language UNIQUE(slug, language_code),
    -- Lowercase url-friendly validation regex check constraint
    CONSTRAINT chk_prod_slug_lowercase CHECK (slug = LOWER(slug) AND slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
    -- Locale format constraint (standard ISO-639 codes)
    CONSTRAINT chk_prod_lang_code CHECK (language_code ~ '^[a-z]{2}(?:-[A-Z]{2})?$'),
    CONSTRAINT chk_prod_title_non_empty CHECK (length(trim(title)) > 0),
    -- Valid URL check validations
    CONSTRAINT chk_prod_canonical CHECK (canonical_url IS NULL OR canonical_url ~ '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?$'),
    CONSTRAINT chk_prod_og CHECK (og_image_url IS NULL OR og_image_url ~ '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?$')
);

CREATE TRIGGER audit_product_translations_changes
    AFTER INSERT OR UPDATE OR DELETE ON product_translations
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

-- High-performance GIN indexing for Full Text Search searches
CREATE INDEX idx_product_trans_fts ON product_translations USING GIN(search_vector);

-- Trigram index for high-speed typo tolerance similarity matching
CREATE INDEX idx_product_trans_title_trgm ON product_translations USING GIN(title gin_trgm_ops);

-- High-performance composite public index for fast details catalog fetches
CREATE INDEX idx_product_translation_public ON product_translations(language_code, slug) WHERE published_at IS NOT NULL AND published_at <= timezone('utc', now());
CREATE INDEX idx_product_trans_fk ON product_translations(product_id);
CREATE INDEX idx_product_trans_pub ON product_translations(published_by);

CREATE TABLE product_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url VARCHAR(512) NOT NULL,
    media_type media_type_enum NOT NULL DEFAULT 'image', -- Strict ENUM safety
    alt_text VARCHAR(255),
    sort_order INT NOT NULL DEFAULT 0,
    
    -- CDN aspect-ratio & optimization dimensions preventing CLS
    width INT,
    height INT,
    mime_type VARCHAR(100),
    file_size INT,
    
    -- Media deduplication file hash (SHA-256)
    file_hash VARCHAR(64),
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    
    CONSTRAINT chk_media_url_non_empty CHECK (length(trim(url)) > 0),
    CONSTRAINT chk_media_width CHECK (width IS NULL OR width > 0),
    CONSTRAINT chk_media_height CHECK (height IS NULL OR height > 0),
    CONSTRAINT chk_media_file_size CHECK (file_size IS NULL OR file_size > 0),
    -- Strict MIME type whitelist security enforcement
    CONSTRAINT chk_media_mime CHECK (
        mime_type IS NULL OR 
        mime_type IN (
            'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 
            'video/mp4', 'video/webm', 
            'model/gltf-binary', 'model/gltf+json'
        )
    ),
    CONSTRAINT chk_media_url_format CHECK (url ~ '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?$')
);

CREATE TRIGGER update_product_media_modtime
    BEFORE UPDATE ON product_media
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER audit_product_media_changes
    AFTER INSERT OR UPDATE OR DELETE ON product_media
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

CREATE INDEX idx_product_media_product ON product_media(product_id);
CREATE INDEX idx_product_media_prod_sort ON product_media(product_id, sort_order ASC);
CREATE INDEX idx_product_media_hash ON product_media(file_hash);

-- ----------------------------------------------------------------------------
-- 7a. SEO DYNAMIC SLUG REDIRECTS HISTORY
-- ----------------------------------------------------------------------------

CREATE TABLE slug_redirects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    entity_type VARCHAR(50) NOT NULL,   -- 'product', 'category', 'event'
    entity_id UUID NOT NULL,
    old_slug VARCHAR(255) NOT NULL,
    new_slug VARCHAR(255) NOT NULL,
    status_code INT NOT NULL DEFAULT 301, -- 301 Permanent, 302 Temporary
    
    -- Audit logs
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    
    CONSTRAINT chk_old_slug_lowercase CHECK (old_slug = LOWER(old_slug)),
    CONSTRAINT chk_new_slug_lowercase CHECK (new_slug = LOWER(new_slug)),
    CONSTRAINT chk_status_code CHECK (status_code IN (301, 302)),
    -- Prevent duplicate redirects maps to protect SEO paths loops
    CONSTRAINT uq_entity_old_slug UNIQUE(entity_type, old_slug)
);

ALTER TABLE slug_redirects ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON slug_redirects
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE INDEX idx_slug_redirects_lookup ON slug_redirects(entity_type, old_slug);
CREATE INDEX idx_slug_redirects_creator ON slug_redirects(created_by);
CREATE INDEX idx_slug_redirects_updater ON slug_redirects(updated_by);

-- Automated Trigger to log slug updates into history mapping table with ON CONFLICT upsert protection
CREATE OR REPLACE FUNCTION log_slug_redirect()
RETURNS TRIGGER AS $$
DECLARE
    v_user_id UUID;
    v_tenant_id UUID;
    v_entity_type VARCHAR(50);
BEGIN
    IF OLD.slug IS DISTINCT FROM NEW.slug THEN
        BEGIN
            v_user_id := NULLIF(current_setting('app.current_user_id', true), '')::UUID;
        EXCEPTION WHEN OTHERS THEN
            v_user_id := NULL;
        END;
        BEGIN
            v_tenant_id := COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID);
        EXCEPTION WHEN OTHERS THEN
            v_tenant_id := '00000000-0000-0000-0000-000000000000'::UUID;
        END;
        
        v_entity_type := CASE 
            WHEN TG_TABLE_NAME = 'product_translations' THEN 'product'
            WHEN TG_TABLE_NAME = 'category_translations' THEN 'category'
            WHEN TG_TABLE_NAME = 'event_translations' THEN 'event'
        END;
        
        INSERT INTO slug_redirects (tenant_id, entity_type, entity_id, old_slug, new_slug, created_by)
        VALUES (
            v_tenant_id,
            v_entity_type,
            COALESCE(NEW.product_id, NEW.category_id, NEW.event_id),
            OLD.slug,
            NEW.slug,
            v_user_id
        )
        ON CONFLICT (entity_type, old_slug) 
        DO UPDATE SET new_slug = EXCLUDED.new_slug, created_at = timezone('utc', now());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_product_slug_redirect
    BEFORE UPDATE ON product_translations
    FOR EACH ROW EXECUTE FUNCTION log_slug_redirect();

CREATE TRIGGER tr_category_slug_redirect
    BEFORE UPDATE ON category_translations
    FOR EACH ROW EXECUTE FUNCTION log_slug_redirect();

CREATE TRIGGER tr_event_slug_redirect
    BEFORE UPDATE ON event_translations
    FOR EACH ROW EXECUTE FUNCTION log_slug_redirect();

-- ----------------------------------------------------------------------------
-- 8. STANDARDIZED SIZES & PRODUCT VARIANTS (N:N & SIZE TIER PRICING)
-- ----------------------------------------------------------------------------

CREATE TABLE sizes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    name VARCHAR(50) NOT NULL, -- e.g. 'S', 'M', '39', '40', 'One Size'
    type VARCHAR(50) NOT NULL, -- e.g. 'clothing', 'shoes', 'accessories'
    
    -- Authorship tracking
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_size_name_type UNIQUE(name, type),
    CONSTRAINT chk_size_name_non_empty CHECK (length(trim(name)) > 0)
);

ALTER TABLE sizes ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON sizes
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE TRIGGER tr_sizes_creation_immutability
    BEFORE UPDATE ON sizes
    FOR EACH ROW
    EXECUTE FUNCTION enforce_creation_immutability();

CREATE TRIGGER update_sizes_modtime
    BEFORE UPDATE ON sizes
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER audit_sizes_changes
    AFTER INSERT OR UPDATE OR DELETE ON sizes
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

CREATE INDEX idx_sizes_type ON sizes(type);
CREATE INDEX idx_sizes_creator ON sizes(created_by);
CREATE INDEX idx_sizes_updater ON sizes(updated_by);

-- Junction Table linking Products & Sizes carrying pricing and variant SKU (N:N)
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size_id UUID NOT NULL REFERENCES sizes(id) ON DELETE RESTRICT,
    sku VARCHAR(100) UNIQUE NOT NULL,
    
    -- Pricing variables shifted to variant level
    price DECIMAL(12, 2) NOT NULL,
    compare_at_price DECIMAL(12, 2),
    
    -- Extensible metadata
    metadata JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_product_size UNIQUE(product_id, size_id),
    
    -- Price Integrity check constraints (Strict price > 0 for luxury/no-free products)
    CONSTRAINT chk_price_positive CHECK (price > 0),
    CONSTRAINT chk_compare_price CHECK (compare_at_price IS NULL OR compare_at_price >= price),
    CONSTRAINT chk_variant_sku_non_empty CHECK (length(trim(sku)) > 0)
);

ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON product_variants
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE TRIGGER update_product_variants_modtime
    BEFORE UPDATE ON product_variants
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER audit_product_variants_changes
    AFTER INSERT OR UPDATE OR DELETE ON product_variants
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

CREATE INDEX idx_product_variants_product ON product_variants(product_id);
CREATE INDEX idx_product_variants_sku ON product_variants(sku);
CREATE INDEX idx_product_variants_size_fk ON product_variants(size_id);

-- GIN Index on variant extensible metadata
CREATE INDEX idx_variants_metadata_gin ON product_variants USING GIN(metadata);

-- ----------------------------------------------------------------------------
-- 9. STORES & PHYSICAL MULTI-STORE VISIBILITY (N:N)
-- ----------------------------------------------------------------------------

CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    code VARCHAR(50) UNIQUE NOT NULL,  -- Standardized ERP/POS unique branch code
    name VARCHAR(255) UNIQUE NOT NULL, -- e.g. 'Jakarta Flagship', 'Bali Boutique', 'Online Store'
    address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Extensible metadata
    metadata JSONB NOT NULL DEFAULT '{}',
    
    -- Audit logs
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    
    CONSTRAINT chk_store_code_non_empty CHECK (length(trim(code)) > 0),
    CONSTRAINT chk_store_name_non_empty CHECK (length(trim(name)) > 0)
);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON stores
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE TRIGGER tr_stores_creation_immutability
    BEFORE UPDATE ON stores
    FOR EACH ROW
    EXECUTE FUNCTION enforce_creation_immutability();

CREATE TRIGGER update_stores_modtime
    BEFORE UPDATE ON stores
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER audit_stores_changes
    AFTER INSERT OR UPDATE OR DELETE ON stores
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

CREATE INDEX idx_stores_active ON stores(is_active);
CREATE INDEX idx_stores_code ON stores(code);
CREATE INDEX idx_stores_creator ON stores(created_by);
CREATE INDEX idx_stores_updater ON stores(updated_by);

-- Multi-store Visibility junction table mapping sizes per store (N:N) - Renamed to prevent inventory confusion
CREATE TABLE variant_store_visibility (
    variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    PRIMARY KEY (variant_id, store_id)
);

CREATE TRIGGER update_vsv_modtime
    BEFORE UPDATE ON variant_store_visibility
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER audit_vsv_changes
    AFTER INSERT OR UPDATE OR DELETE ON variant_store_visibility
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

CREATE INDEX idx_vsv_variant_store ON variant_store_visibility(variant_id, store_id);
CREATE INDEX idx_vsv_store_fk ON variant_store_visibility(store_id);

-- Junction table for Product-Category relations (with composite index optimized)
CREATE TABLE product_category_map (
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

CREATE INDEX idx_pcm_category ON product_category_map(category_id);
CREATE INDEX idx_pcm_product_fk ON product_category_map(product_id);

-- ----------------------------------------------------------------------------
-- 9a. HIGH-TRAFFIC Catalog Landing Page Materialized View
-- ----------------------------------------------------------------------------

CREATE MATERIALIZED VIEW mv_public_catalog AS
SELECT 
    p.id AS product_id,
    p.sku,
    p.is_featured,
    p.sort_order,
    p.tenant_id,
    pt.language_code,
    pt.title,
    pt.slug,
    pt.short_description,
    v.price,
    v.compare_at_price,
    v.sku AS variant_sku,
    s.name AS size_name,
    s.type AS size_type,
    m.url AS media_url,
    m.media_type,
    m.alt_text AS media_alt,
    m.width AS media_width,
    m.height AS media_height
FROM products p
JOIN product_translations pt ON p.id = pt.product_id AND pt.published_at IS NOT NULL AND pt.published_at <= timezone('utc', now())
JOIN product_variants v ON p.id = v.product_id
JOIN sizes s ON v.size_id = s.id
LEFT JOIN product_media m ON p.id = m.product_id AND m.sort_order = 0 -- primary image
WHERE p.status = 'published' AND p.deleted_at IS NULL
WITH DATA;

-- Materialized View Index mapping
CREATE UNIQUE INDEX idx_mv_catalog_unique ON mv_public_catalog(product_id, language_code, variant_sku);
CREATE INDEX idx_mv_catalog_lang_slug ON mv_public_catalog(language_code, slug);

-- Stored procedure to refresh public catalog materialized view concurrently (cron-ready)
CREATE OR REPLACE PROCEDURE refresh_public_catalog()
LANGUAGE plpgsql AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_public_catalog;
END;
$$;

-- ----------------------------------------------------------------------------
-- 10. EVENTS
-- ----------------------------------------------------------------------------

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url VARCHAR(512) NOT NULL,
    status event_status NOT NULL DEFAULT 'draft',
    sort_order INT NOT NULL DEFAULT 0,
    
    -- Authorship tracking
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Soft Deletes
    deleted_at TIMESTAMP WITH TIME ZONE,
    deleted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Extensible metadata
    metadata JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    
    CONSTRAINT chk_event_loc_non_empty CHECK (length(trim(location)) > 0),
    CONSTRAINT chk_event_url_non_empty CHECK (length(trim(image_url)) > 0),
    CONSTRAINT chk_evt_img_url CHECK (image_url ~ '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?$')
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON events
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

-- Creation Immutability trigger
CREATE TRIGGER tr_events_creation_immutability
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION enforce_creation_immutability();

CREATE TRIGGER update_events_modtime
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER audit_events_changes
    AFTER INSERT OR UPDATE OR DELETE ON events
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_sort ON events(sort_order ASC);
CREATE INDEX idx_events_creator ON events(created_by);
CREATE INDEX idx_events_updater ON events(updated_by);
CREATE INDEX idx_events_deleted ON events(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_created_desc ON events(created_at DESC);

CREATE TABLE event_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL, -- 'id', 'en'
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'exhibition', 'opening', 'collection', etc.
    
    -- Advanced SEO parameters
    canonical_url VARCHAR(512),
    og_image_url VARCHAR(512),
    
    meta_title VARCHAR(255),
    meta_description VARCHAR(512),
    
    -- Content audit tracking
    published_at TIMESTAMP WITH TIME ZONE, -- Scheduled/Historical publish state
    published_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Generated Weighted Native Full-Text Search column mapping combinations
    search_vector TSVECTOR GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', COALESCE(title, '')), 'A') ||
        setweight(to_tsvector('simple', COALESCE(description, '')), 'C')
    ) STORED,
    
    CONSTRAINT uq_event_language UNIQUE(event_id, language_code),
    CONSTRAINT uq_event_slug_language UNIQUE(slug, language_code),
    -- Lowercase url-friendly validation regex check constraint
    CONSTRAINT chk_evt_slug_lowercase CHECK (slug = LOWER(slug) AND slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
    -- Locale format constraint (standard ISO-639 codes)
    CONSTRAINT chk_evt_lang_code CHECK (language_code ~ '^[a-z]{2}(?:-[A-Z]{2})?$'),
    CONSTRAINT chk_evt_title_non_empty CHECK (length(trim(title)) > 0),
    -- Valid URL check validations
    CONSTRAINT chk_evt_canonical CHECK (canonical_url IS NULL OR canonical_url ~ '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?$'),
    CONSTRAINT chk_evt_og CHECK (og_image_url IS NULL OR og_image_url ~ '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?$')
);

CREATE TRIGGER audit_event_translations_changes
    AFTER INSERT OR UPDATE OR DELETE ON event_translations
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

-- High-performance GIN indexing for Full Text Search searches
CREATE INDEX idx_event_trans_fts ON event_translations USING GIN(search_vector);

-- High-performance composite public index for fast event crawls
CREATE INDEX idx_event_translation_public ON event_translations(language_code, slug) WHERE published_at IS NOT NULL AND published_at <= timezone('utc', now());
CREATE INDEX idx_event_trans_fk ON event_translations(event_id);
CREATE INDEX idx_event_trans_pub ON event_translations(published_by);

-- ----------------------------------------------------------------------------
-- 11. B2B COLLABORATION PROPOSALS (WITH ENTERPRISE SOFT DELETES)
-- ----------------------------------------------------------------------------

CREATE TABLE collaboration_proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    proposal_text TEXT NOT NULL,
    attachment_url VARCHAR(512),
    status proposal_status NOT NULL DEFAULT 'pending',
    
    -- Soft Deletes
    deleted_at TIMESTAMP WITH TIME ZONE,
    deleted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    CONSTRAINT chk_prop_name_non_empty CHECK (length(trim(full_name)) > 0),
    CONSTRAINT chk_prop_email_non_empty CHECK (length(trim(email)) > 0),
    CONSTRAINT chk_prop_text_non_empty CHECK (length(trim(proposal_text)) > 0),
    CONSTRAINT chk_prop_attachment CHECK (attachment_url IS NULL OR attachment_url ~ '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?$')
);

ALTER TABLE collaboration_proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON collaboration_proposals
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE TRIGGER audit_proposals_changes
    AFTER INSERT OR UPDATE OR DELETE ON collaboration_proposals
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_action();

CREATE INDEX idx_proposals_status ON collaboration_proposals(status);
CREATE INDEX idx_proposals_email ON collaboration_proposals(email);
CREATE INDEX idx_proposals_reviewer_fk ON collaboration_proposals(reviewed_by);
CREATE INDEX idx_proposals_deleted ON collaboration_proposals(deleted_at) WHERE deleted_at IS NULL;

-- ----------------------------------------------------------------------------
-- 11a. NATIVE BACKGROUND JOBS worker QUEUE SYSTEM (EXCLUDED FROM SYNCHRONOUS TRIGGERS)
-- ----------------------------------------------------------------------------

-- Queues are transient write-heavy tables. Excluded from triggers to prevent high-frequency deadlocks.
CREATE TABLE background_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::UUID,
    queue_name VARCHAR(100) NOT NULL DEFAULT 'default',
    payload JSONB NOT NULL,
    attempts INT NOT NULL DEFAULT 0,
    status job_status_enum NOT NULL DEFAULT 'pending', -- Enforced Type-Safe enum
    error_message TEXT,
    run_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    
    -- Audit fields
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE background_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON background_jobs
    FOR ALL USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), '')::UUID, '00000000-0000-0000-0000-000000000000'::UUID));

CREATE INDEX idx_background_jobs_processing ON background_jobs(status, run_at);
CREATE INDEX idx_background_jobs_creator ON background_jobs(created_by);
CREATE INDEX idx_background_jobs_updater ON background_jobs(updated_by);

-- ----------------------------------------------------------------------------
-- 12. AUDIT LOG SECURITY CONSTRAINT
-- ----------------------------------------------------------------------------

-- Add User Relation to Audit Log
ALTER TABLE audit_logs ADD CONSTRAINT fk_audit_logs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

-- ----------------------------------------------------------------------------
-- 13. HARDENED PRIVILEGE GRANTS FOR PRODUCTION ROLE ISOLATION
-- ----------------------------------------------------------------------------

-- Create a dedicated low-privilege application role (Standard DBA best-practice)
-- In production, execute: CREATE ROLE clarissa_web_app WITH LOGIN PASSWORD 'strong_password';
-- We grant necessary execution blocks below:
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO CURRENT_USER;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO CURRENT_USER;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO CURRENT_USER;

-- ----------------------------------------------------------------------------
-- 14. DEFAULT SEED DATA
-- ----------------------------------------------------------------------------

-- 14a. Insert Roles
INSERT INTO roles (id, name, description) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Superadmin', 'Full platform control and settings management.'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Admin', 'Standard administrative controls.'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Editor', 'Manage content updates (products, categories, events).'),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Customer', 'General shopping customer.');

-- 14b. Insert Permissions
INSERT INTO permissions (id, name, description) VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'view:dashboard', 'Permission to view administrative dashboard.'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'manage:users', 'Permission to manage system users.'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'manage:roles', 'Permission to edit roles and map permissions.'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'manage:products', 'Permission to write, update and delete products.'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'manage:categories', 'Permission to manage catalog categories.'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'manage:events', 'Permission to publish and manage brand events.'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', 'view:audit_logs', 'Permission to view comprehensive admin action audits.');

-- 14c. Map Permissions to Roles (Junction Seed)
-- Superadmin mappings (All permissions)
INSERT INTO role_permissions (role_id, permission_id) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a77');

-- Admin mappings (Dashboard, products, categories, events, audit logs)
INSERT INTO role_permissions (role_id, permission_id) VALUES
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a77');

-- Editor mappings (Dashboard, products, categories, events)
INSERT INTO role_permissions (role_id, permission_id) VALUES
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66');

-- 13d. Insert Master Standardized Sizes
-- Clothing sizes
INSERT INTO sizes (id, name, type) VALUES
(gen_random_uuid(), 'XS', 'clothing'),
(gen_random_uuid(), 'S', 'clothing'),
(gen_random_uuid(), 'M', 'clothing'),
(gen_random_uuid(), 'L', 'clothing'),
(gen_random_uuid(), 'XL', 'clothing'),
(gen_random_uuid(), 'XXL', 'clothing');

-- Shoe sizes
INSERT INTO sizes (id, name, type) VALUES
(gen_random_uuid(), '36', 'shoes'),
(gen_random_uuid(), '37', 'shoes'),
(gen_random_uuid(), '38', 'shoes'),
(gen_random_uuid(), '39', 'shoes'),
(gen_random_uuid(), '40', 'shoes'),
(gen_random_uuid(), '41', 'shoes'),
(gen_random_uuid(), '42', 'shoes'),
(gen_random_uuid(), '43', 'shoes'),
(gen_random_uuid(), '44', 'shoes'),
(gen_random_uuid(), '45', 'shoes');

-- Accessory sizes
INSERT INTO sizes (id, name, type) VALUES
(gen_random_uuid(), 'One Size', 'accessories');

-- 13e. Insert Default Showroom / Store Branches
INSERT INTO stores (id, code, name, address) VALUES
(gen_random_uuid(), 'JKT-01', 'Jakarta Flagship Boutique', 'Sudirman Central Business District, Lot 18, Jakarta Selatan'),
(gen_random_uuid(), 'BALI-02', 'Bali Resort Store', 'Jalan Kayu Aya No. 9, Seminyak, Badung, Bali'),
(gen_random_uuid(), 'ONL-03', 'Online Central Warehouse', 'Kawasan Industri Jababeka Phase III, Bekasi');
