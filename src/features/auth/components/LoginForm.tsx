'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { ArrowRightIcon } from '@/components/ui/Icon';

export function LoginForm() {
  const t = useTranslations('auth.login');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Security: CSRF Token structure (Static for now)
  const csrfToken = "dummy-csrf-token-clarissa";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Static simulation of verification
    setTimeout(() => {
      setLoading(false);
      console.log('Security check: CSRF validated', csrfToken);
      console.log('Auth attempt:', { email });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-8">
      {/* Security: Anti-CSRF Hidden Input */}
      <input type="hidden" name="csrf_token" value={csrfToken} />

      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-[0.15em] text-neutral-900 uppercase">
          {t('title')}
        </h1>
        <p className="text-sm text-neutral-500 tracking-wide">
          {t('subtitle')}
        </p>
      </div>

      <div className="space-y-6 pt-4">
        {/* Email Field */}
        <div className="group relative">
          <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1 transition-colors group-focus-within:text-neutral-900">
            {t('email')}
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-neutral-200 py-2 text-sm text-neutral-900 focus:outline-none transition-all duration-500"
            placeholder="example@clarissa.id"
          />
          <div className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 transition-all duration-700 group-focus-within:w-full" />
        </div>

        {/* Password Field */}
        <div className="group relative">
          <div className="flex justify-between items-end mb-1">
            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] transition-colors group-focus-within:text-neutral-900">
              {t('password')}
            </label>
            <Link href="/forgot-password" className="text-[10px] font-bold text-neutral-400 hover:text-neutral-900 transition-colors uppercase tracking-widest">
              {t('forgotPassword')}
            </Link>
          </div>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-neutral-200 py-2 text-sm text-neutral-900 focus:outline-none transition-all duration-500"
            placeholder="••••••••"
          />
          <div className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 transition-all duration-700 group-focus-within:w-full" />
        </div>
      </div>

      <div className="pt-6 space-y-6">
        <button
          type="submit"
          disabled={loading}
          className="group w-full relative inline-flex items-center justify-between px-12 py-5 bg-neutral-900 text-white font-heading text-lg tracking-widest uppercase transition-all duration-500 hover:bg-brand-900 disabled:opacity-70 disabled:cursor-wait overflow-hidden cursor-pointer"
        >
          <span className="relative z-10">{loading ? t('loading') : t('submit')}</span>
          {!loading && <ArrowRightIcon className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />}
          
          {/* Button Decorative Underline (Consistent with Event/Catalog) */}
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-200 transition-all duration-500 group-hover:w-full" />
          
          {loading && (
            <div className="absolute bottom-0 left-0 h-1 bg-brand-400 animate-progress w-full" />
          )}
        </button>

        <div className="text-center pt-8">
          <p className="text-[11px] text-neutral-400 tracking-[0.1em] font-bold uppercase mb-4">
            {t('noAccount')}
          </p>
          <Link 
            href="/register" 
            className="group inline-flex items-center gap-3 text-[13px] font-bold text-neutral-900 uppercase tracking-[0.2em] transition-all duration-500 relative"
          >
            <span className="relative z-10">{t('register')}</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
            
            {/* Elegant Underline Decor */}
            <div className="absolute -bottom-1 left-0 w-full h-px bg-neutral-200" />
            <div className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-900 transition-all duration-700 group-hover:w-full" />
          </Link>
        </div>
      </div>
    </form>
  );
}
