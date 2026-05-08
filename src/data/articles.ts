interface ArticleLink {
  label: string;
  href: string;
}

export interface Article {
  logo: string;
  logoScale?: number;
  title: string;
  subtitle: string;
  url: string;
  details: string;
  tags: readonly string[];
  links: readonly ArticleLink[];
}

export const articles: readonly Article[] = [
  {
    logo: "/articles/trpc-article.webp",
    title: "Using OpenAPI to detect breaking changes in tRPC",
    subtitle: "Medium · 2023",
    url: "https://medium.com/@fralle/harnessing-openapi-to-track-and-domesticate-wild-trpc-changes-050b24b33a76",
    details: "Keep your API in check with OpenAPI and schema validation.",
    tags: ["API", "tRPC", "OpenAPI", "Automation"],
    links: [
      {
        label: "Read",
        href: "https://medium.com/@fralle/harnessing-openapi-to-track-and-domesticate-wild-trpc-changes-050b24b33a76",
      },
    ],
  },
  {
    logo: "/articles/mock-article.webp",
    title: "Mocking tRPC routes with type safety in TypeScript",
    subtitle: "Medium · 2023",
    url: "https://medium.com/@fralle/mocking-trpc-routes-with-type-safety-in-typescript-8b8dbc1281b2",
    details: "Ensure your mocks always align with your original routes using advanced TypeScript patterns.",
    tags: ["API", "tRPC", "Mock", "Testing", "TypeScript"],
    links: [
      {
        label: "Read",
        href: "https://medium.com/@fralle/mocking-trpc-routes-with-type-safety-in-typescript-8b8dbc1281b2",
      },
    ],
  },
  {
    logo: "/articles/fibonacci-article.webp",
    title: "Overengineering the Fibonacci sequence in JavaScript",
    subtitle: "Medium · 2023",
    url: "https://medium.com/@fralle/overengineering-the-fibonacci-sequence-in-javascript-e209a9e7db2f",
    details: "From a straightforward approach towards more sophisticated and optimized versions.",
    tags: ["Memoization", "Closure", "Algorithms", "JavaScript"],
    links: [
      {
        label: "Read",
        href: "https://medium.com/@fralle/overengineering-the-fibonacci-sequence-in-javascript-e209a9e7db2f",
      },
    ],
  },
];
