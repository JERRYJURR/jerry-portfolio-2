import type { StaticImageData } from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { ArrowDown, ArrowRight, Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { StripeBand } from "@/components/ui/stripe-band";
import { Header } from "@/components/blocks/header";
import { StatStrip } from "@/components/blocks/stat-strip";
import { CaseStudyTile } from "@/components/blocks/case-study-tile";
import { SkillList } from "@/components/blocks/skill-list";
import { ProfileCard } from "@/components/blocks/profile-card";
import { Footer } from "@/components/blocks/footer";
import { LINKS } from "@/lib/links";

import raijinThumb from "@/public/raijin-thumb.png";
import partnersThumb from "@/public/partners-thumb.png";
import exPopulusThumb from "@/public/ex-populus-thumb.png";
import xaiThumb from "@/public/xai-thumb.png";

const heroStats = [
  { value: "$1B+", label: "Peak market cap reached" },
  { value: "180K+", label: "Peak daily concurrent users" },
  { value: "$40M+", label: "Total sales achieved" },
  { value: "#1 Trending", label: "Google Play Canada, 2019" },
];

import type { CaseStudyPalette } from "@/components/blocks/case-study-tile";

const cases: Array<{
  href: string;
  year: string;
  project: string;
  headline: string;
  imageSrc?: StaticImageData;
  stats: Array<{ value: string; label: string }>;
  palette: CaseStudyPalette;
}> = [
  {
    href: "/raijin",
    year: "2025",
    project: "Raijin",
    headline:
      "How rapid AI prototyping unlocked a new flow for 180K users.",
    imageSrc: raijinThumb,
    stats: [
      { value: "60%", label: "TTV reduction" },
      { value: "47%", label: "Feature adoption" },
    ],
    palette: {
      colors: ["#E4E4E7", "#A5B4FC", "#F9A8D4", "#D8B4FE"],
      offset: [-0.3, 0.3],
    },
  },
  {
    href: "/partners",
    year: "2025",
    project: "Raijin",
    headline:
      "How to scale and control design quality across 40+ external partners.",
    imageSrc: partnersThumb,
    stats: [
      { value: "40+", label: "External partners" },
      { value: "3h+", label: "Time saved per campaign" },
    ],
    palette: {
      colors: ["#E4E4E7", "#7DD3FC", "#6EE7B7", "#67E8F9"],
      offset: [0.4, 0.2],
    },
  },
  {
    href: "/ex-populus",
    year: "2024",
    project: "Ex Populus",
    headline: "Why we chose not to build a design system from scratch.",
    imageSrc: exPopulusThumb,
    stats: [
      { value: "50%", label: "Reduction in development time" },
      { value: "80%", label: "Reduction in time to first production UI" },
    ],
    palette: {
      colors: ["#E4E4E7", "#FDBA74", "#F9A8D4", "#FCD34D"],
      offset: [-0.2, 0.5],
    },
  },
  {
    href: "/xai",
    year: "2023",
    project: "Xai",
    headline:
      "Why we built a consumer-facing UI for a product that didn’t need one, and made $40M.",
    imageSrc: xaiThumb,
    stats: [
      { value: "$1B+", label: "Peak market cap" },
      { value: "$40M+", label: "Total sales" },
    ],
    palette: {
      colors: ["#E4E4E7", "#C4B5FD", "#D8B4FE", "#A5B4FC"],
      offset: [0.4, 0.4],
    },
  },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 md:gap-8 px-4 md:px-12 pt-6 md:pt-24 pb-12 md:pb-20">
        <Reveal delay={80}>
          <Avatar size="lg" src="/jerry.webp" alt="Jerry Kou" className="max-md:!h-24 max-md:!w-24" />
        </Reveal>
        <Reveal delay={200}>
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <h1 className="font-display text-[28px] md:text-[48px] font-normal tracking-[-0.05em] leading-[1.25] text-center text-ink max-w-[24ch]">
              <span className="font-bold">AI-native product designer.</span>
              <br />I design, code, and ship products that scale.
            </h1>
            <p className="font-display text-[14px] md:text-[20px] leading-[1.5] text-ink-muted text-center max-w-[60ch]">
              5+ years of experience in projects that generated $40M+ in sales
              and reached 180k+ daily concurrent users.
            </p>
          </div>
        </Reveal>
        <Reveal delay={440}>
          <div className="flex gap-2">
            <Button
              variant="filled"
              size="lg"
              href={LINKS.calendar}
              target="_blank"
              rel="noopener"
              className="max-md:!h-9 max-md:!px-3.5 max-md:!text-[14px]"
            >
              Book a call
              <ArrowRight motion="btn-x" className="h-[18px] w-[18px] max-md:!h-4 max-md:!w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={LINKS.resume}
              target="_blank"
              rel="noopener"
              className="max-md:!h-9 max-md:!px-3.5 max-md:!text-[14px]"
            >
              Resume
              <ArrowDown motion="btn-y-down" className="h-[18px] w-[18px] max-md:!h-4 max-md:!w-4" />
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Stat strip */}
      <Reveal delay={600}>
        <StatStrip stats={heroStats} />
      </Reveal>

      {/* Case study grid */}
      <section className="pt-4 md:pt-24 pb-16 md:pb-48">
        <Container>
          <div className="grid gap-x-6 gap-y-8 md:gap-y-20 md:grid-cols-2">
            {cases.map((c, i) => (
              <Reveal key={c.href} delay={(i % 2) * 80}>
                <CaseStudyTile {...c} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* About + skills */}
      <section className="pb-8 md:pb-24">
        <Container>
          <Reveal>
          <div className="flex flex-col gap-12 md:flex-row md:gap-16">
            <div className="flex flex-1 flex-col gap-6">
              <Eyebrow>About me</Eyebrow>
              <h2 className="font-display text-[24px] md:text-[32px] font-normal tracking-[-0.05em] leading-[1.1] text-ink">
                Hi, I&rsquo;m Jerry.
              </h2>
              <div className="flex flex-col gap-4 text-[16px] md:text-[20px] leading-[1.5] text-ink-muted">
                <p>
                  I&rsquo;m a product designer with 5+ years of experience
                  shipping 0→1 products that made tens of millions of dollars
                  and spawned multiple imitators.
                </p>
                <p>
                  I believe in an iterative, MVP-based approach grounded in
                  strong market research, and a strategy that focuses on fast
                  shipping and constant testing.
                </p>
                <p>
                  I am an early adopter of new AI tools and workflows, and I
                  experiment constantly to find the best approaches.
                </p>
              </div>
            </div>
            <div className="flex flex-1 justify-end">
              <div className="w-full md:w-[80%]">
                <SkillList />
              </div>
            </div>
          </div>
          </Reveal>
        </Container>
      </section>

      {/* Stripe above the ProfileCard, matching desktop spec */}
      <StripeBand />

      <section className="py-16">
        <Container>
          <ProfileCard />
        </Container>
      </section>

      <Footer />
    </>
  );
}
