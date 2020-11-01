const express = require("express");
const app = express();
const { ExpressPeerServer } = require('peer');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")

const ParseThread = require("./utils").ParseThread;

const port = process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);

// const peerServer = ExpressPeerServer(server, {
//   debug: true
// });

// app.use('/peer', peerServer);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())
app.use(cookieParser())


app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/videoplayer.html")
})

app.post("/api/getvideos", async (req, res) => {
  if (!req.body.url) return res.status(400).send();
  res.status(200).json(await ParseThread(req.body.url));
})

server.listen(port, () => console.log(`Сервер http://localhost:${port}`));
