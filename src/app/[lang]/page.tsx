import { notFound, redirect } from 'next/navigation';

const locales = ['en', 'es'] as const;
const hasLocale = (l: string): l is (typeof locales)[number] =>
  (locales as readonly string[]).includes(l);

export default async function LangIndex({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  // Send /en and /es → /<lang>/medicare for now (Medicare is the priority landing)
  redirect(`/${lang}/medicare`);
}
