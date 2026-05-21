import type { EntryCardView } from "../components/entry-card-view";

export interface Experience {
  period: string;
  live?: boolean;
  logo: string;
  logoScale?: number;
  title: string;
  company: string;
  url: string;
  location: string;
  details: string;
  tags: readonly string[];
}

export const experiences: readonly Experience[] = [
  {
    period: "2024 — Now",
    live: true,
    logo: "/logos/getharley.svg",
    logoScale: 1.05,
    title: "Frontend Engineer",
    company: "GetHarley",
    url: "https://getharley.com/",
    location: "London, UK (Remote)",
    details:
      "**Co-built** the AI-driven consultation transcription product now used by **~15 design-partner clinics** for around **80%** of their consultations.\n\n**Led** a catalog-variants migration that touched the data model, AI pipeline, and patient-facing UI.\n\n**Built and now maintain** the patient recall and follow-up Lambda systems in production.",
    tags: ["TypeScript", "React", "Next.js", "AWS Amplify", "AWS Lambda", "DynamoDB", "Bedrock", "PostHog"],
  },
  {
    period: "2023 — 2024",
    logo: "/logos/nira.svg",
    logoScale: 1,
    title: "Senior Software Engineer",
    company: "Nira",
    url: "https://www.nira.com/",
    location: "California, US (Remote)",
    details:
      "**Architected and solo-built DSA**, a lightweight free-tier acquisition product, bootstrapping the monorepo, auth, CI/CD, storage, and UI surface.\n\n**Replaced manual customer onboarding** with a fully automated self-service flow backed by a cloud-document ingest cron worker.",
    tags: ["TypeScript", "React", "Next.js", "tRPC", "GraphQL", "Elasticsearch", "MongoDB", "AWS", "PostgreSQL"],
  },
  {
    period: "2022 — 2023",
    logo: "/logos/stackoverflow.svg",
    logoScale: 0.9,
    title: "Software Engineer",
    company: "Stack Overflow",
    url: "https://stackoverflow.com/",
    location: "New York, US (Remote)",
    details:
      "**Led the ed-tech course ad-serving product** (Udemy and Pluralsight affiliate partnerships) end-to-end, covering catalog ingest, validation, ranking, and CTR-driven experimentation on Stack Overflow question pages.\n\n**Built a .NET catalog validation pipeline** that verified course titles, categories, and pricing against live partner pages before serving them as ads.",
    tags: ["TypeScript", "Webpack", "C#", ".NET", "SQL", "Redis", "Elasticsearch", "Google Ads"],
  },
  {
    period: "2022 — 2022",
    logo: "/logos/yubico.svg",
    logoScale: 1.1,
    title: "Senior Software Engineer",
    company: "Yubico",
    url: "https://www.yubico.com/",
    location: "California, US (Remote)",
    details:
      "**Maintained** an e-commerce website built on React and **oversaw the migration** of its functionality to a new Svelte-based application.",
    tags: ["TypeScript", "React", "Next.js", "Svelte", "TailwindCSS", "MySQL", "Docker"],
  },
  {
    period: "2020 — 2022",
    logo: "/logos/gamesys.svg",
    logoScale: 0.9,
    title: "Software Engineer",
    company: "Gamesys Group",
    url: "https://www.gamesysgroup.com/",
    location: "Skövde, Sweden (Hybrid)",
    details: "**Developed payment APIs and mocking solutions** for the online gambling platform.",
    tags: ["JavaScript", "Vue", "PHP", "Java", "Docker"],
  },
  {
    period: "2015 — 2020",
    logo: "/logos/asitis.svg",
    logoScale: 0.9,
    title: "Software Engineer",
    company: "Asitis",
    url: "https://www.aptic.net/",
    location: "Skövde, Sweden (Hybrid)",
    details: "**Front-end development team leader** for a cloud-based project called **Cloudware**.",
    tags: ["JavaScript", "React", "Redux", "Webpack", "Microsoft Azure", "C#", "SQL"],
  },
];

export function getCareerYears(): number {
  const startYears = experiences.map((e) => Number.parseInt(e.period, 10)).filter(Number.isFinite);
  return new Date().getFullYear() - Math.min(...startYears);
}

export function experienceToCardView(e: Experience): EntryCardView {
  return {
    period: { text: e.period, live: e.live },
    logo: { src: e.logo, scale: e.logoScale },
    title: { text: e.title, suffix: e.company },
    url: e.url,
    rows: [{ icon: "location", text: e.location }],
    details: e.details,
    tags: e.tags,
  };
}
