import { useTranslations } from 'next-intl';
import { getContactContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { MailIcon, PhoneIcon, ClockIcon } from '@/components/ui/Icon';

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
    <section className="relative py-6 md:py-8 bg-brand-50 overflow-hidden border-y border-neutral-100/50">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
          {infoItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center group px-4 ${
                  index < infoItems.length - 1 ? 'md:border-r md:border-brand-200/50' : ''
                }`}
              >
                <div className="text-brand-600 mb-2 transition-transform duration-300 group-hover:scale-110">
                  <IconComponent className="w-5 h-5" />
                </div>
                
                {item.href ? (
                  <a 
                    href={item.href}
                    className="font-serif font-semibold text-[10px] md:text-xs tracking-[0.15em] uppercase text-neutral-900 text-center transition-colors duration-300 hover:text-brand-700"
                  >
                    {item.value}
                  </a>
                ) : (
                  <h3 className="font-serif font-semibold text-[10px] md:text-xs tracking-[0.15em] uppercase text-neutral-900 text-center">
                    {item.value}
                  </h3>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
