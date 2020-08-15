var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var gravity = 0.01;
var drag = 0.05;
var colors = [
  "#2B59C3",
  "#253C78",
  "#D36582",
  "#FFEECF",
  "#C9A690"
];

var mouseX;
var mouseY;
var minAngle = -60 * Math.PI / 180;

window.addEventListener("mousemove", function() {
  mouseX = event.clientX - 50;
  mouseY = innerHeight - event.clientY - 50;
  let angle = -Math.atan( mouseY / mouseX );
  if (angle >= minAngle && angle < 0) {
    cannon.angle = angle;
  }
})

window.addEventListener("mousedown", function() {
  document.getElementById("desc").style.display = "none";
  cannon.fire();
})

window.addEventListener("touchstart", function() {
  
  mouseX = event.touches[0].clientX - 50;
  mouseY = innerHeight - event.touches[0].clientY - 50;
  let angle = -Math.atan( mouseY / mouseX );
  if (angle >= minAngle && angle < 0) {
    cannon.angle = angle;
  }
  
  document.getElementById("desc").style.display = "none";
  cannon.fire();
})

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  cannon = new Cannon(-60 * Math.PI / 180);
  cannonballs = [];
})

class Cannon {
  constructor(angle) {
    this.angle = angle;
  }

  show() {
    c.translate(40, innerHeight - 80);
    c.rotate(this.angle);
    c.fillRect(0, 0, 80, 50);
  }

  fire() {
    cannonballs.push(new Projectile(80, 20, (-this.angle + 3) * 4, -this.angle, this.angle));
  }
}

var cannon = new Cannon(-60 * Math.PI / 180);
var cannonballs = [];

class Projectile {
  constructor(x, y, acc, vel, angle) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.acc = acc;
    this.angle = angle;
    this.color = colors[Math.floor( Math.random() * colors.length )];
  }

  update() {
    this.y += this.vel;
    this.x += this.acc;

    this.vel += gravity;
    if (this.acc > drag) {
      this.acc -= drag;
    }
  }

  show() {
    c.resetTransform();
    c.translate(40, innerHeight - 80);
    c.rotate(this.angle);
    c.beginPath();
    c.arc(this.x, this.y, 10, 0, 360);
    c.fillStyle = this.color;
    c.fill();
  }
}

function animate() {

  c.resetTransform();
  c.clearRect(0, 0, innerWidth, innerHeight);

  // base of cannon
  c.beginPath();
  c.arc(20, innerHeight - 20, 30, 0, 360);
  c.fillStyle = "gray";
  c.fill();

  c.beginPath();
  c.arc(50, innerHeight - 50, 35, 0, 360);
  c.fillStyle = "darkgray";
  c.fill();

  // update cannon arm
  cannon.show();

  // update cannonballs
  for (var i = 0; i < cannonballs.length; i++) {
    cannonballs[i].update();
    cannonballs[i].show();

    if (cannonballs[i].x > innerWidth || cannonballs[i].y > innerHeight) {
      cannonballs.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();