import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { EditionHero as Hero, HeroPhoto } from "@/config/heroes";
import type { Article } from "@/types/content";
import { cn } from "@/lib/utils";

type Props = {
  hero: Hero;
  flag: string;
  eyebrow: string;
  leadingLabel: string;
  photoCredit: string;
  leading: Article[];
};

/**
 * Edition front-page hero: a local editorial photograph (never a product shot) paired
 * with the edition's headline and links to the day's leading stories. Each edition
 * picks one of five layouts so the front pages feel distinct.
 */
export function EditionHero(p: Props) {
  switch (p.hero.layout) {
    case "cover":
      return <Cover {...p} />;
    case "broadsheet":
      return <Broadsheet {...p} />;
    case "mosaic":
      return <Mosaic {...p} />;
    default:
      return <Split {...p} reverse={p.hero.layout === "split-reverse"} />;
  }
}

function Photo({ photo, sizes, priority, className, credit }: { photo: HeroPhoto; sizes: string; priority?: boolean; className?: string; credit?: string }) {
  return (
    <figure className={cn("relative overflow-hidden bg-cream-200", className)}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      {credit && (
        <figcaption className="absolute bottom-0 right-0 bg-ink/70 text-cream/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em]">
          {credit}
        </figcaption>
      )}
    </figure>
  );
}

function Eyebrow({ flag, label, light }: { flag: string; label: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] font-semibold", light ? "text-cream" : "text-accent")}>
      <span aria-hidden>{flag}</span> {label}
    </span>
  );
}

function Leading({ items, label, light, columns }: { items: Article[]; label: string; light?: boolean; columns?: boolean }) {
  if (!items.length) return null;
  return (
    <div>
      <h2 className={cn("font-mono text-[11px] uppercase tracking-[0.2em] font-semibold mb-3", light ? "text-cream/70" : "text-ink-40")}>{label}</h2>
      <ol className={cn(columns ? "grid md:grid-cols-3 gap-6 md:gap-0 md:divide-x divide-line" : "divide-y", light ? "divide-cream/15" : "divide-line")}>
        {items.map((a, i) => (
          <li key={a.id} className={cn(columns ? "md:px-6 first:md:pl-0 last:md:pr-0" : "py-3 first:pt-0")}>
            <Link href={a.url} className="group flex gap-3">
              <span className={cn("font-editorial text-2xl leading-none", light ? "text-accent" : "text-accent")}>{i + 1}</span>
              <span>
                <span className={cn("block font-mono text-[10px] uppercase tracking-[0.18em] mb-1", light ? "text-cream/60" : "text-ink-40")}>{a.categoryName}</span>
                <span className={cn("font-editorial text-lg leading-snug transition-colors", light ? "text-cream group-hover:text-accent" : "text-ink group-hover:text-accent-dark")}>{a.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Split({ hero, flag, eyebrow, leadingLabel, photoCredit, leading, reverse }: Props & { reverse?: boolean }) {
  return (
    <section className="py-10 md:py-14 border-b border-line">
      <Container size="xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className={cn("lg:col-span-5", reverse && "lg:order-2")}>
            <Eyebrow flag={flag} label={eyebrow} />
            <h1 className="font-editorial text-4xl md:text-6xl font-semibold text-ink mt-3 leading-[1.02] tracking-tight">{hero.headline}</h1>
            <p className="mt-5 text-lg text-ink-60 leading-relaxed">{hero.intro}</p>
            <div className="mt-8"><Leading items={leading} label={leadingLabel} /></div>
          </div>
          <Photo
            photo={hero.photos[0]}
            credit={photoCredit}
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className={cn("lg:col-span-7 aspect-[4/3] lg:aspect-[5/4] order-first", reverse ? "lg:order-1" : "lg:order-none")}
          />
        </div>
      </Container>
    </section>
  );
}

function Cover({ hero, flag, eyebrow, leadingLabel, photoCredit, leading }: Props) {
  return (
    <section className="border-b border-line">
      <div className="relative min-h-[460px] md:min-h-[600px] flex items-end">
        <Photo photo={hero.photos[0]} credit={photoCredit} priority sizes="100vw" className="!absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent" aria-hidden />
        <Container size="xl" className="relative w-full">
          <div className="py-10 md:py-16 max-w-3xl">
            <Eyebrow flag={flag} label={eyebrow} light />
            <h1 className="font-editorial text-4xl md:text-7xl font-semibold text-cream mt-3 leading-[1.0] tracking-tight">{hero.headline}</h1>
            <p className="mt-5 text-lg md:text-xl text-cream/85 leading-relaxed max-w-2xl">{hero.intro}</p>
          </div>
        </Container>
      </div>
      {leading.length > 0 && (
        <div className="bg-cream-100 border-t border-line">
          <Container size="xl"><div className="py-8"><Leading items={leading} label={leadingLabel} columns /></div></Container>
        </div>
      )}
    </section>
  );
}

function Broadsheet({ hero, flag, eyebrow, leadingLabel, photoCredit, leading }: Props) {
  return (
    <section className="pt-10 md:pt-14 pb-12 border-b border-line">
      <Container size="xl">
        <div className="text-center max-w-4xl mx-auto">
          <Eyebrow flag={flag} label={eyebrow} />
          <h1 className="font-editorial text-4xl md:text-7xl font-semibold text-ink mt-3 leading-[1.0] tracking-tight">{hero.headline}</h1>
          <p className="mt-5 text-lg md:text-xl text-ink-60 leading-relaxed max-w-2xl mx-auto">{hero.intro}</p>
        </div>
        <Photo photo={hero.photos[0]} credit={photoCredit} priority sizes="100vw" className="mt-10 aspect-[16/9] md:aspect-[21/8]" />
        <div className="mt-8 border-t-2 border-ink pt-6"><Leading items={leading} label={leadingLabel} columns /></div>
      </Container>
    </section>
  );
}

function Mosaic({ hero, flag, eyebrow, leadingLabel, photoCredit, leading }: Props) {
  return (
    <section className="py-10 md:py-14 border-b border-line">
      <Container size="xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-4 flex flex-col">
            <Eyebrow flag={flag} label={eyebrow} />
            <h1 className="font-editorial text-4xl md:text-6xl font-semibold text-ink mt-3 leading-[1.02] tracking-tight">{hero.headline}</h1>
            <p className="mt-5 text-lg text-ink-60 leading-relaxed">{hero.intro}</p>
            <div className="mt-8 lg:mt-auto lg:pt-8"><Leading items={leading} label={leadingLabel} /></div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-3 grid-rows-2 gap-2 sm:gap-3 h-[260px] sm:h-[440px] lg:h-[560px] order-first lg:order-none">
            <Photo photo={hero.photos[0]} credit={photoCredit} priority sizes="(min-width: 1024px) 45vw, 66vw" className="col-span-2 row-span-2" />
            <Photo photo={hero.photos[1]} sizes="(min-width: 1024px) 22vw, 33vw" />
            <Photo photo={hero.photos[2]} sizes="(min-width: 1024px) 22vw, 33vw" />
          </div>
        </div>
      </Container>
    </section>
  );
}
