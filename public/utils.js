import { socket } from "./broadcast"

let list = document.getElementById("videolist")
export let player = new Playerjs({id:"player"});

$("#player-wrapper").resizable({
    aspectRatio: 16 / 9,
    alsoResize: "#player",
});

export function ParseVideos(uri) {
    return fetch("/api/getvideos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ uri })
    })
        .catch(e => console.log(e))
        .then(res => {
            return res.json()
                .then(data => {
                    localStorage.setItem("videos", JSON.stringify(data))
                    return data
                })
        })
}


export function RenderTable(videos) {
    list.textContent = ""
    videos.forEach(video => {
        let a = document.createElement("a")
        let img = document.createElement("img")
        a.className = "preview"
        a.href = video.video
        img.src = video.preview
        a.appendChild(img)
        list.appendChild(a)
        a.onclick = (e) => {
            e.preventDefault()
            e.target.className = "viewed"
            LoadVideo(undefined, video.video)
        }
    })
}


export function LoadFromLocalStorage() {
    let videos;
    if (videos = localStorage.getItem("videos")) {
        videos = JSON.parse(videos)
        RenderTable(videos);
    }
}

export function LoadVideo(event, direct = null) {

    let uri;
    if (!direct) {
        event.preventDefault()
        uri = event.target.url.value;
        event.target.url.value = "";
    } else {
        uri = direct
    }

    uri = new URL(uri)

    if (uri.pathname.match(/.*(mp4|webm)/)) {
        socket.emit("videochanged", uri.href);
        player.api("play", uri.href);
    } else {
        ParseVideos(uri)
            .then(videos => {
                RenderTable(videos)
            })
    }
}
