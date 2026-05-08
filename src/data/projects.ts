interface SparklineSource {
  posthogId: string;
  label: string;
}

interface ProjectLink {
  label: string;
  href: string;
}

type ProjectKind = "web" | "extension" | "game";

export interface Project {
  featured?: boolean;
  badge?: string;
  logo: string;
  logoScale?: number;
  title: string;
  subtitle: string;
  kind: ProjectKind;
  url: string;
  details: string;
  tags: readonly string[];
  links: readonly ProjectLink[];
  sparkline?: SparklineSource;
}

export const projects: readonly Project[] = [
  {
    featured: true,
    badge: "Latest",
    logo: "/projects/cooking-with-fralle.png",
    logoScale: 1.12,
    title: "Cooking with Fralle",
    subtitle: "Next.js App",
    kind: "web",
    url: "https://cooking.fralle.net/",
    details: "Next.js recipe app using Payload CMS. Also contains my best recipes.",
    tags: ["TypeScript", "Next.js", "Payload CMS"],
    links: [
      { label: "Code", href: "https://github.com/Fralleee/cooking-with-fralle-v2/" },
      { label: "Live", href: "https://cooking.fralle.net/" },
    ],
    sparkline: {
      posthogId: "7OrpqaRG",
      label: "Visitors (30 days)",
    },
  },
  {
    logo: "/projects/copy-code-context.png",
    logoScale: 1.12,
    title: "Copy Context",
    subtitle: "VSCode Extension",
    kind: "extension",
    url: "https://marketplace.visualstudio.com/items?itemName=Fralle.copy-code-context",
    details:
      "VSCode extension that copies file/folder structure for sharing in Markdown — ready to paste into chats, docs, or code reviews.",
    tags: ["TypeScript", "VSCode"],
    links: [
      { label: "Code", href: "https://github.com/fralleee/copy-context/" },
      {
        label: "Marketplace",
        href: "https://marketplace.visualstudio.com/items?itemName=Fralle.copy-code-context",
      },
    ],
    sparkline: {
      posthogId: "qZPEi5DV",
      label: "Commands invoked (90 days)",
    },
  },
  {
    logo: "/projects/shotkit.png",
    title: "ShotKit",
    subtitle: "Web App",
    kind: "web",
    url: "https://shotkit.fralle.net/",
    details: "Screenshot beautifier that lets you paste, style, and export polished screenshots with minimal friction.",
    tags: ["TypeScript", "React"],
    links: [
      { label: "Code", href: "https://github.com/fralleee/shot-kit" },
      { label: "Live", href: "https://shotkit.fralle.net/" },
    ],
  },
  {
    logo: "/projects/quiz-game.png",
    title: "Quiz Game",
    subtitle: "Web Game",
    kind: "game",
    url: "https://quiz.fralle.net/",
    details:
      "Real-time multiplayer quiz with AI-generated questions. Create or join a game, pick a topic, and race for points over SSE.",
    tags: ["TypeScript", "Next.js", "SSE"],
    links: [
      { label: "Code", href: "https://github.com/Fralleee/quiz-game" },
      { label: "Play", href: "https://quiz.fralle.net/" },
    ],
  },
  {
    logo: "/projects/code-clicker.png",
    logoScale: 1.1,
    title: "Code Clicker",
    subtitle: "Web Game",
    kind: "game",
    url: "https://clicker.fralle.net/",
    details:
      "Programming-themed idle game where every building you run generates tech debt that scales the production penalty.",
    tags: ["TypeScript", "React"],
    links: [
      { label: "Code", href: "https://github.com/Fralleee/code-clicker" },
      { label: "Play", href: "https://clicker.fralle.net/" },
    ],
  },
  {
    logo: "/projects/disney-plus.png",
    title: "Disney+ Unblur",
    subtitle: "Chrome Extension",
    kind: "extension",
    url: "https://chromewebstore.google.com/detail/disney+-unblur/epegomjmecdogfefcmadjkbinicbldmb",
    details: "Removes the blur overlay that appears on video controls and subtitles on Disney+.",
    tags: ["TypeScript", "Chrome API"],
    links: [
      { label: "Code", href: "https://github.com/Fralleee/disneyplus-unblur/" },
      {
        label: "Install",
        href: "https://chromewebstore.google.com/detail/disney+-unblur/epegomjmecdogfefcmadjkbinicbldmb",
      },
    ],
  },
  {
    logo: "/projects/vakt.png",
    title: "VAKT",
    subtitle: "Game · Unity",
    kind: "game",
    url: "https://www.youtube.com/@vakt-game",
    details: "Tower defense game where you upgrade and protect a single tower against waves of enemies.",
    tags: ["Unity", "C#"],
    links: [{ label: "YouTube", href: "https://www.youtube.com/@vakt-game" }],
  },
];
