var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouseX;
var mouseY;

var speedMult = 5;
var growthFactor = 10;
var declineFactor = 2;
var circleCount = 150;

var colors = [
  "#03256C",
  "#2541B2",
  "#1768AC",
  "#06BEE1",
  "white"
];

window.addEventListener("mousemove", function() {
  mouseX = event.clientX;
  mouseY = event.clientY;
})

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

window.addEventListener("mousedown", function() {
  document.getElementById("desc").style.display = "none";
})

class Circle {
  constructor(x, y, vel, acc, radius) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.acc = acc;
    this.minRadius = radius;
    this.radius = radius;
    this.color = colors[Math.floor( Math.random() * colors.length )];
  }

  update() {
    this.x += this.acc;
    this.y += this.vel;

    if (this.x - this.radius < 0 || this.x + this.radius > innerWidth) {
      this.acc = -this.acc;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > innerHeight) {
      this.vel = -this.vel;
    }

    if (
      (this.x > mouseX - 75 && this.x < mouseX + 75)
      && (this.y > mouseY - 75 && this.y < mouseY + 75)
    ) {
      if (this.radius < 50) {
        this.radius += growthFactor;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= declineFactor;
    }
  }

  show() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 360);
    c.fillStyle = this.color;
    c.fill();
  }
}

var circles = [];

function init() {
  circles = [];

  for (var i = 0; i < circleCount; i++) {
    let radius = (Math.random() * 5) + 6;
    circles.push(new Circle(
      (Math.random() * (innerWidth - (2 * radius))) + radius,
      (Math.random() * (innerHeight - (2 * radius))) + radius,
      ((Math.random() - 0.5) * speedMult) + 0.01,
      ((Math.random() - 0.5) * speedMult) + 0.01,
      radius)
    );
  }
}

function animate() {

  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].show();
  }

  requestAnimationFrame(animate);
}

init();
animate();