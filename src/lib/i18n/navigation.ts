import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Typed navigation utilities for i18n-aware routing.
 * Use these instead of next/link and next/navigation directly.
 */
export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);
