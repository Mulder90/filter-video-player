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
/* global Image */

var _utils = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FVPlayer = function () {
  function FVPlayer(target, filteringFn) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      hideVideo: true
    };

    _classCallCheck(this, FVPlayer);

    this.filteringFn = filteringFn;
    this.options = options;
    this.video = document.getElementById(target);
    this.bindVideoPlayerEvents();
  }

  _createClass(FVPlayer, [{
    key: 'bindVideoPlayerEvents',
    value: function bindVideoPlayerEvents() {
      var _this = this;

      this.video.addEventListener('canplay', function () {
        if (!_this.ended && !_this.playing) {
          _this.playing = false;
          _this.started = false;
          _this.ended = false;
          _this.initFrameBuffer();
          _this.initCanvasPlayer();
          _this.setCanvasSize();
          _this.setPoster();
          if (_this.options.hideVideo) {
            _this.video.style.display = 'none';
          }
          _this.addCanvasHandlers();
        }
      });

      this.video.addEventListener('play', function () {
        _this.started = true;
        _this.playing = true;
        if (!(0, _utils.hasClass)(_this.container, 'is-started')) {
          (0, _utils.addClass)(_this.container, 'is-started');
        }

        if ((0, _utils.hasClass)(_this.container, 'is-ended')) {
          (0, _utils.removeClass)(_this.container, 'is-ended');
        }

        (0, _utils.removeClass)(_this.container, 'is-paused');
        (0, _utils.addClass)(_this.container, 'is-playing');
        _this.play();
      });

      this.video.addEventListener('pause', function () {
        window.cancelAnimationFrame(_this.requestAnimationFrameID);
        _this.playing = false;
        (0, _utils.removeClass)(_this.container, 'is-playing');
        (0, _utils.addClass)(_this.container, 'is-paused');
      });

      this.video.addEventListener('ended', function () {
        window.cancelAnimationFrame(_this.requestAnimationFrameID);
        _this.ended = true;
        _this.playing = false;
        _this.started = false;
        (0, _utils.removeClass)(_this.container, 'is-playing');
        (0, _utils.removeClass)(_this.container, 'is-paused');
        (0, _utils.removeClass)(_this.container, 'is-started');
        (0, _utils.addClass)(_this.container, 'is-ended');
        _this.setPoster();
      });
    }
  }, {
    key: 'addCanvasHandlers',
    value: function addCanvasHandlers() {
      var _this2 = this;

      this.canvas.addEventListener('click', function () {
        if (_this2.playing) {
          _this2.video.pause();
        } else {
          _this2.video.play();
        }
      });
    }
  }, {
    key: 'initFrameBuffer',
    value: function initFrameBuffer() {
      this.framebuffer = document.createElement('canvas');
      this.framebufferCtx = this.framebuffer.getContext('2d');
    }
  }, {
    key: 'initCanvasPlayer',
    value: function initCanvasPlayer() {
      this.container = document.createElement('div');
      (0, _utils.addClass)(this.container, 'fvplayer-container');
      (0, _utils.addClass)(this.container, 'is-paused');
      if (this.video.controls) {
        (0, _utils.addClass)(this.container, 'controls-enabled');
      }

      this.bigPlayButton = document.createElement('button');
      (0, _utils.addClass)(this.bigPlayButton, 'fvplayer-big-play-button');
      this.container.appendChild(this.bigPlayButton);

      this.canvas = document.createElement('canvas');
      this.canvasCtx = this.canvas.getContext('2d');
      (0, _utils.addClass)(this.canvas, 'fvplayer-canvas');
      this.container.appendChild(this.canvas);

      this.controls = document.createElement('div');
      (0, _utils.addClass)(this.controls, 'fvplayer-controls');
      (0, _utils.insertAfter)(this.canvas, this.controls);

      (0, _utils.insertAfter)(this.video, this.container);
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
      this.container.style.width = this.width + 'px';
      this.container.style.height = this.height + 'px';
    }
  }, {
    key: 'setPoster',
    value: function setPoster() {
      var _this3 = this;

      var poster = this.video.poster;

      if (poster.length > 0) {
        if (!this.posterImage) {
          this.posterImage = new Image(this.width, this.height);
          this.posterImage.addEventListener('load', function () {
            if (!_this3.started) {
              _this3.renderFrame(_this3.posterImage);
            }
          });
          this.posterImage.src = poster;
        } else {
          this.renderFrame(this.posterImage);
        }
      }
    }
  }, {
    key: 'play',
    value: function play() {
      var _this4 = this;

      this.renderFrame();
      this.requestAnimationFrameID = window.requestAnimationFrame(function () {
        _this4.play();
      });
    }
  }, {
    key: 'renderFrame',
    value: function renderFrame(image) {
      var data = this.getData(image);
      this.filteringFn(data);
      this.canvasCtx.putImageData(data, 0, 0);
    }
  }, {
    key: 'getData',
    value: function getData(image) {
      this.framebufferCtx.drawImage(image || this.video, 0, 0, this.video.videoWidth, this.video.videoHeight, 0, 0, this.width, this.height);
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

function addClass(element, className) {
  element.classList.add(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function hasClass(element, className) {
  return element.classList.contains(className);
}

exports.insertAfter = insertAfter;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.hasClass = hasClass;

/***/ })
/******/ ]);