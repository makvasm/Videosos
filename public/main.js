/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/broadcast.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/broadcast.js":
/*!*****************************!*\
  !*** ./public/broadcast.js ***!
  \*****************************/
/*! exports provided: socket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"socket\", function() { return socket; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./public/utils.js\");\n\r\n\r\nconst socket = io.connect(window.location.origin);\r\n\r\nlet playerNode = document.getElementById(\"player\")\r\nplayerNode.volume = 0.1\r\n\r\nObject(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LoadFromLocalStorage\"])()\r\n\r\n\r\nsocket.on(\"connect\", () => {\r\n\r\n  socket.emit(\"init\")\r\n\r\n\r\n  socket.on(\"init\", (uri) => {\r\n    playerNode.src = uri\r\n  })\r\n\r\n  socket.on(\"videochanged\", (uri) => {\r\n    playerNode.src = uri\r\n  });\r\n\r\n  socket.on(\"videoplayed\", () => {\r\n    console.log(\"videoplayed\")\r\n    playerNode.play()\r\n  });\r\n\r\n  socket.on(\"videopaused\", () => {\r\n    console.log(\"videopaused\")\r\n    playerNode.pause()\r\n  });\r\n\r\n});\r\n\r\n\r\n\r\n// События плеера /////////////////////\r\n\r\nplayerNode.addEventListener(\"play\", (event) => {\r\n  if(event.isTrusted){\r\n    socket.emit(\"videoplayed\")\r\n  }\r\n})\r\nplayerNode.addEventListener(\"pause\", (event) => {\r\n  if(event.isTrusted){\r\n    socket.emit(\"videopaused\")\r\n  }\r\n})\r\n\r\n\r\nwindow.onunload =\r\n  window.onbeforeunload = () => {\r\n    socket.close();\r\n  }\r\n\n\n//# sourceURL=webpack:///./public/broadcast.js?");

/***/ }),

/***/ "./public/utils.js":
/*!*************************!*\
  !*** ./public/utils.js ***!
  \*************************/
/*! exports provided: ParseVideos, RenderTable, LoadFromLocalStorage, LoadVideo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ParseVideos\", function() { return ParseVideos; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RenderTable\", function() { return RenderTable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoadFromLocalStorage\", function() { return LoadFromLocalStorage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoadVideo\", function() { return LoadVideo; });\n/* harmony import */ var _broadcast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./broadcast */ \"./public/broadcast.js\");\n\r\n\r\nlet list = document.getElementById(\"videolist\")\r\n\r\n$(\"#player-wrapper\").resizable({\r\n    aspectRatio: 16 / 9,\r\n    alsoResize: \"#player\",\r\n});\r\n\r\nfunction ParseVideos(uri) {\r\n    return fetch(\"/api/getvideos\", {\r\n        method: \"POST\",\r\n        headers: {\r\n            \"Content-Type\": \"application/json\",\r\n        },\r\n        body: JSON.stringify({ uri })\r\n    })\r\n        .catch(e => console.log(e))\r\n        .then(res => {\r\n            return res.json()\r\n                .then(data => {\r\n                    localStorage.setItem(\"videos\", JSON.stringify(data))\r\n                    return data\r\n                })\r\n        })\r\n}\r\n\r\n\r\nfunction RenderTable(videos) {\r\n    list.textContent = \"\"\r\n    videos.forEach(video => {\r\n        let a = document.createElement(\"a\")\r\n        let img = document.createElement(\"img\")\r\n        a.className = \"preview\"\r\n        a.href = video.video\r\n        img.src = video.preview\r\n        a.appendChild(img)\r\n        list.appendChild(a)\r\n        a.onclick = (e) => {\r\n            e.preventDefault()\r\n            e.target.className = \"viewed\"\r\n            LoadVideo(undefined, video.video)\r\n        }\r\n    })\r\n}\r\n\r\n\r\nfunction LoadFromLocalStorage() {\r\n    let videos;\r\n    if (videos = localStorage.getItem(\"videos\")) {\r\n        videos = JSON.parse(videos)\r\n        RenderTable(videos);\r\n    }\r\n}\r\n\r\nfunction LoadVideo(event, direct = null) {\r\n\r\n    let uri;\r\n    if (!direct) {\r\n        event.preventDefault()\r\n        uri = event.target.url.value;\r\n        event.target.url.value = \"\";\r\n    } else {\r\n        uri = direct\r\n    }\r\n\r\n    uri = new URL(uri)\r\n\r\n    if (uri.pathname.match(/.*(mp4|webm)/)) {\r\n        _broadcast__WEBPACK_IMPORTED_MODULE_0__[\"socket\"].emit(\"videochanged\", uri.href)\r\n        player.src = uri.href\r\n    } else {\r\n        ParseVideos(uri)\r\n            .then(videos => {\r\n                RenderTable(videos)\r\n            })\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./public/utils.js?");

/***/ })

/******/ });