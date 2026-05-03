import type { OAuthConfig, OAuthTokenResponse, StoredToken } from './types';
import { getStoredToken, storeToken } from './token-store';
import { AuthenticationError } from '@/lib/api/errors';

/**
 * OAuth 2.0 Client Credentials flow for DealPOS integration.
 * Reference: https://developer.dealpos.com/guides/authentication
 *
 * Usage:
 *   const token = await getAccessToken();
 *   // Use token in API calls: Authorization: Bearer {token}
 */

function getOAuthConfig(): OAuthConfig {
  const clientId = process.env.DEALPOS_CLIENT_ID;
  const clientSecret = process.env.DEALPOS_CLIENT_SECRET;
  const subdomain = process.env.DEALPOS_SUBDOMAIN;

  if (!clientId || !clientSecret || !subdomain) {
    throw new Error(
      'DealPOS OAuth credentials not configured. Set DEALPOS_CLIENT_ID, DEALPOS_CLIENT_SECRET, and DEALPOS_SUBDOMAIN in .env',
    );
  }

  return {
    clientId,
    clientSecret,
    tokenUrl: `https://${subdomain}.dealpos.com/api/v3/token/oauth2`,
  };
}

/**
 * Request a new access token using Client Credentials grant.
 * Supports both JSON body and Basic Auth header methods.
 */
async function requestToken(config: OAuthConfig): Promise<StoredToken> {
  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    throw new AuthenticationError(
      `DealPOS OAuth token request failed: ${response.status} ${response.statusText}`,
    );
  }

  const data: OAuthTokenResponse = await response.json();

  return {
    accessToken: data.access_token,
    tokenType: data.token_type,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
}

/**
 * Get a valid access token, refreshing if necessary.
 * Uses in-memory cache to avoid unnecessary token requests.
 */
export async function getAccessToken(): Promise<string> {
  const existing = getStoredToken();
  if (existing) {
    return existing.accessToken;
  }

  const config = getOAuthConfig();
  const token = await requestToken(config);
  storeToken(token);

  return token.accessToken;
}
