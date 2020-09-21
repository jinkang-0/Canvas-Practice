// setup canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 60;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 60;
});

window.addEventListener('mousedown', (event) => {
  let mouseX = event.clientX;
  let mouseY = event.clientY - 60;
  for (var i = 0; i < cells.length; i++) {
    if (
      cells[i].x + cells[i].radius >= mouseX && cells[i].x - cells[i].radius <= mouseX
      && cells[i].y + cells[i].radius >= mouseY && cells[i].y - cells[i].radius <= mouseY
    ) {
      cells[i].mitosis();
      break;
    }
  }
});

// declare variables
let cellCount = 10;

// setup cells
var cells = [];
var colors = [
  "#FFE0ED",
  "#C4B7D6",
  "#C3D5EB",
  "#A5D4C3",
  "#D5F7C1",
  "#81FF75",
  "#A9D647",
  "#EBDF61",
  "#D4B14C",
  "#FABB69"
];

for (var i = 0; i < cellCount; i++) {
  let r = random(8, 12);
  cells.push( new Cell(random(r, canvas.width - 2*r), random(r, canvas.height - 2*r), r, colors[ Math.floor(random(colors.length)) ]) );
}

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < cells.length; i++) {
    cells[i].update();
    cells[i].show();
  }

  requestAnimationFrame(animate);
}

animate();

//
// tools
//

function random(min, max) {
  if (max == null) return Math.random() * min;
  return ( Math.random() * (max - min) ) + min;
}