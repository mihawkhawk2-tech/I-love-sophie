/* BUTTON LOGIC */
const button = document.getElementById("loveButton");
const message = document.getElementById("secretMessage");

button.addEventListener("click", function () {
  message.classList.toggle("hidden");
  button.textContent = "I Love You ❤️";
});

/* CANVAS SETUP */
const canvas = document.getElementById("pinkboard");
const ctx = canvas.getContext("2d");

let hearts = [];

/* RESIZE */
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* DRAW HEART SHAPE */
function drawHeart(x, y, size, opacity) {
  ctx.save();

  ctx.translate(x, y);
  ctx.scale(size, size);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-1, -1, -2, 1, 0, 2);
  ctx.bezierCurveTo(2, 1, 1, -1, 0, 0);
  ctx.closePath();

  ctx.fillStyle = `rgba(255, 30, 120, ${opacity})`;
  ctx.shadowBlur = 12;
  ctx.shadowColor = "#ff2f92";

  ctx.fill();
  ctx.restore();
}

/* HEART PARTICLE */
class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 6;
    this.speedY = Math.random() * -1.2 - 0.5;
    this.opacity = 1;
  }

  update() {
    this.y += this.speedY;
    this.opacity -= 0.015;
  }

  draw() {
    drawHeart(this.x, this.y, this.size / 20, this.opacity);
  }
}

/* MOUSE HEARTS */
window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 2; i++) {
    hearts.push(new Heart(e.clientX, e.clientY));
  }
});

/* AMBIENT FLOATING HEARTS */
setInterval(() => {
  hearts.push(
    new Heart(
      Math.random() * canvas.width,
      canvas.height + 20
    )
  );
}, 350);

/* ANIMATION LOOP */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // RESET canvas state every frame (IMPORTANT)
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";

  hearts = hearts.filter(h => h.opacity > 0);

  hearts.forEach(h => {
    h.update();
    h.draw();
  });

  requestAnimationFrame(animate);
}

animate();
