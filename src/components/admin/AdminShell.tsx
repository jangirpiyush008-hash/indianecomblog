"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Radar,
  Search,
  Sparkles,
  ShoppingBag,
  LinkIcon,
  Users,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X,
  Image as ImageIcon,
  Mail,
  Tag,
} from "lucide-react";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

const nav = [
  {
    heading: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Activity", href: "/admin/activity", icon: Bell },
    ],
  },
  {
    heading: "Editorial",
    items: [
      { label: "Articles", href: "/admin/articles", icon: FileText },
      { label: "Publishing calendar", href: "/admin/calendar", icon: Calendar },
      { label: "Categories & tags", href: "/admin/categories", icon: Tag },
      { label: "Image library", href: "/admin/images", icon: ImageIcon },
    ],
  },
  {
    heading: "Discovery",
    items: [
      { label: "Trend Radar", href: "/admin/trends", icon: Radar },
      { label: "Keyword research", href: "/admin/keywords", icon: Search },
      { label: "AI content generator", href: "/admin/generate", icon: Sparkles },
    ],
  },
  {
    heading: "Commerce",
    items: [
      { label: "Products", href: "/admin/products", icon: ShoppingBag },
      { label: "Affiliate links", href: "/admin/affiliate", icon: LinkIcon },
    ],
  },
  {
    heading: "Audience",
    items: [
      { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
      { label: "Authors", href: "/admin/authors", icon: Users },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    heading: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 h-screen w-72 border-r border-line bg-paper flex flex-col z-40 transition-transform",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-line flex items-center justify-between">
          <Link href="/admin" className="block">
            <span className="font-editorial text-2xl font-semibold text-ink">
              {brand.name}
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40 mt-0.5">
              Operating system
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {nav.map((group) => (
            <div key={group.heading} className="mb-6 px-3">
              <div className="px-3 mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-40">
                {group.heading}
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm transition rounded",
                          active
                            ? "bg-ink text-cream"
                            : "text-ink-80 hover:bg-cream-100"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-line">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-ink-60 hover:text-ink"
          >
            <span>↗</span> View site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 md:ml-0">
        <header className="sticky top-0 z-30 border-b border-line bg-cream/95 backdrop-blur">
          <div className="px-6 lg:px-10 h-16 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-40" />
                <input
                  type="text"
                  placeholder="Search articles, trends, products…"
                  className="w-full pl-10 pr-4 py-2 bg-cream-100 border border-line text-sm focus:outline-none focus:border-ink"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-cream-100 rounded">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
              </button>
              <div className="h-8 w-8 rounded-full bg-ink text-cream flex items-center justify-center text-xs font-semibold">
                PJ
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="px-6 lg:px-10 pt-10 pb-8 border-b border-line">
      <div className="flex items-start justify-between gap-6">
        <div>
          {eyebrow && (
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-6 bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                {eyebrow}
              </span>
            </div>
          )}
          <h1 className="font-editorial text-3xl md:text-4xl font-semibold text-ink leading-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-ink-60 max-w-2xl">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
