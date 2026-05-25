'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Loader2, ShieldCheck } from 'lucide-react';
import { pushLeadToGHL, readUTM, type InsuranceLine } from '@/lib/cn';

type Dict = {
  title: string;
  subtitle: string;
  fields: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    zip: string;
    language: string;
    notes: string;
  };
  submit: string;
  submitting: string;
  success: { title: string; body: string };
  consent: string;
};

type Props = {
  dict: Dict;
  insuranceLine: InsuranceLine;
  lang: 'en' | 'es';
  webhookUrl: string | undefined;
  /** Used to namespace the lead_source field (e.g. "landing_medicare"). */
  leadSource: string;
};

export function CTAForm({ dict, insuranceLine, lang, webhookUrl, leadSource }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [d, setD] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    zip: '',
    language: lang === 'es' ? 'ES' : 'EN',
    notes: '',
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErr(null);
    try {
      const ok = await pushLeadToGHL(webhookUrl, {
        type: 'landing_lead',
        firstName: d.firstName,
        lastName: d.lastName || undefined,
        email: d.email,
        phone: d.phone,
        zipCode: d.zip,
        language_pref: d.language as 'EN' | 'ES',
        insurance_line: insuranceLine,
        lead_source: leadSource,
        notes: d.notes || undefined,
        utm: readUTM(),
      });
      if (ok || !webhookUrl) {
        setSent(true);
      } else {
        setErr(
          lang === 'es'
            ? 'No se pudo enviar. Llámanos al 956-568-6293 o intenta de nuevo.'
            : "Couldn't send. Call us at 956-568-6293 or try again.",
        );
      }
    } catch {
      setErr(
        lang === 'es'
          ? 'Algo salió mal. Llámanos al 956-568-6293.'
          : 'Something went wrong. Call us at 956-568-6293.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div id="form" className="rounded-3xl border-2 border-dlf-success/30 bg-white p-10 text-center shadow-xl sm:p-12">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-dlf-success/15 text-dlf-success">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h3 className="font-display mt-5 text-2xl font-bold text-dlf-navy sm:text-3xl">
          {dict.success.title}
        </h3>
        <p className="mt-3 text-base text-dlf-stone">{dict.success.body}</p>
      </div>
    );
  }

  return (
    <form
      id="form"
      onSubmit={onSubmit}
      className="rounded-3xl border border-dlf-line bg-white p-6 shadow-xl sm:p-10"
    >
      <h3 className="font-display text-2xl font-bold text-dlf-navy sm:text-3xl">{dict.title}</h3>
      <p className="mt-2 text-sm text-dlf-stone sm:text-base">{dict.subtitle}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="firstName" label={dict.fields.firstName} value={d.firstName} onChange={(v) => setD({ ...d, firstName: v })} required />
        <Field id="lastName" label={dict.fields.lastName} value={d.lastName} onChange={(v) => setD({ ...d, lastName: v })} />
        <Field id="phone" label={dict.fields.phone} type="tel" value={d.phone} onChange={(v) => setD({ ...d, phone: v })} required />
        <Field id="email" label={dict.fields.email} type="email" value={d.email} onChange={(v) => setD({ ...d, email: v })} required />
        <Field id="zip" label={dict.fields.zip} value={d.zip} onChange={(v) => setD({ ...d, zip: v })} required pattern="[0-9]{5}" />
        <label htmlFor="language" className="block">
          <span className="block text-[10px] font-bold uppercase tracking-editorial text-dlf-stone">
            {dict.fields.language}
          </span>
          <select
            id="language"
            value={d.language}
            onChange={(e) => setD({ ...d, language: e.target.value })}
            className="mt-2 w-full rounded-xl border border-dlf-line bg-white px-4 py-3 text-sm font-medium text-dlf-navy outline-none transition-colors focus:border-dlf-red"
          >
            <option value="EN">English</option>
            <option value="ES">Español</option>
          </select>
        </label>
        <div className="sm:col-span-2">
          <Field id="notes" label={dict.fields.notes} as="textarea" rows={3} value={d.notes} onChange={(v) => setD({ ...d, notes: v })} />
        </div>
      </div>

      {err && (
        <p className="mt-4 rounded-lg bg-dlf-red/10 px-4 py-3 text-sm font-semibold text-dlf-red-dark">
          {err}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-red px-8 py-4 text-base font-bold text-white shadow-[0_8px_22px_-6px_rgba(212,38,58,0.55)] transition-all hover:shadow-[0_12px_28px_-6px_rgba(212,38,58,0.7)] hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {dict.submitting}
          </>
        ) : (
          <>
            {dict.submit}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-5 inline-flex items-start gap-2 text-xs text-dlf-stone">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-none text-dlf-success" />
        {dict.consent}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required,
  as = 'input',
  rows,
  pattern,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  as?: 'input' | 'textarea';
  rows?: number;
  pattern?: string;
}) {
  const base =
    'mt-2 w-full rounded-xl border border-dlf-line bg-white px-4 py-3 text-sm text-dlf-navy outline-none transition-colors focus:border-dlf-red placeholder:text-dlf-stone/60';

  return (
    <label htmlFor={id} className="block">
      <span className="block text-[10px] font-bold uppercase tracking-editorial text-dlf-stone">
        {label}
      </span>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          pattern={pattern}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
    </label>
  );
}
