import { LoadFromLocalStorage } from "./utils"

export const socket = io.connect(window.location.origin);

let playerNode = document.getElementById("player")
playerNode.volume = 0.1

let isHost;

LoadFromLocalStorage()


socket.on("connect", () => {

  socket.on("host", () => {
    isHost = true
    document.title = "Хост"
  })

  socket.emit("init")

  socket.on("init", (uri) => {
    playerNode.src = uri
  })

  socket.on("videochanged", (uri) => {
    playerNode.src = uri
  });

  socket.on("videoplayed", async (time) => {
    playerNode.currentTime = time
    await playerNode.play()
  });

  socket.on("videopaused", () => {
    playerNode.pause()
  });

});



// События плеера /////////////////////

playerNode.addEventListener("play", (event) => {
  if (event.isTrusted && isHost) {
    socket.emit("videoplayed", playerNode.currentTime)
  }
})
playerNode.addEventListener("pause", (event) => {
  if (event.isTrusted && isHost) {
    socket.emit("videopaused")
  }
})


window.onunload =
  window.onbeforeunload = () => {
    socket.close();
  }
