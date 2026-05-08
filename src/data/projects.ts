interface SparklineData {
  value: string;
  label: string;
  data: readonly number[];
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
  title: string;
  subtitle: string;
  kind: ProjectKind;
  url: string;
  details: string;
  tags: readonly string[];
  links: readonly ProjectLink[];
  sparkline?: SparklineData;
}

export const projects: readonly Project[] = [
  {
    featured: true,
    badge: "Latest",
    logo: "/projects/cooking-with-fralle.png",
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
      value: "1.2k",
      label: "Visitors (30d)",
      data: [
        4, 8, 6, 12, 9, 15, 18, 22, 17, 28, 24, 32, 29, 35, 31, 38, 42, 36, 44, 48, 52, 46, 55, 58, 53, 62, 68, 64, 72,
        76,
      ],
    },
  },
  {
    logo: "/projects/copy-code-context.png",
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
      value: "8.4k",
      label: "Commands invoked (90d)",
      data: [
        12, 18, 15, 24, 22, 28, 35, 32, 40, 38, 45, 52, 48, 56, 62, 58, 68, 72, 69, 76, 82, 78, 85, 92, 88, 96, 102, 98,
        108, 115,
      ],
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
