"use client";

import { useEffect, useState } from "react";

export default function TempleLogin() {
  const [lang, setLang] = useState<"en" | "ml">("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("manakottukavu-language");
    if (saved === "en" || saved === "ml") setLang(saved);
  }, []);

  const toggleLanguage = () => setLang(current => {
    const next = current === "en" ? "ml" : "en";
    window.localStorage.setItem("manakottukavu-language", next);
    document.documentElement.lang = next;
    return next;
  });

  const L = ({ en, ml }: { en: React.ReactNode; ml: React.ReactNode }) => <>{lang === "en" ? en : ml}</>;

  return <main className={`login-page language-${lang}`}>
    <header className="site-header subpage-header">
      <a className="brand" href="/"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a>
      <nav><a href="/"><L en="Back to website" ml="വെബ്സൈറ്റിലേക്ക് മടങ്ങുക"/></a></nav>
      <button className="language-toggle" onClick={toggleLanguage} aria-label="Change language"><span className={lang === "en" ? "active" : ""}>EN</span><i/><span className={lang === "ml" ? "active" : ""}>മ</span></button>
    </header>

    <section className="login-shell">
      <div className="login-card">
        <div className="login-symbol" aria-hidden="true">ॐ</div>
        <p className="section-kicker"><L en="Temple administration" ml="ക്ഷേത്ര ഭരണം"/></p>
        <h1><L en="Administrator login" ml="അഡ്മിനിസ്ട്രേറ്റർ ലോഗിൻ"/></h1>
        <a className="login-button" href="/admin"><L en="Continue securely" ml="സുരക്ഷിതമായി തുടരുക"/><span aria-hidden="true">→</span></a>
        <small><L en="A one-time verification code will be sent to the authorised administrator’s email address." ml="അംഗീകൃത അഡ്മിനിസ്ട്രേറ്ററുടെ ഇമെയിൽ വിലാസത്തിലേക്ക് ഒറ്റത്തവണ സ്ഥിരീകരണ കോഡ് അയയ്ക്കും."/></small>
      </div>
    </section>

    <footer className="login-footer"><span>© {new Date().getFullYear()} Manakottukavu</span><span>Site managed by Nipun Mohan</span></footer>
  </main>;
}
