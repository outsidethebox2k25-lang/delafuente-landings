import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Hero,
  Pain,
  Why,
  Benefits,
  Proof,
  Process,
  FAQs,
  Urgency,
  FinalCta,
  VisitUs,
} from '@/components/medicare/sections';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { WhatsAppFloat } from '@/components/shared/whatsapp-float';
import { CTAForm } from '@/components/shared/cta-form';
import { Reveal } from '@/components/shared/reveal';
import { medicare, type MedicareLocale } from './dictionary';

const locales = ['en', 'es'] as const;
const hasLocale = (l: string): l is MedicareLocale =>
  (locales as readonly string[]).includes(l);

const PHONE = '956-568-6293';

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/medicare'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = medicare[lang];
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `https://delafuente-landings.vercel.app/${lang}/medicare`,
      languages: {
        en: '/en/medicare',
        es: '/es/medicare',
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === 'es' ? 'es_US' : 'en_US',
      type: 'website',
      siteName: 'De La Fuente Insurance Group',
    },
  };
}

export default async function MedicarePage({ params }: PageProps<'/[lang]/medicare'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = medicare[lang];
  const webhook = process.env.NEXT_PUBLIC_GHL_MEDICARE_WEBHOOK;
  const whatsappMsg =
    lang === 'es'
      ? 'Hola, vi su landing de Medicare y quiero una cotización gratis.'
      : "Hi, I saw your Medicare landing and I'd like a free quote.";

  return (
    <>
      <Nav lang={lang} labels={dict.nav} phone={PHONE} />
      <Hero dict={dict} phone={PHONE} />
      <Pain dict={dict} />
      <Why dict={dict} />
      <Benefits dict={dict} />
      <Proof dict={dict} />
      <Process dict={dict} />
      <VisitUs lang={lang} />
      <FAQs dict={dict} />
      <Urgency dict={dict} phone={PHONE} />

      {/* Form section sandwiched between Urgency + FinalCta */}
      <section className="bg-dlf-cream px-5 py-16 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <CTAForm
              dict={dict.form}
              insuranceLine="medicare"
              lang={lang}
              webhookUrl={webhook}
              leadSource="landing_medicare"
            />
          </Reveal>
        </div>
      </section>

      <FinalCta dict={dict} message={whatsappMsg} />

      <Footer lang={lang} dict={dict.footer} />
      <WhatsAppFloat message={whatsappMsg} />
    </>
  );
}
