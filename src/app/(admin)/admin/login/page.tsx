"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { brand } from "@/config/brand";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}${next}` },
      });
      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push(next);
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-block mb-10 text-center w-full">
          <span className="font-editorial text-4xl font-semibold">{brand.name}</span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40 mt-1">
            Operating system
          </span>
        </Link>

        <div className="bg-paper border border-line p-8">
          <h1 className="font-editorial text-2xl font-semibold mb-1">Welcome back</h1>
          <p className="text-sm text-ink-60 mb-6">Sign in to the admin panel</p>

          {sent ? (
            <div className="p-4 bg-cream-100 border border-line text-sm">
              <p className="font-medium text-ink">Check your email</p>
              <p className="text-ink-60 mt-1">
                We sent a magic link to <span className="font-medium">{email}</span>. Click it to sign in.
              </p>
            </div>
          ) : (
            <form onSubmit={password ? handlePassword : handleMagicLink} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.15em] text-ink-60 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-cream border border-line text-sm focus:outline-none focus:border-ink"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.15em] text-ink-60 mb-1.5">
                  Password <span className="text-ink-40 normal-case">(or leave blank for magic link)</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-cream border border-line text-sm focus:outline-none focus:border-ink"
                  placeholder="••••••••"
                />
              </div>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-sm text-danger">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                variant="primary"
                size="md"
                shape="soft"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing in…" : password ? "Sign in" : "Send magic link"}
              </Button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-ink-60">
          <Link href="/" className="hover:text-ink">← Back to site</Link>
        </p>
      </div>
    </div>
  );
}
