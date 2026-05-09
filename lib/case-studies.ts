import type { StaticImageData } from "next/image";
import type { MediaPalette } from "@/components/ui/media-frame";

import raijinThumb from "@/public/raijin-thumb.png";
import partnersThumb from "@/public/partners-thumb.png";
import exPopulusThumb from "@/public/ex-populus-thumb.png";
import xaiThumb from "@/public/xai-thumb.png";

/** A paragraph with an optional bolded lede sentence ("sub"). */
export type SectionParagraph =
  | string
  | { sub: string; body: string };

export type Aside = { heading: string; paragraphs: string[] };

export type Block =
  | { kind: "imagePair"; images?: [StaticImageData, StaticImageData] }
  | { kind: "imageWide"; image?: StaticImageData }
  | {
      kind: "section";
      heading: string;
      paragraphs: SectionParagraph[];
      aside?: Aside;
    };

export type CaseStudy = {
  slug: string;
  year: string;
  project: string;
  role: string;
  yearRange: string;
  headline: string;
  heroImage?: StaticImageData;
  overview: string[];
  blocks: Block[];
  results: {
    paragraphs: string[];
    stats: { value: string; label: string }[];
  };
  next: {
    slug: string;
    headline: string;
    imageSrc?: StaticImageData;
  };
  palette?: MediaPalette;
};

