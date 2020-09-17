// canvas setup
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 60;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 60;
  stars = [];
  for (var i = 0; i < starCount; i++) {
    stars.push( new Star(
      Math.random()*canvas.width, 
      Math.random()*canvas.height, 
      Math.random()*2 + 1,
      colors[ Math.floor(Math.random() * colors.length) ]
    ));
  }
});

// declare variables
let starCount = 20;
let sunSize = 20;
let colors = [
  "white",
  "#4A8CFF",
  "#7698E6",
  "#A5B9FA",
  "#8A99E3",
  "#99A3FB"
];

// animation loop
function animate() {

  // clear scene
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // stars
  for (var i = 0; i < stars.length; i++) {
    stars[i].show();
  }

  // draw sun
  returnToSun();
  ctx.fillStyle = "yellow";
  dot(0, 0, sunSize);

  // draw planets
  mercury.update();
  venus.update();
  earth.update();
  mars.update();
  jupiter.update();
  saturn.update();
  uranus.update();
  neptune.update();

  requestAnimationFrame(animate);
}

// declare stars
let stars = [];
for (var i = 0; i < starCount; i++) {
  stars.push( new Star(
    Math.random()*canvas.width, 
    Math.random()*canvas.height, 
    Math.random()*2 + 1,
    colors[ Math.floor(Math.random() * colors.length) ]
  ));
}

// declare planets
var mercury = new Planet(0, 40, 2, 0.047, 'darkgray');

var venus = new Planet(0, 60, 5, 0.035, 'white');

var earth = new Planet(0, 100, 5.5, 0.029, 'lightblue', [ 
  new Moon(0, 15, 2, 0.1) // the moon.
]);

var mars = new Planet(0, 145, 4, 0.024, 'red', [
  new Moon(0, 8, 1, 0.02), // phobos
  new Moon(2, 12, 1.2, 0.06) // deimos
]);

var jupiter = new Planet(0, 190, 10, 0.013, 'orangered', [
  new Moon(0, 15, 1.3, 0.17), //io
  new Moon(Math.PI/6, 20, 1, 0.14), //europa
  new Moon(2*Math.PI/3, 25, 2, 0.11), //ganymede
  new Moon(3*Math.PI/2, 27, 1.7, 0.08) //callisto
]);

var saturn = new Planet(0, 240, 9, 0.0097, 'palegoldenrod', [
  new Moon(0, 15, 2.3, 0.055)
]);

var uranus = new Planet(0, 280, 7, 0.0068, 'aqua', [
  new Moon(0, 15, 1.6, 0.03), // oberon
  new Moon(0, 21, 1.5, 0.036) // titania
]);

var neptune = new Planet(0, 320, 6.8, 0.0055, 'purple', [
  new Moon(0, 15, 1.4, 0.04) // triton
]);

// 
// tools
//

function dot(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 360);
  ctx.closePath();
  ctx.fill();
}

function returnToSun() {
  ctx.resetTransform();
  ctx.translate(canvas.width/2, canvas.height/2 - 30);
}

// start drawing
animate();