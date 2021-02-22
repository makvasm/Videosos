export const socket = io.connect(window.location.origin);
import { PlayerInstance } from './init'

socket.on("connect", () => {

  PlayerInstance.init()

  socket.on("videochanged", (url) => {
    PlayerInstance.setVideoNotManually(url)
  });

  socket.on("videoplayed", async (time) => {
    PlayerInstance.setTime(time)
    await PlayerInstance.play()
  });

  socket.on("videopaused", () => {
    PlayerInstance.pause()
  });

});



// События плеера

PlayerInstance.addEventListener('videochanged', (url) => {
  socket.emit('videochanged', url)
})

PlayerInstance.playerElem.addEventListener("play", (event) => {
  socket.emit("videoplayed", PlayerInstance.currentTime())
})
PlayerInstance.playerElem.addEventListener("pause", (event) => {
  socket.emit("videopaused")
})


window.onunload =
  window.onbeforeunload = () => {
    socket.close();
  }
