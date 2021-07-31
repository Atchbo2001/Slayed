const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  stats: "minimal",
  entry: path.resolve(__dirname, "../../src/main.js"),
  output: {
    path: path.resolve(__dirname, "../../shopify/assets/"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: ["*", ".js", ".json", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "../../src/"),
      "@shopify-directory": path.resolve(__dirname, "../../shopify/"),
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.(css|postcss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: require(path.resolve(
                __dirname,
                "../postcss.config.js"
              )),
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: ["/node_modules"],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    /**
     * don't clean files with the 'static' keyword in their filename
     * docs: https://github.com/johnagan/clean-webpack-plugin
     */
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: ["**/*", "!*static*"],
    // }),
    /**
     * docs: https://webpack.js.org/plugins/mini-css-extract-plugin
     */
    new MiniCssExtractPlugin({
      filename: "./bundle.css",
      chunkFilename: "[id].css",
    }),
  ],
};
