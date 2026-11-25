import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(d: string | Date, locale = "en-IN") {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatRelativeTime(d: string | Date, locale = "en") {
  const date = typeof d === "string" ? new Date(d) : d;
  const diffSec = Math.round((date.getTime() - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto", style: "short" });
  const abs = Math.abs(diffSec);
  if (abs < 60) return rtf.format(0, "minute");
  if (abs < 3600) return rtf.format(Math.round(diffSec / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diffSec / 3600), "hour");
  if (abs < 7 * 86400) return rtf.format(Math.round(diffSec / 86400), "day");
  return formatDate(date, locale);
}

export function formatShortDate(d: string | Date, locale = "en") {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(date);
}

export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 225);
  return `${minutes} min read`;
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompact(n: number) {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function truncate(s: string, max: number) {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
}
