var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  init();
});

window.addEventListener("mousedown", function() {
  document.getElementById("desc").style.display = "none";
})

class Particle {

  constructor(x, y, radius, vel, acc, color, isExplosion) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vel = vel;
    this.acc = acc;
    this.color = color;
    if (isExplosion) {
      this.lifespan = pTime;
    }
  }

  show() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 360);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.vel -= gravity;
    this.x += this.acc;
    this.y -= this.vel;

    if (this.lifespan) {
      this.lifespan--;
    }
  }

  explode() {

    for (var p = 0; p < pCount; p++) {
      let randomColor = colors[Math.floor( Math.random() * colors.length )];
      explosions.push(new Particle(this.x, this.y, this.radius / 2, (Math.random() - 0.3) * 5, (Math.random() - 0.5) * 5, randomColor, true));
    }
    
  }

}

var fireworks = [];
var explosions = [];

var fireworkRadius;
var pCount;
var pTime;
var gravity;
var colors = [];

function init() {

  fireworks = [];
  explosions = [];

  fireworkRadius = 5;
  pCount = 30;
  pTime = 50;
  gravity = 0.2;
  colors = [
    "red",
    "yellow",
    "orange",
  ];

}

function animate() {

  if (Math.floor(Math.random() * 30) == 0) {
    fireworks.push(new Particle(Math.random() * canvas.width, canvas.height + 100, fireworkRadius, Math.random() * 6 + 12, 0, "white"));
  }

  c.clearRect(0, 0, canvas.width, canvas.height);

  for (i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].vel <= 0) {
      fireworks[i].explode();
      fireworks.splice(i, 1);
    }
  }

  for (i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].show();

    if (explosions[i].lifespan <= 0 || explosions[i].y >= innerHeight) {
      explosions.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

init();
animate();