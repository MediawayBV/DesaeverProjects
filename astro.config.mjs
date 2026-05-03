// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

const SITE = "https://mediawaybv.github.io";
const BASE = "/desaeverprojects";

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: "ignore",
  i18n: {
    defaultLocale: "nl",
    locales: ["nl", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "nl",
        locales: { nl: "nl-BE", en: "en" },
      },
    }),
    icon({
      include: {
        lucide: [
          "wrench",
          "hammer",
          "paintbrush",
          "bath",
          "chef-hat",
          "drill",
          "hard-hat",
          "clock",
          "shield-check",
          "message-circle",
          "users",
          "phone",
          "mail",
          "map-pin",
          "menu",
          "x",
          "arrow-right",
          "check",
          "globe",
        ],
      },
    }),
  ],
});
