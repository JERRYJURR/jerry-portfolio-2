import { Container } from "@/components/ui/container";
import { MediaFrame } from "@/components/ui/media-frame";
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
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-12">
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
      <section className="px-6 md:px-12 pb-12">
        <Container>
          <Reveal delay={240}>
            <MediaFrame
              aspect="32/15"
              padding={16}
              src={data.heroImage}
              alt={data.headline}
              palette={data.palette}
            />
          </Reveal>
        </Container>
      </section>

      {/* Overview row — text + meta card */}
      <section className="px-6 md:px-12 pb-16">
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
      <section className="px-6 md:px-12 py-16">
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
      <section className="px-6 md:px-12 pt-16 pb-16">
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
    return (
      <section className="px-6 md:px-12 py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <MediaFrame
              aspect="4/3"
              padding={16}
              src={a}
              palette={palette}
            />
            <MediaFrame
              aspect="4/3"
              padding={16}
              src={b}
              palette={palette}
            />
          </div>
        </Container>
      </section>
    );
  }

  if (block.kind === "imageWide") {
    return (
      <section className="px-6 md:px-12 py-12">
        <Container>
          <MediaFrame
            aspect="32/15"
            padding={16}
            src={block.image}
            palette={palette}
          />
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
    return (
      <section className="px-6 md:px-12 py-12">
        <Container>
          <div className="flex flex-col gap-12 md:flex-row md:gap-6">
            <div className="flex flex-1 flex-col gap-8">{sectionBody}</div>
            <div className="flex flex-1 justify-end self-start">
              <div className="flex h-fit w-full flex-col gap-4 self-start rounded-2xl bg-bg p-6 outline outline-1 outline-rule-strong md:w-[75%]">
                <h3 className="font-display text-[18px] font-medium leading-[1.4] text-ink">
                  {block.aside.heading}
                </h3>
                <div className="flex flex-col gap-3 text-[15px] leading-[1.55] text-ink-muted">
                  {block.aside.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-12 py-12">
      <Container>
        <div className="flex w-full flex-col gap-8 md:w-1/2">{sectionBody}</div>
      </Container>
    </section>
  );
}
