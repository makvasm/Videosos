const path = require("path")

module.exports = {
    mode: "production",
    entry: {
        streaming: "./src/streaming/streaming.js",
        sockets: "./src/videoplayer/sockets.js",
        Player: "./src/videoplayer/Player.js",
        Room: "./src/videoplayer/Room.js",
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