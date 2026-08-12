"use client";

import { useEffect, useMemo, useState } from "react";
import type { Offering } from "../../lib/offerings";

export default function AdminOfferings() {
  const [items, setItems] = useState<Offering[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Loading offering rates…");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/offerings", { cache: "no-store" }).then(async response => {
      const data = await response.json() as { offerings?: Offering[]; error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to open the dashboard.");
      setItems(data.offerings || []);
      setStatus("");
    }).catch(error => setStatus(error instanceof Error ? error.message : "Unable to load offerings."));
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return term ? items.filter(item => `${item.nameEn} ${item.nameMl}`.toLocaleLowerCase().includes(term)) : items;
  }, [items, query]);

  const setPrice = (id: number, value: string) => setItems(current => current.map(item => item.id === id ? {
    ...item, price: value === "" ? null : Math.max(0, Number.parseInt(value, 10) || 0),
  } : item));

  const save = async () => {
    setSaving(true); setStatus("Saving changes…");
    try {
      const response = await fetch("/api/admin/offerings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ offerings: items }) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "Save failed.");
      setStatus("All offering prices are live.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Save failed."); }
    finally { setSaving(false); }
  };

  return <main className="admin-page">
    <header className="site-header subpage-header">
      <a className="brand" href="/"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a>
      <nav><a href="/">View website</a><a aria-current="page" href="/admin">Offering Admin</a></nav>
      <a className="admin-exit" href="/signout">Sign out</a>
    </header>
    <section className="admin-hero"><p className="section-kicker">Temple administration</p><h1>Offering prices</h1><p>Update a rate below and publish it to the website. Blank prices will appear as “Enquire”.</p></section>
    <section className="admin-workspace">
      <div className="admin-toolbar"><label><span>Find an offering</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search English or Malayalam"/></label><div><small>{items.length} offerings</small><button type="button" onClick={save} disabled={saving || !items.length}>{saving ? "Saving…" : "Save & publish"}</button></div></div>
      {status && <p className={`admin-status ${status.includes("live") ? "success" : ""}`} role="status">{status}</p>}
      <div className="admin-list">{filtered.map(item => <article className="admin-row" key={item.id}><span className="admin-number">{String(item.sortOrder).padStart(2,"0")}</span><div><h2>{item.nameEn}</h2><p lang="ml">{item.nameMl}</p></div><label><span>Price (₹)</span><input inputMode="numeric" min="0" step="1" type="number" value={item.price ?? ""} onChange={event => setPrice(item.id, event.target.value)} placeholder="Enquire"/></label></article>)}</div>
    </section>
    <footer className="admin-footer"><span>© {new Date().getFullYear()} Manakottukavu</span><span>Secure administrator area</span></footer>
  </main>;
}
