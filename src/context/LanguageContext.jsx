import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CATEGORY_TRANSLATIONS, translations } from "../i18n/translations";

const LanguageContext = createContext(null);

function getByPath(obj, path) {
  if (!path) return obj;
  return path.split(".").reduce((acc, part) => (acc && part in acc ? acc[part] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("site_lang") || "uz");

  useEffect(() => {
    localStorage.setItem("site_lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
  }, [lang]);

  const value = useMemo(() => {
    const locale = translations[lang] || translations.uz;
    const fallback = translations.uz;

    const t = (path, defaultValue = "") => {
      const v = getByPath(locale, path);
      if (v !== undefined) return v;
      const f = getByPath(fallback, path);
      if (f !== undefined) return f;
      return defaultValue;
    };

    const tc = (category) => {
      if (lang === "uz") return category;
      return CATEGORY_TRANSLATIONS[lang]?.[category] || category;
    };

    return { lang, setLang, t, tc };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
