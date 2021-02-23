!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return r}));var a=n(2);class r{constructor(e,t){this.parsers=[{parser:this.isThread,action:this.loadThread},{parser:this.isVideo,action:this.setVideo}],this.playerElem=e,this.listElem=t,this.room=new a.default,this.listeners=[]}addEventListener(e,t){this.listeners.push({event:e,cb:t})}emit(e,...t){this.listeners.forEach((n,a)=>{n.event===e&&n.cb(...t)})}setVolume(e){this.playerElem.volume=e||1}loadFromEvent(e){try{e=new URL(e)}catch(e){throw e}let t=!1;this.parsers.forEach((n,a)=>{if(t)return null;let r=n.parser,o=n.action;r.call(this,e)&&(t=!0,o.call(this,e))})}isThread(e){return e.href.match(/2ch.hk\/[A-z]{1,}\/res\/[0-9]*.\.html/)}isVideo(e){return e.href.match(/.*(mp4|webm)/)}async fetchVideos(e){return fetch("/api/getvideos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:e})}).catch(e=>console.log(e)).then(e=>e.json().then(e=>(localStorage.setItem("videos",JSON.stringify(e)),e)))}renderList(e){this.listElem.textContent="",e.forEach(e=>{let t=document.createElement("a"),n=document.createElement("img");t.className="preview",t.href=e.video,n.src=e.preview,n.loading="lazy",t.appendChild(n),this.listElem.appendChild(t),t.onclick=t=>{t.preventDefault(),t.target.className="viewed",this.setVideo.call(this,e.video)}})}loadFromLocalStorage(){let e;(e=localStorage.getItem("videos"))&&(e=JSON.parse(e),this.renderList.call(this,e))}async loadThread(e){console.log("loadthread");let t=await this.fetchVideos.call(this,e);this.renderList.call(this,t)}setVideo(e){try{e=new URL(e),this.room.setRoomVideo(e),this.playerElem.src=e.href,this.emit("videochanged",e)}catch(e){throw new Error("Ошибка при смене адреса видео")}}setVideoNotManually(e){try{e=new URL(e),this.playerElem.src=e.href}catch(e){throw new Error("Ошибка при смене адреса видео")}}async init(){let e=await this.room.fetchRoomByName();this.setVideoNotManually(e.video)}play(e=!1){return e&&(r.stopPausePlayEvents=!0),this.playerElem.play()}pause(e=!1){return e&&(r.stopPausePlayEvents=!0),this.playerElem.pause()}currentTime(){return this.playerElem.currentTime}setTime(e){return this.playerElem.currentTime=e}}},function(e,t,n){"use strict";n.r(t),n.d(t,"PlayerInstance",(function(){return c}));var a=n(0);let r=document.getElementById("video_load_form"),o=r.load_button,i=r.url,s=document.getElementById("videolist"),l=document.getElementById("player"),c=new a.default(l,s);o.addEventListener("click",e=>{let t=i.value;i.value="",c.loadFromEvent(t)}),c.setVolume(.1),c.loadFromLocalStorage()},function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return a}));class a{constructor(e="main"){this.name=this.extractNameFromLocation()||"main"}extractNameFromLocation(){let e=window.location.href.match(/room\/([0-9]*)/);return e?e[1]:null}async fetchRoomByName(){let e=this.name,t=await fetch("/api/getRoomByName",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e})});return await t.json()}async setRoomVideo(e){let t=this.name,n=await fetch("/api/setRoomVideo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,url:e})});return await n.json()}}},function(e,t,n){"use strict";n.r(t),n.d(t,"socket",(function(){return o}));var a=n(1),r=n(0);const o=io.connect(window.location.origin);o.on("connect",()=>{a.PlayerInstance.init(),o.on("videochanged",e=>{a.PlayerInstance.setVideoNotManually(e)}),o.on("videoplayed",async e=>{a.PlayerInstance.setTime(e),await a.PlayerInstance.play(!0)}),o.on("videopaused",()=>{a.PlayerInstance.pause(!0)})}),a.PlayerInstance.addEventListener("videochanged",e=>{o.emit("videochanged",e)}),a.PlayerInstance.playerElem.addEventListener("play",e=>{try{r.default.stopPausePlayEvents&&e.stopPropagation(),o.emit("videoplayed",a.PlayerInstance.currentTime())}finally{r.default.stopPausePlayEvents=!1}}),a.PlayerInstance.playerElem.addEventListener("pause",e=>{try{r.default.stopPausePlayEvents&&e.stopPropagation(),o.emit("videopaused")}finally{r.default.stopPausePlayEvents=!1}}),window.onunload=window.onbeforeunload=()=>{o.close()}}]);