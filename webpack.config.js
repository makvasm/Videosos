const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    App: "./src/App.jsx",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "/public/")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js?x$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          }
        },
      }
    ]
  }
}