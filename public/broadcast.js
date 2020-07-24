import { LoadFromLocalStorage, player } from "./utils"

export const socket = io.connect(window.location.origin);

let playerNode = document.getElementById("player")

LoadFromLocalStorage()


socket.on("connect", () => {

  socket.emit("init")


  socket.on("init", (uri) => {
    player.api("play", uri)
  })

  socket.on("videochanged", (uri) => {
    player.api("play", uri);
  });

  socket.on("videoplayed", () => {
    player.api("play");
  });

  socket.on("videopaused", () => {
    player.api("pause");
  });

  socket.on("videoseeked", (time) => {
      player.api("seek", time)
  })

});



// События плеера /////////////////////

playerNode.addEventListener("play", (event) => {
  socket.emit("videoplayed")
})
playerNode.addEventListener("pause", (event) => {
  socket.emit("videopaused")
})
playerNode.addEventListener("seek", (event) => {
  socket.emit("videoseeked", event.info)
})



window.onunload =
  window.onbeforeunload = () => {
    socket.close();
  }
