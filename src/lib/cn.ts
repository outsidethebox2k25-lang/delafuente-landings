import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  // Simple cn without tailwind-merge to keep deps minimal
  return clsx(inputs);
}

export function template(str: string, vars: Record<string, string | number>) {
  return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

const PHONE = '+19565686293';

export const whatsappLink = (message: string) =>
  `https://wa.me/${PHONE.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

export const telLink = (phone: string = PHONE) => `tel:${phone.replace(/[^0-9+]/g, '')}`;

export type InsuranceLine = 'medicare' | 'health' | 'life' | 'auto' | 'home' | 'commercial';

export type LeadPayload = {
  type: 'landing_lead';
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  zipCode: string;
  language_pref: 'EN' | 'ES';
  insurance_line: InsuranceLine;
  lead_source: string;
  notes?: string;
  utm?: { source?: string; medium?: string; campaign?: string };
};

export async function pushLeadToGHL(
  webhookUrl: string | undefined,
  payload: LeadPayload,
): Promise<boolean> {
  if (!webhookUrl || webhookUrl.includes('REPLACE_ME')) {
    console.warn('GHL webhook not configured for', payload.insurance_line);
    return false;
  }
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        source: 'delafuente-landings',
        landing_url: typeof window !== 'undefined' ? window.location.href : '',
        timestamp: new Date().toISOString(),
        tags: [payload.insurance_line, 'landing', payload.lead_source],
      }),
    });
    return res.ok;
  } catch (e) {
    console.error('GHL push failed:', e);
    return false;
  }
}

export function readUTM(): LeadPayload['utm'] {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = sessionStorage.getItem('dlf_utm');
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}
