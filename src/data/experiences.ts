export interface Experience {
  period: string;
  live?: boolean;
  logoText: string;
  logoBg: string;
  logoColor?: string;
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
    logoText: "GH",
    logoBg: "#151515",
    logoColor: "#fff",
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
    logoText: "Ni",
    logoBg: "#7C3AED",
    logoColor: "#fff",
    title: "Senior Software Engineer",
    company: "Nira",
    url: "https://www.nira.com/",
    location: "California, US (Remote)",
    details:
      "Helped companies take control over their documents, enhancing the transparency of both internal and external access to company records.",
    tags: ["TypeScript", "React", "Next.js", "tRPC", "GraphQL", "ElasticSearch", "AWS"],
  },
  {
    period: "2022 — 2023",
    logoText: "SO",
    logoBg: "#F48024",
    logoColor: "#fff",
    title: "Software Engineer",
    company: "Stack Overflow",
    url: "https://stackoverflow.com/",
    location: "New York, US (Remote)",
    details:
      "Part of the Awareness team, primarily involved in optimizing ads and metrics to improve click-through rates, automation, and impressions.",
    tags: ["TypeScript", "Webpack", "C#", "SQL", "Redis", "ElasticSearch", "Google Ads"],
  },
  {
    period: "2022 — 2022",
    logoText: "Y",
    logoBg: "#9AC93C",
    logoColor: "#151515",
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
    logoText: "Gs",
    logoBg: "#E4002B",
    logoColor: "#fff",
    title: "Software Engineer",
    company: "Gamesys Group",
    url: "https://www.gamesysgroup.com/",
    location: "Skövde, Sweden (Hybrid)",
    details: "Developed payment APIs and mocking solutions for the online gambling platform.",
    tags: ["JavaScript", "Vue", "PHP", "Java", "Docker"],
  },
  {
    period: "2015 — 2020",
    logoText: "As",
    logoBg: "#1D4AFF",
    logoColor: "#fff",
    title: "Software Engineer",
    company: "Asitis",
    url: "https://www.aptic.net/",
    location: "Skövde, Sweden (Hybrid)",
    details: "Front-end development team leader for a cloud-based project called Cloudware.",
    tags: ["JavaScript", "React", "Redux", "Webpack", "Microsoft Azure", "C#", "SQL"],
  },
];
