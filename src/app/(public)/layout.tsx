import "../globals.css";
import { baseMetadata, fontClasses } from "../shared-root";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { headerProps } from "@/lib/edition";

export const metadata = baseMetadata;

/** Root layout for global pages: country selector, about and policy pages. */
export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClasses}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <Header {...headerProps()} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
