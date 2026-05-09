import type { StaticImageData } from "next/image";
import type { MediaPalette } from "@/components/ui/media-frame";

import raijinThumb from "@/public/raijin-thumb.png";
import raijin2 from "@/public/raijin-2.png";
import raijin3a from "@/public/raijin-3-1.png";
import raijin3b from "@/public/raijin-3-2.png";
import raijin4 from "@/public/raijin-4.png";
import raijin5 from "@/public/raijin-5.png";

import partnersThumb from "@/public/partners-thumb.png";
import partners2 from "@/public/partners-2.png";
import partners53 from "@/public/partners-5-3.png";
import partners54 from "@/public/partners-5-4.png";

import exPopulusThumb from "@/public/ex-populus-thumb.png";
import exPopulus2 from "@/public/ex-populus-2.png";
import exPopulus3 from "@/public/ex-populus-3.png";
import exPopulus4 from "@/public/ex-populus-4.png";
import exPopulus5 from "@/public/ex-populus-5.png";
import shadcndesignIcon from "@/public/shadcndesign.png";
import figmaIcon from "@/public/figma.png";
import claudeIcon from "@/public/claude.png";

import xaiThumb from "@/public/xai-thumb.png";
import xai2 from "@/public/xai-2.png";
import xai3 from "@/public/xai-3.png";
import xai4 from "@/public/xai-4.png";

/** A paragraph with an optional bolded lede sentence ("sub"). */
export type SectionParagraph =
  | string
  | { sub: string; body: string };

export type AsideItem = {
  icon: StaticImageData;
  heading: string;
  body: string;
};

export type Aside = {
  heading: string;
  paragraphs?: string[];
  items?: AsideItem[];
};

