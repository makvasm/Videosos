const path = require("path")

module.exports = {
    mode: "production",
    entry: {
        videoplayer: "./src/videoplayer/videoplayer.js",
        streaming: "./src/streaming/streaming.js"
    },
    output : {
        filename: "[name].js",
        path: path.join(__dirname, "/public/")
    },
    module : {
        rules : [
            {
                test: /\.css$/,
                use : ["style-loader", "css-loader"]
            },
            {
                test: /\.js?x$/,
                exclude: /node_modules/,
                use: "babel-loader",
                options: {
                    preset: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        ]
    }
}