// export const socket = io.connect(window.location.origin);

let isHost;


// socket.on("connect", () => {

//   socket.on("host", () => {
//     isHost = true
//     document.title = "Хост"
//   })

//   socket.emit("init")

//   socket.on("init", (uri) => {
//     player.src = uri
//   })

//   socket.on("videochanged", (uri) => {
//     player.src = uri
//   });

//   socket.on("videoplayed", async (time) => {
//     player.currentTime = time
//     await player.play()
//   });

//   socket.on("videopaused", () => {
//     player.pause()
//   });

// });



// События плеера /////////////////////

// player.addEventListener("play", (event) => {
//   if (event.isTrusted && isHost) {
//     socket.emit("videoplayed", player.currentTime)
//   }
// })
// player.addEventListener("pause", (event) => {
//   if (event.isTrusted && isHost) {
//     socket.emit("videopaused")
//   }
// })


// window.onunload =
//   window.onbeforeunload = () => {
//     socket.close();
//   }
