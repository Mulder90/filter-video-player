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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global document */
/* global window */

var _utils = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FVPlayer = function () {
  function FVPlayer(target, filteringFn) {
    var _this = this;

    _classCallCheck(this, FVPlayer);

    this.video = document.getElementById(target);
    this.initFrameBuffer();
    this.initCanvas();
    this.setCanvasSize();

    this.filteringFn = filteringFn;

    this.video.addEventListener('play', function () {
      _this.render();
    });
  }

  _createClass(FVPlayer, [{
    key: 'initFrameBuffer',
    value: function initFrameBuffer() {
      this.framebuffer = document.createElement('canvas');
      this.framebufferCtx = this.framebuffer.getContext('2d');
    }
  }, {
    key: 'initCanvas',
    value: function initCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvasCtx = this.canvas.getContext('2d');
      (0, _utils.insertAfter)(this.video, this.canvas);
    }
  }, {
    key: 'setCanvasSize',
    value: function setCanvasSize() {
      this.width = this.video.clientWidth;
      this.height = this.video.clientHeight;
      this.canvas.setAttribute('width', this.width);
      this.canvas.setAttribute('height', this.height);
      this.framebuffer.setAttribute('width', this.width);
      this.framebuffer.setAttribute('height', this.height);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.renderFrame();
      window.requestAnimationFrame(function () {
        _this2.render();
      });
    }
  }, {
    key: 'renderFrame',
    value: function renderFrame() {
      var data = this.getData();
      this.filteringFn(data);
      this.canvasCtx.putImageData(data, 0, 0);
    }
  }, {
    key: 'getData',
    value: function getData() {
      this.framebufferCtx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight, 0, 0, this.width, this.height);
      return this.framebufferCtx.getImageData(0, 0, this.width, this.height);
    }
  }]);

  return FVPlayer;
}();

window.FVPlayer = FVPlayer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

exports.insertAfter = insertAfter;

/***/ })
/******/ ]);