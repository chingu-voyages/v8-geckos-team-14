const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "./tab.html",
      favicon: "./src/content/gfx/favicon.gif"
    }),
    // Copies files needed by chrome to dist folder
    new CopyPlugin([
      { from: 'manifest.json', to: '' },
      { from: 'src/newtab.js', to: '' },
      { from: 'src/reset.css', to: '' },
      { from: 'src/content/gfx', to: 'src/content/gfx' },
    ]),
  ]
};