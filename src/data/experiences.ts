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
      "Contributing to a telehealth platform that connects patients with expert clinicians, focusing on enhancing user experience, implementing new features and designs.",
    tags: ["TypeScript", "React", "Next.js", "AWS"],
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
      "Helped companies take control over their documents, enhancing the transparency of both internal and external access to company records.",
    tags: ["TypeScript", "React", "Next.js", "tRPC", "GraphQL", "Elasticsearch", "AWS"],
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
      "Part of the Awareness team, primarily involved in optimizing ads and metrics to improve click-through rates, automation, and impressions.",
    tags: ["TypeScript", "Webpack", "C#", "SQL", "Redis", "Elasticsearch", "Google Ads"],
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
      "Maintained an e-commerce website built on React and oversaw the migration of its functionality to a new Svelte-based application.",
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
    details: "Developed payment APIs and mocking solutions for the online gambling platform.",
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
    details: "Front-end development team leader for a cloud-based project called Cloudware.",
    tags: ["JavaScript", "React", "Redux", "Webpack", "Microsoft Azure", "C#", "SQL"],
  },
];

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
