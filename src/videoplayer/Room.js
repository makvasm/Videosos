export default class Room {
    constructor(name = 'main'){
        this.name = this.extractNameFromLocation() || 'main'
    }

    extractNameFromLocation(){
        let matches = window.location.href.match(/room\/([0-9]*)/)
        return matches ? matches[1] : null
    }

    async fetchRoomByName() {
        let name     = this.name
        let response = await fetch("/api/getRoomByName", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name })
        })
        return await response.json()
    }

    async setRoomVideo(url) {
        let name     = this.name
        let response = await fetch("/api/setRoomVideo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, url })
        })
        return await response.json()
    }
}