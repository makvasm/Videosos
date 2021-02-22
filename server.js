const express = require("express");
const app = express();
const { ExpressPeerServer } = require('peer');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")

const path = require("path")
const mongodb = require("mongodb")

const ParseThread = require("./utils").ParseThread;
const connect = require("./utils").connect;

const port = process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server);

const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use('/peer', peerServer);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())
app.use(cookieParser())



let currentVideo;
let host;


io.sockets.on("error", e => console.log(e));

io.sockets.on("connection", socket => {

  if (!host) {
    host = socket
    socket.emit("host")
  }

  socket.on("init", () => {
    socket.emit("init", currentVideo)
  })

  socket.on("videochanged", (uri) => {
    socket.broadcast.emit("videochanged", uri);
    currentVideo = uri;
  })

  socket.on("videopaused", () => {
    socket.broadcast.emit("videopaused");
  })

  socket.on("videoplayed", (time) => {
    socket.broadcast.emit("videoplayed", time);
  })

  socket.on("disconnect", () => {
    if (socket === host) host = null
  })

});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/videoplayer.html")
})

app.get("/streaming", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/streaming.html"))
})


app.post("/api/getvideos", async (req, res) => {
  if (!req.body.url) return res.send({})
  res.json(await ParseThread(req.body.url))
})




server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
