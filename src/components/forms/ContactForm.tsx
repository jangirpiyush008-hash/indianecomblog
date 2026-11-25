"use client";

import { useState } from "react";

const topics = ["Correction / error report", "Outdated price or broken link", "Story suggestion", "Brand partnership", "Other"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: document.referrer || undefined }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div className="p-6 border border-line bg-cream-100" role="status">
        <p className="font-editorial text-2xl font-semibold mb-2">Thanks — message received.</p>
        <p className="text-ink-60">We read every message and reply by email where a reply is needed.</p>
      </div>
    );
  }

  const field = "w-full px-4 py-3 border border-line bg-paper focus:border-ink focus:outline-none";
  const label = "block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 mb-2";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="c-name" className={label}>Your name</label>
          <input id="c-name" name="name" type="text" required maxLength={120} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="c-email" className={label}>Email</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="c-topic" className={label}>Topic</label>
        <select id="c-topic" name="topic" className={field}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="c-message" className={label}>Message</label>
        <textarea id="c-message" name="message" required minLength={5} maxLength={5000} rows={6} className={field} />
      </div>
      {/* Honeypot field, hidden from people */}
      <div aria-hidden className="hidden">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="px-8 py-4 bg-ink text-cream font-medium hover:bg-accent transition disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
      <p className="text-xs text-ink-40">
        We use your email only to reply. See the privacy policy.
      </p>
    </form>
  );
}
