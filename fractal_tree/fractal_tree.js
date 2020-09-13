// setup canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 60;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 60;
  draw();
});

// declare variables
let length = 200;
let angle = Math.PI / 6;
let trim = 1.5;

function draw() {
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.translate(canvas.width/2, canvas.height);
  ctx.lineWidth = 2;
  line(0, 0, 0, -length);

  ctx.translate(0, -length);
  branch(length);
}

function branch(len) {

  if (len <= 2) return;

  len /= trim;

  ctx.rotate(angle);
  line(0, 0, 0, -len);
  ctx.translate(0, -len);
  branch(len);

  ctx.translate(0, len);

  ctx.rotate(-angle*2);
  line(0, 0, 0, -len);
  ctx.translate(0, -len);
  branch(len);
  
  ctx.translate(0, len);
  ctx.rotate(angle);

}

draw();

//
// tools
//

function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
}

function updateVals(type, value) {
  document.getElementById(type).innerHTML = value;

  if (type == 'length') {
    length = value;
  } else if (type == 'trim') {
    let val = value/100 + 1;
    trim = Math.round(val*100)/100;
    document.getElementById(type).innerHTML = trim;
  } else if (type == 'angle') {
    angle = value * Math.PI / 180;
  }

  draw();
}