"use client";

import { useEffect } from "react";

export default function SignOut() {
  useEffect(() => {
    fetch("/cdn-cgi/access/logout", {
      credentials: "include",
      cache: "no-store",
    }).finally(() => window.location.replace("/"));
  }, []);

  return <main className="login-page">
    <section className="login-shell">
      <div className="login-card signout-card">
        <div className="login-symbol" aria-hidden="true">ॐ</div>
        <p className="section-kicker">Temple administration</p>
        <h1>Signing out</h1>
        <p>Your secure administrator session is being closed. You will return to the temple homepage.</p>
      </div>
    </section>
  </main>;
}
