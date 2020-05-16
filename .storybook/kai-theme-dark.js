import { create } from "@storybook/theming/create";

export default create({
  base: "dark",

  // Storybook-specific color palette
  colorPrimary: "#FF4785", // coral
  colorSecondary: "#1EA7FD", // ocean

  // UI
  appBg: "#2f2f2f",
  appContentBg: "#333",
  appBorderColor: "rgba(255,255,255,.1)",
  appBorderRadius: 4,

  // Fonts
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: color.lightest,
  textInverseColor: color.darkest,

  // Toolbar default and active colors
  barTextColor: "#999999",
  barSelectedColor: color.secondary,
  barBg: color.darkest,

  // Form colors
  inputBg: "#3f3f3f",
  inputBorder: "rgba(0,0,0,.3)",
  inputTextColor: color.lightest,
  inputBorderRadius: 4,

  brandTitle: "Kai custom dark storybook",
  brandImage: "https://placehold.it/350x150"
});
