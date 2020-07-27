const path = require("path")

module.exports = {
    mode: "development",
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
            }
        ]
    }
}