import Player from './Player'
export const socket = io.connect(window.location.origin);

let loadForm       = document.getElementById('video_load_form')
let loadButton     = loadForm.load_button
let urlInput       = loadForm.url
let videoListNode  = document.getElementById('videolist')
let playerNode     = document.getElementById('player')

export const PlayerInstance = new Player(playerNode, videoListNode)

loadButton.addEventListener('click', (event) => {
    let url        = urlInput.value
    urlInput.value = ''
    PlayerInstance.loadFromEvent(url)
})

PlayerInstance.setVolume(0.1)
PlayerInstance.loadFromLocalStorage();

socket.on("connect", () => {

	PlayerInstance.init()

	socket.on("videochanged", (url) => {
		PlayerInstance.setVideoNotManually(url)
	});

	socket.on("videoplayed", async (time, url) => {
		if(PlayerInstance.src() !== url) return
		PlayerInstance.setTime(time)
		await PlayerInstance.play(true)
	});

	socket.on("videopaused", (url) => {
		if(PlayerInstance.src() !== url) return
		PlayerInstance.pause(true)
	});

});



// События плеера

PlayerInstance.addEventListener.call(PlayerInstance, 'videochanged', (url) => {
	socket.emit('videochanged', url)
})

PlayerInstance.playerElem.addEventListener("play", (event) => {
	try {
		if (!Player.stopPausePlayEvents){
			let url = PlayerInstance.src();
			let time = PlayerInstance.currentTime();
			socket.emit("videoplayed", time, url)
		}
	} finally {
		Player.stopPausePlayEvents = false
	}
})
PlayerInstance.playerElem.addEventListener("pause", (event) => {
	try {
		if (!Player.stopPausePlayEvents){
			let url = PlayerInstance.src()
			socket.emit("videopaused", url)
		}
	} finally {
		Player.stopPausePlayEvents = false
	}
})


window.onunload =
	window.onbeforeunload = () => {
		socket.close();
	}