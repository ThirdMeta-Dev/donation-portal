import type { AppEnvironment } from "./cms-types";

export const APP_ENV: AppEnvironment =
  (import.meta.env.VITE_ENVIRONMENT as AppEnvironment) ?? "production";
