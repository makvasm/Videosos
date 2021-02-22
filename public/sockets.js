!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";n.r(t),n.d(t,"PlayerInstance",(function(){return c}));var r=n(2);let o=document.getElementById("video_load_form"),a=o.load_button,i=o.url,s=document.getElementById("videolist"),l=document.getElementById("player"),c=new r.default(l,s);a.addEventListener("click",e=>{let t=i.value;i.value="",c.loadFromEvent(t)}),c.setVolume(.1),c.loadFromLocalStorage()},function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return r}));class r{constructor(e="main"){this.name=this.extractNameFromLocation()||"main"}extractNameFromLocation(){let e=window.location.href.match(/room\/([0-9]*)/);return e?e[1]:null}async fetchRoomByName(){let e=this.name,t=await fetch("/api/getRoomByName",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e})});return await t.json()}async setRoomVideo(e){let t=this.name,n=await fetch("/api/setRoomVideo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,url:e})});return await n.json()}}},function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return o}));var r=n(1);class o{constructor(e,t){this.parsers=[{parser:this.isThread,action:this.loadThread},{parser:this.isVideo,action:this.setVideo}],this.playerElem=e,this.listElem=t,this.room=new r.default,this.listeners=[]}addEventListener(e,t){this.listeners.push({event:e,cb:t})}emit(e,...t){this.listeners.forEach((n,r)=>{n.event===e&&n.cb(...t)})}setVolume(e){this.playerElem.volume=e||1}loadFromEvent(e){try{e=new URL(e)}catch(e){throw e}let t=!1;this.parsers.forEach((n,r)=>{if(t)return null;let o=n.parser,a=n.action;o.call(this,e)&&(t=!0,a.call(this,e))})}isThread(e){return e.href.match(/2ch.hk\/[A-z]{1,}\/res\/[0-9]*.\.html/)}isVideo(e){return e.href.match(/.*(mp4|webm)/)}async fetchVideos(e){return fetch("/api/getvideos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:e})}).catch(e=>console.log(e)).then(e=>e.json().then(e=>(localStorage.setItem("videos",JSON.stringify(e)),e)))}renderList(e){this.listElem.textContent="",e.forEach(e=>{let t=document.createElement("a"),n=document.createElement("img");t.className="preview",t.href=e.video,n.src=e.preview,n.loading="lazy",t.appendChild(n),this.listElem.appendChild(t),t.onclick=t=>{t.preventDefault(),t.target.className="viewed",this.setVideo.call(this,e.video)}})}loadFromLocalStorage(){let e;(e=localStorage.getItem("videos"))&&(e=JSON.parse(e),this.renderList.call(this,e))}async loadThread(e){console.log("loadthread");let t=await this.fetchVideos.call(this,e);this.renderList.call(this,t)}setVideo(e){try{e=new URL(e),this.room.setRoomVideo(e),this.playerElem.src=e.href,this.emit("videochanged",e)}catch(e){throw new Error("Ошибка при смене адреса видео")}}setVideoNotManually(e){try{e=new URL(e),this.playerElem.src=e.href}catch(e){throw new Error("Ошибка при смене адреса видео")}}async init(){let e=await this.room.fetchRoomByName();this.setVideoNotManually(e.video)}play(){return this.playerElem.play()}pause(){return this.playerElem.pause()}currentTime(){return this.playerElem.currentTime}setTime(e){return this.playerElem.currentTime=e}}},function(e,t,n){"use strict";n.r(t),n.d(t,"socket",(function(){return o}));var r=n(0);const o=io.connect(window.location.origin);o.on("connect",()=>{r.PlayerInstance.init(),o.on("videochanged",e=>{r.PlayerInstance.setVideoNotManually(e)}),o.on("videoplayed",async e=>{r.PlayerInstance.setTime(e),await r.PlayerInstance.play()}),o.on("videopaused",()=>{r.PlayerInstance.pause()})}),r.PlayerInstance.addEventListener("videochanged",e=>{o.emit("videochanged",e)}),r.PlayerInstance.playerElem.addEventListener("play",e=>{o.emit("videoplayed",r.PlayerInstance.currentTime())}),r.PlayerInstance.playerElem.addEventListener("pause",e=>{o.emit("videopaused")}),window.onunload=window.onbeforeunload=()=>{o.close()}}]);