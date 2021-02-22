const path = require("path")

module.exports = {
    mode: "production",
    entry: {
        videoplayer: "./src/videoplayer/videoplayer.js",
        streaming: "./src/streaming/streaming.js",
        Player: "./src/videoplayer/Player.js",
        init: "./src/videoplayer/init.js",
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