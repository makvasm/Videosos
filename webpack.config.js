const path = require("path");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 9000,
        watchContentBase: true,
        progress: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    }
};