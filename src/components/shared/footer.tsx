import Image from 'next/image';
import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { template, telLink } from '@/lib/cn';

type Props = {
  lang: 'en' | 'es';
  dict: {
    tagline: string;
    addressLabel: string;
    address: string;
    hoursLabel: string;
    hours: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    rights: string;
    otherServices: string;
  };
};

export function Footer({ lang, dict }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-dlf-line bg-gradient-navy text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={`/${lang}`} className="inline-flex items-center gap-3">
              <span className="relative inline-flex h-12 w-12 overflow-hidden rounded-lg shadow-lg ring-1 ring-white/10">
                <Image
                  src="/images/logo.jpeg"
                  alt="De La Fuente Insurance Group"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="font-display text-lg font-bold leading-tight">
                De La Fuente
                <span className="block text-[10px] font-normal uppercase tracking-editorial text-dlf-cyan">
                  Insurance Group
                </span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/75">{dict.tagline}</p>
          </div>

          <FooterCol icon={<MapPin className="h-3.5 w-3.5 text-dlf-red" />} label={dict.addressLabel}>
            <p className="text-sm leading-relaxed text-white/90">{dict.address}</p>
          </FooterCol>

          <FooterCol icon={<Clock className="h-3.5 w-3.5 text-dlf-red" />} label={dict.hoursLabel}>
            <p className="text-sm leading-relaxed text-white/90">{dict.hours}</p>
          </FooterCol>

          <FooterCol icon={<Phone className="h-3.5 w-3.5 text-dlf-red" />} label={dict.phoneLabel}>
            <a href={telLink(dict.phone)} className="block text-sm font-bold transition-colors hover:text-dlf-red">
              {dict.phone}
            </a>
            <p className="mt-3 text-[10px] uppercase tracking-editorial text-white/60">
              {dict.emailLabel}
            </p>
            <a
              href={`mailto:${dict.email}`}
              className="mt-1 block text-sm transition-colors hover:text-dlf-red"
            >
              <Mail className="mr-1 inline h-3 w-3 text-dlf-red" />
              {dict.email}
            </a>
          </FooterCol>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-center text-[11px] uppercase tracking-editorial text-white/60 sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>{template(dict.rights, { year })}</p>
          <p className="mt-2 sm:mt-0">{dict.otherServices}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-editorial text-white/70">
        {icon}
        {label}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
