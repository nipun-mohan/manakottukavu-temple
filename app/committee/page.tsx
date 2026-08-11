"use client";

import { useEffect, useState } from "react";

const templeRepresentatives = [
  { image: "trustee", en: "Sri. P. Venugopalanachan", ml: "ശ്രീ. പി. വേണുഗോപാലനച്ചൻ", roleEn: "Trustee", roleMl: "ഊരാളൻ" },
  { image: "tantri", en: "Sri. Balakrishna Pai", ml: "ശ്രീ. ബാലകൃഷ്ണ പൈ", roleEn: "Kavu Tantri", roleMl: "കാവ് തന്ത്രി" },
  { image: "poojari", en: "Sri. Muraleedharan Erakkatt", ml: "ശ്രീ. മുരളീധരൻ എറക്കാട്ട്", roleEn: "Kavu Poojari", roleMl: "കാവ് പൂജാരി" },
];

const executive = [
  { image: "ajish-kumar", en: "Ajesh Kumar", ml: "അജേഷ് കുമാർ", roleEn: "President", roleMl: "പ്രസിഡന്റ്" },
  { image: "ratheesh-p", en: "Ratheesh P.", ml: "രതീഷ് പി.", roleEn: "Vice President", roleMl: "വൈസ് പ്രസിഡന്റ്" },
  { image: "k-ravi", en: "K. Ravi", ml: "കെ. രവി", roleEn: "Secretary", roleMl: "സെക്രട്ടറി" },
  { image: "suresh-shankar", en: "Suresh Shankar", ml: "സുരേഷ് ശങ്കർ", roleEn: "Joint Secretary", roleMl: "ജോയിന്റ് സെക്രട്ടറി" },
  { image: "ka-ashok-kumar", en: "K. E. Ashok Kumar", ml: "കെ. ഇ. അശോക് കുമാർ", roleEn: "Treasurer", roleMl: "ട്രഷറർ" },
];

const members = [
  { image: "t-manorama", en: "T. Manorama", ml: "ടി. മനോരമ", roleEn: "Convenor", roleMl: "കൺവീനർ" },
  { image: "o-balakrishnan", en: "Balakrishnan O.", ml: "ബാലകൃഷ്ണൻ ഒ." },
  { image: "mohan-p", en: "Mohan V.", ml: "മോഹൻ വി." },
  { image: "ng-menon", en: "N. G. Menon", ml: "എൻ. ജി. മേനോൻ" },
  { image: "pk-sreedharan", en: "Sreedharan P. K.", ml: "ശ്രീധരൻ പി. കെ." },
  { image: "shobha-sreedharan", en: "Shobha Shashidharan", ml: "ശോഭ ശശിധരൻ" },
  { image: "vb-manikandan", en: "Manikandan V. B.", ml: "മണികണ്ഠൻ വി. ബി." },
  { image: "r-manoj-kumar", en: "Manoj Kumar R.", ml: "മനോജ് കുമാർ ആർ." },
  { image: "rahul-warrier", en: "Rahul Warrier", ml: "രാഹുൽ വാര്യർ" },
  { image: "ps-sreenath", en: "Sreenath P. S.", ml: "ശ്രീനാഥ് പി. എസ്." },
];

type Person = { image: string; en: string; ml: string; roleEn?: string; roleMl?: string };

export default function CommitteePage() {
  const [lang, setLang] = useState<"en" | "ml">("en");
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    const restoreLanguage = () => {
      const saved = window.localStorage.getItem("manakottukavu-language");
      if (saved === "en" || saved === "ml") setLang(saved);
    };
    restoreLanguage();
    window.addEventListener("storage", restoreLanguage);
    return () => window.removeEventListener("storage", restoreLanguage);
  }, []);
  const toggleLanguage = () => setLang(current => {
    const next = current === "en" ? "ml" : "en";
    window.localStorage.setItem("manakottukavu-language", next);
    return next;
  });
  const L = ({ en, ml }: { en: React.ReactNode; ml: React.ReactNode }) => <>{lang === "en" ? en : ml}</>;
  const card = (person: Person) => <article className="committee-card" key={person.image}>
    <img className="committee-portrait" src={`/committee/${person.image}.jpg?v=20260811`} alt={lang === "en" ? person.en : person.ml}/>
    <div>{person.roleEn && <span>{lang === "en" ? person.roleEn : person.roleMl}</span>}<h3>{lang === "en" ? person.en : person.ml}</h3></div>
  </article>;

  return <main className={`committee-page language-${lang}`}>
    <header className="site-header subpage-header"><a className="brand" href="/"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a><nav aria-label="Primary navigation"><a href="/"><L en="Home" ml="ഹോം"/></a><a href="/#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/committee" aria-current="page"><L en="Temple Committee" ml="ക്ഷേത്ര കമ്മിറ്റി"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a><a href="/#contact"><L en="Contact" ml="ബന്ധപ്പെടുക"/></a></nav><div className="header-actions"><button className="language-toggle" onClick={toggleLanguage} aria-label="Change language"><span className={lang === "en" ? "active" : ""}>EN</span><i/><span className={lang === "ml" ? "active" : ""}>മ</span></button><details className="mobile-menu"><summary aria-label={lang === "en" ? "Open menu" : "മെനു തുറക്കുക"}><span/><span/><span/></summary><nav aria-label="Mobile navigation"><a href="/"><L en="Home" ml="ഹോം"/></a><a href="/#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/committee" aria-current="page"><L en="Temple Committee" ml="ക്ഷേത്ര കമ്മിറ്റി"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a><a href="/#contact"><L en="Contact" ml="ബന്ധപ്പെടുക"/></a></nav></details></div></header>

    <section className="committee-hero"><p className="section-kicker"><L en="Temple administration" ml="ക്ഷേത്ര ഭരണസമിതി"/></p><h1><L en="Temple Committee" ml="ക്ഷേത്ര കമ്മിറ്റി"/></h1></section>

    <section className="committee-groups">
      <div className="committee-group"><div className="committee-group-heading"><span>01</span><h2><L en="Temple Representatives" ml="ക്ഷേത്ര പ്രതിനിധികൾ"/></h2></div><div className="committee-grid representative-grid">{templeRepresentatives.map(card)}</div></div>
      <div className="committee-group"><div className="committee-group-heading"><span>02</span><h2><L en="Executive Committee" ml="എക്സിക്യൂട്ടീവ് കമ്മിറ്റി"/></h2></div><div className="committee-grid executive-grid">{executive.map(card)}</div></div>
      <div className="committee-group"><div className="committee-group-heading"><span>03</span><h2><L en="Committee Members" ml="കമ്മിറ്റി അംഗങ്ങൾ"/></h2></div><div className="committee-grid">{members.map(card)}</div></div>
    </section>

    <footer><a className="brand" href="/"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a><p><L en="Paliam Devaswom, Mullurkkara, Thrissur, Kerala." ml="പാലിയം ദേവസ്വം, മുള്ളൂർക്കര, തൃശ്ശൂർ, കേരളം."/></p><div><a href="/"><L en="Home" ml="ഹോം"/></a><a href="/#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a></div><small>© {new Date().getFullYear()} Manakottukavu Trust</small></footer>
  </main>;
}
