// export const socket = io.connect(window.location.origin);
// import { PlayerInstance } from './init'
// import Player from './Player';

// socket.on("connect", () => {

// 	PlayerInstance.init()

// 	socket.on("videochanged", (url) => {
// 		PlayerInstance.setVideoNotManually(url)
// 	});

// 	socket.on("videoplayed", async (time, url) => {
// 		if(PlayerInstance.src() !== url) return
// 		PlayerInstance.setTime(time)
// 		await PlayerInstance.play(true)
// 	});

// 	socket.on("videopaused", (url) => {
// 		if(PlayerInstance.src() !== url) return
// 		PlayerInstance.pause(true)
// 	});

// });



// // События плеера

// PlayerInstance.addEventListener.call(PlayerInstance, 'videochanged', (url) => {
// 	socket.emit('videochanged', url)
// })

// PlayerInstance.playerElem.addEventListener("play", (event) => {
// 	try {
// 		if (!Player.stopPausePlayEvents){
// 			let url = PlayerInstance.src();
// 			let time = PlayerInstance.currentTime();
// 			socket.emit("videoplayed", time, url)
// 		}
// 	} finally {
// 		Player.stopPausePlayEvents = false
// 	}
// })
// PlayerInstance.playerElem.addEventListener("pause", (event) => {
// 	try {
// 		if (!Player.stopPausePlayEvents){
// 			let url = PlayerInstance.src()
// 			socket.emit("videopaused", url)
// 		}
// 	} finally {
// 		Player.stopPausePlayEvents = false
// 	}
// })


// window.onunload =
// 	window.onbeforeunload = () => {
// 		socket.close();
// 	}