const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cx = ctx.canvas.width / 2;
let cy = ctx.canvas.height / 2;

let particles = [];
const particleCount = 400;
const gravity = 0.5;
const terminalVelocity = 3;
const drag = 0.075;

// const isWinter = ([11, 0, 1].includes(new Date().getMonth()));
const isWinter = true;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
}

const randomRange = (min, max) => Math.random() * (max - min) + min;

function createParticle(isWinter) {
  return {
      dimensions: {
        radius: randomRange(1, 4),
      },
      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1,
      },
      rotation: randomRange(0, 2 * Math.PI),
      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50),
      },
    };
  }

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle(isWinter));
  }
}

function updateParticle(particle) {
  particle.velocity.x -= particle.velocity.x * drag;
  particle.velocity.y = Math.min(particle.velocity.y + gravity, terminalVelocity);
  particle.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

  particle.position.x += particle.velocity.x;
  particle.position.y += particle.velocity.y;

  if (particle.position.y >= canvas.height) return false;

  if (particle.position.x > canvas.width) particle.position.x = 0;
  if (particle.position.x < 0) particle.position.x = canvas.width;

  return true;
}

function renderParticle(particle) {
  const radius = particle.dimensions.radius;

    ctx.translate(particle.position.x, particle.position.y);
    ctx.rotate(particle.rotation);

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = bodyDark ? 'white' : 'cyan';
    ctx.fill();
    ctx.closePath();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(particle => {
    const stillVisible = updateParticle(particle);
    renderParticle(particle);
    return stillVisible;
  });

  if (particles.length <= 50) initParticles();

  window.requestAnimationFrame(render);
}

if(isWinter){
  initParticles();
  render();
}

window.addEventListener('resize', resizeCanvas);
