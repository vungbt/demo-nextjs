import { format } from 'date-fns/format';

export const formatPrice = (
  value: number,
  options?: { locale?: Intl.LocalesArgument; currency?: 'VND' }
) => {
  return new Intl.NumberFormat(options?.locale || 'vi-VN', {
    style: 'currency',
    currency: options?.currency || 'VND'
  }).format(value || 0);
};

export enum EDateFormat {
  dd_MMMM_yyyy = 'dd MMMM yyyy',
  dd_MM_yyyy = 'dd/MM/yyyy',
  dd_MMM_yyyy_HH_mm_a = 'dd MMM yyyy HH:mm a',
  dd_MMM_yyyy_HH_mm = 'dd MMM yyyy HH:mm',
  dd_MM_yyyy_HH_mm = 'dd/MM/yyyy HH:mm',
  dd_MM_yyyy_HH_mm_V2 = 'dd/MM/yyyy, HH:mm',
  DD_MM_YYYY = 'DD/MM/YYYY',
  MM_YYYY = 'MM/yyyy',
  HH_mm = 'HH:mm',
  hh_mm = 'hh:mm'
}

export function formatDateTime(date: string | Date | number, fm?: EDateFormat) {
  const value = new Date(date);
  value.setMinutes(value.getMinutes() - value.getTimezoneOffset());

  const hour12 = Intl.DateTimeFormat().resolvedOptions().hour12;
  const timestampFormat = hour12 ? EDateFormat.dd_MMM_yyyy_HH_mm_a : EDateFormat.dd_MMM_yyyy_HH_mm;

  return format(value, fm ?? timestampFormat);
}

export const formatDate = (date?: Date | string | number, fm?: EDateFormat) => {
  const dateNeedFormat = date ? new Date(date) : new Date();
  return format(dateNeedFormat, fm ?? EDateFormat.dd_MMMM_yyyy);
};
