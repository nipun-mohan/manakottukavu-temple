"use client";

import { useEffect, useState } from "react";

const facebookUrl = "https://www.facebook.com/people/%E0%B4%AE%E0%B4%A8%E0%B4%95%E0%B5%8D%E0%B4%95%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%81%E0%B4%95%E0%B4%BE%E0%B4%B5%E0%B5%8D-%E0%B4%AE%E0%B5%81%E0%B4%B3%E0%B5%8D%E0%B4%B3%E0%B5%82%E0%B5%BC%E0%B4%95%E0%B5%8D%E0%B4%95%E0%B4%B0/100089469818723/";

const offerings = [
  ["Valiya Shakteyam (Kalasham)", "വലിയ ശാക്തേയം (കലശം)", "₹2,800"], ["Shakteyam (Kalasham)", "ശാക്തേയം (കലശം)", "₹500"],
  ["Maha Guruthi Pooja", "മഹാ ഗുരുതിപൂജ", "₹3,000"], ["Vilakku", "വിളക്ക്", "₹10"], ["Ghee Lamp", "നെയ്യ് വിളക്ക്", "₹25"],
  ["Garland", "മാല", "₹10"], ["Pushpanjali", "പുഷ്പാഞ്ജലി", "₹10"], ["Raktha Pushpanjali", "രക്ത പുഷ്പാഞ്ജലി", "₹15"],
  ["Mangalya Pushpanjali", "മംഗല്യ പുഷ്പാഞ്ജലി", "₹15"], ["Shathrusamhara Pushpanjali", "ശത്രുസംഹാര പുഷ്പാഞ്ജലി", "₹50"],
  ["Guruthi Pushpanjali", "ഗുരുതി പുഷ്പാഞ്ജലി", "₹50"], ["Muttirakkal", "മുട്ടിറക്കൽ", "₹10", "Please bring a coconut", "ഒരു തേങ്ങ കൊണ്ടുവരണം"],
  ["Kumkumarchana", "കുങ്കുമാർച്ചന", "₹25"], ["Poomoodal", "പൂമൂടൽ", "₹1,000"], ["Lighting the Deepastambham", "ദീപസ്തംഭം തെളിയിക്കൽ", "₹150"],
  ["Malar Nivedyam", "മലർ നിവേദ്യം", "₹25"], ["Thrimadhuram", "ത്രിമധുരം", "₹25"], ["Jaggery Payasam", "ശർക്കര പായസം", "₹50"],
  ["Kadum Payasam", "കടുംപായസം", "₹100"], ["Milk Payasam", "പാൽപായസം", "₹70"], ["Vella Nivedyam", "വെള്ള നിവേദ്യം", "₹15"],
  ["Niramala", "നിറമാല", "₹500"], ["Chuttu Vilakku", "ചുറ്റുവിളക്ക്", "₹1,500"], ["Bhagavathi Seva", "ഭഗവത്‌സേവ", "₹150"],
  ["Choroonu", "ചോറൂണ്", "₹50"], ["Vivaham", "വിവാഹം", "₹150"], ["Nel Para", "നെൽ പറ", "₹250"],
  ["Thiruvudayada Charthal", "തിരുവുടയാട ചാർത്തൽ", "₹50"], ["Vehicle Pooja", "വാഹന പൂജ", "₹50"], ["Ezhuthiniruthal", "എഴുത്തിനിരുത്തൽ", "₹50"],
  ["Kalabhabhishekam", "കളഭാഭിഷേകം", "₹25"], ["Palabhishekam", "പാലഭിഷേകം", "₹25"], ["Honey Abhishekam", "തേൻ അഭിഷേകം", "₹100"],
  ["Kali Sahasranamarchana", "കാളി സഹസ്രനാമാർച്ചന", "₹100"], ["Tender Coconut Abhishekam", "ഇളനീർ അഭിഷേകം", "₹10", "Please bring a tender coconut", "ഇളനീർ കൊണ്ടുവരണം"],
  ["Turmeric Powder Abhishekam", "മഞ്ഞൾപ്പൊടി അഭിഷേകം", "₹50"], ["Lemon Garland", "നാരങ്ങമാല", null], ["Lemon Lamp", "നാരങ്ങ വിളക്ക്", null], ["Kedavilakku", "കെടാവിളക്ക്", "₹100"],
] as const;

