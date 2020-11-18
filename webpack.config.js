const path = require(`path`);
const webpack = require("webpack");

const config = {
  devtool: false,
  entry: [
    "./js/backend.js",
    "./js/util.js",
    "./js/debounce.js",
    "./js/dialog.js",
    "./js/pictureEffects.js",
    "./js/validity.js",
    "./js/comments.js",
    "./js/filter.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.mode = "development";
    config.devtool = "source-map";
    config.devServer = {
      open: true,
      port: 3000,
    };
    config.plugins = [new webpack.HotModuleReplacementPlugin()];
  }

  return config;
};
