import { useTranslations } from 'next-intl';
import { getContactContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { SVGProps } from 'react';

/* ── Contact Icon Components ── */

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function ContactInfo() {
  const t = useTranslations();
  const { email, phone, hoursKey } = getContactContent();

  const infoItems = [
    {
      label: t('contact.info.emailTitle'),
      value: email,
      href: `mailto:${email}`,
      icon: MailIcon,
    },
    {
      label: t('contact.info.phoneTitle'),
      value: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
      icon: PhoneIcon,
    },
    {
      label: t('contact.info.hoursTitle'),
      value: t(hoursKey as any),
      href: null,
      icon: ClockIcon,
    },
  ];

  return (
    <section className="bg-[#FCFBFA] border-y border-neutral-100 py-12 md:py-16">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
          {infoItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex-1 flex flex-col md:flex-row items-center w-full">
                <div className="flex flex-col items-center text-center w-full group">
                  <div className="text-brand-400 mb-3 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  
                  {item.href ? (
                    <a 
                      href={item.href}
                      className="font-serif font-bold text-[10px] md:text-xs tracking-[0.25em] uppercase text-brand-400 transition-colors duration-300 hover:text-brand-600"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-serif font-bold text-[10px] md:text-xs tracking-[0.25em] uppercase text-brand-400">
                      {item.value}
                    </span>
                  )}
                </div>
                
                {/* Vertical Divider for Desktop */}
                {index !== infoItems.length - 1 && (
                  <div className="hidden md:block h-10 w-[1px] bg-brand-200/40" />
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
