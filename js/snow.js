const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cx = ctx.canvas.width / 2;
let cy = ctx.canvas.height / 2;

let snowflakes = [];
const snowflakeCount = 400;
const gravity = 0.5;
const terminalVelocity = 3;
const drag = 0.075;

var isWinter = ([11, 0, 1].includes(new Date().getMonth()));

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
}

const randomRange = (min, max) => Math.random() * (max - min) + min;

function createSnowflake() {
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

function initSnowflakes() {
  for (let i = 0; i < snowflakeCount; i++) {
    snowflakes.push(createSnowflake());
  }
}

function updatesnowflake(snowflake) {
  snowflake.velocity.x -= snowflake.velocity.x * drag;
  snowflake.velocity.y = Math.min(snowflake.velocity.y + gravity, terminalVelocity);
  snowflake.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

  snowflake.position.x += snowflake.velocity.x;
  snowflake.position.y += snowflake.velocity.y;

  if (snowflake.position.y >= canvas.height) return false;

  if (snowflake.position.x > canvas.width) snowflake.position.x = 0;
  if (snowflake.position.x < 0) snowflake.position.x = canvas.width;

  return true;
}

function renderSnowflake(snowflake) {
  const radius = snowflake.dimensions.radius;

    ctx.translate(snowflake.position.x, snowflake.position.y);
    ctx.rotate(snowflake.rotation);

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = (tg.colorScheme === 'dark') ? 'white' : 'cyan';
    ctx.fill();
    ctx.closePath();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!isWinter) return snowflakes = [];

  snowflakes = snowflakes.filter(snowflake => {
    const stillVisible = updatesnowflake(snowflake);
    renderSnowflake(snowflake);
    return stillVisible;
  });

  if (snowflakes.length <= 50) initSnowflakes();

  window.requestAnimationFrame(render);
}

function startSnowing() { 
  if(isWinter) {
    initSnowflakes();
    render();
  }
}

startSnowing();

window.addEventListener('resize', resizeCanvas);
