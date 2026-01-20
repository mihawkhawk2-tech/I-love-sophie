const button = document.getElementById("loveButton");
const message = document.getElementById("secretMessage");

button.addEventListener("click", function () {
  message.classList.toggle("hidden");
  button.textContent = "I Love You ❤️";
});
const canvas = document.getElementById("pinkboard");
const ctx = canvas.getContext("2d");

let hearts = [];
let mouse = { x: null, y: null };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// heart shape
function drawHeart(x, y, size, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-1, -1, -2, 1, 0, 2);
  ctx.bezierCurveTo(2, 1, 1, -1, 0, 0);
  ctx.closePath();
  ctx.fillStyle = `rgba(255, 47, 146, ${opacity})`;
  ctx.fill();
  ctx.restore();
}

// heart particle
class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 6;
    this.speedY = Math.random() * -1.5 - 0.5;
    this.opacity = 1;
  }

  update() {
    this.y += this.speedY;
    this.opacity -= 0.01;
  }

  draw() {
    drawHeart(this.x, this.y, this.size / 20, this.opacity);
  }
}

// mouse interaction ❤️
window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 2; i++) {
    hearts.push(new Heart(e.clientX, e.clientY));
  }
});

// ambient hearts (soft background)
setInterval(() => {
  hearts.push(
    new Heart(
      Math.random() * canvas.width,
      canvas.height + 20
    )
  );
}, 300);

// animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts = hearts.filter(h => h.opacity > 0);
  hearts.forEach(h => {
    h.update();
    h.draw();
  });

  requestAnimationFrame(animate);
}

animate();
