/* global document */
/* global window */
/* global Image */

import { insertAfter } from './utils';

class FVPlayer {
  constructor(target, filteringFn) {
    this.filteringFn = filteringFn;
    this.video = document.getElementById(target);
    this.bindVideoPlayerEvents();
  }

  bindVideoPlayerEvents() {
    this.video.addEventListener('canplay', () => {
      if (!this.ended) {
        this.playing = false;
        this.started = false;
        this.ended = false;
        this.initFrameBuffer();
        this.initCanvas();
        this.setCanvasSize();
        this.setPoster();
        this.video.style.display = 'none';
        this.addCanvasHandlers();
      }
    });

    this.video.addEventListener('play', () => {
      this.started = true;
      this.playing = true;
      this.play();
    });

    this.video.addEventListener('pause', () => {
      this.playing = false;
      window.cancelAnimationFrame(this.requestAnimationFrameID);
    });

    this.video.addEventListener('ended', () => {
      window.cancelAnimationFrame(this.requestAnimationFrameID);
      this.ended = true;
      this.playing = false;
      this.started = false;
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

  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvasCtx = this.canvas.getContext('2d');
    insertAfter(this.video, this.canvas);
  }

  setCanvasSize() {
    this.width = this.video.clientWidth;
    this.height = this.video.clientHeight;
    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
    this.framebuffer.setAttribute('width', this.width);
    this.framebuffer.setAttribute('height', this.height);
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
