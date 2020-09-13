// declare variables
let radius = 5;
let len_fireworks = 5;
let len_sparks = 20;
let g = 0.15;
let lifespan = 60;

// spark colors
let max_r = 248;
let min_r = 217;
let max_g = 165;
let min_g = 34;
let max_b = 12;
let min_b = 0;

// setup canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 60;

// firework object
class Firework {

  constructor(x, y, vel) {
    this.x = x;
    this.y = y;
    this.vel = vel;
  }

  show() {
    c.beginPath();
    c.arc(this.x, this.y, radius, 0, 360);
    c.closePath();
    c.fill();
  }

  update() {
    this.vel += g;
    this.y += this.vel;
  }

  explode() {
    for (var i = 0; i < len_sparks; i++) {
      sparks.push( new Particle(this.x, this.y) );
    }
  }

}

// particle object
class Particle {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velX = (Math.random() - 0.5) * 5;
    this.velY = (Math.random() - 0.5) * 5;
    this.lifespan = lifespan;
  }

  show() {
    // make a random color based on restraints
    let red = (Math.random() * (max_r - min_r)) + min_r;
    let green = (Math.random() * (max_g - min_g)) + min_g;
    let blue = (Math.random() * (max_b - min_b)) + min_b;
    c.fillStyle = `rgba(${red}, ${green}, ${blue}, ${this.lifespan/lifespan})`;

    // draw dot of spark
    c.beginPath();
    c.arc(this.x, this.y, radius/3, 0, 360);
    c.closePath();
    c.fill();
    c.fillStyle = "white";
  }

  update() {
    this.vel += g;
    this.y += this.velY;
    this.x += this.velX;
    this.lifespan--;
  }

}

// setup fireworks & sparks
var fireworks = [];
var sparks = [];

c.fillStyle = "white";

function draw() {

  // clear canvas
  c.clearRect(0, 0, canvas.width, canvas.height);

  // update fireworks
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].vel >= -0.5) {
      fireworks[i].explode();
      fireworks.splice(i, 1);
    }
  }

  // update sparks
  for (var i = sparks.length - 1; i >= 0; i--) {
    sparks[i].update();
    sparks[i].show();
    
    if (sparks[i].lifespan <= 0) {
      sparks.splice(i, 1);
    }
  }

  // add new fireworks after old ones disappear
  if (fireworks.length < len_fireworks) {
    addFirework();
  }

  requestAnimationFrame(draw);
}

draw();

// for convenience
function addFirework() {
  let x = Math.random() * canvas.width;
  let v = (Math.random() * -10) - 5;
  fireworks.push( new Firework(x, canvas.height, v) );
}

// click to launch a firework
window.addEventListener('mouseup', (event) => {
  if (fireworks.length < len_fireworks*2) {
    let x = event.clientX;
    let v = (Math.random() * -10) - 5;
    fireworks.push( new Firework(x, canvas.height, v) );
  }
});

//
// changing settings & html
//

function changeTab(id, id2) {

  var tab = document.getElementById(id);
  var other = document.getElementById(id2);
  var settings = document.getElementById(`${id.slice(0, -4)}-settings`);
  var other_settings = document.getElementById(`${id2.slice(0, -4)}-settings`);

  if (settings.classList.contains('shown')) {
    return;
  } else {
    tab.classList.remove('unselected');
    other.classList.add('unselected');
    settings.classList.replace('hidden', 'shown');
    other_settings.classList.replace('shown', 'hidden');
  }

}

function updateVals(id, value) {

  document.getElementById(id).innerHTML = value;
  
  if (id == "radius") {
    radius = value;
  } else if (id == "len_fireworks") {
    len_fireworks = value;
  } else if (id == "len_sparks") {
    len_sparks = value;
  } else if (id == "gravity") {
    g = value/100;
    document.getElementById(id).innerHTML = value/100;
  }

}

function updateMaxRGB(r, gr, b) {
  document.getElementById('maxR').innerHTML = r;
  document.getElementById('maxG').innerHTML = gr;
  document.getElementById('maxB').innerHTML = b;
  max_r = parseInt(r);
  max_g = parseInt(gr);
  max_b = parseInt(b);
}

function updateMinRGB(r, gr, b) {
  document.getElementById('minR').innerHTML = r;
  document.getElementById('minG').innerHTML = gr;
  document.getElementById('minB').innerHTML = b;
  min_r = parseInt(r);
  min_g = parseInt(gr);
  min_b = parseInt(b);
}