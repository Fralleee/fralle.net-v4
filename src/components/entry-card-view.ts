export type EntryCardIcon = "location" | "kind-web" | "kind-extension" | "kind-game" | "subtitle";

interface EntryCardRow {
  icon: EntryCardIcon;
  text: string;
}

interface EntryCardLink {
  label: string;
  href: string;
}

interface SparklineRef {
  posthogId: string;
  label: string;
}

export interface EntryCardView {
  period?: { text: string; live?: boolean };
  logo: { src: string; scale?: number };
  title: { text: string; suffix?: string };
  url: string;
  rows?: readonly EntryCardRow[];
  details: string;
  sparkline?: SparklineRef;
  tags: readonly string[];
  links?: readonly EntryCardLink[];
  featured?: { badge: string };
}
