"use client";

import { useEffect, useState } from "react";
import type { RenovationMedia } from "../../lib/renovation-media";

const mediaHost = "https://manakottukavu.nipunmohanan.workers.dev/media";
const originalSlides = Array.from({ length: 18 }, (_, i) => `${mediaHost}/renovation/carousel/${String(i + 1).padStart(2, "0")}.jpeg`);
const documentPages = Array.from({ length: 11 }, (_, i) => `${mediaHost}/renovation/document/page-${String(i + 1).padStart(2, "0")}.jpg`);

const sponsorships = [
  ["Karinkal pillar", "കരിങ്കൽ തൂൺ", "₹25,000"], ["Door", "പുനർദ്വാരം", "₹45,000"], ["Sopanam", "സോപാനം", "₹35,000"],
  ["Roof beam / Vaarli", "ഓട് വാർളി", "₹15,500"], ["Stone", "കല്ല്", "₹25,000"], ["Wall stone", "ഭിത്തിക്കല്ല്", "₹5,000"],
  ["Floor stone", "തറ വിരിപ്പുകല്ല്", "₹5,000"], ["Utharam", "ഉത്തരം", "₹15,000"], ["Roof tile with battens", "കഴുക്കോൽ (കൊത്തുപണിയോടുകൂടി)", "₹12,000"],
  ["Mukhappu", "മുഖപ്പ്", "₹1,00,000"], ["Exterior wall", "പുറമതിൽ", "₹25,000"],
];

