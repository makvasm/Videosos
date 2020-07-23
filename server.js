const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const ParseThread = require("./utils").ParseThread;

let broadcaster;
let currentVideo;

const port = process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())


io.sockets.on("error", e => console.log(e));


io.sockets.on("connection", socket => {

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
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
  });

});

app.post("/api/getvideos", async (req, res) => {
  if(!req.body.uri) return res.send("")
  res.json(await ParseThread(req.body.uri))
})

server.listen(port, () => console.log(`Server is running on port ${port}`));
