require('dotenv').config()

const DBConf = require('./dbconfig').DBConf
const { Sequelize, DataTypes } = require('sequelize')

const dbconf = new DBConf()
const db = new Sequelize(dbconf.url())


const Room = db.define('Room', {
  name: {
    type: DataTypes.STRING
  },
  video: {
    type: DataTypes.TEXT({
      length: 500
    }),
  }
})

db.sync({ force: true }).then(() => {
  Room.create({
    name: 'main',
  })
})




const express      = require('express');
const app          = express();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser')

const path         = require('path')

const ParseThread  = require('./utils').ParseThread;

const port         = process.env.PORT || 3000;

const http         = require('http');
const server       = http.createServer(app);

const io           = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(cookieParser())


io.sockets.on('error', e => console.log(e));

io.sockets.on('connection', socket => {

  socket.on('videochanged', (uri) => {
    socket.broadcast.emit('videochanged', uri);
  })

  socket.on('videopaused', () => {
    socket.broadcast.emit('videopaused');
  })

  socket.on('videoplayed', (time) => {
    socket.broadcast.emit('videoplayed', time);
  })

});


// WEB
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/videoplayer.html')
})

app.get('/streaming', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/streaming.html'))
})



// API
app.post('/api/getvideos', async (req, res) => {
  if (!req.body.url) return res.status(400).send()
  res.json(await ParseThread(req.body.url))
})

app.post('/api/createRoom', async (req, res) => {
  return res.send({})
})

app.post('/api/setRoomVideo', async (req, res) => {
  if (!req.body.url || !req.body.name) return res.status(400).send()
  let resp = await Room.update({ video: req.body.url }, {
    where: {
      name: req.body.name
    }
  })
  res.send(resp)
})

app.post('/api/getRoomByName', async (req, res) => {
  if(!req.body.name) return res.status(400).send()
  return res.json(await Room.findOne({
    where: {
      name: req.body.name
    }
  }))
})





server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