export default function RenovationPage() {
  const [lang, setLang] = useState<"en" | "ml">("en");
  const [slide, setSlide] = useState(0);
  const [openPage, setOpenPage] = useState<number | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<RenovationMedia[]>([]);
  const slides = [...uploadedMedia.map(item => item.url), ...originalSlides];
  useEffect(() => { fetch("/api/renovation-media", { cache: "no-store" }).then(response => response.json()).then((data: { media?: RenovationMedia[] }) => setUploadedMedia(data.media || [])).catch(() => {}); }, []);
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
  useEffect(() => { const id = window.setInterval(() => setSlide(s => (s + 1) % slides.length), 4800); return () => window.clearInterval(id); }, [slides.length]);
  useEffect(() => {
    if (openPage === null) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpenPage(null);
    document.body.classList.add("booklet-open");
    window.addEventListener("keydown", close);
    return () => { document.body.classList.remove("booklet-open"); window.removeEventListener("keydown", close); };
  }, [openPage]);
  const L = ({ en, ml }: { en: React.ReactNode; ml: React.ReactNode }) => <>{lang === "en" ? en : ml}</>;

  return <main className={`renovation-page language-${lang}`}>
    <header className="site-header subpage-header"><a className="brand" href="/"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a><nav aria-label="Primary navigation"><a href="/"><L en="Home" ml="ഹോം"/></a><a href="/#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/committee"><L en="Temple Committee" ml="ക്ഷേത്ര കമ്മിറ്റി"/></a><a href="#details"><L en="Project details" ml="പദ്ധതി വിവരങ്ങൾ"/></a><a href="#document"><L en="Project Booklet" ml="പദ്ധതി പുസ്തിക"/></a></nav><div className="header-actions"><button className="language-toggle" onClick={toggleLanguage} aria-label="Change language"><span className={lang === "en" ? "active" : ""}>EN</span><i/><span className={lang === "ml" ? "active" : ""}>മ</span></button><details className="mobile-menu"><summary aria-label={lang === "en" ? "Open menu" : "മെനു തുറക്കുക"}><span/><span/><span/></summary><nav aria-label="Mobile navigation"><a href="/"><L en="Home" ml="ഹോം"/></a><a href="/#offerings"><L en="Offerings" ml="വഴിപാടുകൾ"/></a><a href="/committee"><L en="Temple Committee" ml="ക്ഷേത്ര കമ്മിറ്റി"/></a><a href="#details"><L en="Project details" ml="പദ്ധതി വിവരങ്ങൾ"/></a><a href="#document"><L en="Project Booklet" ml="പദ്ധതി പുസ്തിക"/></a></nav></details></div></header>

    <section className="renovation-hero"><div className="renovation-hero-copy"><p className="eyebrow"><span/><L en="Manakottukavu Trust" ml="മനക്കോട്ടുകാവ് ട്രസ്റ്റ്"/></p><h1><L en={<>Temple renovation<br/>details</>} ml={<>ക്ഷേത്ര പുനരുദ്ധാരണ<br/>വിവരങ്ങൾ</>}/></h1></div><div className="renovation-hero-media"><img src={`${mediaHost}/gallery/renewal-model.jpg`} alt="Proposed Manakottukavu temple model"/></div></section>

    <section className="fade-carousel" aria-label="Renovation progress photographs"><div className="carousel-stage">{slides.map((src, i) => <img key={src} src={src} alt={`Manakottukavu renovation photograph ${i+1}`} className={i === slide ? "active" : ""}/>)}</div><div className="carousel-caption"><div><span>{String(slide+1).padStart(2,"0")} / {slides.length}</span><b><L en="The temple and its continuing restoration journey" ml="ക്ഷേത്രവും തുടരുന്ന പുനരുദ്ധാരണ യാത്രയും"/></b></div><div className="carousel-controls"><button onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} aria-label="Previous image">←</button><button onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Next image">→</button></div></div></section>

    <section className="renovation-details" id="details"><div className="details-intro"><p className="section-kicker"><L en="Project overview" ml="പദ്ധതി അവലോകനം"/></p><h2><L en="Preserving a living sacred tradition" ml="ജീവിക്കുന്ന ദേവപാരമ്പര്യത്തിന്റെ സംരക്ഷണം"/></h2></div><div className="details-copy"><p><L en="Manakottukavu is an ancient sacred grove and Bhagavathi shrine at Mullurkkara under Paliam Devaswom. The temple tradition centres on Bhairavi, Kalabhairava and associated guardian deities. The document traces the shrine’s long connection with the locality, traditional worship, sacred trees, and regional history." ml="പാലിയം ദേവസ്വത്തിന് കീഴിലുള്ള മുള്ളൂർക്കരയിലെ പുരാതന കാവും ഭഗവതിസന്നിധിയുമാണ് മനക്കോട്ടുകാവ്. ഭൈരവി, കാലഭൈരവൻ, ഉപദേവതകൾ എന്നിവരുടെ ആരാധനാപാരമ്പര്യവും ദേശചരിത്രവുമായുള്ള ദീർഘബന്ധവും രേഖയിൽ വിവരിക്കുന്നു."/></p><p><L en="An Ashtamangala Prasnam identified the need to restore the shrine according to traditional principles. The project includes rebuilding and strengthening the sanctum, stone and timber work, roof, sopanam, pradakshina paths, compound structures, and associated sacred spaces while retaining the temple’s Kerala character." ml="അഷ്ടമംഗല പ്രശ്നനിർദേശപ്രകാരം ശ്രീകോവിൽ, കൽ-മരപ്പണികൾ, മേൽക്കൂര, സോപാനം, പ്രദക്ഷിണവഴികൾ, ചുറ്റുമതിൽ, അനുബന്ധ പുണ്യസ്ഥാനങ്ങൾ എന്നിവ കേരളീയ ക്ഷേത്രതനിമ നിലനിർത്തി പുനർനിർമ്മിക്കുകയും ശക്തിപ്പെടുത്തുകയും ചെയ്യുന്നതാണ് പദ്ധതി."/></p><p><L en="The Manakottukavu Trust was registered in 2025 to coordinate the work. Ritual observances and preparatory ceremonies were conducted under the guidance of temple priests and traditional experts, and restoration work has progressed with the participation of devotees and local residents." ml="പ്രവർത്തനങ്ങൾ ഏകോപിപ്പിക്കാൻ 2025-ൽ മനക്കോട്ടുകാവ് ട്രസ്റ്റ് രജിസ്റ്റർ ചെയ്തു. തന്ത്രി-ആചാര്യന്മാരുടെ മാർഗ്ഗനിർദേശത്തിൽ ആവശ്യമായ കർമ്മങ്ങളും ഒരുക്കങ്ങളും നടത്തി, ഭക്തജനങ്ങളുടെയും നാട്ടുകാരുടെയും പങ്കാളിത്തത്തോടെ പുനരുദ്ധാരണ പ്രവൃത്തികൾ പുരോഗമിക്കുന്നു."/></p></div></section>

    <section className="sponsorship-section"><div><p className="section-kicker"><L en="Support the work" ml="പുനരുദ്ധാരണ സഹായം"/></p><h2><L en="Sponsorship opportunities" ml="സ്പോൺസർഷിപ്പ് അവസരങ്ങൾ"/></h2></div><div className="sponsorship-list">{sponsorships.map((item,i)=><div key={item[0]}><span>{String(i+1).padStart(2,"0")}</span><b>{lang === "en" ? item[0] : item[1]}</b><strong>{item[2]}</strong></div>)}</div></section>

    <section className="bank-section"><div><p className="section-kicker"><L en="Official contribution account" ml="ഔദ്യോഗിക സംഭാവനാ അക്കൗണ്ട്"/></p><h2>MANAKKOTTUKAVU TRUST</h2><p><L en="Please verify the beneficiary name and account details before completing a transfer." ml="പണം അയയ്ക്കുന്നതിനുമുമ്പ് ഗുണഭോക്താവിന്റെ പേരും അക്കൗണ്ട് വിവരങ്ങളും സ്ഥിരീകരിക്കുക."/></p></div><dl><div><dt>Bank</dt><dd>Canara Bank</dd></div><div><dt>Branch</dt><dd>Mullurkkara</dd></div><div><dt>Account No.</dt><dd>120034790166</dd></div><div><dt>IFSC</dt><dd>CNRB0004213</dd></div><div><dt>SWIFT</dt><dd>CNRBINBBFD</dd></div><div><dt>Contact</dt><dd><a href="tel:+918129026387">81290 26387</a></dd></div></dl></section>

    <section className="committee-section"><h2><L en="Official contacts" ml="ഔദ്യോഗിക ബന്ധപ്പെടൽ"/></h2><div><a href="tel:+919745822535"><span><L en="President" ml="പ്രസിഡന്റ്"/></span><b><L en="Ajesh Kumar" ml="അജേഷ് കുമാർ"/></b><strong>97458 22535</strong></a><a href="tel:+918848403303"><span><L en="Secretary" ml="സെക്രട്ടറി"/></span><b><L en="K. Ravi" ml="കെ. രവി"/></b><strong>88484 03303</strong></a><a href="tel:+919441270765"><span><L en="Treasurer" ml="ട്രഷറർ"/></span><b><L en="K. E. Ashok Kumar" ml="കെ. ഇ. അശോക് കുമാർ"/></b><strong>94412 70765</strong></a></div></section>

    <section className="document-section" id="document"><div className="document-heading"><h2><L en="Renovation project booklet" ml="പുനരുദ്ധാരണ പദ്ധതി രേഖ"/></h2></div><div className="document-pages">{documentPages.map((src,i)=><button className="document-page" key={src} onClick={() => setOpenPage(i)} aria-label={lang === "en" ? `Open booklet page ${i+1}` : `പുസ്തികയുടെ പേജ് ${i+1} തുറക്കുക`}><img src={src} alt={`Manakottukavu renovation booklet page ${i+1}`} loading="lazy"/><span><L en={`Page ${i+1} · Click to read`} ml={`പേജ് ${i+1} · വായിക്കാൻ ക്ലിക്ക് ചെയ്യുക`}/></span></button>)}</div></section>

    {openPage !== null && <div className="booklet-viewer" role="dialog" aria-modal="true" aria-label={lang === "en" ? `Booklet page ${openPage+1}` : `പുസ്തികയുടെ പേജ് ${openPage+1}`} onClick={() => setOpenPage(null)}><div className="booklet-viewer-inner" onClick={event => event.stopPropagation()}><button className="booklet-close" onClick={() => setOpenPage(null)} aria-label="Close booklet">×</button><img src={documentPages[openPage]} alt={`Manakottukavu renovation booklet page ${openPage+1}`}/><div className="booklet-controls"><button onClick={() => setOpenPage((openPage - 1 + documentPages.length) % documentPages.length)} aria-label="Previous booklet page">←</button><span><L en={`Page ${openPage+1} of ${documentPages.length}`} ml={`പേജ് ${openPage+1} / ${documentPages.length}`}/></span><button onClick={() => setOpenPage((openPage + 1) % documentPages.length)} aria-label="Next booklet page">→</button></div></div></div>}

    <footer><a className="brand" href="/"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a><p><L en="Paliam Devaswom, Mullurkkara, Thrissur, Kerala." ml="പാലിയം ദേവസ്വം, മുള്ളൂർക്കര, തൃശ്ശൂർ, കേരളം."/></p><div><a href="/">Home</a><a href="/#offerings">Offerings</a><a href="tel:+918129026387">Contact</a></div><small className="footer-bottom"><span>© {new Date().getFullYear()} Manakottukavu Trust</span><span>Site managed by Nipun Mohan</span></small></footer>
  </main>;
}
