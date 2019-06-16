const FORMATTER_BY_LOCALE = new Map<string, Intl.DateTimeFormat>();

const FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric"
};

export function getDateFormatter(locale: string): Intl.DateTimeFormat {
  if (FORMATTER_BY_LOCALE.has(locale)) {
    return FORMATTER_BY_LOCALE.get(locale)!;
  }

  const formatter = new Intl.DateTimeFormat(locale, FORMAT_OPTIONS);

  FORMATTER_BY_LOCALE.set(locale, formatter);

  return formatter;
}
