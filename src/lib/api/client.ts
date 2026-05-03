import {
  ApiError,
  AuthenticationError,
  RateLimitError,
} from './errors';

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: Record<string, unknown> | FormData;
  params?: Record<string, string>;
  timeout?: number;
}

interface ApiClientConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  getAuthToken?: () => Promise<string | null>;
}

/**
 * Type-safe API client with auth injection, error handling, and timeout.
 * Designed to be extended for specific service integrations (e.g., DealPOS).
 */
export class ApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = config;
  }

  private async buildHeaders(
    custom?: HeadersInit,
  ): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.config.defaultHeaders,
    };

    if (this.config.getAuthToken) {
      const token = await this.config.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    if (custom) {
      const customEntries =
        custom instanceof Headers
          ? Array.from(custom.entries())
          : Object.entries(custom);
      for (const [key, value] of customEntries) {
        if (typeof value === 'string') {
          headers[key] = value;
        }
      }
    }

    return headers;
  }

  private buildUrl(
    path: string,
    params?: Record<string, string>,
  ): string {
    const url = new URL(path, this.config.baseUrl);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }
    }
    return url.toString();
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { body, params, timeout = 10000, ...fetchOptions } = options;
    const url = this.buildUrl(path, params);
    const headers = await this.buildHeaders(fetchOptions.headers);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        body: body instanceof FormData ? body : JSON.stringify(body),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new AuthenticationError();
        }
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          throw new RateLimitError(
            'Rate limit exceeded',
            retryAfter ? parseInt(retryAfter, 10) : undefined,
          );
        }
        throw new ApiError(
          `API request failed: ${response.statusText}`,
          response.status,
        );
      }

      return (await response.json()) as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  async post<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'POST' });
  }

  async put<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'PUT' });
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}
