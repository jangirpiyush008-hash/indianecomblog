import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function EditionNotFound() {
  return (
    <section className="min-h-[60vh] py-24 flex items-center">
      <Container size="md">
        <div className="font-editorial text-[140px] font-semibold text-accent leading-none">404</div>
        <h1 className="font-editorial text-4xl font-semibold mb-4">Page not found</h1>
        <p className="text-ink-60 mb-8">This page doesn&apos;t exist in this edition. Try the edition homepage or another edition.</p>
        <Link href="/" className="px-6 py-3 bg-ink text-cream font-medium hover:bg-accent">Choose an edition →</Link>
      </Container>
    </section>
  );
}
