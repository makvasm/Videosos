import { LoadFromLocalStorage } from "./utils"

export const socket = io.connect(window.location.origin);

let playerNode = document.getElementById("player")
playerNode.volume = 0.1

LoadFromLocalStorage()


socket.on("connect", () => {

  socket.emit("init")


  socket.on("init", (uri) => {
    playerNode.src = uri
  })

  socket.on("videochanged", (uri) => {
    playerNode.src = uri
  });

  socket.on("videoplayed", () => {
    playerNode.play()
  });

  socket.on("videopaused", () => {
    playerNode.pause()
  });

});



// События плеера /////////////////////

playerNode.addEventListener("play", (event) => {
  if(event.isTrusted){
    socket.emit("videoplayed")
  }
})
playerNode.addEventListener("pause", (event) => {
  if(event.isTrusted){
    socket.emit("videopaused")
  }
})


window.onunload =
  window.onbeforeunload = () => {
    socket.close();
  }
