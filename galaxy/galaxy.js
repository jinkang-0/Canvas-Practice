// canvas setup
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 60;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 60;
});

// declare variables
let starCount = 100;
let colors = [
  "white",
  "#4A8CFF",
  "#7698E6",
  "#A5B9FA",
  "#8A99E3",
  "#99A3FB"
];

// setup scene
function draw() {
  for (var i = 0; i < starCount; i++) {
    ctx.fillStyle = colors[ Math.floor( Math.random() * colors.length ) ];
    dot(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2 + 1);
  }
}

// animation loop
// function animate() {

//   requestAnimationFrame(animate);
// }

draw();

// 
// tools
//

function dot(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 360);
  ctx.closePath();
  ctx.fill();
}