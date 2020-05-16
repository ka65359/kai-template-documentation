const path = require("path");
const { version } = require("./package");

module.exports = {
  components: ["src/components/**/[A-Z]*.js", "src/content/**/[A-Z]*.js"],
  defaultExample: true,
  moduleAliases: {
    components: path.resolve(__dirname, "src/components"),
    content: path.resolve(__dirname, "src/content")
  },
  theme: {
    color: {
      link: "firebrick",
      linkHover: "salmon"
    },
    fontFamily: {
      base: '"Comic Sans MS", "Comic Sans", cursive'
    }
  },
  styles: {
    Logo: {
      // We're changing the LogoRenderer component
      "logo": {
        // We're changing the rsg--logo-XX class name inside the component
        animation: "blink ease-in-out 300ms infinite"
      },
      "@keyframes blink": {
        to: { opacity: 0 }
      }
    }
  },
  ribbon: {
    url: "https://github.com/ka65359/kai-template-storybook.git",
    text: "Fork me on GitHub"
  },
  version,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          loader: "style-loader"
        },
        {
          test: /\.scss$/,
          loader: "sass-loader"
        }
      ]
    }
  }
};
