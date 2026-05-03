import type { StoredToken } from './types';

/**
 * Server-side in-memory token store with expiry-aware retrieval.
 * In production, swap this with Redis or a database-backed store.
 */

let cachedToken: StoredToken | null = null;
const TOKEN_EXPIRY_BUFFER_MS = 60_000; // Refresh 60s before expiry

export function getStoredToken(): StoredToken | null {
  if (!cachedToken) return null;

  const now = Date.now();
  if (now >= cachedToken.expiresAt - TOKEN_EXPIRY_BUFFER_MS) {
    cachedToken = null;
    return null;
  }

  return cachedToken;
}

export function storeToken(token: StoredToken): void {
  cachedToken = token;
}

export function clearToken(): void {
  cachedToken = null;
}
