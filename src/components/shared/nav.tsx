'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { LangSwitcher } from './lang-switcher';
import { Button } from './button';
import { cn, telLink } from '@/lib/cn';

type Props = {
  lang: 'en' | 'es';
  labels: {
    services: string;
    reviews: string;
    faq: string;
    contact: string;
    cta: string;
  };
  phone: string;
};

export function Nav({ lang, labels, phone }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close drawer on route change
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        solid
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-gradient-to-b from-black/35 via-black/15 to-transparent',
      )}
    >
      {/* Top thin bar — phone + tagline (desktop) */}
      <div
        className={cn(
          'hidden border-b text-[11px] uppercase tracking-editorial transition-colors lg:block',
          solid ? 'border-dlf-line text-dlf-stone' : 'border-white/20 text-white/90',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2">
          <a href={telLink(phone)} className={cn('inline-flex items-center gap-2 transition-colors', solid ? 'hover:text-dlf-red' : 'hover:text-white')}>
            <Phone className="h-3 w-3" />
            {phone}
          </a>
          <span>&ldquo;Somos seguros, La pareja de los seguros&rdquo;</span>
          <span>Lun–Vie 9 AM – 6 PM</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8 lg:py-4">
        <Link href={`/${lang}`} className="flex items-center gap-2.5" aria-label="De La Fuente Insurance Group">
          <span className="relative inline-flex h-11 w-11 overflow-hidden rounded-lg shadow-md ring-1 ring-black/10 sm:h-12 sm:w-12">
            <Image
              src="/images/logo.jpeg"
              alt="De La Fuente Insurance Group"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span
              className={cn(
                'font-display text-base font-bold md:text-lg',
                solid ? 'text-dlf-navy' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]',
              )}
            >
              De La Fuente
            </span>
            <span
              className={cn(
                'text-[10px] font-bold uppercase tracking-editorial',
                solid ? 'text-dlf-cyan' : 'text-white/80',
              )}
            >
              Insurance Group
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {[
            { href: '#services', label: labels.services },
            { href: '#reviews', label: labels.reviews },
            { href: '#faq', label: labels.faq },
            { href: '#contact', label: labels.contact },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'link-underline text-[11px] font-bold uppercase tracking-editorial transition-colors',
                solid ? 'text-dlf-navy/85 hover:text-dlf-red' : 'text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] hover:text-white',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitcher current={lang} tone={solid ? 'light' : 'dark'} />
          <Button href="#form" variant="primary" size="sm" className="hidden lg:inline-flex">
            {labels.cta}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition-colors lg:hidden',
              solid ? 'border-dlf-line bg-white text-dlf-navy' : 'border-white/30 bg-black/25 text-white',
            )}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-dlf-line bg-white px-5 py-6 lg:hidden">
          <ul className="flex flex-col gap-1">
            {[
              { href: '#services', label: labels.services },
              { href: '#reviews', label: labels.reviews },
              { href: '#faq', label: labels.faq },
              { href: '#contact', label: labels.contact },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-3 text-xs font-bold uppercase tracking-editorial text-dlf-navy hover:text-dlf-red"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Button href="#form" variant="primary" size="md" className="w-full">
                {labels.cta}
              </Button>
            </li>
            <li className="mt-3">
              <a
                href={telLink(phone)}
                className="inline-flex items-center gap-2 text-sm font-bold text-dlf-navy"
              >
                <Phone className="h-4 w-4 text-dlf-red" />
                {phone}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
