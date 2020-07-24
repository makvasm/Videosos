const path = require("path")

module.exports = {
    mode: "development",
    entry: {
        main: "./public/broadcast.js"
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