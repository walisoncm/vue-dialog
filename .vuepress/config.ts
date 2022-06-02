import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/vue-dialog/",
  lang: "en-US",
  title: "walisoncm/vue-dialog",
  themeConfig: {
    repo: "walisoncm/vue-dialog",
    contributors: false,
  },
});
