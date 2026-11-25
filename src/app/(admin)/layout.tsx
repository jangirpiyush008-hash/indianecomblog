import "../globals.css";
import { baseMetadata, fontClasses } from "../shared-root";

export const metadata = { ...baseMetadata, robots: { index: false, follow: false } };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClasses}>
      <body className="min-h-full flex flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
