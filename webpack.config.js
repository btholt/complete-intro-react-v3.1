const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/ClientApp.js",
  devtool: "source-map",
  mode: "development",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
      }
    ]
  }
};
