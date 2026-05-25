import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { UTMCapture } from '@/components/shared/utm-capture';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700', '900'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

const locales = ['en', 'es'] as const;
type Locale = (typeof locales)[number];
const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL('https://delafuente-landings.vercel.app'),
  icons: { icon: '/favicon.ico' },
};

export const viewport = {
  themeColor: '#0a2540',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
};

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full bg-dlf-cream text-dlf-navy">
        <a href="#main" className="skip-link">
          {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
        </a>
        <UTMCapture />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
