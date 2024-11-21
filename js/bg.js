const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cx = ctx.canvas.width / 2;
let cy = ctx.canvas.height / 2;

let particles = [];
const particleCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
  { front: 'red', back: 'darkred' },
  { front: 'green', back: 'darkgreen' },
  { front: 'blue', back: 'darkblue' },
  { front: 'yellow', back: 'darkyellow' },
  { front: 'orange', back: 'darkorange' },
  { front: 'pink', back: 'darkpink' },
  { front: 'purple', back: 'darkpurple' },
  { front: 'turquoise', back: 'darkturquoise' }
];

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
  if (isWinter) {
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
  } else {
    return {
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30),
      },
      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1,
      },
      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1,
      },
      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50),
      },
    };
  }
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
  if (isWinter) {
    const radius = particle.dimensions.radius;

    ctx.translate(particle.position.x, particle.position.y);
    ctx.rotate(particle.rotation);

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  } else {
    const width = particle.dimensions.x * particle.scale.x;
    const height = particle.dimensions.y * particle.scale.y;

    ctx.translate(particle.position.x, particle.position.y);
    ctx.rotate(particle.rotation);

    particle.scale.y = Math.cos(particle.position.y * 0.1);
    ctx.fillStyle = particle.scale.y > 0 ? particle.color.front : particle.color.back;

    ctx.fillRect(-width / 2, -height / 2, width, height);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
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

initParticles();
render();

window.addEventListener('resize', resizeCanvas);
