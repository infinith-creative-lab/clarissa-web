import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { FeaturesBar } from '@/features/home/components/FeaturesBar';

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
  <>
    <main className="min-h-screen flex flex-col md:flex-row bg-white max-w-full overflow-x-hidden">
      {/* Left Side: Editorial Image Section (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 lg:w-[60%] relative bg-neutral-100 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] hover:scale-110"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68624d5e17?q=80&w=2000&auto=format&fit=crop')`,
            filter: 'grayscale(20%) brightness(90%)'
          }}
        />
        {/* Editorial Overlay Text */}
        <div className="absolute inset-0 bg-black/10 flex flex-col justify-end p-20 text-white">
          <div className="max-w-md space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <span className="text-xs font-bold tracking-[0.5em] uppercase opacity-80">Collection 2026</span>
            <h2 className="text-5xl lg:text-7xl font-heading font-bold tracking-tight leading-none uppercase">
              Beyond <br /> Elegance
            </h2>
            <div className="w-16 h-px bg-white/50" />
            <p className="text-sm font-medium tracking-widest opacity-70 uppercase leading-loose">
              Number One Fashion Store & Experience
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-20 relative bg-brand-50/30 overflow-hidden">
        {/* Subtle Decorative Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-100/20 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
        
        <div className="w-full max-w-sm relative z-10 animate-in fade-in slide-in-from-right-10 duration-1000">
          {/* Logo Fallback for Mobile */}
          <div className="md:hidden mb-10 text-center">
            <span className="font-heading font-bold text-3xl tracking-[0.2em] text-neutral-900 uppercase">
              Clarissa
            </span>
          </div>
          
        <LoginForm />
        </div>
      </div>
    </main>
    <div className="relative w-full">
      <FeaturesBar />
    </div>
  </>
  );
}
