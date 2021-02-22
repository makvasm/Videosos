export default class Player {
    constructor(playerNode, listNode) {
        let context = this
        this.parsers = [
            {
                'parser': context.isThread,
                'action': context.loadThread
            },
            {
                'parser': context.isVideo,
                'action': context.setVideo
            }
        ]

        this.playerElem = playerNode
        this.listElem = listNode
        this.setVideo('https://2ch.hk/b/src/240712890/16139530195460.mp4')
    }

    setVolume(value) {
        this.playerElem.volume = value || 1
    }

    loadFromEvent(url) {
        try {
            url = new URL(url)
        } catch (e) {
            throw e
        }

        let isActionRunned = false
        this.parsers.forEach((object, index) => {
            if (isActionRunned) return null

            let parser = object.parser
            let action = object.action

            if (parser.call(this, url)) {
                isActionRunned = true
                action.call(this, url)
            }
        })
    }

    isThread(url) {
        return url.href.match(/2ch.hk\/[A-z]{1,}\/res\/[0-9]*.\.html/)
    }

    isVideo(url) {
        return url.href.match(/.*(mp4|webm)/)
    }

    async fetchVideos(url) {
        return fetch("/api/getvideos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url })
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

    renderList(videos) {
        this.listElem.textContent = ""
        videos.forEach(video => {
            let a = document.createElement("a")
            let img = document.createElement("img")
            a.className = "preview"
            a.href = video.video
            img.src = video.preview

            a.appendChild(img)
            this.listElem.appendChild(a)

            a.onclick = (e) => {
                e.preventDefault()
                e.target.className = "viewed"
                this.setVideo.call(this, video.video)
            }
        })
    }

    loadFromLocalStorage() {
        let videos;
        if (videos = localStorage.getItem("videos")) {
            videos = JSON.parse(videos)
            this.renderList.call(this, videos);
        }
    }

    async loadThread(url) {
        console.log('loadthread')
        let videos = await this.fetchVideos.call(this, url)
        this.renderList.call(this, videos)
    }

    setVideo(url) {
        try {
            url = new URL(url)
            this.playerElem.src = url.href
        } catch (e) {
            throw new Error('Ошибка при смене адреса видео')
        }
    }
}