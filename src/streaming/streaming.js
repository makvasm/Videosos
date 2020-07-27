import utils, { player, mediaStream, controls } from "./utils"

let chars = "DEF1G2OPQ23RS3TUV5564MN1OPQ23RS3TU3RS3TUV5564MN1V55WXYZ".toLowerCase()
export let id = ""
for(let i = 0; i < 15; i++){
    id += chars[Math.floor(Math.random() * chars.length)]
}

document.querySelector("#mypeerid").textContent = `Ваш id: ${id}`

export let peer = new Peer(id, {
    host: location.hostname,
	port: location.port || (location.protocol === 'https:' ? 443 : 80),
	path: '/peer'
})


peer.on("connection", data => {
    if(mediaStream){
        peer.call(data.peer, mediaStream)
    }
})

peer.on("call", (call) => {
    call.answer()

    call.on("stream", stream => {
        player.srcObject = stream
    })
})


peer.on("error", (error) => {
    console.log(error)
})