export default function Home() {
  const [lang, setLang] = useState<"en" | "ml">("en");
  useEffect(() => {
    document.documentElement.lang = lang;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .08 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);
  const L = ({ en, ml }: { en: React.ReactNode; ml: React.ReactNode }) => <>{lang === "en" ? en : ml}</>;

  return <main className={`language-${lang}`}>
    <header className="site-header home-header">
      <a className="brand" href="#home"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a>
      <nav aria-label="Primary navigation"><a href="#home"><L en="Home" ml="ഹോം"/></a><a href="#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="#contact"><L en="Contact" ml="ബന്ധപ്പെടുക"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a></nav>
      <button className="language-toggle" onClick={() => setLang(lang === "en" ? "ml" : "en")} aria-label="Change language"><span className={lang === "en" ? "active" : ""}>EN</span><i/><span className={lang === "ml" ? "active" : ""}>മ</span></button>
    </header>

    <section className="hero minimal-hero" id="home">
      <div className="hero-visual"><img src="https://manakottukavu.nipunmohanan.workers.dev/media/renovation/carousel/12.jpeg" alt="Front view of Manakottukavu temple in Mullurkkara"/><div className="hero-shade"/></div>
      <div className="hero-copy reveal"><p className="eyebrow"><span/><L en="Palayam Devaswom" ml="പാലയം ദേവസ്വം"/></p><h1><L en={<>Manakottukavu<br/>Temple</>} ml={<>മനക്കോട്ടുകാവ്<br/>ക്ഷേത്രം</>}/></h1><p className="hero-lead"><L en="A peaceful Bhagavathi shrine rooted in devotion, tradition, and community." ml="ഭക്തിയുടെയും പാരമ്പര്യത്തിന്റെയും കൂട്ടായ്മയുടെയും ശാന്തമായ ഭഗവതിസന്നിധി."/></p><div className="hero-actions"><a className="hero-primary" href="#offerings"><L en="View offerings" ml="വഴിപാടുകൾ കാണുക"/> <span>→</span></a><a className="hero-secondary" href="/renovation"><L en="Renovation details" ml="പുനരുദ്ധാരണ വിവരങ്ങൾ"/></a></div></div>
      <div className="hero-timings"><div><span><L en="Morning worship" ml="രാവിലെ ദർശനം"/></span><strong><L en="Call for today’s timing" ml="ഇന്നത്തെ സമയം അറിയാൻ വിളിക്കുക"/></strong></div><div><span><L en="Evening worship" ml="വൈകുന്നേരം ദർശനം"/></span><strong><L en="Call for today’s timing" ml="ഇന്നത്തെ സമയം അറിയാൻ വിളിക്കുക"/></strong></div><div><span><L en="Temple contact" ml="ക്ഷേത്ര ബന്ധപ്പെടൽ"/></span><strong><a href="tel:+918129026387">+91 81290 26387</a></strong></div></div>
    </section>

    <section className="offerings-section minimal-offerings" id="offerings">
      <div className="section-heading reveal"><div><p className="section-kicker light"><L en="Vazhipadu" ml="വഴിപാടുകൾ"/></p><h2><L en="Temple offerings" ml="ക്ഷേത്ര വഴിപാടുകൾ"/></h2></div></div>
      <div className="offering-grid">{offerings.map((o, i) => <article className="offering-card reveal" key={o[0]}><div className="offering-top"><span>{String(i+1).padStart(2,"0")}</span><b>{o[1]}</b></div><h3>{lang === "en" ? o[0] : o[1]}</h3>{o[3] && <p>{lang === "en" ? o[3] : o[4]}</p>}<div className="offering-bottom"><strong>{o[2] ?? <L en="Enquire" ml="അന്വേഷിക്കുക"/>}</strong><a href="tel:+918129026387"><L en="Call to book" ml="ബുക്ക് ചെയ്യാൻ വിളിക്കുക"/></a></div></article>)}</div>
    </section>

    <section className="contact-section" id="contact"><div><p className="section-kicker"><L en="Visit & contact" ml="സന്ദർശനവും ബന്ധപ്പെടലും"/></p><h2><L en="Manakottukavu, Mullurkkara" ml="മനക്കോട്ടുകാവ്, മുള്ളൂർക്കര"/></h2><p><L en="For current worship timings, offering bookings, and temple information, please contact the temple directly." ml="നിലവിലെ ദർശനസമയം, വഴിപാട് ബുക്കിംഗ്, ക്ഷേത്രവിവരങ്ങൾ എന്നിവയ്ക്ക് ക്ഷേത്രവുമായി നേരിട്ട് ബന്ധപ്പെടുക."/></p><a className="primary-contact" href="tel:+918129026387">+91 81290 26387</a></div><div className="contact-card"><span><L en="Temple committee" ml="ക്ഷേത്ര സമിതി"/></span><a href="tel:+919745822535"><b>Ajish Kumar</b><small><L en="President" ml="പ്രസിഡന്റ്"/> · 97458 22535</small></a><a href="tel:+918848403303"><b>K. Saji</b><small><L en="Secretary" ml="സെക്രട്ടറി"/> · 88484 03303</small></a><a href="tel:+919441270765"><b>K. A. Ashok Kumar</b><small><L en="Treasurer" ml="ട്രഷറർ"/> · 94412 70765</small></a></div></section>

    <footer><a className="brand" href="#home"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a><p><L en="Palayam Devaswom, Mullurkkara, Thrissur, Kerala." ml="പാലയം ദേവസ്വം, മുള്ളൂർക്കര, തൃശ്ശൂർ, കേരളം."/></p><div><a href="#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a><a href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a></div><small>© {new Date().getFullYear()} Manakottukavu</small></footer>
  </main>;
}
