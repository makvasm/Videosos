const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")

const path = require("path")

const ParseThread = require("./utils").ParseThread;

let currentVideo;

const port = process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())
// app.use(cookieParser())


io.sockets.on("error", e => console.log(e));


io.sockets.on("connection", socket => {

  // socket.on("joined", pathname => {
  //   socket.join(pathname)
  //   socket.rooms.currentRoom
  // })

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

});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/broadcast.html")
})

// app.get("/:room", (req, res) => {
//   res.sendFile(__dirname + "/public/broadcast.html")
// })



// app.get("/api/getroomlist", (req, res) => {
//   let resp = []
//   rooms.forEach(room => {
//     resp.push(room.name)
//   })
//   res.json(resp)
// })

app.post("/api/getvideos", async (req, res) => {
  if (!req.body.uri) return res.send("")
  res.json(await ParseThread(req.body.uri))
})

// app.post("/api/createroom", (req, res) => {
//   if (rooms.length > 20) return res.send("")

//   if (!rooms.find(room => {
//     if (room.pass === req.body.roompass || room.name === req.body.roomname) return true
//   })) {
//     rooms.push({
//       name: req.body.roomname,
//       pass: req.body.roompass,
//     })
//   }
//   res.redirect("/")
// })

server.listen(port, () => console.log(`Server is running on port ${port}`));
