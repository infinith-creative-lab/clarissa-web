/**
 * OAuth 2.0 type definitions.
 * Designed for DealPOS Client Credentials flow.
 * Reference: https://developer.dealpos.com/guides/authentication
 */

export interface OAuthConfig {
  /** OAuth client ID from DealPOS developer dashboard */
  clientId: string;
  /** OAuth client secret from DealPOS developer dashboard */
  clientSecret: string;
  /** Token endpoint URL, e.g., https://{subdomain}.dealpos.com/api/v3/token/oauth2 */
  tokenUrl: string;
}

export interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface StoredToken {
  accessToken: string;
  tokenType: string;
  expiresAt: number;
}

export type UserRole = 'admin' | 'editor' | 'viewer' | 'customer';

export interface UserSession {
  id: string;
  email: string;
  role: UserRole;
  accessToken: string;
}
