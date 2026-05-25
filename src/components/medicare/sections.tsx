'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Award,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  HeartHandshake,
  Languages,
  MapPin,
  Phone,
  Shield,
  Star,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/shared/button';
import { Reveal, Stagger, StaggerItem, fadeUp } from '@/components/shared/reveal';
import { telLink, whatsappLink } from '@/lib/cn';
import type { MedicareDict } from '@/app/[lang]/medicare/dictionary';

// ───────────────────────────────────────────────── HERO
export function Hero({ dict, phone }: { dict: MedicareDict; phone: string }) {
  return (
    <section className="relative isolate min-h-[88svh] overflow-hidden bg-dlf-navy text-white lg:min-h-[92svh]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/retiree-smiling.png"
          alt="Hispanic retiree smiling — Laredo, TX"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] editorial-img"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/50 to-dlf-navy/90" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/60 via-black/25 to-transparent lg:w-3/5" />
      </div>

      <div className="mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pt-28 pb-12 sm:pb-20 lg:min-h-[92svh] lg:px-8 lg:pt-40 lg:pb-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-3 rounded-full border border-dlf-red bg-dlf-red/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-editorial text-white backdrop-blur sm:text-[11px]"
          >
            <Calendar className="h-3 w-3 text-dlf-red" />
            {dict.hero.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-display mt-5 text-balance text-4xl font-bold leading-[1.04] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl lg:text-[4.5rem]"
          >
            {dict.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-5 max-w-2xl text-balance text-base text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:mt-7 sm:text-lg"
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row"
          >
            <Button href="#form" variant="primary" size="lg">
              {dict.hero.ctaPrimary}
            </Button>
            <a
              href={telLink(phone)}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/5 px-7 py-3.5 text-base font-bold text-white backdrop-blur transition-colors hover:bg-white hover:text-dlf-navy"
            >
              <Phone className="h-4 w-4" />
              {dict.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-7 inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[10px] font-bold uppercase tracking-editorial text-white/95 backdrop-blur-sm sm:mt-10 sm:gap-x-5 sm:px-5 sm:py-2.5 sm:text-[11px]"
          >
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" strokeWidth={0} />
              {dict.hero.trust.rating}
            </span>
            <span className="h-3 w-px bg-white/30" />
            <span>{dict.hero.trust.clients}</span>
            <span className="hidden h-3 w-px bg-white/30 sm:inline-block" />
            <span>{dict.hero.trust.years}</span>
            <span className="hidden h-3 w-px bg-white/30 sm:inline-block" />
            <span>{dict.hero.trust.bilingual}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────── PAIN
export function Pain({ dict }: { dict: MedicareDict }) {
  return (
    <section className="bg-dlf-cream px-5 py-16 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-editorial text-dlf-red">
            <AlertTriangle className="h-3.5 w-3.5" />
            {dict.pain.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-balance text-3xl font-bold text-dlf-navy sm:text-4xl lg:text-5xl">
            {dict.pain.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base text-dlf-stone sm:text-lg">{dict.pain.intro}</p>
        </Reveal>

        <Stagger delay={0.1} className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2">
          {dict.pain.items.map((item) => (
            <StaggerItem
              key={item.title}
              variants={fadeUp}
              className="flex items-start gap-4 rounded-2xl border border-dlf-line bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
            >
              <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-dlf-red/10 text-dlf-red">
                <AlertTriangle className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-dlf-navy sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-dlf-stone">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────── WHY US
const whyIcons = [Languages, MapPin, Clock, HeartHandshake];

export function Why({ dict }: { dict: MedicareDict }) {
  return (
    <section id="services" className="bg-white px-5 py-16 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="text-[10px] font-bold uppercase tracking-editorial text-dlf-red">{dict.why.eyebrow}</p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold text-dlf-navy sm:text-4xl lg:text-5xl">
              {dict.why.title}
            </h2>
            <p className="mt-5 text-base text-dlf-stone sm:text-lg">{dict.why.intro}</p>

            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-dlf-line">
              <Image
                src="/images/advisor-hispanic.png"
                alt="Hispanic insurance advisor explaining Medicare to clients"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover editorial-img"
              />
              <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-editorial text-dlf-navy backdrop-blur sm:text-[11px]">
                <Languages className="h-3 w-3 text-dlf-cyan" />
                Real consult · Real bilingüe
              </span>
            </div>
          </Reveal>

          <Stagger delay={0.1} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {dict.why.items.map((item, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <StaggerItem
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-dlf-line bg-dlf-cream p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-navy text-white shadow-md">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display mt-5 text-lg font-bold text-dlf-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dlf-stone">{item.body}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────── BENEFITS (checklist)
export function Benefits({ dict }: { dict: MedicareDict }) {
  return (
    <section className="bg-dlf-cream px-5 py-16 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-navy shadow-2xl">
          {/* Photo strip on top */}
          <div className="relative aspect-[16/7] w-full overflow-hidden sm:aspect-[16/5]">
            <Image
              src="/images/healthcare-scene.png"
              alt="Before and after — confused about Medicare vs. confident after our consult"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover editorial-img"
            />
            <span className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/50" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-dlf-red px-3 py-1.5 text-[10px] font-bold uppercase tracking-editorial text-white shadow-md sm:text-[11px]">
              Before · After
            </span>
          </div>

          <div className="p-8 text-white sm:p-12 lg:p-16">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-editorial text-dlf-red">
                <Award className="h-3.5 w-3.5" />
                {dict.benefits.eyebrow}
              </p>
              <h2 className="font-display mt-4 text-balance text-3xl font-bold sm:text-4xl">
                {dict.benefits.title}
              </h2>
            </Reveal>
            <Stagger delay={0.08} className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {dict.benefits.items.map((item) => (
                <StaggerItem
                  key={item}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur"
                >
                  <Check className="mt-0.5 h-5 w-5 flex-none text-dlf-success" strokeWidth={3} />
                  <span className="text-sm text-white/95 sm:text-base">{item}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────── SOCIAL PROOF
const testimonialAvatars = [
  '/images/grandmother-portrait.png',
  '/images/retiree-smiling.png',
  '/images/advisor-hispanic.png',
];

export function Proof({ dict }: { dict: MedicareDict }) {
  return (
    <section id="reviews" className="bg-white px-5 py-16 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-editorial text-dlf-red">
            <Users className="h-3.5 w-3.5" />
            {dict.proof.eyebrow}
          </p>
          <h2 className="font-display mt-3 text-balance text-3xl font-bold text-dlf-navy sm:text-4xl lg:text-5xl">
            {dict.proof.title}
          </h2>
        </Reveal>
        <Stagger delay={0.1} className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 md:grid-cols-3">
          {dict.proof.items.map((t, i) => (
            <StaggerItem
              key={t.name}
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-dlf-line bg-dlf-cream p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-dlf-navy sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-start gap-3 border-t border-dlf-line pt-4">
                <span className="relative h-12 w-12 flex-none overflow-hidden rounded-full ring-2 ring-dlf-line">
                  <Image
                    src={testimonialAvatars[i % testimonialAvatars.length]}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <div className="flex-1">
                  <p className="font-bold text-dlf-navy">{t.name}</p>
                  <p className="text-xs text-dlf-stone">{t.city}</p>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-dlf-success/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-editorial text-dlf-success">
                    <Check className="h-3 w-3" strokeWidth={3} />
                    {t.saving}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────── VISIT US (real office)
export function VisitUs({ lang }: { lang: 'en' | 'es' }) {
  const copy = {
    en: {
      eyebrow: 'Real office · Real people',
      title: "We're at 6999 McPherson Rd. Walk in any time.",
      body: "No call centers in Manila. No 800-numbers passing you around. You'll see the same faces every year — Paola, Elizabeth, Sandra, Roxcella, Rosalva, Jesus, Melina. Bilingual. Local. Available.",
      cta: 'Get directions',
    },
    es: {
      eyebrow: 'Oficina real · Gente real',
      title: 'Estamos en 6999 McPherson Rd. Pasa cuando quieras.',
      body: 'Sin call centers en Manila. Sin números 800 que te pasan de uno a otro. Verás las mismas caras cada año — Paola, Elizabeth, Sandra, Roxcella, Rosalva, Jesus, Melina. Bilingüe. Local. Disponible.',
      cta: 'Cómo llegar',
    },
  }[lang];

  return (
    <section className="bg-dlf-cream px-5 py-16 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/family-3gen.png"
                alt="Familia esperando en la oficina de De La Fuente Insurance Group"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover editorial-img"
              />
              <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-editorial text-dlf-navy backdrop-blur sm:text-[11px]">
                <MapPin className="h-3 w-3 text-dlf-red" />
                Laredo, TX 78041
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-editorial text-dlf-red">{copy.eyebrow}</p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold text-dlf-navy sm:text-4xl lg:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-5 text-base text-dlf-stone sm:text-lg">{copy.body}</p>

            <ul className="mt-6 space-y-3 text-sm text-dlf-navy">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-dlf-red" />
                <span>6999 McPherson Rd, Suite 103B, Laredo, TX 78041</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-none text-dlf-red" />
                <span>{lang === 'es' ? 'Lun–Vie 9 AM – 6 PM · Sáb con cita' : 'Mon–Fri 9 AM – 6 PM · Sat by appointment'}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-dlf-red" />
                <a href={telLink('956-568-6293')} className="font-bold transition-colors hover:text-dlf-red">956-568-6293</a>
              </li>
            </ul>

            <div className="mt-7">
              <a
                href="https://maps.google.com/?q=6999+McPherson+Rd+Suite+103B+Laredo+TX+78041"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-dlf-navy bg-white px-6 py-3 text-sm font-bold uppercase tracking-editorial text-dlf-navy transition-colors hover:bg-dlf-navy hover:text-white"
              >
                {copy.cta}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────── PROCESS
export function Process({ dict }: { dict: MedicareDict }) {
  return (
    <section className="bg-dlf-cream px-5 py-16 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-editorial text-dlf-red">{dict.process.eyebrow}</p>
          <h2 className="font-display mt-3 text-balance text-3xl font-bold text-dlf-navy sm:text-4xl lg:text-5xl">
            {dict.process.title}
          </h2>
        </Reveal>
        <Stagger delay={0.12} className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step, i) => (
            <StaggerItem
              key={step.title}
              variants={fadeUp}
              className="relative rounded-2xl border border-dlf-line bg-white p-6 shadow-sm"
            >
              <span className="font-display text-4xl font-bold text-dlf-red opacity-25">{(i + 1).toString().padStart(2, '0')}</span>
              <h3 className="font-display mt-3 text-lg font-bold text-dlf-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-dlf-stone">{step.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────── FAQS
export function FAQs({ dict }: { dict: MedicareDict }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white px-5 py-16 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-[10px] font-bold uppercase tracking-editorial text-dlf-red">{dict.faqs.eyebrow}</p>
          <h2 className="font-display mt-3 text-balance text-3xl font-bold text-dlf-navy sm:text-4xl lg:text-5xl">
            {dict.faqs.title}
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-dlf-line rounded-2xl border border-dlf-line bg-dlf-cream sm:mt-12">
          {dict.faqs.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:text-dlf-red sm:px-6"
                >
                  <span className="font-display text-base font-bold text-dlf-navy sm:text-lg">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-none text-dlf-red transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6">
                    <p className="text-sm leading-relaxed text-dlf-stone sm:text-base">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────── URGENCY
export function Urgency({ dict, phone }: { dict: MedicareDict; phone: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-red px-5 py-16 text-white sm:py-20 lg:px-8 lg:py-28">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1), transparent 50%)',
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-editorial text-white backdrop-blur sm:text-[11px]">
            <Calendar className="h-3 w-3" />
            {dict.urgency.eyebrow}
          </p>
          <h2 className="font-display mt-6 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">
            {dict.urgency.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/95 sm:text-lg">{dict.urgency.body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#form"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-dlf-red shadow-[0_8px_22px_-6px_rgba(0,0,0,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.5)]"
            >
              {dict.urgency.ctaPrimary}
            </a>
            <a
              href={telLink(phone)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-white/10 px-7 py-3.5 text-base font-bold text-white backdrop-blur transition-colors hover:bg-white hover:text-dlf-red"
            >
              <Phone className="h-4 w-4" />
              {dict.urgency.ctaSecondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────── FINAL CTA
export function FinalCta({ dict, message }: { dict: MedicareDict; message: string }) {
  return (
    <section id="contact" className="relative isolate overflow-hidden px-5 py-16 text-white sm:py-20 lg:px-8 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/laredo-sunset.png"
          alt="Downtown Laredo at sunset"
          fill
          sizes="100vw"
          className="object-cover editorial-img"
        />
        <span className="absolute inset-0 bg-gradient-to-b from-dlf-navy/85 via-dlf-navy/80 to-dlf-navy/90" />
      </div>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-dlf-red bg-dlf-red/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-editorial text-white backdrop-blur sm:text-[11px]">
            <Shield className="h-3 w-3 text-dlf-red" />
            {dict.finalCta.eyebrow}
          </span>
          <h2 className="font-display mt-6 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">
            {dict.finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/90 sm:text-lg">
            {dict.finalCta.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#form" variant="primary" size="lg">
              {dict.finalCta.primary}
            </Button>
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/5 px-7 py-3.5 text-base font-bold text-white backdrop-blur transition-colors hover:bg-white hover:text-dlf-navy"
            >
              {dict.finalCta.secondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
