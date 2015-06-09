var path    = require("path");
var neat    = require('node-neat').includePaths;
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var sassPaths = neat.map(function (sassPath) {
  return "includePaths[]=" + sassPath;
}).join("&");

module.exports = {
  cache: true,
  entry: {
    main: "./assets/js/main"
  },
  output: {
    path: path.join(__dirname, "public", "assets"),
    // publicPath: "assets/",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style',
            'css!autoprefixer?browsers=last 10 versions!sass?' + sassPaths)
      },
      {
        test: /\.(js|es6)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /fonts\/.+\.(eot|ttf|woff|woff2|svg)$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: require.resolve('url-loader') + '?limit=10000&minetype=image/png'
      }
    ],
    noParse: [
      /\.min\.js/
    ]
  },
  externals: {
    jquery: "jQuery"
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.ProvidePlugin({
      // Automtically detect jQuery and $ as free var in modules
      // and inject the jquery library
      // This is required by many jquery plugins
      jQuery: "jquery",
      $: "jquery"
    })
  ]
};
