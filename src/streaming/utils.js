import { peer, id } from "./streaming"

export let player = document.querySelector("#player")

let startBtn = document.querySelector("#start")
let stopBtn = document.querySelector("#stop")
let connectBtn = document.querySelector("#connect")
let peerId = document.querySelector("#peerid")

export let controls = [startBtn, stopBtn, connectBtn, peerId]

export let mediaStream;

startBtn.addEventListener("click", event => {
    StartCapture()
})
stopBtn.addEventListener("click", event => {
    StopCapture()
})
connectBtn.addEventListener("click", event => {
    if(peerId.value === id) return peerId.value = ""
    peer.connect(peerId.value)
    peerId.value = ""
})









////////////////////////////////////////////////////////////////////////////////////////////


let displayMediaOptions = {
    video: {
        cursor: "always"
    },
    audio: true
};

export async function StartCapture() {
    try {
        if(mediaStream) return
        mediaStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        player.srcObject = mediaStream
        if(peer.connections){
            Object.keys(peer.connections).forEach(peerid => {
                peer.call(peerid, mediaStream)
            })
        }
    } catch (err) {
        console.error("Error: " + err);
    }
}


export function StopCapture(event) {
    if(!mediaStream) return
    let tracks = player.srcObject.getTracks();

    tracks.forEach(track => track.stop());
    player.srcObject = null;
    mediaStream = null
}