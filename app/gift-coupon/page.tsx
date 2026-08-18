"use client";

import { useEffect, useState } from "react";

const prizes = [
  ["Honda Dio scooter", "ഹോണ്ട ഡിയോ സ്കൂട്ടർ", "1"],
  ["Air conditioner (1 ton)", "എയർ കണ്ടീഷണർ (1 ടൺ)", "1"],
  ["Semi-automatic washing machine", "സെമി ഓട്ടോമാറ്റിക് വാഷിംഗ് മെഷീൻ", "1"],
  ["LED television (32 inch)", "എൽ.ഇ.ഡി. ടി.വി. (32 ഇഞ്ച്)", "1"],
  ["Mixer grinder", "മിക്സർ ഗ്രൈൻഡർ", "1"],
  ["Air fryer", "എയർ ഫ്രയർ", "1"],
  ["Water purifier", "വാട്ടർ പ്യൂരിഫയർ", "1"],
  ["Electric kettle", "ഇലക്ട്രിക് കെറ്റിൽ", "3"],
  ["Non-stick tava", "നോൺസ്റ്റിക് തവ", "5"],
  ["Iron box", "അയൺ ബോക്സ്", "15"],
] as const;

export default function GiftCouponPage() {
  const [lang, setLang] = useState<"en" | "ml">("en");
  useEffect(() => {
    const saved = window.localStorage.getItem("manakottukavu-language");
    if (saved === "en" || saved === "ml") setLang(saved);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const toggleLanguage = () => setLang(current => {
    const next = current === "en" ? "ml" : "en";
    window.localStorage.setItem("manakottukavu-language", next);
    return next;
  });
  const L = ({ en, ml }: { en: React.ReactNode; ml: React.ReactNode }) => <>{lang === "en" ? en : ml}</>;

  return <main className={`gift-page language-${lang}`}>
    <header className="site-header subpage-header"><a className="brand" href="/"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a><nav aria-label="Primary navigation"><a href="/"><L en="Home" ml="ഹോം"/></a><a href="/#event" aria-current="page"><L en="Upcoming Event" ml="വരാനിരിക്കുന്ന പരിപാടി"/></a><a href="/#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/committee"><L en="Manakottukavu Trust" ml="മനക്കോട്ടുകാവ് ട്രസ്റ്റ്"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a></nav><div className="header-actions"><button className="language-toggle" onClick={toggleLanguage} aria-label="Change language"><span className={lang === "en" ? "active" : ""}>EN</span><i/><span className={lang === "ml" ? "active" : ""}>മ</span></button><details className="mobile-menu"><summary aria-label={lang === "en" ? "Open menu" : "മെനു തുറക്കുക"}><span/><span/><span/></summary><nav aria-label="Mobile navigation"><a href="/"><L en="Home" ml="ഹോം"/></a><a href="/#event"><L en="Upcoming Event" ml="വരാനിരിക്കുന്ന പരിപാടി"/></a><a href="/#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/committee"><L en="Manakottukavu Trust" ml="മനക്കോട്ടുകാവ് ട്രസ്റ്റ്"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a></nav></details></div></header>

    <section className="gift-hero"><div className="gift-hero-art" aria-hidden="true"><img src="/events/gift-event-visual.png" alt=""/></div><div className="gift-hero-copy"><p className="section-kicker"><L en="Renovation fundraiser" ml="പുനരുദ്ധാരണ ധനസമാഹരണം"/></p><h1><L en="Vishu Gift Draw" ml="വിഷു സമ്മാന നറുക്കെടുപ്പ്"/></h1><p><L en="Join the Manakottukavu renovation fundraiser and celebrate Vishu with a chance to win wonderful gifts." ml="മനക്കോട്ടുകാവ് പുനരുദ്ധാരണ ധനസമാഹരണത്തിൽ പങ്കാളിയാകൂ; ആകർഷകമായ സമ്മാനങ്ങളോടെ വിഷു ആഘോഷിക്കൂ."/></p><div className="gift-facts"><div><span><L en="Gift Coupon" ml="സമ്മാന കൂപ്പൺ"/></span><strong>₹200</strong></div><div><span><L en="Draw date" ml="നറുക്കെടുപ്പ്"/></span><strong><L en="15 April 2027" ml="2027 ഏപ്രിൽ 15"/></strong></div><div><span><L en="Time & venue" ml="സമയവും വേദിയും"/></span><strong><L en="3:00 PM · Temple Sannidhi" ml="വൈകിട്ട് 3 മണി · ക്ഷേത്ര സന്നിധി"/></strong></div></div><a className="gift-contact" href="tel:+918129026387"><L en="Call for coupons · +91 81290 26387" ml="കൂപ്പണുകൾക്കായി വിളിക്കുക · +91 81290 26387"/></a></div></section>

    <section className="gift-prizes"><div className="gift-prizes-heading"><p className="section-kicker"><L en="Prize list" ml="സമ്മാനപ്പട്ടിക"/></p><h2><L en="Prizes in the draw" ml="നറുക്കെടുപ്പിലെ സമ്മാനങ്ങൾ"/></h2><p><L en="The draw will be held on Vishu day at Manakottukavu Sannidhi." ml="വിഷു ദിനത്തിൽ മനക്കോട്ടുകാവ് സന്നിധിയിൽ നറുക്കെടുപ്പ് നടത്തും."/></p></div><ol>{prizes.map((prize, index) => <li key={prize[0]}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{lang === "en" ? prize[0] : prize[1]}</b><small><L en="Number of winners" ml="വിജയികളുടെ എണ്ണം"/> · {prize[2]}</small></div></li>)}</ol></section>

    <section className="gift-terms"><p><L en="Prize winners must present the original Gift Coupon to claim their prize. Product images are for illustration only; actual products may vary." ml="സമ്മാനാർഹർ സമ്മാനം ഏറ്റുവാങ്ങാൻ യഥാർത്ഥ സമ്മാന കൂപ്പൺ നിർബന്ധമായും ഹാജരാക്കണം. ഉൽപ്പന്ന ചിത്രങ്ങൾ സൂചനയ്ക്കായി മാത്രം; യഥാർത്ഥ ഉൽപ്പന്നങ്ങളിൽ വ്യത്യാസമുണ്ടാകാം."/></p></section><section className="gift-note"><p><L en="Coupon proceeds support the renovation of Manakottukavu Temple. Contact the Manakottukavu Trust to obtain coupons and confirm participation details." ml="കൂപ്പൺ വരുമാനം മനക്കോട്ടുകാവ് ക്ഷേത്ര പുനരുദ്ധാരണത്തിന് വിനിയോഗിക്കും. കൂപ്പൺ ലഭിക്കാനും പങ്കാളിത്ത വിവരങ്ങൾ ഉറപ്പാക്കാനും മനക്കോട്ടുകാവ് ട്രസ്റ്റിനെ ബന്ധപ്പെടുക."/></p><a href="tel:+918129026387">+91 81290 26387</a></section>

    <footer><a className="brand" href="/"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a><p><L en="Manakottukavu Trust, Mullurkkara, Thrissur, Kerala." ml="മനക്കോട്ടുകാവ് ട്രസ്റ്റ്, മുള്ളൂർക്കര, തൃശ്ശൂർ, കേരളം."/></p><div><a href="/"><L en="Home" ml="ഹോം"/></a><a href="/#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a></div><small className="footer-bottom"><span>© {new Date().getFullYear()} Manakottukavu Trust</span><span>Reg. No. 28/IV/2025</span><span>Site managed by Nipun Mohan</span></small></footer>
  </main>;
}
