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


io.sockets.on("error", e => console.log(e));


let currentVideo;
let host;


io.sockets.on("connection", socket => {
  console.log("connect")

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

app.get("/room/:id", async (req, res) => {
  let con = await mongodb.connect("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true })

  let rooms = con.db("videosos").collection("rooms")

  rooms.findOne({
    _id: req.params.id
  }, (err, result) => {
    con.close()
    if (err) return res.redirect("/")
    if (result._id === req.cookies.authed) res.sendFile(__dirname + "/public/videoplayer.html")
    else res.redirect("/")
  })
})


app.get("/room", async (req, res) => {
  let con = await mongodb.connect("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true })

  let rooms = con.db("videosos").collection("rooms")
  rooms.findOne({
    name: req.query.roomname,
    pass: req.query.roompass
  }, (err, result) => {
    con.close()
    if (err) res.redirect("/")
    else {
      res.cookie("authed", result._id, { "maxAge": 1000 * 60 * 60 * 24 })
      res.redirect(`/${resul._id}`)
    }
  })

})


app.get("/api/getroomlist", async (req, res) => {
  let resp = []
  let con = await mongodb.connect("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true })

  let rooms = con.db("videosos").collection("rooms")

  rooms.find().forEach(room => {
    resp.push(room.name)
  }, () => {
    con.close()
    res.json(resp)
  })
})


app.post("/api/getvideos", async (req, res) => {
  if (!req.body.uri) return res.send("")
  res.json(await ParseThread(req.body.uri))
})


app.post("/api/createroom", async (req, res) => {
  let con = await mongodb.connect("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true })
  let rooms = con.db("videosos").collection("rooms")

  rooms.insertOne({
    name: req.body.roomname,
    pass: req.body.roompass
  }, (err, result) => {
    if (err) res.send(err)
    else res.send(result.name)
    con.close()
  })
})



server.listen(port, () => console.log(`Server is running on port ${port}`));
