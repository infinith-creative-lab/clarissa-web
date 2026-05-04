'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const getMatches = (q: string): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(q).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Jalankan segera setelah komponen di-mount di klien (browser)
    setMatches(window.matchMedia(query).matches);
    const matchMedia = window.matchMedia(query);
    const handleChange = () => setMatches(getMatches(query));

    matchMedia.addEventListener('change', handleChange);
    return () => matchMedia.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
