import Player from './Player'

let loadForm       = document.getElementById('video_load_form')
let loadButton     = loadForm.load_button
let urlInput       = loadForm.url
let videoListNode  = document.getElementById('videolist')
let playerNode     = document.getElementById('player')

export let PlayerInstance = new Player(playerNode, videoListNode)

loadButton.addEventListener('click', (event) => {
    let url        = urlInput.value
    urlInput.value = ''
    PlayerInstance.loadFromEvent(url)
})

PlayerInstance.setVolume(0.1)
PlayerInstance.loadFromLocalStorage();