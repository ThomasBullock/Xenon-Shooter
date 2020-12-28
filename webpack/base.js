/*
Based on https://medium.com/swlh/configuring-your-phaser-3-game-with-webpack-for-production-795329e15a6f
*/

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map", // Each module is executed with
  // eval() and a SourceMap is added as a DataUrl to the eval().     // Initially it is slow, but it provides fast rebuild speed and
  // yields real files
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // {
      //   test: [/\.vert$/, /\.frag$/],
      //   use: "raw-loader"
      // }, // in case you need to use Vertex and Fragment shaders, // this loader will bundle them for you.
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../"),
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
