import posthog from "posthog-js";

// Build-time env vars (statically replaced by Vite). The Base layout
// only emits the importing <script> when both are present + we're in
// PROD, so this guard is a defensive last line, not the primary gate.
const key = import.meta.env.PUBLIC_POSTHOG_KEY;
const host = import.meta.env.PUBLIC_POSTHOG_HOST;

if (key && host) {
  posthog.init(key, {
    api_host: host,
    person_profiles: "identified_only",
  });
}
