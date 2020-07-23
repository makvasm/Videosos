let list = document.getElementById("videolist")


const videoElement = document.querySelector("video");
videoElement.volume = 0.2

const socket = io.connect(window.location.origin);

// Попытаться найти видео в локальном хранилище
LoadFromLocalStorage()

// События сокета /////////////////////

socket.on("connect", () => {

  socket.emit("init")

  socket.on("init", (uri) => {
    if (videoElement.src != uri)
      videoElement.src = uri;
  })

  socket.on("videochanged", (uri) => {
    if (videoElement.src != uri)
      videoElement.src = uri;
  });

  socket.on("videoplayed", (time) => {
    videoElement.currentTime = time;
    videoElement.play();
  });

  socket.on("videopaused", () => {
    videoElement.pause();
  });

});
///////////////////////////////////////



// События плеера /////////////////////

videoElement.onplay = (event) => {
  if (event.isTrusted)
    socket.emit("videoplayed", videoElement.currentTime);
}

videoElement.onpause = (event) => {
  if (event.isTrusted)
    socket.emit("videopaused");
}

///////////////////////////////////////

// Синхронизация //////////////////////
function Sync() {
  socket.emit("videosync", videoElement.currentTime);
}
///////////////////////////////////////

// Загрузить видео и триггернуть событие
function LoadVideo(event, direct = null) {
  
  let uri;
  if(!direct){
    event.preventDefault()
    uri = event.target.url.value;
    event.target.url.value = "";
  } else {
    uri = direct
  }

  uri = new URL(uri)

  if (uri.pathname.match(/.*(mp4|webm)/)) {
    socket.emit("videochanged", uri);
    videoElement.src = uri;
  } else {
    ParseVideos(uri)
      .then(videos => {
        RenderTable(videos)
      })
  }
}
///////////////////////////////////////



window.onunload =
  window.onbeforeunload = () => {
    socket.close();
  }

function handleError(error) {
  console.error("Error: ", error);
}
