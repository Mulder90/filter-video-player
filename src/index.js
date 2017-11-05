/* global document */
/* global window */
/* global Image */

import { insertAfter, addClass, removeClass, hasClass } from './utils';

class FVPlayer {
  constructor(
    target,
    filteringFn,
    options = {
      hideVideo: true,
    },
  ) {
    this.filteringFn = filteringFn;
    this.options = options;
    this.video = document.getElementById(target);
    this.bindVideoPlayerEvents();
  }

  bindVideoPlayerEvents() {
    this.video.addEventListener('canplay', () => {
      if (!this.ended && !this.playing) {
        this.playing = false;
        this.started = false;
        this.ended = false;
        this.initFrameBuffer();
        this.initCanvasPlayer();
        this.setCanvasSize();
        this.setPoster();
        if (this.options.hideVideo) {
          this.video.style.display = 'none';
        }
        this.addCanvasHandlers();
      }
    });

    this.video.addEventListener('play', () => {
      this.started = true;
      this.playing = true;
      if (!hasClass(this.container, 'is-started')) {
        addClass(this.container, 'is-started');
      }

      if (hasClass(this.container, 'is-ended')) {
        removeClass(this.container, 'is-ended');
      }

      removeClass(this.container, 'is-paused');
      addClass(this.container, 'is-playing');
      this.play();
    });

    this.video.addEventListener('pause', () => {
      window.cancelAnimationFrame(this.requestAnimationFrameID);
      this.playing = false;
      removeClass(this.container, 'is-playing');
      addClass(this.container, 'is-paused');
    });

    this.video.addEventListener('ended', () => {
      window.cancelAnimationFrame(this.requestAnimationFrameID);
      this.ended = true;
      this.playing = false;
      this.started = false;
      removeClass(this.container, 'is-playing');
      removeClass(this.container, 'is-paused');
      removeClass(this.container, 'is-started');
      addClass(this.container, 'is-ended');
      this.setPoster();
    });
  }

  addCanvasHandlers() {
    this.canvas.addEventListener('click', () => {
      if (this.playing) {
        this.video.pause();
      } else {
        this.video.play();
      }
    });
  }

  initFrameBuffer() {
    this.framebuffer = document.createElement('canvas');
    this.framebufferCtx = this.framebuffer.getContext('2d');
  }

  initCanvasPlayer() {
    this.container = document.createElement('div');
    addClass(this.container, 'fvplayer-container');
    addClass(this.container, 'is-paused');
    if (this.video.controls) {
      addClass(this.container, 'controls-enabled');
    }

    this.bigPlayButton = document.createElement('button');
    addClass(this.bigPlayButton, 'fvplayer-big-play-button');
    this.container.appendChild(this.bigPlayButton);

    this.canvas = document.createElement('canvas');
    this.canvasCtx = this.canvas.getContext('2d');
    addClass(this.canvas, 'fvplayer-canvas');
    this.container.appendChild(this.canvas);

    this.controls = document.createElement('div');
    addClass(this.controls, 'fvplayer-controls');
    insertAfter(this.canvas, this.controls);

    insertAfter(this.video, this.container);
  }

  setCanvasSize() {
    this.width = this.video.clientWidth;
    this.height = this.video.clientHeight;
    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
    this.framebuffer.setAttribute('width', this.width);
    this.framebuffer.setAttribute('height', this.height);
    this.container.style.width = `${this.width}px`;
    this.container.style.height = `${this.height}px`;
  }

  setPoster() {
    const { poster } = this.video;
    if (poster.length > 0) {
      if (!this.posterImage) {
        this.posterImage = new Image(this.width, this.height);
        this.posterImage.addEventListener('load', () => {
          if (!this.started) {
            this.renderFrame(this.posterImage);
          }
        });
        this.posterImage.src = poster;
      } else {
        this.renderFrame(this.posterImage);
      }
    }
  }

  play() {
    this.renderFrame();
    this.requestAnimationFrameID = window.requestAnimationFrame(() => {
      this.play();
    });
  }

  renderFrame(image) {
    const data = this.getData(image);
    this.filteringFn(data);
    this.canvasCtx.putImageData(data, 0, 0);
  }

  getData(image) {
    this.framebufferCtx.drawImage(
      image || this.video,
      0,
      0,
      this.video.videoWidth,
      this.video.videoHeight,
      0,
      0,
      this.width,
      this.height,
    );
    return this.framebufferCtx.getImageData(0, 0, this.width, this.height);
  }
}

window.FVPlayer = FVPlayer;
