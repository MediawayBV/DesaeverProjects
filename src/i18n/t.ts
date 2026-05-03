import nl from "./nl.json";
import en from "./en.json";

export type Locale = "nl" | "en";

const dicts = { nl, en } as const;

export function getDict(locale: Locale) {
  return dicts[locale];
}

export function localeUrl(locale: Locale, path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.replace(/^\//, "");
  if (locale === "nl") {
    return clean ? `${base}/${clean}` : `${base}/`;
  }
  return clean ? `${base}/en/${clean}` : `${base}/en/`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "nl" ? "en" : "nl";
}
