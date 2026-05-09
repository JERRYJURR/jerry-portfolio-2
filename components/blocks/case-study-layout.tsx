import Image from "next/image";
import { cn } from "@/lib/cn";
import { Caption } from "@/components/ui/caption";
import { Container } from "@/components/ui/container";
import { CaseImage } from "@/components/ui/case-image";
import { Reveal } from "@/components/ui/reveal";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Header } from "@/components/blocks/header";
import { MetaCard } from "@/components/blocks/meta-card";
import { NextCaseCard } from "@/components/blocks/next-case-card";
import { PromptFooter } from "@/components/blocks/prompt-footer";
import { StatList } from "@/components/blocks/stat-list";
import type { Block, CaseStudy } from "@/lib/case-studies";
import { caseStudies } from "@/lib/case-studies";

export function CaseStudyLayout({ data }: { data: CaseStudy }) {
  const nextData = caseStudies[data.next.slug];

  return (
    <>
      <ScrollProgress />
      <Header />

      {/* Title */}
      <section className="pt-16 md:pt-24 pb-12">
        <Container>
          <Reveal delay={80}>
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-display text-[20px] leading-[1.5] text-ink-muted">
              Case Study
            </p>
            <h1 className="font-display text-[40px] md:text-[48px] font-normal tracking-[-0.05em] leading-[1.25] text-ink max-w-[24ch]">
              {data.headline}
            </h1>
          </div>
          </Reveal>
        </Container>
      </section>

      {/* Hero image */}
      <section className="pb-12">
        <Container>
          <Reveal delay={240}>
            <CaseImage
              src={data.heroImage}
              alt={data.headline}
              palette={data.palette}
              aspect="32/15"
              preload
              bleed={data.heroBleed}
              bleedFactor={data.heroBleedFactor}
            />
          </Reveal>
        </Container>
      </section>

      {/* Overview row — text + meta card */}
      <section className="pb-16">
        <Container>
          <Reveal>
          <div className="flex flex-col gap-12 md:flex-row md:gap-6">
            <div className="flex flex-1 flex-col gap-8">
              <h2 className="font-display text-[28px] md:text-[32px] font-normal tracking-[-0.05em] leading-none text-ink">
                Overview
              </h2>
              <div className="flex flex-col gap-4 text-[18px] md:text-[20px] leading-[1.5] text-ink-muted">
                {data.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-1 justify-end">
              <div className="w-full md:w-[75%]">
                <MetaCard
                  rows={[
                    { label: "Project", value: data.project },
                    { label: "Role", value: data.role },
                    { label: "Year", value: data.yearRange },
                  ]}
                />
              </div>
            </div>
          </div>
          </Reveal>
        </Container>
      </section>

      {/* Body blocks */}
      <div className="flex flex-col">
        {data.blocks.map((block, i) => (
          <Reveal key={i}>
            <BlockRenderer block={block} palette={data.palette} />
          </Reveal>
        ))}
      </div>

      {/* Results */}
      <section className="py-16">
        <Container>
          <Reveal>
          <div className="flex flex-col gap-12 md:flex-row md:gap-6">
            <div className="flex flex-1 flex-col gap-8">
              <h2 className="font-display text-[28px] md:text-[32px] font-normal tracking-[-0.05em] leading-none text-ink">
                Results and impact
              </h2>
              <div className="flex flex-col gap-4 text-[18px] md:text-[20px] leading-[1.5] text-ink-muted">
                {data.results.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-1 justify-end">
              <div className="w-full md:w-[75%]">
                <StatList stats={data.results.stats} />
              </div>
            </div>
          </div>
          </Reveal>
        </Container>
      </section>

      {/* Next case */}
      <section className="pt-32 md:pt-40 pb-16">
        <Container>
          <Reveal>
            <NextCaseCard
              href={`/${data.next.slug}`}
              headline={data.next.headline}
              imageSrc={data.next.imageSrc}
              palette={nextData?.palette}
            />
          </Reveal>
        </Container>
      </section>

      <PromptFooter />
    </>
  );
}

function BlockRenderer({
  block,
  palette,
}: {
  block: Block;
  palette: CaseStudy["palette"];
}) {
  if (block.kind === "imagePair") {
    const [a, b] = block.images ?? [undefined, undefined];
    const aspect = block.aspect ?? "4/3";
    return (
      <section className="py-12">
        <Container>
          <div className="flex flex-col gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <CaseImage src={a} palette={palette} aspect={aspect} bleed={block.bleed} bleedFactor={block.bleedFactor} sizes="(max-width: 768px) 100vw, 500px" />
              <CaseImage src={b} palette={palette} aspect={aspect} bleed={block.bleed} bleedFactor={block.bleedFactor} sizes="(max-width: 768px) 100vw, 500px" />
            </div>
            {block.caption && <Caption>{block.caption}</Caption>}
          </div>
        </Container>
      </section>
    );
  }

  if (block.kind === "imageWide") {
    const aspect = block.aspect ?? "32/15";
    return (
      <section className="py-12">
        <Container>
          <div className="flex flex-col gap-6">
            <CaseImage src={block.image} palette={palette} aspect={aspect} bleed={block.bleed} bleedFactor={block.bleedFactor} />
            {block.caption && <Caption>{block.caption}</Caption>}
          </div>
        </Container>
      </section>
    );
  }

  // Body section. With an aside, two equal columns (text left, callout right).
  // Without, single 500w left-aligned column.
  const sectionBody = (
    <>
      <h2 className="font-display text-[28px] md:text-[32px] font-normal tracking-[-0.05em] leading-none text-ink">
        {block.heading}
      </h2>
      <div className="flex flex-col gap-6 text-[18px] md:text-[20px] leading-[1.5] text-ink-muted">
        {block.paragraphs.map((p, i) =>
          typeof p === "string" ? (
            <p key={i}>{p}</p>
          ) : (
            <div key={i} className="flex flex-col gap-1">
              <p className="font-semibold text-ink">{p.sub}</p>
              <p>{p.body}</p>
            </div>
          ),
        )}
      </div>
    </>
  );

  if (block.aside) {
    const aside = block.aside;
    return (
      <section className="py-12">
        <Container>
          <div className="flex flex-col gap-12 md:flex-row md:gap-6">
            <div className="flex flex-1 flex-col gap-8">{sectionBody}</div>
            <div className="flex flex-1 justify-end self-start">
              <div
                className={cn(
                  "flex h-fit w-full flex-col self-start rounded-2xl bg-bg p-6 outline outline-1 outline-rule-strong md:w-[75%]",
                  aside.items ? "gap-6" : "gap-4",
                )}
              >
                <h3 className="font-display text-[24px] font-normal tracking-[-0.05em] leading-[1.25] text-ink">
                  {aside.heading}
                </h3>
                {aside.paragraphs && (
                  <div className="flex flex-col gap-4 text-[16px] leading-6 text-ink-muted">
                    {aside.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}
                {aside.items && (
                  <div className="flex flex-col gap-6">
                    {aside.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <Image
                          src={item.icon}
                          alt=""
                          width={24}
                          height={24}
                          className={cn(
                            "h-6 w-6 shrink-0",
                            item.iconRounded && "rounded-[6px]",
                          )}
                        />
                        <div className="flex flex-col gap-1">
                          <p className="font-display text-[16px] font-medium leading-6 text-ink">
                            {item.heading}
                          </p>
                          <p className="text-[16px] leading-6 text-ink-muted">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12">
      <Container>
        <div className="flex w-full flex-col gap-8 md:w-1/2">{sectionBody}</div>
      </Container>
    </section>
  );
}
