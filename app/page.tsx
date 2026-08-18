"use client";

import { useEffect, useState } from "react";
import { defaultOfferings, formatPrice, type Offering } from "../lib/offerings";

const facebookUrl = "https://www.facebook.com/people/%E0%B4%AE%E0%B4%A8%E0%B4%95%E0%B5%8D%E0%B4%95%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%81%E0%B4%95%E0%B4%BE%E0%B4%B5%E0%B5%8D-%E0%B4%AE%E0%B5%81%E0%B4%B3%E0%B5%8D%E0%B4%B3%E0%B5%82%E0%B5%BC%E0%B4%95%E0%B5%8D%E0%B4%95%E0%B4%B0/100089469818723/";

const legacyOfferings = [
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

type OfferingRow = readonly [string, string, string | null, string?, string?];
const toRows = (items: Offering[]): OfferingRow[] => items.map(item => [item.nameEn, item.nameMl, formatPrice(item.price), item.noteEn || undefined, item.noteMl || undefined]);
const initialOfferings = toRows(defaultOfferings);

export default function Home() {
  const [lang, setLang] = useState<"en" | "ml">("en");
  const [offerings, setOfferings] = useState<OfferingRow[]>(initialOfferings);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingOffering, setBookingOffering] = useState(initialOfferings[0][0]);
  const [devoteeName, setDevoteeName] = useState("");
  const inaugurationEndsAt = new Date("2026-08-23T23:59:59+05:30").getTime();
  const [showInauguration, setShowInauguration] = useState(() => Date.now() <= inaugurationEndsAt);
  useEffect(() => {
    document.documentElement.lang = lang;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .08 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [lang, offerings]);
  useEffect(() => {
    const restoreLanguage = () => {
      const saved = window.localStorage.getItem("manakottukavu-language");
      if (saved === "en" || saved === "ml") setLang(saved);
    };
    restoreLanguage();
    window.addEventListener("storage", restoreLanguage);
    return () => window.removeEventListener("storage", restoreLanguage);
  }, []);
  useEffect(() => {
    fetch("/api/offerings")
      .then(response => response.ok ? response.json() : Promise.reject())
      .then((data: { offerings?: Offering[] }) => data.offerings?.length && setOfferings(toRows(data.offerings)))
      .catch(() => undefined);
  }, []);
  useEffect(() => {
    if (!showInauguration) return;
    const remaining = inaugurationEndsAt - Date.now();
    if (remaining <= 0) { setShowInauguration(false); return; }
    const timeout = window.setTimeout(() => setShowInauguration(false), Math.min(remaining + 1000, 2_147_000_000));
    return () => window.clearTimeout(timeout);
  }, [showInauguration, inaugurationEndsAt]);
  const toggleLanguage = () => setLang(current => {
    const next = current === "en" ? "ml" : "en";
    window.localStorage.setItem("manakottukavu-language", next);
    return next;
  });
  const L = ({ en, ml }: { en: React.ReactNode; ml: React.ReactNode }) => <>{lang === "en" ? en : ml}</>;
  const sendBooking = (event: React.FormEvent) => {
    event.preventDefault();
    const item = offerings.find(offering => offering[0] === bookingOffering) ?? offerings[0];
    const message = lang === "en"
      ? `Namaskaram, I would like to book ${item[0]} (${item[2] ?? "price on enquiry"})${devoteeName ? ` for ${devoteeName}` : ""}. Please share the available date and payment details.`
      : `നമസ്കാരം, ${item[1]} (${item[2] ?? "നിരക്ക് അന്വേഷിക്കുക"})${devoteeName ? ` — ${devoteeName} എന്ന പേരിൽ` : ""} ബുക്ക് ചെയ്യാൻ ആഗ്രഹിക്കുന്നു. ലഭ്യമായ തീയതിയും പണമടയ്ക്കാനുള്ള വിവരങ്ങളും അറിയിക്കുമോ?`;
    window.open(`https://wa.me/918129026387?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return <main className={`language-${lang}`}>
    <header className="site-header home-header">
      <a className="brand" href="#home"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a>
      <nav aria-label="Primary navigation"><a href="#home"><L en="Home" ml="ഹോം"/></a><a href="#event"><L en="Upcoming Event" ml="വരാനിരിക്കുന്ന പരിപാടി"/></a><a href="#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/committee"><L en="Manakottukavu Trust" ml="മനക്കോട്ടുകാവ് ട്രസ്റ്റ്"/></a><a href="#contact"><L en="Contact" ml="ബന്ധപ്പെടുക"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a></nav>
      <div className="header-actions"><button className="language-toggle" onClick={toggleLanguage} aria-label="Change language"><span className={lang === "en" ? "active" : ""}>EN</span><i/><span className={lang === "ml" ? "active" : ""}>മ</span></button><details className="mobile-menu"><summary aria-label={lang === "en" ? "Open menu" : "മെനു തുറക്കുക"}><span/><span/><span/></summary><nav aria-label="Mobile navigation"><a href="#home"><L en="Home" ml="ഹോം"/></a><a href="#event"><L en="Upcoming Event" ml="വരാനിരിക്കുന്ന പരിപാടി"/></a><a href="#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/committee"><L en="Manakottukavu Trust" ml="മനക്കോട്ടുകാവ് ട്രസ്റ്റ്"/></a><a href="#contact"><L en="Contact" ml="ബന്ധപ്പെടുക"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a></nav></details></div>
    </header>

    <section className="hero minimal-hero" id="home">
      <div className="hero-visual"><img src="/temple-hero-nature.png" alt="Manakottukavu temple surrounded by Kerala greenery"/><div className="hero-shade"/></div>
      <div className="hero-copy reveal"><p className="eyebrow"><span/><L en="Paliam Devaswom" ml="പാലിയം ദേവസ്വം"/></p><h1><L en={<>Manakottukavu<br/>Temple</>} ml={<>മനക്കോട്ടുകാവ്<br/>ക്ഷേത്രം</>}/></h1><p className="hero-lead"><L en="A peaceful Bhagavathi shrine rooted in devotion, tradition, and community." ml="ഭക്തിയുടെയും പാരമ്പര്യത്തിന്റെയും കൂട്ടായ്മയുടെയും ശാന്തമായ ഭഗവതിസന്നിധി."/></p></div>
      <div className="hero-timings"><h2><L en="Temple Timing" ml="ക്ഷേത്ര സമയം"/></h2><dl><div><dt><L en="Morning" ml="രാവിലെ"/></dt><dd>05:30 AM - 09:00 AM</dd></div><div><dt><L en="Evening" ml="വൈകുന്നേരം"/></dt><dd>05:30 PM - 07:00 PM</dd></div></dl></div>
    </section>

    <button className="whatsapp-fab" onClick={() => setBookingOpen(true)} aria-label={lang === "en" ? "Book a pooja on WhatsApp" : "വാട്സ്ആപ്പിൽ പൂജ ബുക്ക് ചെയ്യുക"}><span className="wa-mark">WA</span><b><L en="Book Pooja" ml="പൂജ ബുക്ക് ചെയ്യുക"/></b></button>
    {bookingOpen && <div className="booking-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && setBookingOpen(false)}><section className="booking-dialog" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="booking-close" onClick={() => setBookingOpen(false)} aria-label="Close">×</button><p className="section-kicker"><L en="WhatsApp booking" ml="വാട്സ്ആപ്പ് ബുക്കിംഗ്"/></p><h2 id="booking-title"><L en="Book your pooja" ml="പൂജ ബുക്ക് ചെയ്യുക"/></h2><p><L en="Choose an offering and send the prepared request directly to the temple’s WhatsApp." ml="ഒരു വഴിപാട് തിരഞ്ഞെടുത്ത് തയ്യാറാക്കിയ അഭ്യർത്ഥന ക്ഷേത്രത്തിന്റെ വാട്സ്ആപ്പിലേക്ക് നേരിട്ട് അയയ്ക്കുക."/></p><form onSubmit={sendBooking}><label><span><L en="Offering" ml="വഴിപാട്"/></span><select value={bookingOffering} onChange={event => setBookingOffering(event.target.value)}>{offerings.map(offering => <option value={offering[0]} key={offering[0]}>{lang === "en" ? offering[0] : offering[1]} · {offering[2] ?? (lang === "en" ? "Enquire" : "അന്വേഷിക്കുക")}</option>)}</select></label><label><span><L en="Devotee name & star (optional)" ml="ഭക്തന്റെ പേരും നക്ഷത്രവും (ഐച്ഛികം)"/></span><input value={devoteeName} onChange={event => setDevoteeName(event.target.value)} placeholder={lang === "en" ? "Name and birth star for the offering" : "വഴിപാടിനുള്ള പേരും നക്ഷത്രവും"}/></label><button className="booking-submit" type="submit"><span className="wa-mark small">WA</span><L en="Continue on WhatsApp" ml="വാട്സ്ആപ്പിൽ തുടരുക"/></button></form><small><L en="WhatsApp: +91 81290 26387" ml="വാട്സ്ആപ്പ്: +91 81290 26387"/></small></section></div>}

    <section className="upcoming-event reveal" id="event"><div className="event-intro"><p className="section-kicker"><L en="Upcoming event" ml="വരാനിരിക്കുന്ന പരിപാടി"/></p><h2><L en="Vishu Gift Draw" ml="വിഷു സമ്മാന നറുക്കെടുപ്പ്"/></h2><p><L en="Support the Manakottukavu renovation and join a festive draw filled with wonderful gifts." ml="മനക്കോട്ടുകാവ് പുനരുദ്ധാരണ പ്രവർത്തനങ്ങളെ സഹായിക്കൂ; ആകർഷകമായ സമ്മാനങ്ങളോടെയുള്ള വിഷു നറുക്കെടുപ്പിൽ പങ്കാളിയാകൂ."/></p>{showInauguration && <article className="event-inauguration"><span><L en="Inauguration" ml="ഉദ്ഘാടനം"/></span><h3><L en="Vishu Gift Coupon inauguration" ml="വിഷു സമ്മാന കൂപ്പൺ ഉദ്ഘാടനം"/></h3><dl><div><dt><L en="Date" ml="തീയതി"/></dt><dd><L en="Sunday, 23 August 2026" ml="2026 ഓഗസ്റ്റ് 23, ഞായറാഴ്ച"/></dd></div><div><dt><L en="Time" ml="സമയം"/></dt><dd><L en="8:30 AM" ml="രാവിലെ 8:30"/></dd></div><div><dt><L en="Venue" ml="വേദി"/></dt><dd><L en="Manakottukavu Sannidhi" ml="മനക്കോട്ടുകാവ് സന്നിധി"/></dd></div></dl><div className="event-programme"><div><span><L en="Devotional programme · 8:00 AM" ml="ഭക്തിപരിപാടി · രാവിലെ 8 മണിക്ക്"/></span><b><L en="Lalitha Sahasranamam" ml="ലളിത സഹസ്രനാമം"/></b><small><L en="Presented by Mathru Samithi" ml="മാതൃസമിതി അവതരിപ്പിക്കുന്നു"/></small></div><div className="event-presence"><img src="/committee/tantri.jpg" alt="Sri Balakrishna Pai"/><div><span><L en="Honoured presence" ml="മഹനീയ സാന്നിധ്യം"/></span><b><L en="Sri Balakrishna Pai" ml="ശ്രീ ബാലകൃഷ്ണ പൈ"/></b><small><L en="Kavu Acharyan" ml="കാവ് ആചാര്യൻ"/></small></div></div></div><p><L en="Everyone is warmly welcome." ml="ഏവരെയും സ്നേഹത്തോടെ സ്വാഗതം ചെയ്യുന്നു."/></p></article>}</div><div className="event-details"><div className="event-price"><small><L en="Gift Coupon" ml="സമ്മാന കൂപ്പൺ"/></small><strong>₹200</strong></div><dl><div><dt><L en="Draw" ml="നറുക്കെടുപ്പ്"/></dt><dd><L en="15 April 2027 · 3:00 PM" ml="2027 ഏപ്രിൽ 15 · വൈകിട്ട് 3 മണി"/></dd></div><div><dt><L en="Venue" ml="വേദി"/></dt><dd><L en="Manakottukavu Sannidhi" ml="മനക്കോട്ടുകാവ് സന്നിധി"/></dd></div></dl><a className="event-link" href="/gift-coupon"><L en="Explore the event" ml="പരിപാടിയുടെ വിശദാംശങ്ങൾ"/><span>→</span></a></div></section>

    <section className="offerings-section minimal-offerings" id="offerings">
      <div className="section-heading reveal"><div><p className="section-kicker light"><L en="Vazhipadu" ml="വഴിപാടുകൾ"/></p><h2><L en="Temple offerings" ml="ക്ഷേത്ര വഴിപാടുകൾ"/></h2></div></div>
      <div className="offering-grid">{offerings.map((o, i) => <article className="offering-card reveal" key={o[0]}><div className="offering-top"><span>{String(i+1).padStart(2,"0")}</span><b>{o[1]}</b></div><h3>{lang === "en" ? o[0] : o[1]}</h3>{o[3] && <p>{lang === "en" ? o[3] : o[4]}</p>}<div className="offering-bottom"><strong>{o[2] ?? <L en="Enquire" ml="അന്വേഷിക്കുക"/>}</strong><button className="offering-book-button" type="button" onClick={() => { setBookingOffering(o[0]); setBookingOpen(true); }}><L en="Book" ml="ബുക്ക് ചെയ്യുക"/></button></div></article>)}</div>
    </section>

    <section className="contact-section" id="contact"><div><p className="section-kicker"><L en="Contact" ml="ബന്ധപ്പെടുക"/></p><h2><L en="Manakottukavu, Mullurkkara" ml="മനക്കോട്ടുകാവ്, മുള്ളൂർക്കര"/></h2><a className="primary-contact" href="tel:+918129026387">+91 81290 26387</a></div><div className="contact-card"><span><L en="Manakottukavu Trust" ml="മനക്കോട്ടുകാവ് ട്രസ്റ്റ്"/></span><a href="tel:+919745822535"><b><L en="Ajesh Kumar" ml="അജേഷ് കുമാർ"/></b><small><L en="President" ml="പ്രസിഡന്റ്"/> · 97458 22535</small></a><a href="tel:+918848403303"><b><L en="K. Ravi" ml="കെ. രവി"/></b><small><L en="Secretary" ml="സെക്രട്ടറി"/> · 88484 03303</small></a><a href="tel:+919441270765"><b><L en="K. E. Ashok Kumar" ml="കെ. ഇ. അശോക് കുമാർ"/></b><small><L en="Treasurer" ml="ട്രഷറർ"/> · 94412 70765</small></a></div></section>

    <footer><a className="brand" href="#home"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a><div><a href="#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/committee"><L en="Manakottukavu Trust" ml="മനക്കോട്ടുകാവ് ട്രസ്റ്റ്"/></a><a href="/renovation"><L en="Renovation" ml="പുനരുദ്ധാരണം"/></a><a href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a><a className="admin-login-link" href="/temple-login"><L en="Admin Login" ml="അഡ്മിൻ ലോഗിൻ"/></a></div><small className="footer-bottom"><span>© {new Date().getFullYear()} Manakottukavu Trust</span><span>Reg. No. 28/IV/2025</span><span>Site managed by Nipun Mohan</span></small></footer>
  </main>;
}
