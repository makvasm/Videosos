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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/streaming/streaming.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/streaming/streaming.js":
/*!************************************!*\
  !*** ./src/streaming/streaming.js ***!
  \************************************/
/*! exports provided: id, peer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"id\", function() { return id; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"peer\", function() { return peer; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/streaming/utils.js\");\n\r\n\r\nlet chars = \"DEF1G2OPQ23RS3TUV5564MN1OPQ23RS3TU3RS3TUV5564MN1V55WXYZ\".toLowerCase()\r\nlet id = \"\"\r\nfor(let i = 0; i < 15; i++){\r\n    id += chars[Math.floor(Math.random() * chars.length)]\r\n}\r\n\r\ndocument.querySelector(\"#mypeerid\").textContent = `Ваш id: ${id}`\r\n\r\nlet peer = new Peer(id, {\r\n    host: location.hostname,\r\n\tport: location.port || (location.protocol === 'https:' ? 443 : 80),\r\n\tpath: '/peer'\r\n})\r\n\r\n\r\npeer.on(\"connection\", data => {\r\n    if(_utils__WEBPACK_IMPORTED_MODULE_0__[\"mediaStream\"]){\r\n        peer.call(data.peer, _utils__WEBPACK_IMPORTED_MODULE_0__[\"mediaStream\"])\r\n    }\r\n})\r\n\r\npeer.on(\"call\", (call) => {\r\n    call.answer()\r\n\r\n    call.on(\"stream\", stream => {\r\n        console.log(\"stream\")\r\n        _utils__WEBPACK_IMPORTED_MODULE_0__[\"player\"].srcObject = stream\r\n    })\r\n})\r\n\r\n\r\npeer.on(\"error\", (error) => {\r\n    console.log(error)\r\n})\r\n\n\n//# sourceURL=webpack:///./src/streaming/streaming.js?");

/***/ }),

/***/ "./src/streaming/utils.js":
/*!********************************!*\
  !*** ./src/streaming/utils.js ***!
  \********************************/
/*! exports provided: player, controls, mediaStream, StartCapture, StopCapture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"player\", function() { return player; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"controls\", function() { return controls; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mediaStream\", function() { return mediaStream; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StartCapture\", function() { return StartCapture; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StopCapture\", function() { return StopCapture; });\n/* harmony import */ var _streaming__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./streaming */ \"./src/streaming/streaming.js\");\n\r\n\r\nlet player = document.querySelector(\"#player\")\r\n\r\nlet startBtn = document.querySelector(\"#start\")\r\nlet stopBtn = document.querySelector(\"#stop\")\r\nlet connectBtn = document.querySelector(\"#connect\")\r\nlet peerId = document.querySelector(\"#peerid\")\r\n\r\nlet controls = [startBtn, stopBtn, connectBtn, peerId]\r\n\r\nlet mediaStream;\r\n\r\nstartBtn.addEventListener(\"click\", event => {\r\n    StartCapture()\r\n})\r\nstopBtn.addEventListener(\"click\", event => {\r\n    StopCapture()\r\n})\r\nconnectBtn.addEventListener(\"click\", event => {\r\n    if(peerId.value === _streaming__WEBPACK_IMPORTED_MODULE_0__[\"id\"]) return peerId.value = \"\"\r\n    _streaming__WEBPACK_IMPORTED_MODULE_0__[\"peer\"].connect(peerId.value)\r\n    peerId.value = \"\"\r\n})\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n////////////////////////////////////////////////////////////////////////////////////////////\r\n\r\n\r\nlet displayMediaOptions = {\r\n    video: {\r\n        cursor: \"always\"\r\n    },\r\n    audio: true\r\n};\r\n\r\nasync function StartCapture() {\r\n    try {\r\n        if(mediaStream) return\r\n        mediaStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);\r\n        player.srcObject = mediaStream\r\n        if(_streaming__WEBPACK_IMPORTED_MODULE_0__[\"peer\"].connections){\r\n            Object.keys(_streaming__WEBPACK_IMPORTED_MODULE_0__[\"peer\"].connections).forEach(peerid => {\r\n                _streaming__WEBPACK_IMPORTED_MODULE_0__[\"peer\"].call(peerid, mediaStream)\r\n            })\r\n        }\r\n    } catch (err) {\r\n        console.error(\"Error: \" + err);\r\n    }\r\n}\r\n\r\n\r\nfunction StopCapture(event) {\r\n    if(!mediaStream) return\r\n    let tracks = player.srcObject.getTracks();\r\n\r\n    tracks.forEach(track => track.stop());\r\n    player.srcObject = null;\r\n    mediaStream = null\r\n}\n\n//# sourceURL=webpack:///./src/streaming/utils.js?");

/***/ })

/******/ });