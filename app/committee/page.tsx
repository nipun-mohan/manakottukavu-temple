"use client";

import { CSSProperties, useEffect, useState } from "react";

const committeeSource = "https://manakottukavu.nipunmohanan.workers.dev/media/renovation/document/page-12.jpg";

const executive = [
  { image: "ajish-kumar", x: "12.5%", y: "37.2%", en: "Ajish Kumar", ml: "അജേഷ് കുമാർ", roleEn: "President", roleMl: "പ്രസിഡന്റ്" },
  { image: "ratheesh-p", x: "31.6%", y: "37.2%", en: "Ratheesh P.", ml: "രതീഷ് പി", roleEn: "Vice President", roleMl: "വൈസ് പ്രസിഡന്റ്" },
  { image: "k-ravi", x: "50.7%", y: "37.2%", en: "K. Ravi", ml: "കെ. രവി", roleEn: "Secretary", roleMl: "സെക്രട്ടറി" },
  { image: "suresh-shankar", x: "69.3%", y: "37.2%", en: "Suresh Shankar", ml: "സുരേഷ് ശങ്കർ", roleEn: "Joint Secretary", roleMl: "ജോയിന്റ് സെക്രട്ടറി" },
  { image: "ka-ashok-kumar", x: "88.1%", y: "37.2%", en: "K. A. Ashok Kumar", ml: "കെ. എ. അശോക് കുമാർ", roleEn: "Treasurer", roleMl: "ട്രഷറർ" },
];

const members = [
  { image: "t-manorama", x: "12.5%", y: "57.4%", en: "T. Manorama", ml: "ടി. മനോരമ", roleEn: "Convenor", roleMl: "കൺവീനർ" },
  { image: "pk-sreedharan", x: "31.6%", y: "57.4%", en: "P. K. Sreedharan", ml: "ശ്രീധരൻ പി. കെ" },
  { image: "ng-menon", x: "50.7%", y: "57.4%", en: "N. G. Menon", ml: "എൻ. ജി. മേനോൻ" },
  { image: "v-mohanan", x: "69.3%", y: "57.4%", en: "V. Mohanan", ml: "മോഹനൻ വി" },
  { image: "rahul-warrier", x: "88.1%", y: "57.4%", en: "Rahul Warrier", ml: "രാഹുൽ വാര്യർ" },
  { image: "r-manoj-kumar", x: "12.5%", y: "73.1%", en: "R. Manoj Kumar", ml: "മനോജ് കുമാർ ആർ" },
  { image: "vk-manikandan", x: "31.6%", y: "73.1%", en: "V. K. Manikandan", ml: "മണികണ്ഠൻ വി. കെ" },
  { image: "shobha-sreedharan", x: "50.7%", y: "73.1%", en: "Shobha Sreedharan", ml: "ശോഭ ശ്രീധരൻ" },
  { image: "ps-sreenath", x: "69.3%", y: "73.1%", en: "P. S. Sreenath", ml: "ശ്രീനാഥ് പി. എസ്" },
  { image: "o-balakrishnan", x: "88.1%", y: "73.1%", en: "O. Balakrishnan", ml: "ബാലകൃഷ്ണൻ ഒ." },
];

type Person = { image: string; x: string; y: string; en: string; ml: string; roleEn?: string; roleMl?: string };

export default function CommitteePage() {
  const [lang, setLang] = useState<"en" | "ml">("en");
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const L = ({ en, ml }: { en: React.ReactNode; ml: React.ReactNode }) => <>{lang === "en" ? en : ml}</>;
  const card = (person: Person) => <article className="committee-card" key={person.image}>
    <div className="committee-portrait" role="img" aria-label={lang === "en" ? person.en : person.ml} style={{ backgroundImage: `url(${committeeSource})`, "--portrait-x": person.x, "--portrait-y": person.y } as CSSProperties}/>
    <div>{person.roleEn && <span>{lang === "en" ? person.roleEn : person.roleMl}</span>}<h3>{lang === "en" ? person.en : person.ml}</h3></div>
  </article>;

  return <main className={`committee-page language-${lang}`}>
    <header className="site-header subpage-header"><a className="brand" href="/"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a><nav aria-label="Primary navigation"><a href="/"><L en="Home" ml="ഹോം"/></a><a href="/#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/committee" aria-current="page"><L en="Temple Committee" ml="ക്ഷേത്ര കമ്മിറ്റി"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a><a href="/#contact"><L en="Contact" ml="ബന്ധപ്പെടുക"/></a></nav><button className="language-toggle" onClick={() => setLang(lang === "en" ? "ml" : "en")} aria-label="Change language"><span className={lang === "en" ? "active" : ""}>EN</span><i/><span className={lang === "ml" ? "active" : ""}>മ</span></button></header>

    <section className="committee-hero"><p className="section-kicker"><L en="Temple administration" ml="ക്ഷേത്ര ഭരണസമിതി"/></p><h1><L en="Temple Committee" ml="ക്ഷേത്ര കമ്മിറ്റി"/></h1><p><L en="The Manakottukavu Trust executive committee and committee members, as listed in the official project booklet." ml="ഔദ്യോഗിക പദ്ധതി പുസ്തികയിൽ നൽകിയിട്ടുള്ള മനക്കോട്ടുകാവ് ട്രസ്റ്റ് എക്സിക്യൂട്ടീവ് കമ്മിറ്റിയും കമ്മിറ്റി അംഗങ്ങളും."/></p></section>

    <section className="committee-groups">
      <div className="committee-group"><div className="committee-group-heading"><span>01</span><h2><L en="Executive Committee" ml="എക്സിക്യൂട്ടീവ് കമ്മിറ്റി"/></h2></div><div className="committee-grid executive-grid">{executive.map(card)}</div></div>
      <div className="committee-group"><div className="committee-group-heading"><span>02</span><h2><L en="Committee Members" ml="കമ്മിറ്റി അംഗങ്ങൾ"/></h2></div><div className="committee-grid">{members.map(card)}</div></div>
    </section>

    <footer><a className="brand" href="/"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a><p><L en="Palayam Devaswom, Mullurkkara, Thrissur, Kerala." ml="പാലയം ദേവസ്വം, മുള്ളൂർക്കര, തൃശ്ശൂർ, കേരളം."/></p><div><a href="/"><L en="Home" ml="ഹോം"/></a><a href="/#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a></div><small>© {new Date().getFullYear()} Manakottukavu Trust</small></footer>
  </main>;
}
