'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

type Lang = 'en' | 'es';
type Props = { current: Lang; tone?: 'light' | 'dark' };

export function LangSwitcher({ current, tone = 'light' }: Props) {
  const pathname = usePathname() ?? '/';
  const swap = (target: Lang) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${target}`;
    segments[0] = target;
    return '/' + segments.join('/');
  };

  const containerCls =
    tone === 'light'
      ? 'border-dlf-line bg-white shadow-sm'
      : 'border-white/25 bg-white/10 backdrop-blur';
  const inactiveCls = tone === 'light' ? 'text-dlf-stone' : 'text-white/80';
  const activeText = tone === 'light' ? 'text-white' : 'text-dlf-navy';
  const activeBg = tone === 'light' ? 'bg-dlf-navy' : 'bg-white';

  return (
    <div
      className={`relative inline-flex items-center rounded-full border p-1 ${containerCls}`}
    >
      {(['en', 'es'] as const).map((lng) => {
        const active = lng === current;
        return (
          <Link
            key={lng}
            href={swap(lng)}
            aria-current={active ? 'page' : undefined}
            className={`relative z-10 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-editorial transition-colors ${
              active ? activeText : inactiveCls
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill-dlf"
                className={`absolute inset-0 -z-10 rounded-full ${activeBg}`}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            {lng === 'en' ? 'EN' : 'ES'}
          </Link>
        );
      })}
    </div>
  );
}
