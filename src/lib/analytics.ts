import posthog from "posthog-js";

const key = import.meta.env.PUBLIC_POSTHOG_KEY;
const host = import.meta.env.PUBLIC_POSTHOG_HOST;

if (key && host) {
  posthog.init(key, {
    api_host: host,
    person_profiles: "identified_only",
    disable_surveys: true,
    disable_session_recording: true,
    capture_performance: false,
    capture_dead_clicks: false,
    capture_heatmaps: false,
    enable_heatmaps: false,
  });
}
