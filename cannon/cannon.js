// draw constants
const CANNON_LENGTH = 60;
const CANNON_WIDTH = 20;

// global variables
let grav = 0.02;
let ballRadius = 6;
let rad = -1;
let particleLimit = 20;

// lists
var cannonballs = [];
var effects = [];
var colors = [
  "#FF8018",
  "#D4630B",
  "#EB6600",
  "#D4600B",
  "#FA710F"
];

// basic canvas setup
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 60;

// resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 60;
});

// calculate cannon rotation
window.addEventListener('mousemove', (event) => {
  let x = event.clientX - canvas.width/2;
  let y = canvas.height - event.clientY + 60;
  rad = -Math.atan(y/x);
  if (x < 0) rad -= Math.PI;
})

// animate
function draw() {

  // clear canvas
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw base
  ctx.translate(canvas.width/2, canvas.height);
  drawCircle(0, 0, 20);
  
  // draw cannonballs
  for (var i = cannonballs.length - 1; i >= 0; i--) {
    cannonballs[i].update();
    cannonballs[i].show();
    if (cannonballs[i].lifespan <= 0) {
      cannonballs.splice(i, 1);
    }
  }

  // draw particles
  for (var i = effects.length - 1; i >= 0; i--) {
    effects[i].particleUpdate();
    effects[i].showSelf();
    if (effects[i].lifespan <= 0) {
      effects.splice(i, 1);
    }
  }

  // draw cannon
  ctx.rotate(rad);
  ctx.fillRect(-CANNON_WIDTH/2, -CANNON_WIDTH/2, CANNON_LENGTH, CANNON_WIDTH);

  requestAnimationFrame(draw);
}

draw();

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 360);
  ctx.closePath();
  ctx.fill();
}

// fire cannonballs
window.addEventListener('mouseup', () => {
  let x = CANNON_LENGTH * Math.cos(rad);
  let y = CANNON_LENGTH * Math.sin(rad);
  cannonballs.push( new Firework(0, 0, ballRadius, x/5, y/5) );
});

//
// projectiles
//

class Particle {

  static acc = 0.01;

  constructor(x, y, r, velX, velY, color, lifespan) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    if (lifespan) this.lifespan = lifespan;
  }

  particleUpdate() {
    this.velX += Particle.acc;
    this.velY += Particle.acc;
    this.velY += grav * this.radius;
    this.x += this.velX;
    this.y += this.velY;
    this.lifespan -= 1;
  }

  showSelf() {
    ctx.fillStyle = this.color;
    drawCircle(this.x, this.y, this.radius);
    ctx.fillStyle = "black";
  }

}

class Firework extends Particle {

  constructor(x, y, r, velX, velY) {
    let life = Math.random() * 60 + 30;
    super(x, y, r, velX, velY, "white", life);
  }

  update() {
    this.particleUpdate();
    if (this.lifespan <= 0) {
      this.explode();
    }
  }

  show() {
    this.showSelf();
  }

  explode() {
    for (var i = 0; i < particleLimit; i++) {
      let velX = (Math.random() - 0.5) * 2;
      let velY = (Math.random() - 0.5) * 2;
      let color = colors[ Math.floor( Math.random() * colors.length ) ];
      let life = Math.random() * 30 + 30;
      effects.push( new Particle(this.x, this.y, 2, velX, velY, color, life) );
    }
  }

}