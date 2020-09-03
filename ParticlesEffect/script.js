const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

let adjustX = 30;
let adjustY = 5;

// handle mouse interaction
const mouse = {
  x: null,
  y: null,
  radius: 50,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText("S", 10, 30);
const txtCoordinates = ctx.getImageData(0, 0, 100, 100);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 10 + 5;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let forceDirX = dx / dist;
    let forceDirY = dy / dist;
    let maxDist = mouse.radius;
    let force = (maxDist - dist) / maxDist;
    let dirX = forceDirX * force * this.density;
    let dirY = forceDirY * force * this.density;

    if (dist < mouse.radius) {
      this.x -= dirX;
      this.y -= dirY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

// console.log(txtCoordinates);
const init = () => {
  particleArray = [];
  for (let y = 0; y < txtCoordinates.height; y++) {
    for (let x = 0; x < txtCoordinates.width; x++) {
      if (txtCoordinates.data[y * 4 * txtCoordinates.width + x * 4 + 3] > 128) {
        let posX = x + adjustX;
        let posY = y + adjustY;
        particleArray.push(new Particle(posX * 15, posY * 15));
      }
    }
  }
  // for (let i = 0; i < 1000; i++) {
  //   let x = Math.random() * canvas.width;
  //   let y = Math.random() * canvas.height;
  //   particleArray.push(new Particle(x, y));
  // }
};
init();

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particleArray.forEach((particle) => {
    particle.draw();
    particle.update();
  });
  connect();
  requestAnimationFrame(animate);
};

animate();

function connect() {
  let opacity = 1;
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let dx = particleArray[a].x - particleArray[b].x;
      let dy = particleArray[a].y - particleArray[b].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      opacity = 1 - dist / 40;
      ctx.strokeStyle = `rgba(255, 0, 0, ${opacity})`;
      if (dist < 50) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}
