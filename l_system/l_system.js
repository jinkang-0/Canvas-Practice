// setup canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 60;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 60;
  draw();
});

// to generate new string
function generate(text) {
  let newText = "";

  for (var i = 0; i < text.length; i++) {
    let char = text.charAt(i);
    
    for (var j = 0; j < rules.length; j++) {
      if (char == rules[j].from) {
        newText += rules[j].to;
        break;
      }
      if (j == rules.length-1) newText += char;
    }
  }

  return newText;
}

function iterate() {
  // add iteration count
  n++;
  document.getElementById('iteration-count').innerHTML = "n = " + n;

  // generate new drawing
  drawing = generate(drawing);
  len /= 2;

  // draw
  draw();
}

// draw
function draw() {

  // clear & setup position
  c.resetTransform();
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.translate(canvas.width/2, canvas.height);

  // draws current text
  for (var i = 0; i < drawing.length; i++) {
    let char = drawing.charAt(i);

    // instructions
    // + means turn left
    // - means turn right
    // [ means save state
    // ] means restore state
    if (char == "F" || char == "A" || char == "B" || char == "G") {
      line(0, -len);
      // len *= 0.9999;
    } else if (char == "+") {
      c.rotate(-angle);
    } else if (char == "-") {
      c.rotate(angle);
    } else if (char == "[") {
      c.save();
    } else if (char == "]") {
      c.restore();
    }
  }

  // console.log(drawing);
}

// tools
function line(x, y) {
  c.beginPath();
  c.moveTo(0, 0);
  c.lineTo(x, y);
  c.closePath();
  c.translate(x, y);
  c.stroke();
}

function setVals(a, l, ax, r) {
  angle = a * Math.PI / 180;
  length = l;
  axiom = ax;
  rules = r;
}

function reset() {
  n = 0;
  document.getElementById('iteration-count').innerHTML = 'n = 0';
  len = length;
  drawing = axiom;
  draw();
}