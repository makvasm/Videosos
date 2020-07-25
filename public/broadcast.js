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

  socket.on("videoplayed", async (time, id) => {
    if(id !== socket.id){
      await playerNode.play()
      if(playerNode.currentTime < time - 2 && playerNode.currentTime > time + 2) playerNode.currentTime = time
    } else {
      console.log("it's me")
    }
  });

  socket.on("videopaused", (id) => {
    if(id !== socket.id){
      playerNode.pause()
    } else {
      console.log("it's me")
    }
  });

});



// События плеера /////////////////////

playerNode.addEventListener("play", (event) => {
  if(event.isTrusted){
    socket.emit("videoplayed", playerNode.currentTime)
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
