const path = require("path");

module.exports = {
  entry: [
    "./js/backend.js",
    "./js/util.js",
    "./js/debounce.js",
    "./js/main.js",
    "./js/dialog.js",
    "./js/pictureEffects.js",
    "./js/validity.js",
    "./js/rendercomments.js",
    "./js/filter.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};