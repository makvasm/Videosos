
$("#player-wrapper").resizable({
    aspectRatio: 16 / 9,
    alsoResize: "#player",
});

function ParseVideos(uri) {
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


function RenderTable(videos) {
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


function LoadFromLocalStorage(){
    let videos;
    if(videos = localStorage.getItem("videos")){
        videos = JSON.parse(videos)
        RenderTable(videos);
    }
}
