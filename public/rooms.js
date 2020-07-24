let roomlist = document.getElementById("roomlist")

function GetRoomList() {
    return fetch("/api/getroomlist")
        .catch(e => console.log(e))
        .then(res => {
            if (!res.ok) { throw new Error() }
            return res.json()
        })
}

function RenderRooms(rooms) {
    roomlist.textContent = ""
    rooms.forEach(room => {
        let roomId = room.split("/")
        roomId = roomId[roomId.length - 1]
        let li = document.createElement("li")
        let a = document.createElement("a")
        a.href = room
        a.textContent = roomId
        li.className = "list-group-item list-group-item-dark"
        li.appendChild(a)
        roomlist.appendChild(li)
    })
}

function CreateRoom(event) {
    event.preventDefault()
    fetch("/api/createroom", {
        method: "POST",
        redirect: "follow",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            roompass: event.target.roompass.value,
            roomname: event.target.roomname.value
        })
    })
        .catch(e => console.log(e))
    event.target.roompass.value = ""
    event.target.roomname.value = ""
    GetRoomList()
    .then(rooms => RenderRooms(rooms))
}


// GetRoomList()
//     .then(rooms => RenderRooms(rooms))