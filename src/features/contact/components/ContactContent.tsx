import { ContactHero } from './ContactHero';
import { ContactInfo } from './ContactInfo';
import { StoreCarousel } from '@/features/about/components/StoreCarousel';
import { DesignAccents } from '@/components/ui/DesignAccents';

export function ContactContent() {
  return (
    <div className="flex flex-col">
      <ContactHero />
      <ContactInfo />
      
      {/* Store Slider section */}
      <section className="relative bg-neutral-50 overflow-hidden">
        <DesignAccents 
          letter="L" 
          letterPosition="right" 
          vPosition="bottom" 
          className="overflow-visible [&>div:first-child]:-bottom-23" 
        />
        <div className="relative z-10">
          <StoreCarousel />
        </div>
      </section>
    </div>
  );
}
