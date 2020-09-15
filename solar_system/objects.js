class Star {

  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.radius = r;
    if (color) this.color = color;
  }

  show() {
    ctx.fillStyle = this.color;
    dot(this.x, this.y, this.radius);
  }

}

class Planet {

  constructor(rotation, distance, radius, velocity, color, moons) {
    this.angle = rotation;
    this.dist = distance;
    this.vel = velocity;
    this.radius = radius;
    this.color = color;
    if (moons) this.moons = moons;
  }

  update() {
    this.angle += this.vel;
    this.show();
  }

  show() {
    // draw planet
    returnToSun();
    ctx.rotate(this.angle);
    ctx.translate(this.dist, 0);
    ctx.fillStyle = this.color;
    dot(0, 0, this.radius);

    // draw moons
    if (this.moons) {
      for (var i = 0; i < this.moons.length; i++) {
        this.moons[i].update();
        this.moons[i].show();
      }
    }
  }

}

class Moon {

  constructor(rotation, distance, radius, velocity) {
    this.angle = rotation;
    this.dist = distance;
    this.vel = velocity;
    this.radius = radius;
  }

  update() {
    this.angle += this.vel;
  }

  show() {
    ctx.rotate(this.angle);
    ctx.translate(this.dist, 0);
    ctx.fillStyle = 'gray';
    dot(0, 0, this.radius);
    ctx.translate(-this.dist, 0);
    ctx.rotate(-this.angle);
  }

}