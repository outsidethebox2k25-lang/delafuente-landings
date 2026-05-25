import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'navy' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };
type LinkProps = Common & { href: string; onClick?: never; type?: never; disabled?: never };
type BtnProps = Common & {
  href?: undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-red text-white hover:opacity-95 shadow-[0_8px_22px_-6px_rgba(212,38,58,0.55)] hover:shadow-[0_12px_28px_-6px_rgba(212,38,58,0.65)]',
  navy:
    'bg-gradient-navy text-white hover:opacity-95 shadow-[0_8px_22px_-6px_rgba(10,37,64,0.45)]',
  outline:
    'bg-white text-dlf-navy border-2 border-dlf-line hover:border-dlf-red hover:text-dlf-red shadow-sm',
  ghost: 'bg-transparent text-dlf-navy hover:text-dlf-red',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const base =
  'inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

export function Button(props: LinkProps | BtnProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const klass = cn(base, variantClasses[variant], sizeClasses[size], className);

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={klass}>
        {children}
      </Link>
    );
  }
  const { onClick, type = 'button', disabled } = props as BtnProps;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={klass}>
      {children}
    </button>
  );
}
