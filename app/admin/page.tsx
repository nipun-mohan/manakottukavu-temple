"use client";

import { useEffect, useMemo, useState } from "react";
import type { Offering } from "../../lib/offerings";
import type { RenovationMedia } from "../../lib/renovation-media";

const mediaHost = "https://manakottukavu.nipunmohanan.workers.dev/media";
const allBuiltInMedia = Array.from({ length: 18 }, (_, index) => ({ id: `built-in-${index + 1}`, url: `${mediaHost}/renovation/carousel/${String(index + 1).padStart(2, "0")}.jpeg`, captionEn: "", captionMl: "", createdAt: "" }));

export default function AdminOfferings() {
  const [items, setItems] = useState<Offering[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Loading offering rates…");
  const [saving, setSaving] = useState(false);
  const [offeringsChanged, setOfferingsChanged] = useState(false);
  const [media, setMedia] = useState<RenovationMedia[]>([]);
  const [mediaStatus, setMediaStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [removing, setRemoving] = useState(false);
  const [builtInMedia, setBuiltInMedia] = useState<RenovationMedia[]>(allBuiltInMedia);

  useEffect(() => { if (!mediaStatus || (!mediaStatus.includes("added") && !mediaStatus.includes("removed"))) return; const timeout = window.setTimeout(() => setMediaStatus(""), 4000); return () => window.clearTimeout(timeout); }, [mediaStatus]);

  useEffect(() => {
    fetch("/api/admin/offerings", { cache: "no-store" }).then(async response => {
      const data = await response.json() as { offerings?: Offering[]; error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to open the dashboard.");
      setItems(data.offerings || []);
      setStatus("");
    }).catch(error => setStatus(error instanceof Error ? error.message : "Unable to load offerings."));
  }, []);

  const readJson = async <T,>(response: Response): Promise<T> => {
    if ((response.headers.get("content-type") || "").includes("application/json")) return response.json() as Promise<T>;
    const message = (await response.text()).trim();
    throw new Error(response.status === 413 || message.includes("Payload Too Large") ? "An image is too large. Choose images smaller than 8 MB each." : message || "The server returned an unexpected response.");
  };
  const loadMedia = async () => { const response = await fetch("/api/renovation-media", { cache: "no-store" }); const data = await readJson<{ media?: RenovationMedia[]; hiddenBuiltInIds?: string[]; error?: string }>(response); if (!response.ok) throw new Error(data.error || "Unable to load renovation images."); const uploaded = data.media || []; const builtIn = allBuiltInMedia.filter(item => !(data.hiddenBuiltInIds || []).includes(item.id)); setMedia(uploaded); setBuiltInMedia(builtIn); setSelectedMedia(current => current.filter(id => [...uploaded, ...builtIn].some(item => item.id === id))); };
  useEffect(() => { loadMedia().catch(() => setMediaStatus("Unable to load renovation images.")); }, []);
  const uploadMedia = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = event.currentTarget; const formData = new FormData(form); const files = formData.getAll("images").filter((value): value is File => value instanceof File && value.size > 0);
    if (!files.length) { setMediaStatus("Choose at least one image."); return; }
    const invalid = files.find(file => file.size > 8 * 1024 * 1024);
    if (invalid) { setMediaStatus(`${invalid.name} is too large. Choose images smaller than 8 MB each.`); return; }
    setUploading(true); setMediaStatus(`Uploading ${files.length} image${files.length === 1 ? "" : "s"}…`);
    try { for (const file of files) { const itemData = new FormData(); itemData.set("image", file); itemData.set("captionEn", String(formData.get("captionEn") || "")); itemData.set("captionMl", String(formData.get("captionMl") || "")); const response = await fetch("/api/admin/renovation-media", { method: "POST", body: itemData }); const data = await readJson<{ error?: string }>(response); if (!response.ok) throw new Error(data.error || `Upload failed for ${file.name}.`); } form.reset(); await loadMedia(); setMediaStatus(`${files.length} image${files.length === 1 ? "" : "s"} added to the renovation gallery.`); }
    catch (error) { setMediaStatus(error instanceof Error ? error.message : "Upload failed."); } finally { setUploading(false); }
  };
  const toggleMedia = (id: string) => setSelectedMedia(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
  const removeSelectedMedia = async () => { if (!selectedMedia.length || !window.confirm(`Remove ${selectedMedia.length} selected image${selectedMedia.length === 1 ? "" : "s"}?`)) return; setRemoving(true); setMediaStatus("Removing selected images…"); try { for (const id of selectedMedia) { const response = await fetch(`/api/admin/renovation-media/${id}`, { method: "DELETE" }); const data = await readJson<{ error?: string }>(response); if (!response.ok) throw new Error(data.error || "Unable to remove an image."); } const count = selectedMedia.length; setSelectedMedia([]); await loadMedia(); setMediaStatus(`${count} image${count === 1 ? "" : "s"} removed.`); } catch (error) { setMediaStatus(error instanceof Error ? error.message : "Unable to remove selected images."); } finally { setRemoving(false); } };

  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return term ? items.filter(item => `${item.nameEn} ${item.nameMl}`.toLocaleLowerCase().includes(term)) : items;
  }, [items, query]);

  const setPrice = (id: number, value: string) => {
    setItems(current => current.map(item => item.id === id ? {
      ...item, price: value === "" ? null : Math.max(0, Number.parseInt(value, 10) || 0),
    } : item));
    setOfferingsChanged(true);
  };

  const addOffering = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nameEn = String(data.get("nameEn") || "").trim();
    const nameMl = String(data.get("nameMl") || "").trim();
    const priceText = String(data.get("price") || "").trim();
    if (!nameEn || !nameMl) { setStatus("Enter both English and Malayalam offering names."); return; }
    setItems(current => [...current, {
      id: -Date.now(), nameEn, nameMl, price: priceText === "" ? null : Math.max(0, Number.parseInt(priceText, 10) || 0),
      noteEn: String(data.get("noteEn") || "").trim(), noteMl: String(data.get("noteMl") || "").trim(), sortOrder: current.length + 1,
    }]);
    form.reset();
    setOfferingsChanged(true);
    setStatus("Offering added. Select Save & publish to make it live.");
  };

  const removeOffering = async (id: number, name: string) => {
    if (!window.confirm(`Remove “${name}” from the offering list?`)) return;
    const updatedItems = items.filter(item => item.id !== id).map((item, index) => ({ ...item, sortOrder: index + 1 }));
    if (!updatedItems.length) { setStatus("At least one offering must remain in the list."); return; }
    if (id < 1) {
      setItems(updatedItems);
      setStatus("The unsaved offering was removed.");
      return;
    }
    setSaving(true); setStatus("Removing offering…");
    try {
      const response = await fetch(`/api/admin/offerings?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to remove the offering.");
      setItems(updatedItems);
      setStatus("Offering removed. The updated list is live.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to remove the offering."); }
    finally { setSaving(false); }
  };

  const save = async () => {
    setSaving(true); setStatus("Saving changes…");
    try {
      const response = await fetch("/api/admin/offerings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ offerings: items }) });
      const data = await response.json() as { offerings?: Offering[]; error?: string };
      if (!response.ok) throw new Error(data.error || "Save failed.");
      if (data.offerings) setItems(data.offerings);
      setOfferingsChanged(false);
      setStatus("The offering list is live.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Save failed."); }
    finally { setSaving(false); }
  };

  return <main className="admin-page">
    <header className="site-header subpage-header">
      <a className="brand" href="/"><span className="brand-mark" aria-hidden="true">ॐ</span><span><b>MANAKOTTUKAVU</b><small>മനക്കോട്ടുകാവ്</small></span></a>
      <nav><a href="/">View website</a><a href="#offerings-admin">Offerings</a><a href="#renovation-images">Renovation images</a></nav>
      <a className="admin-exit" href="/signout">Sign out</a>
    </header>
    <section className="admin-hero"><p className="section-kicker">Temple administration</p><h1>Offering prices</h1><p>Update a rate below and publish it to the website. Blank prices will appear as “Enquire”.</p></section>
    <section className="admin-workspace" id="offerings-admin">
      <form className="admin-add-offering" onSubmit={addOffering}>
        <div className="admin-add-heading"><p className="section-kicker">New offering</p><h2>Add an offering</h2></div>
        <div className="admin-add-grid">
          <label><span>English name</span><input name="nameEn" maxLength={120} required placeholder="Offering name"/></label>
          <label><span>Malayalam name</span><input name="nameMl" maxLength={120} required lang="ml" placeholder="വഴിപാട് പേര്"/></label>
          <label><span>Price (₹)</span><input name="price" inputMode="numeric" min="0" step="1" type="number" placeholder="Enquire"/></label>
          <label><span>English note (optional)</span><input name="noteEn" maxLength={180} placeholder="Special instruction"/></label>
          <label><span>Malayalam note (optional)</span><input name="noteMl" maxLength={180} lang="ml" placeholder="പ്രത്യേക നിർദ്ദേശം"/></label>
          <button type="submit">Add offering</button>
        </div>
      </form>
      <div className="admin-toolbar"><label><span>Find an offering</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search English or Malayalam"/></label><div><small>{items.length} offerings</small><button type="button" onClick={save} disabled={saving || !items.length || !offeringsChanged}>{saving ? "Saving…" : "Save & publish"}</button></div></div>
      {status && <p className={`admin-status ${status.includes("live") ? "success" : ""}`} role="status">{status}</p>}
      <div className="admin-list">{filtered.map(item => <article className="admin-row" key={item.id}><span className="admin-number">{String(item.sortOrder).padStart(2,"0")}</span><div><h2>{item.nameEn}</h2><p lang="ml">{item.nameMl}</p></div><label><span>Price (₹)</span><input inputMode="numeric" min="0" step="1" type="number" value={item.price ?? ""} onChange={event => setPrice(item.id, event.target.value)} placeholder="Enquire"/></label><button className="admin-remove-offering" type="button" disabled={saving} onClick={() => removeOffering(item.id, item.nameEn)}>{saving ? "Please wait…" : "Remove"}</button></article>)}</div>
    </section>
    <section className="admin-media" id="renovation-images">
      <div className="admin-media-heading"><p className="section-kicker">Renovation gallery</p><h2>Add or remove renovation images</h2><p>Select one or more JPG, PNG, or WebP photographs smaller than 8 MB each. Select existing images below to remove several at once.</p></div>
      <form className="admin-upload" onSubmit={uploadMedia}><label><span>Choose one or more images</span><input name="images" type="file" accept="image/jpeg,image/png,image/webp" multiple required/></label><label><span>English caption for selected images (optional)</span><input name="captionEn" maxLength={160} placeholder="Renovation progress"/></label><label><span>Malayalam caption for selected images (optional)</span><input name="captionMl" maxLength={160} lang="ml" placeholder="പുനരുദ്ധാരണ പുരോഗതി"/></label><button disabled={uploading} type="submit">{uploading ? "Uploading images…" : "Add selected images"}</button></form>
      {mediaStatus && <p className={`admin-status ${mediaStatus.includes("added") || mediaStatus.includes("removed") ? "success" : ""}`} role="status">{mediaStatus}</p>}
      {(media.length + builtInMedia.length) > 0 && <div className="admin-media-actions"><label><input type="checkbox" checked={selectedMedia.length === media.length + builtInMedia.length} onChange={() => setSelectedMedia(selectedMedia.length === media.length + builtInMedia.length ? [] : [...media, ...builtInMedia].map(item => item.id))}/> Select all</label><span>{selectedMedia.length} selected</span><button type="button" disabled={!selectedMedia.length || removing} onClick={removeSelectedMedia}>{removing ? "Removing…" : "Remove selected images"}</button></div>}
      <div className="admin-media-scroll"><div className="admin-media-grid">{[...media, ...builtInMedia].map((item, index) => <article className={selectedMedia.includes(item.id) ? "selected" : ""} key={item.id}><label className="admin-media-select"><input type="checkbox" checked={selectedMedia.includes(item.id)} onChange={() => toggleMedia(item.id)}/><span>Select</span></label><img src={item.url} alt={item.captionEn || `Renovation photograph ${index + 1}`}/>{(item.captionEn || item.captionMl) && <div>{item.captionEn && <b>{item.captionEn}</b>}{item.captionMl && <p lang="ml">{item.captionMl}</p>}</div>}</article>)}</div></div>
      {!media.length && !mediaStatus && <p className="admin-empty">No administrator-uploaded images yet.</p>}
    </section>
    <footer className="admin-footer"><span>© {new Date().getFullYear()} Manakottukavu</span><span>Secure administrator area</span></footer>
  </main>;
}