export type Block =
  | { kind: "imagePair"; images?: [StaticImageData, StaticImageData]; caption?: string }
  | { kind: "imageWide"; image?: StaticImageData; caption?: string }
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
      {
        kind: "imageWide",
        image: raijin2,
        caption:
          "Pictured: six giveaway campaigns with wildly varying user participation rates. Ideally every giveaway should be as close to 100% as possible.",
      },
      {
        kind: "section",
        heading: "Exploration",
        paragraphs: [
          "My hypothesis: campaign discovery and onboarding was the bottleneck. Switching between campaigns meant navigating to each one separately and re-registering — too much friction for marginal entries.",
          "This aligned with the business too. Higher per-campaign engagement made the platform more attractive to potential partners, who weighed audience size heavily when evaluating us.",
        ],
      },
      {
        kind: "imagePair",
        images: [raijin3a, raijin3b],
        caption:
          "The old flow’s friction scaled with campaign count: every additional giveaway meant another round-trip through the homepage and dedicated giveaway pages. A new improved flow should batch all tasks into a single queue, making per-giveaway navigation obsolete.",
      },
      {
        kind: "section",
        heading: "Iteration",
        paragraphs: [
          "I used lo-fi AI prototypes to test directions rapidly — exploring multiple flows in the time it would normally take to build one. The same prototypes doubled as a pitch tool, letting me demonstrate value to stakeholders and secure buy-in before committing engineering resources.",
          "The feedback loop shrank from days to hours.",
        ],
      },
      {
        kind: "imageWide",
        image: raijin4,
        caption:
          "Figma prototypes are extremely time-consuming to make. With well-structured prompts, you can iterate at the speed of pen and paper, making it ideal for fast-moving teams and flat, unstructured orgs.",
      },
      {
        kind: "section",
        heading: "Solution",
        paragraphs: [
          "The solution unified everything on the home screen: a single flow where users could complete tasks across all campaigns and track overall progress toward maxing their entries.",
          "Registration now happened automatically as users engaged. No more navigating to each campaign and signing up manually.",
          "The fundamental shift: a fragmented list of chores became a single game of progression.",
        ],
      },
      {
        kind: "imageWide",
        image: raijin5,
        caption:
          "The new and improved flow. In addition to eliminating a source of unnecessary clicks and friction that scale linearly with the amount of campaigns, we also gamified the process of completing all the tasks on the website.",
      },
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
      {
        kind: "imageWide",
        image: partners2,
        caption:
          "Anonymized messages from our communication channels we used to coordinate campaigns. Before going live, we’d have many rounds of back-and-forths on file formats, resolutions, image quality, branding, cropping concerns, and sharing permissions.",
      },
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
      {
        kind: "imageWide",
        image: partners53,
        caption:
          "Example of what a campaign asset delivery cycle used to look like: five rounds of revision for four deliverable types in two file formats. Multiply that by 40+ partners.",
      },
      {
        kind: "section",
        heading: "The fix: a layered handoff system",
        paragraphs: [
          {
            sub: "A single source of truth in Notion",
            body: "One page, always current. It replaced the previous mess of specs scattered across emails and old briefs. BD could send the same link to every partner, every time, and trust that the information was authoritative.",
          },
          {
            sub: "Specs with examples, not just specs",
            body: "Most partner teams weren’t designers, so specs without visuals assumed too much. Every spec came with a worked example: where logos belonged, where focal points should sit, what a correct aspect ratio looked like in practice.",
          },
          {
            sub: "Editable templates in Figma and Photoshop.",
            body: "Pre-built files with structure baked in. Partners could swap in their own art, copy, and colors without breaking the layout. Templates ensured every asset was correctly sized, positioned, and safe-zoned by default. Photoshop versions mattered because not every partner studio worked in Figma.",
          },
          {
            sub: "Mockup previews showing context",
            body: "Templates also showed the asset in context — how it would render on Raijin in production. Partner-side designers could see whether their work would land correctly before sending it for review, which cut a full negotiation cycle out of most campaigns.",
          },
        ],
      },
      {
        kind: "imageWide",
        image: partners54,
        caption:
          "On the left: the unified Notion spec. On the right: an example of some assets provided, and some mockups of how they were used for the campaigns. I also provided Figma and Photoshop starting templates in case they wanted it.",
      },
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
      {
        kind: "imageWide",
        image: exPopulus2,
        caption:
          "Design debt: a sample of the many conflicting and disjointed button styles we had used just within a single website.",
      },
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
      {
        kind: "imageWide",
        image: exPopulus3,
        caption:
          "Don’t have a design system? You’ll get endless rounds of QA and a mountain of documentation work, creating useless overhead that slows down business cycles and annoys all the team members.",
      },
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
            "Many designers instinctively reach for Inter when in need of a good-looking, functional default. But if you want a functional, readable default, you should pick Noto.",
            "Grotesques such as Helvetica or Inter look good, but the monotony and uniformity of glyph shapes means it’s less readable than humanist fonts such as Noto.",
            "Of course Inter’s main credit is its engineering, with its sophisticated hinting making it look good at small UI sizes. But Noto’s engineering is just as sophisticated, if not more. On top of that, it supports 7× more languages, and 162+ writing systems.",
            "If you’re picking Inter over Noto, it’s because of vibes and preference, not for any readability or functionality reasons.",
          ],
        },
      },
      {
        kind: "imageWide",
        image: exPopulus4,
        caption:
          "A sample of the components and blocks we built for this new design system.",
      },
      {
        kind: "section",
        heading: "Implementation",
        paragraphs: [
          "First, match Tailwind tokens to Figma variables — either build them in Figma directly or import from an existing paid library.",
          "My recommendation: start from a paid Figma template that already has Tailwind tokens wired up. It cuts hours of tedious setup and lets the team focus on the actual design work.",
          "Within a single day, designers can be shipping branded hi-fi screens with all tokens and specs in a format devs can build directly from.",
        ],
        aside: {
          heading: "Design stack",
          items: [
            {
              icon: shadcndesignIcon,
              heading: "shadcndesign",
              body: "Up-to-date Figma kit with customizable tokens and built in Tailwind variables.",
            },
            {
              icon: figmaIcon,
              heading: "Figma",
              body: "Everyone already knows how to use it and there’s so many useful integrations and plugins.",
            },
            {
              icon: claudeIcon,
              heading: "Claude Code",
              body: "Connect it to the Figma MCP to generate frontend code.",
            },
          ],
        },
      },
      {
        kind: "imageWide",
        image: exPopulus5,
        caption:
          "This Figma kit comes with components that are built and structured to be easily understandable to AI. In some cases handoff can be done with just a single Figma tool call with any agentic coding harness.",
      },
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
      {
        kind: "imageWide",
        image: xai2,
        caption:
          "A sample of three different node CLI interfaces. For products that are aiming for mass discoverability, the steep learning curve and unfriendly user experience makes these interfaces indecipherable for beginners.",
      },
      {
        kind: "section",
        heading: "Approach",
        paragraphs: [
          "I pushed for a consumer-facing desktop app when nothing in the category had one and nobody on the team thought it was necessary.",
          "The reasoning was simple: who actually buys a CLI application? Developers might tolerate a terminal for tools they use professionally, but the buyers for this product weren’t developers. They were investors and operators who wanted to put money in, run a node, and watch the rewards come in. Asking them to configure a CLI was asking the wrong audience to do the wrong work.",
          "The cost of building the UI was real but bounded. The cost of shipping CLI-only was every non-developer buyer we’d lose, which turned out to be most of them.",
        ],
      },
      {
        kind: "imageWide",
        image: xai3,
        caption:
          "BitTorrent is an example of a tool or technology that only achieved significant consumer adoption only after a graphical user interface became available. To this day the vast majority of users only interact with the technology through graphical UI.",
      },
      {
        kind: "section",
        heading: "An all-in-one desktop app",
        paragraphs: [
          "One desktop app handled the full buyer journey: purchase keys, complete KYC, monitor node status, track reward rate, manage the keys you owned. Everything an operator needed in one place, designed for someone who’d never opened a terminal.",
          "The design bet was that this audience didn’t want to learn the infrastructure. They wanted to participate in it.",
        ],
      },
      {
        kind: "imageWide",
        image: xai4,
        caption:
          "Significant resources were invested into making sure users could do anything a CLI user could do, without having to type a command, or look at an actual command line.",
      },
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
