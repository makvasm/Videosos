const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const path = require("path")

const ParseThread = require("./utils").ParseThread;

let currentVideo;
let rooms = [];

const port = process.env.PORT || 3000;

const http = require("http");
const { resolveSoa } = require("dns");
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
    socket.to(socket.rooms[0]).emit("videochanged", uri);
    currentVideo = uri;
  })

  socket.on("videopaused", () => {
    socket.to(socket.rooms[0]).emit("videopaused");
  })

  socket.on("videoplayed", (time) => {
    socket.to(socket.rooms[0]).emit("videoplayed", time);
  })

});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/broadcast.html")
})

// app.get("/:room", (req, res) => {
//   res.sendFile(__dirname + "/public/broadcast.html")
// })



app.get("/joinRoom", (req, res) => {
  let room
  if(room = rooms.find(e => e.pass === req.query.roompass)){
    res.redirect(`/${req.query.roomname}`)
  } else res.redirect("/")
})

app.get("/api/getroomlist", (req, res) => {
  let resp = []
  rooms.forEach(room => {
    resp.push(room.name)
  })
  res.json(resp)
})

app.post("/api/getvideos", async (req, res) => {
  if (!req.body.uri) return res.send("")
  res.json(await ParseThread(req.body.uri))
})

app.post("/api/createroom", (req, res) => {
  if (rooms.length > 20) return res.send("")

  if (!rooms.find(room => {
    if (room.pass === req.body.roompass || room.name === req.body.roomname) return true
  })) {
    rooms.push({
      name: req.body.roomname,
      pass: req.body.roompass,
    })
  }
})

server.listen(port, () => console.log(`Server is running on port ${port}`));
