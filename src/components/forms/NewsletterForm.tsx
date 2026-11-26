"use client";

import { track } from "@/lib/analytics/track";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function NewsletterForm({
  placeholder = "you@email.com",
  buttonLabel = "Join free",
  source = "footer",
  className,
  variant = "dark",
}: {
  placeholder?: string;
  buttonLabel?: string;
  source?: string;
  className?: string;
  variant?: "dark" | "light" | "accent";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const startedRef = useRef(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      setStatus("done");
      track("newsletter_signup_success", { form_id: "newsletter", form_type: "newsletter", form_location: source });
      setMessage("You're subscribed. Thanks!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      track("newsletter_signup_error", { form_id: "newsletter", form_type: "newsletter", form_location: source });
      setMessage((err instanceof Error ? err.message : "") || "Something went wrong. Try again?");
    }
  }

  const variants = {
    dark: {
      input: "bg-cream/5 border-cream/20 text-cream placeholder:text-cream/40 focus:border-accent",
      button: "bg-accent hover:bg-accent-dark text-white",
      message: "text-cream/60",
    },
    light: {
      input: "bg-paper border-line text-ink placeholder:text-ink-40 focus:border-ink",
      button: "bg-ink hover:bg-ink-80 text-cream",
      message: "text-ink-60",
    },
    accent: {
      input: "bg-white text-ink placeholder:text-ink-40 focus:ring-2 focus:ring-ink",
      button: "bg-ink text-cream hover:bg-ink-80",
      message: "text-white/90",
    },
  }[variant];

  return (
    <form onFocusCapture={() => { if (!startedRef.current) { startedRef.current = true; track("newsletter_signup_start", { form_id: "newsletter", form_type: "newsletter", form_location: source }); } }} onSubmit={handleSubmit} className={cn("w-full", className)}>
      {status === "done" ? (
        <p className={cn("text-sm", variants.message)}>{message}</p>
      ) : (
        <>
          <div className="flex">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className={cn("flex-1 px-4 py-3 border text-sm focus:outline-none", variants.input)}
              disabled={status === "sending"}
            />
            <button
              type="submit"
              className={cn("px-6 py-3 text-sm font-medium tracking-wide transition", variants.button)}
              disabled={status === "sending"}
            >
              {status === "sending" ? "…" : buttonLabel}
            </button>
          </div>
          {status === "error" && (
            <p className={cn("mt-2 text-xs", variants.message)}>{message}</p>
          )}
        </>
      )}
    </form>
  );
}
