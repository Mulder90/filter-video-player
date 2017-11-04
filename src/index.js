function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

class FilterPlayer {
  constructor(target, filter) {
    this.video = document.getElementById(target);
    this.initFrameBuffer();
    this.initCanvas();
    this.setCanvasSize();

    this.filter = filter;

    this.video.addEventListener('play', () => {
      // this.video.style.display = 'none';
      this.render();
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

  render() {
    this.renderFrame();
    window.requestAnimationFrame(() => {
      this.render()
    });
  }

  renderFrame() {
    const data = this.getData();
    this.transform(data);
    this.draw(data);
  }

  getData() {
    this.framebufferCtx.drawImage(
      this.video,
      0, 0,
      this.video.videoWidth, this.video.videoHeight,
      0, 0,
      this.width, this.height
    );
    return this.framebufferCtx.getImageData(
      0, 0, this.width, this.height
    );
  }

  transform(data) {
    this.filter(data);
  }

  draw(data) {
    this.canvasCtx.putImageData(data, 0, 0);
  }
}
