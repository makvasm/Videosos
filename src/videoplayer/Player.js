import Room from "./Room"

export default function Player(playerNode, listNode)
{
    console.log(this)
    this.playerElem = playerNode
    this.listElem   = listNode
    this.room       = new Room()
    this.listeners  = []

    this.addEventListener = (event, cb) => {
        this.listeners.push({
            event,
            cb
        })
    }

    this.emit = (event, ...args) => {
        console.log('emit')
        console.log(this)
        this.listeners.forEach((listener, index) => {
            if (listener.event === event){
                listener.cb(...args)
            }
        })
    }

    this.setVolume = (value) => {
        this.playerElem.volume = value || 1
    }

    this.loadFromEvent = (url) => {
        let isActionRunned = false
        this.parsers.forEach((object, index) => {
            if (isActionRunned) return null

            let parser = object.parser
            let action = object.action

            if (parser(url)) {
                isActionRunned = true
                action(url)
            }
        })
    }

    this.isThread = (url) => {
        return url.match(/2ch\..*\/[A-z]+\/res\/[0-9]+\.html$/)
    }

    this.isVideo = (url) => {
        return url.match(/2ch\..*\/[A-z]+\/src\/[0-9]+\/[0-9]+\.(webm|mp4)$/)
    }

    this.fetchVideos = async (url) => {
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

    this.renderList = async (videos) => {
        this.listElem.textContent = ""
        videos.forEach(async video => {
            let a       = document.createElement("a")
            let img     = document.createElement("img")
            a.className = "preview"
            a.href      = video.video
            img.src     = video.preview
            img.loading = "lazy"

            a.appendChild(img)
            this.listElem.appendChild(a)

            a.onclick = (e) => {
                e.preventDefault()
                e.target.className = "viewed"
                this.setVideo(video.video)
            }

            return await new Promise(async (resolve) => {
                setTimeout(resolve, 100)
            })
        })
    }

    this.loadFromLocalStorage = () =>{
        let videos
        if (videos = localStorage.getItem("videos")) {
            videos = JSON.parse(videos)
            this.renderList(videos)
        }
    }

    this.loadThread = async (url) => {
        let videos = await this.fetchVideos(url)
        return await this.renderList(videos)
    }

    this.setVideo = (url) => {
        try {
            this.room.setRoomVideo(url)
            this.playerElem.src = url
            this.emit('videochanged', url)
        } catch (e) {
            throw new Error('Ошибка при смене адреса видео')
        }
    }

    this.setVideoNotManually = (url) => {
        try {
            this.playerElem.src = url
        } catch (e) {
            throw new Error('Ошибка при смене адреса видео')
        }
    }

    this.init = async () => {
        let room = await this.room.fetchRoomByName()
        this.setVideoNotManually(room.video)
    }

    this.play = (stopPropagation = false) => {
        if (stopPropagation) Player.stopPausePlayEvents = true
        return this.playerElem.play()
    }

    this.pause = (stopPropagation = false) => {
        if (stopPropagation) Player.stopPausePlayEvents = true
        return this.playerElem.pause()
    }

    this.currentTime = () => {
        return this.playerElem.currentTime
    }

    this.setTime = (value) => {
        return this.playerElem.currentTime = value
    }

    this.src = () => {
        return this.playerElem.src
    }

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
}