export const caseStudies: Record<string, CaseStudy> = {
  raijin: {
    slug: "raijin",
    year: "2025",
    project: "Raijin",
    role: "Lead Designer",
    yearRange: "Q2-Q3 2025",
    headline: "How rapid AI prototyping unlocked a new flow for 180K users.",
    heroImage: raijinThumb,
    overview: [
      "Raijin is a rewards platform where users earn prize entries by completing tasks in partner-run campaigns. The more tasks you complete, the better your odds in each prize pool.",
      "To maximize their odds, users should be doing every task across every campaign. They weren’t. Why?",
    ],
    blocks: [
      { kind: "imagePair" },
      {
        kind: "section",
        heading: "Exploration",
        paragraphs: [
          "My hypothesis: campaign discovery and onboarding was the bottleneck. Switching between campaigns meant navigating to each one separately and re-registering — too much friction for marginal entries.",
          "This aligned with the business too. Higher per-campaign engagement made the platform more attractive to potential partners, who weighed audience size heavily when evaluating us.",
        ],
      },
      { kind: "imageWide" },
      {
        kind: "section",
        heading: "Iteration",
        paragraphs: [
          "I used lo-fi AI prototypes to test directions rapidly — exploring multiple flows in the time it would normally take to build one. The same prototypes doubled as a pitch tool, letting me demonstrate value to stakeholders and secure buy-in before committing engineering resources.",
          "The feedback loop shrank from days to hours.",
        ],
      },
      { kind: "imagePair" },
      {
        kind: "section",
        heading: "Solution",
        paragraphs: [
          "The solution unified everything on the home screen: a single flow where users could complete tasks across all campaigns and track overall progress toward maxing their entries.",
          "Registration now happened automatically as users engaged. No more navigating to each campaign and signing up manually.",
          "The fundamental shift: a fragmented list of chores became a single game of progression.",
        ],
      },
      { kind: "imageWide" },
    ],
    results: {
      paragraphs: [
        "The feature saw immediate adoption. Users hit their goals faster, completed more campaigns, and the platform drew higher peak concurrent usage than ever.",
        "The boost to user value was also dramatic. Reward redemption events multiplied by a factor of 2.3.",
      ],
      stats: [
        { value: "60%", label: "Reduction in time-to-value" },
        { value: "47%", label: "Feature adoption rate" },
        { value: "2.3×", label: "Increase in reward participation" },
        { value: "186,000+", label: "Peak concurrent users" },
      ],
    },
    next: {
      slug: "partners",
      headline:
        "How to scale and control design quality across 40+ external partners.",
      imageSrc: partnersThumb,
    },
    palette: {
      colors: ["#E4E4E7", "#A5B4FC", "#F9A8D4", "#D8B4FE"],
      offset: [-0.3, 0.3],
    },
  },

  partners: {
    slug: "partners",
    year: "2025",
    project: "Raijin",
    role: "Lead Designer",
    yearRange: "Q1 2025",
    headline:
      "How to scale and control design quality across 40+ external partners.",
    heroImage: partnersThumb,
    overview: [
      "Raijin is a rewards platform where users earn prize entries by completing tasks in partner-run campaigns. Assets for each campaign could either be produced by internal designers or external partner-side designers.",
      "Raijin’s partner pipeline grew from a handful of campaigns to 40+ external partners shipping concurrently. Every campaign needed custom asset work, and that work was breaking down at handoff.",
      "Three parties were involved: BD (who owned the partner relationship), our internal design team, and partner-side designers we’d never met. None of them had a shared way to talk about what “correct” meant.",
    ],
    blocks: [
      { kind: "imagePair" },
      {
        kind: "section",
        heading: "What was broken?",
        paragraphs: [
          {
            sub: "BD couldn’t communicate requirements clearly.",
            body: "Partner success managers were the interface between partners and our team, but they weren’t designers. They couldn’t explain why specs mattered, so they passed through whatever the partner sent.",
          },
          {
            sub: "External designers shipped wrong assets.",
            body: "Without clear specs, partner-side designers guessed at aspect ratios, focal points, and safe zones. Most first-pass deliverables were unusable.",
          },
          {
            sub: "Internal designers fixed work twice.",
            body: "When we did the work in-house, partners would push back with changes that violated platform requirements. We’d ship correct, get pushed to incorrect, then negotiate back. Every campaign, multiple rounds.",
          },
        ],
      },
      { kind: "imageWide" },
      {
        kind: "section",
        heading: "The fix wasn’t more design work",
        paragraphs: [
          "Hiring more designers wouldn’t have helped. Neither would a faster review process. The bottleneck wasn’t design capacity, it was that nobody had a shared language for what a correct asset looked like.",
          "BD spoke in business terms. Partner designers worked from visual instinct. Our internal team worked from platform constraints. Every handoff was a translation, and you don’t fix translation problems by adding translators.",
        ],
      },
      { kind: "imageWide" },
      {
        kind: "section",
        heading: "A layered handoff system",
        paragraphs: [
          {
            sub: "A single source of truth in Notion.",
            body: "One page, always current. It replaced the previous mess of specs scattered across emails and old briefs. BD could send the same link to every partner, every time, and trust that the information was authoritative.",
          },
          {
            sub: "Specs with examples, not just specs.",
            body: "Most partner teams weren’t designers, so specs without visuals assumed too much. Every spec came with a worked example: where logos belonged, where focal points should sit, what a correct aspect ratio looked like in practice.",
          },
          {
            sub: "Editable templates in Figma and Photoshop.",
            body: "Pre-built files with structure baked in. Partners could swap in their own art, copy, and colors without breaking the layout. Templates ensured every asset was correctly sized, positioned, and safe-zoned by default. Photoshop versions mattered because not every partner studio worked in Figma.",
          },
          {
            sub: "Mockup previews showing context.",
            body: "Templates also showed the asset in context — how it would render on Raijin in production. Partner-side designers could see whether their work would land correctly before sending it for review, which cut a full negotiation cycle out of most campaigns.",
          },
        ],
      },
      { kind: "imageWide" },
    ],
    results: {
      paragraphs: [
        "The system absorbed partner growth without absorbing more designer headcount. First-pass acceptance climbed from occasional to standard, and every party in the pipeline knew what authoritative looked like.",
      ],
      stats: [
        { value: "40+", label: "External partners" },
        { value: "3h+", label: "Time saved per campaign" },
        { value: "15% → 90%", label: "First pass acceptance rate" },
      ],
    },
    next: {
      slug: "ex-populus",
      headline: "Why we chose not to build a design system from scratch.",
      imageSrc: exPopulusThumb,
    },
    palette: {
      colors: ["#E4E4E7", "#7DD3FC", "#6EE7B7", "#67E8F9"],
      offset: [0.4, 0.2],
    },
  },

  "ex-populus": {
    slug: "ex-populus",
    year: "2024",
    project: "Ex Populus",
    role: "Lead Designer",
    yearRange: "Q3 2024",
    headline: "Why we chose not to build a design system from scratch.",
    heroImage: exPopulusThumb,
    overview: [
      "Ex Populus was building a card-based trading game and needed a web UI. When I joined the team, the project was carrying significant design debt that was slowing every dev and QA cycle.",
    ],
    blocks: [
      { kind: "imagePair" },
      {
        kind: "section",
        heading: "Design debt",
        paragraphs: [
          "There were 15+ button variants, none of them coordinated. No token documentation. After every handoff, devs had to constantly ping for clarifications on hex codes, spacings, and font sizes. The final result was inconsistent at best, requiring multiple QA cycles before the build matched the design.",
          "The cost of not having a system was clear. We needed to unify everything before moving forward.",
          "Typically, teams in this position build a design system from scratch — full audit, define tokens, build a Figma library, write documentation, slowly test and ship a React component library with Storybook, then hand off to devs. Months of work.",
          "I argued against it. For our team, our stack, our workflow, we just didn’t need it.",
        ],
      },
      { kind: "imageWide" },
      {
        kind: "section",
        heading: "Why shadcn was enough",
        paragraphs: [
          "shadcn covered ~90% of our needs out of the box. The remaining 10% could be filled with customizations and extensions — so why spend months rebuilding primitives when we’d get them in days?",
          "The accessibility baked into shadcn’s Radix primitives gave us WCAG compliance for free: focus traps, keyboard navigation, ARIA states, screen reader announcements. Building those ourselves would have added weeks and introduced bugs we’d spend months fixing.",
          "Additionally, a custom design system has to be taught — to new designers, new devs, and increasingly, to LLMs. You’d have to build a custom MCP, write prompting documentation, and maintain it as the system evolved.",
          "Every modern LLM already knows shadcn and Tailwind. For AI prototyping and handoff, that turned a multi-week onboarding curve into zero friction.",
        ],
        aside: {
          heading: "The case for Noto over Inter",
          paragraphs: [
            "Noto supports 7+ more languages than Inter — over 1,000 scripts vs. ~150.",
            "Noto is also actively maintained by Google, and is consistent across all scripts, so layouts don’t break when localized.",
            "The only reason to pick Inter over Noto is if you specifically prefer its visual character — and even then, the trade-off is rarely worth it.",
          ],
        },
      },
      { kind: "imagePair" },
      {
        kind: "section",
        heading: "Implementation",
        paragraphs: [
          "First, match Tailwind tokens to Figma variables — either build them in Figma directly or import from an existing paid library.",
          "My recommendation: start from a paid Figma template that already has Tailwind tokens wired up. It cuts hours of tedious setup and lets the team focus on the actual design work.",
          "Within a single day, designers can be shipping branded hi-fi screens with all tokens and specs in a format devs can build directly from.",
        ],
      },
      { kind: "imageWide" },
    ],
    results: {
      paragraphs: [
        "The team shipped branded UI in days instead of months. WCAG 2.1 AA came for free, language support widened to a global audience, and dev cycles ran faster from day one.",
      ],
      stats: [
        { value: "50%", label: "Reduction in development time" },
        { value: "80%", label: "Reduction in time to first production UI" },
        { value: "7×", label: "Increased language support" },
        { value: "WCAG 2.1 AA", label: "Compliance achieved" },
      ],
    },
    next: {
      slug: "xai",
      headline: "Why we built a consumer-facing UI for a product that didn’t need one.",
      imageSrc: xaiThumb,
    },
    palette: {
      colors: ["#E4E4E7", "#FDBA74", "#F9A8D4", "#FCD34D"],
      offset: [-0.2, 0.5],
    },
  },

  xai: {
    slug: "xai",
    year: "2023",
    project: "Xai",
    role: "Lead Designer",
    yearRange: "Q4 2023",
    headline:
      "Why we built a consumer-facing UI for a product that didn’t need one, and made $40M.",
    heroImage: xaiThumb,
    overview: [
      "Xai Sentry Nodes are apps that users can run on their computer. Once they buy a key, they’ll be able to receive rewards for running it.",
      "Products like this didn’t ship as consumer apps. They shipped as CLI tools, configured by hand, run from a terminal. That was the category convention when we started.",
    ],
    blocks: [
      { kind: "imagePair" },
      {
        kind: "section",
        heading: "Approach",
        paragraphs: [
          "I pushed for a consumer-facing desktop app when nothing in the category had one and nobody on the team thought it was necessary.",
          "The reasoning was simple: who actually buys a CLI application? Developers might tolerate a terminal for tools they use professionally, but the buyers for this product weren’t developers. They were investors and operators who wanted to put money in, run a node, and watch the rewards come in. Asking them to configure a CLI was asking the wrong audience to do the wrong work.",
          "The cost of building the UI was real but bounded. The cost of shipping CLI-only was every non-developer buyer we’d lose, which turned out to be most of them.",
        ],
      },
      { kind: "imageWide" },
      {
        kind: "section",
        heading: "An all-in-one desktop app",
        paragraphs: [
          "One desktop app handled the full buyer journey: purchase keys, complete KYC, monitor node status, track reward rate, manage the keys you owned. Everything an operator needed in one place, designed for someone who’d never opened a terminal.",
          "The design bet was that this audience didn’t want to learn the infrastructure. They wanted to participate in it.",
        ],
      },
      { kind: "imageWide" },
    ],
    results: {
      paragraphs: [
        "The app shipped in Q4 2023 and the category followed. Within 18 months, many competing platforms had launched consumer-facing applications. Among them: Ronin Validator Nodes, Lumina Celestia, Gala, Aethir, Carv, 0G, Hybrid, and DIN.",
      ],
      stats: [
        { value: "$1B+", label: "Peak market cap" },
        { value: "$40M+", label: "Total sales to date" },
        { value: "87.5%", label: "Usability score" },
      ],
    },
    next: {
      slug: "raijin",
      headline:
        "How rapid AI prototyping unlocked a new flow for 180K users.",
      imageSrc: raijinThumb,
    },
    palette: {
      colors: ["#E4E4E7", "#C4B5FD", "#D8B4FE", "#A5B4FC"],
      offset: [0.4, 0.4],
    },
  },
};

export const caseStudySlugs = Object.keys(caseStudies);
