// declare variables
let range = 100;
let circles = [];
let colors = [
  "#E5E8B6",
  "#F37748",
  "#4F6D7A",
  "#7CC6FE",
  "#171738"
];
let mouseX;
let mouseY;

// setup canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 60;

// start animation
function animate() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].show();

    if (
      circles[i].x >= mouseX - range && circles[i].x <= mouseX + range
      && circles[i].y >= mouseY - range && circles[i].y <= mouseY + range
    ) {
      circles[i].velX += (circles[i].x - mouseX) / 500;
      circles[i].velY += (circles[i].y - mouseY) / 500;
    }

  }

  requestAnimationFrame(animate);
}

animate();

//
// classes
//

class Circle {
  
  constructor() {
    this.radius = Math.random() * 10 + 10;
    this.x = (Math.random() * (canvas.width - this.radius*2)) + this.radius;
    this.y = (Math.random() * (canvas.height - this.radius*2)) + this.radius;
    this.velX = Math.random() - 0.5;
    this.velY = Math.random() - 0.5;
    this.idealX = this.velX;
    this.idealY = this.velY;
    this.color = colors[ Math.floor( Math.random() * colors.length ) ];
  }

  update() {
    // bounce off walls
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.velX *= -1;
      this.idealX *= -1;
    }

    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.velY *= -1;
      this.idealY *= -1;
    }

    // return to ideal speed
    if (Math.abs(this.velX) > Math.abs(this.idealX)) {
      this.velX *= 0.95;
    } else if (Math.abs(this.velX) < Math.abs(this.idealX)) {
      this.velX *= 1.05;
    }

    if (Math.abs(this.velY) > Math.abs(this.idealY)) {
      this.velY *= 0.95;
    } else if (Math.abs(this.velY) < Math.abs(this.idealY)) {
      this.velX *= 1.05;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  show() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 360);
    ctx.closePath();
    ctx.fill();
  }

}

// generate circles
for (var i = 0; i < 100; i++) {
  circles.push( new Circle() );
}

//
// event listeners
//

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 60;
  circles = [];
  for (var i = 0; i < 100; i++) {
    circles.push( new Circle() );
  }
})

window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY - 60;
})