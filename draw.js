var filledPixels = {};

$(document).ready(function () {
  let canvas = $("#mycanvas");
  let ctx = canvas.get(0).getContext("2d");
  let canvasWidth = canvas.width();
  let canvasHeight = canvas.height();
  let PIXELSIZE = canvasWidth / DIMENSION;
  let enabled = true;

  ctx.strokeStyle = 'rgba(0,0,0,0.1)';
  for (let i = 0; i < DIMENSION; ++i) {
    x = Math.floor(i * canvasWidth / DIMENSION);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();

    y = Math.floor(i * canvasHeight / DIMENSION);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }

  // firefox canvas mousedown fix
  let firefoxmd = false;

  window.addEventListener('mousedown', e => {
      firefoxmd = true;
  });
    
  window.addEventListener('mouseup', e => {
      if (firefoxmd === true) {
          firefoxmd = false;
      }
  });

  canvas.on('mousemove touchmove touchstart mousedown', mouseFill);
  function mouseFill(e) {
    e.preventDefault(); // Disables scrolling for touch events.

    var touchstart = e.type === 'touchstart' || e.type === 'touchmove';
    e = touchstart ? e.originalEvent : e;
    var rect = $("#mycanvas");
    var offsetX = touchstart ? e.targetTouches[0].pageX - rect.offset().left : e.offsetX;
    var offsetY = touchstart ? e.targetTouches[0].pageY - rect.offset().top : e.offsetY;

    if (!enabled) return;
    if (!firefoxmd) return;
    if (e.which != 1 && !touchstart) return;

    pixel = [Math.floor(offsetX / PIXELSIZE), Math.floor(offsetY / PIXELSIZE)];
    fillPixel(pixel);
  }

  function fillPixel(pixel) {
    let key = pixel[0] + ',' + pixel[1];
    filledPixels[key] = selectedColor;
    ctx.fillStyle = selectedColor;
    ctx.fillRect(pixel[0] * PIXELSIZE, pixel[1] * PIXELSIZE, PIXELSIZE - 1, PIXELSIZE - 1);
  }

})
function render_canvas(){
  let l = [];
  let black = document.getElementById("black").value;
  let white = document.getElementById("white").value;
  for(let y=0;y<DIMENSION;y++){
    let j = [];
    for(let x=0;x<DIMENSION;x++){
      let = key = x+","+y
      if(filledPixels[key] == '#000000'){
        j.push(black)
      }
      else {
        j.push(white)
      }
    }
    l.push(j)
  }
  let joined = [];
  l.forEach(function(element, index) {
    joined.push(element.join(''))
  });
  document.getElementById("output").value = joined.join('\n')
}