/* global window */

const FVPFilters = {
  negative(data) {
    const pixels = data.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      pixels[i] = 255 - r;
      pixels[i + 1] = 255 - g;
      pixels[i + 2] = 255 - b;
    }
  },
  greyscale(data) {
    const pixels = data.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const avg = 0.3 * r + 0.59 * g + 0.11 * b;
      pixels[i] = avg;
      pixels[i + 1] = avg;
      pixels[i + 2] = avg;
    }
  },
  sepia(data) {
    const pixels = data.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      pixels[i] = r * 0.393 + g * 0.769 + b * 0.189;
      pixels[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
      pixels[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
    }
  },
  convolve(matrix, divisor, offset) {
    const kernelMatrix = [].concat(matrix[0], matrix[1], matrix[2]);
    const div = divisor || kernelMatrix.reduce((a, b) => a + b) || 1;

    return (data) => {
      const { width } = data;
      const pixels = data.data;
      const len = pixels.length;
      const w = width * 4;
      for (let i = 0; i < len; i++) {
        // don't touch alpha channel
        if ((i + 1) % 4 === 0) {
          continue;
        }
        let res = 0;
        const p = pixels[i];
        const rectPixels = [
          pixels[i - w - 4] || p,
          pixels[i - w] || p,
          pixels[i - w + 4] || p,
          pixels[i - 4] || p,
          p,
          pixels[i + 4] || p,
          pixels[i + w - 4] || p,
          pixels[i + w] || p,
          pixels[i + w + 4] || p,
        ];
        for (let j = 0; j < 9; j++) {
          res += rectPixels[j] * kernelMatrix[j];
        }
        res /= div;
        if (offset) {
          res += offset;
        }
        pixels[i] = res;
      }
    };
  },
};

window.FVPFilters = FVPFilters;
