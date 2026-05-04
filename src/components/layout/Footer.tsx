import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Container } from './Container';
import Image from 'next/image';
import logoImg from '@/assets/logo.png';
import { 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon, 
  PhoneIcon, 
  MailIcon 
} from '@/components/ui/Icon';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer style={{ width: '100%', backgroundColor: '#ffffff', fontFamily: 'var(--font-body)' }}>
      {/* 1. Brand Bar - White Background */}
      <div style={{ borderTop: '1px solid #f5f5f5', padding: '8px 0' }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
            {/* Logo */}
            <div style={{ width: '80px', flexShrink: 0 }}>
              <Link href="/">
                <Image 
                  src={logoImg} 
                  alt="Clarissa Logo" 
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  priority
                />
              </Link>
            </div>

            {/* Tagline Center */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              <h2 style={{ 
                fontSize: '1.875rem', 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 600, 
                color: '#262626', 
                letterSpacing: '-0.025em',
                margin: 0,
                lineHeight: 1.2
              }}>
                {t('tagline')}
              </h2>
            </div>

            {/* Socials Right */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#404040' }}>{t('followUs')}</span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[
                  { icon: InstagramIcon, href: t('socials.instagram') },
                  { icon: (props: any) => (
                    <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
                  ), href: t('socials.tiktok') },
                  { icon: FacebookIcon, href: t('socials.facebook') },
                  { icon: TwitterIcon, href: t('socials.twitter') }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    style={{ color: '#262626', transition: 'color 150ms' }}
                  >
                    <social.icon style={{ width: '24px', height: '24px' }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. Main Navigation Section - Light Pink Background */}
      <div style={{ 
        backgroundColor: '#fdf2f2', 
        paddingTop: '3.5rem', 
        paddingBottom: '5rem', 
        borderTop: '1px solid rgba(255, 238, 238, 0.5)' 
      }}>
        <Container>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(5, 1fr)', 
            gap: '3rem 2rem' 
          }}>
            {/* FASHION */}
            <div>
              <h4 style={{ 
                fontSize: '1rem', 
                fontWeight: 700, 
                color: '#262626', 
                textTransform: 'uppercase', 
                marginBottom: '1.5rem', 
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-body)'
              }}>
                {t('fashion.title')}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                {Object.entries(t.raw('fashion.items')).map(([key, label]: [string, any]) => (
                  <li key={key}>
                    <Link href={`/fashion/${key}`} style={{ fontSize: '0.875rem', color: '#525252', transition: 'color 150ms' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* BEAUTY */}
            <div>
              <h4 style={{ 
                fontSize: '1rem', 
                fontWeight: 700, 
                color: '#262626', 
                textTransform: 'uppercase', 
                marginBottom: '1.5rem', 
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-body)'
              }}>
                {t('beauty.title')}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                {Object.entries(t.raw('beauty.items')).map(([key, label]: [string, any]) => (
                  <li key={key}>
                    <Link href={`/beauty/${key}`} style={{ fontSize: '0.875rem', color: '#525252', transition: 'color 150ms' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* INFORMASI PELANGGAN & TOKO ONLINE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 700, 
                  color: '#262626', 
                  textTransform: 'uppercase', 
                  marginBottom: '1.5rem', 
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-body)'
                }}>
                  {t('customer.title')}
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                  {Object.entries(t.raw('customer.items')).map(([key, label]: [string, any]) => (
                    <li key={key}>
                      <Link href={`/${key}`} style={{ fontSize: '0.875rem', color: '#525252', transition: 'color 150ms' }}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 700, 
                  color: '#262626', 
                  textTransform: 'uppercase', 
                  marginBottom: '1.5rem', 
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-body)'
                }}>
                  {t('online.title')}
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                  {Object.entries(t.raw('online.items')).map(([key, label]: [string, any]) => (
                    <li key={key}>
                      <Link href={`/shop/${key}`} style={{ fontSize: '0.875rem', color: '#525252', transition: 'color 150ms' }}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* TENTANG CLARISSA & KONTAK */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 700, 
                  color: '#262626', 
                  textTransform: 'uppercase', 
                  marginBottom: '1.5rem', 
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-body)'
                }}>
                  {t('about.title')}
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                  {Object.entries(t.raw('about.items')).map(([key, label]: [string, any]) => (
                    <li key={key}>
                      <Link href={`/about/${key}`} style={{ fontSize: '0.875rem', color: '#525252', transition: 'color 150ms' }}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 700, 
                  color: '#262626', 
                  textTransform: 'uppercase', 
                  marginBottom: '1.5rem', 
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-body)'
                }}>
                  {t('contact.title')}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <PhoneIcon style={{ width: '20px', height: '20px', color: '#262626', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#262626' }}>08778016399</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <MailIcon style={{ width: '20px', height: '20px', color: '#262626', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#262626', wordBreak: 'break-all' }}>clarissastoremarketing@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* JADILAH MEMBER */}
            <div>
              <h4 style={{ 
                fontSize: '1rem', 
                fontWeight: 700, 
                color: '#262626', 
                textTransform: 'uppercase', 
                marginBottom: '1rem', 
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-body)'
              }}>
                {t('member.title')}
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#525252', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {t('member.description')}
              </p>
              <Link 
                href="/member" 
                style={{ 
                  fontSize: '1rem', 
                  fontWeight: 700, 
                  color: '#262626', 
                  textTransform: 'uppercase', 
                  borderBottom: '2px solid #262626', 
                  paddingBottom: '0.25rem', 
                  display: 'inline-block',
                  transition: 'all 150ms'
                }}
              >
                {t('member.button')}
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* 3. Copyright Bar - Dark Background */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '2rem 0', color: '#ffffff', borderTop: '1px solid #262626' }}>
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Link href="/terms" style={{ color: '#ffffff', transition: 'color 150ms' }}>{t('bottom.terms')}</Link>
              <span style={{ opacity: 0.4, color: '#ffffff' }}>|</span>
              <Link href="/privacy" style={{ color: '#ffffff', transition: 'color 150ms' }}>{t('bottom.privacy')}</Link>
              <span style={{ opacity: 0.4, color: '#ffffff' }}>|</span>
              <Link href="/cookies" style={{ color: '#ffffff', transition: 'color 150ms' }}>{t('bottom.cookies')}</Link>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: '11px', fontWeight: 500, letterSpacing: '0.05em' }}>
              <p style={{ opacity: 0.8, margin: 0 }}>
                {t('bottom.copyright')}
              </p>
              <p style={{ opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0, flexShrink: 0 }}>
                {t('bottom.madeBy')}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
