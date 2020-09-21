class Cell {
  
  constructor(x, y, r, c, potential) {
    this.x = x;
    this.y = y;
    this.velX = random(-0.1, 0.1);
    this.velY = random(-0.1, 0.1);
    this.radius = r;
    this.color = c;
    if (potential) this.potential = potential;
  }

  mitosis() {
    cells.push( new Cell(this.x, this.y, 1, this.color, this.radius + random(-0.1, 0.2)) );
  }

  update() {
    this.velX += random(-0.001, 0.001);
    this.velY += random(-0.001, 0.001);
    this.x += this.velX;
    this.y += this.velY;
    
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.velX *= -1;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.velY *= -1;
    }

    if (this.potential > this.radius) {
      this.radius += 0.1;
    }
  }

  show() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 360);
    c.closePath();
    c.fillStyle = this.color;
    c.fill();
  }

}