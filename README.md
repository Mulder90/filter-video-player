# fvplayer - A simple canvas video player with prebuilt filters

## Quick Overview

**Orginial HTML5 video**: ![Imgur](https://imgur.com/5dohtW9.png)

**Canvas video with negative effect**: ![Imgur](https://i.imgur.com/q5rQsjM.png)

**Canvas video with greyscale effect**: ![Imgur](https://i.imgur.com/ZRq4LK7.png) 

Available filters:
 - `greyscale`
 - `sepia`
 - `negative`

more coming soon!

## How to use

- Add fvplayer `style.css` in the header.
- Next to the HTML5 video add this scripts:
  ```javascript
  <script src="../dist/fvfilters.js"></script>
  <script src="../dist/fvplayer.js"></script>
  <script>
    new FVPlayer('video', FVPFilters.greyscale);
  </script>
  ```

First argument is the video ID.  
Second argument is a filter function.  

You can also use a custom filter. Simply define a function like the one below and pass it as second argument.  
```javascript
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
```

**N.B:** You have to add `font-awesome` css in the page to use the icons `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"/>`


## Example


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>A simple canvas video player with prebuilt filters</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"/>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <video id="video" controls poster="./poster.png">
      <source src="./trailer.mp4" type='video/mp4'>
    </video>
    <script src="../dist/fvfilters.js"></script>
    <script src="../dist/fvplayer.js"></script>
    <script>
      new FVPlayer('video', FVPFilters.greyscale);
    </script>
  </body>
</html>
```

## Todo

- Finish UI
- Handle resize
- Handle fullscreen
- Build style.css into the dist folder
- Write a better README and build a demo page

## License

MIT
