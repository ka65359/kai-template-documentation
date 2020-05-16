import { addParameters } from "@storybook/react";
import { themes } from "@storybook/theming";
import "../src/index.scss";
//import kaiDark from './kai-theme-dark';

addParameters({
  options: {
    theme: themes.dark
  }
});

/*
addons.setConfig({
  theme: kaiDark,
});
 */
