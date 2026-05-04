import { setRequestLocale } from 'next-intl/server';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { FeaturesBar } from '@/features/home/components/FeaturesBar';

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
  <>
    <main className="min-h-screen flex flex-col md:flex-row-reverse bg-white max-w-full overflow-x-hidden">
      {/* Right Side: Editorial Image Section (Flipped for Register) */}
      <div className="hidden md:flex md:w-1/2 lg:w-[60%] relative bg-neutral-100 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] hover:scale-110"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop')`,
            filter: 'grayscale(10%) brightness(85%)'
          }}
        />
        {/* Editorial Overlay Text */}
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-20 text-white">
          <div className="max-w-md space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 text-right ml-auto">
            <span className="text-xs font-bold tracking-[0.5em] uppercase opacity-80">Exclusive Access</span>
            <h2 className="text-5xl lg:text-7xl font-heading font-bold tracking-tight leading-none uppercase">
              Join The <br /> Elite
            </h2>
            <div className="w-16 h-px bg-white/50 ml-auto" />
            <p className="text-sm font-medium tracking-widest opacity-70 uppercase leading-loose">
              Unlock the full Clarissa experience
            </p>
          </div>
        </div>
      </div>

      {/* Left Side: Register Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-20 relative bg-brand-50/20 overflow-hidden border-r border-neutral-100">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-100/20 rounded-full blur-3xl -ml-32 -mt-32 opacity-50" />
        
        <div className="w-full max-w-sm relative z-10 animate-in fade-in slide-in-from-left-10 duration-1000">
          <div className="md:hidden mb-10 text-center">
            <span className="font-heading font-bold text-3xl tracking-[0.2em] text-neutral-900 uppercase">
              Clarissa
            </span>
          </div>
          
          <RegisterForm />
        </div>
      </div>
    </main>
    <div className="relative w-full">
      <FeaturesBar />
    </div>
  </>
  );
}
