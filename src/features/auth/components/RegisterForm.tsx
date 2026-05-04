'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { ArrowRightIcon } from '@/components/ui/Icon';

export function RegisterForm() {
  const t = useTranslations('auth.register');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({ ...formData, password: val });
    
    // Simple Strength Meter Logic
    let strength = 0;
    if (val.length > 6) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Static simulation
    setTimeout(() => {
      setLoading(false);
      console.log('Registration attempt:', formData);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-[0.15em] text-neutral-900 uppercase">
          {t('title')}
        </h1>
        <p className="text-sm text-neutral-500 tracking-wide">
          {t('description')}
        </p>
      </div>

      <div className="space-y-5 pt-4">
        {/* Full Name */}
        <div className="group relative">
          <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1 transition-colors group-focus-within:text-neutral-900">
            {t('name')}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-transparent border-b border-neutral-200 py-2 text-sm text-neutral-900 focus:outline-none transition-all duration-500"
            placeholder="John Doe"
          />
          <div className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 transition-all duration-700 group-focus-within:w-full" />
        </div>

        {/* Email */}
        <div className="group relative">
          <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1 transition-colors group-focus-within:text-neutral-900">
            {t('email')}
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-transparent border-b border-neutral-200 py-2 text-sm text-neutral-900 focus:outline-none transition-all duration-500"
            placeholder="example@clarissa.id"
          />
          <div className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 transition-all duration-700 group-focus-within:w-full" />
        </div>

        {/* Password */}
        <div className="group relative">
          <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1 transition-colors group-focus-within:text-neutral-900">
            {t('password')}
          </label>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={formData.password}
            onChange={handlePasswordChange}
            className="w-full bg-transparent border-b border-neutral-200 py-2 text-sm text-neutral-900 focus:outline-none transition-all duration-500"
            placeholder="••••••••"
          />
          <div className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 transition-all duration-700 group-focus-within:w-full" />
          
          {/* Strength Meter Decoration */}
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4].map((level) => (
              <div 
                key={level} 
                className={`h-0.5 flex-1 transition-all duration-500 ${
                  passwordStrength >= level ? 'bg-neutral-900' : 'bg-neutral-100'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="group relative">
          <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1 transition-colors group-focus-within:text-neutral-900">
            {t('confirmPassword')}
          </label>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full bg-transparent border-b border-neutral-200 py-2 text-sm text-neutral-900 focus:outline-none transition-all duration-500"
            placeholder="••••••••"
          />
          <div className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 transition-all duration-700 group-focus-within:w-full" />
          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
             <span className="absolute right-0 top-0 text-[9px] text-red-500 font-bold uppercase tracking-widest animate-pulse">{t('mismatch')}</span>
          )}
        </div>
      </div>

      <div className="pt-8 space-y-6">
        <button
          type="submit"
          disabled={loading}
          className="group w-full relative inline-flex items-center justify-between px-12 py-5 bg-neutral-900 text-white font-heading text-lg tracking-widest uppercase transition-all duration-500 hover:bg-brand-900 disabled:opacity-70 disabled:cursor-wait overflow-hidden cursor-pointer"
        >
          <span className="relative z-10">{loading ? '...' : t('submit')}</span>
          {!loading && <ArrowRightIcon className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />}
          
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-200 transition-all duration-500 group-hover:w-full" />
          
          {loading && (
            <div className="absolute bottom-0 left-0 h-1 bg-brand-400 animate-progress w-full" />
          )}
        </button>

        <div className="text-center pt-4">
          <p className="text-[11px] text-neutral-400 tracking-[0.1em] font-bold uppercase mb-4">
            {t('hasAccount')}
          </p>
          <Link 
            href="/login" 
            className="group inline-flex items-center gap-3 text-[13px] font-bold text-neutral-900 uppercase tracking-[0.2em] transition-all duration-500 relative"
          >
            <span className="relative z-10">{t('login')}</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
            
            <div className="absolute -bottom-1 left-0 w-full h-px bg-neutral-200" />
            <div className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-900 transition-all duration-700 group-hover:w-full" />
          </Link>
        </div>
      </div>
    </form>
  );
}
