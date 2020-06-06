let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mouseDragged() { 
  let r = random(10, 50);
  let b = new Bubble(mouseX, mouseY, r);
  bubbles.push(b);
}

function mousePressed() {
  let r = random(5, 20);
  let b = new Bubble(mouseX, mouseY, r);
  bubbles.push(b);
}

function draw() {
  background(0);

  for (let bubble of bubbles) {
    bubble.move();
    bubble.show();
  }

}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    this.x = this.x + random(-4, 4);
    this.y = this.y + random(-8, 4);
  }

  show() {
    stroke(255);
    strokeWeight(3);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
}
