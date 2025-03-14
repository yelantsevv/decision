import { AudioPause, AudioPlay } from "./AudioEL";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let segments: PropsCanvasElement['segments'];
let angle = -Math.PI / 2;
let spinning = false;

export type PropsCanvasElement = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  segments: {
    id: string;
    title: string;
    weight: number;
    color: string;
  }[];
};

function getSelectedSegment() {
  const totalWeight = segments.reduce((sum, seg) => sum + seg.weight, 0);

  const normalizedAngle =
    (((-angle - Math.PI / 2) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  let accumulatedAngle = 0;
  for (const segment of segments) {
    const sliceAngle = (segment.weight / totalWeight) * (2 * Math.PI);
    accumulatedAngle += sliceAngle;

    if (normalizedAngle <= accumulatedAngle) {
      return segment.title;
    }
  }
  return null;
}

export function drawWheel({
  canvas: canva,
  ctx: c,
  segments: s,
}: PropsCanvasElement): void {
  canvas = canva;
  ctx = c;
  segments = s;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 180;
  const totalWeight = segments.reduce((sum, seg) => sum + seg.weight, 0);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);

  let startAngle = 0;

  segments.forEach(segment => {
    const sliceAngle = (segment.weight / totalWeight) * (2 * Math.PI);
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, startAngle, endAngle);
    ctx.fillStyle = segment.color;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.fillStyle = 'white';
    const textAngle = startAngle + sliceAngle / 2;
    ctx.translate(
      Math.cos(textAngle) * radius * 0.8,
      Math.sin(textAngle) * radius * 0.8,
    );
    ctx.font = "20px 'Arial'";
    ctx.rotate(textAngle);
    ctx.fillText(segment.title, -10, 5);
    ctx.restore();

    startAngle = endAngle;
  });
  canvas.addEventListener('click', () => spinWheel());

  ctx.restore();

  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - radius - 10);
  ctx.lineTo(centerX - 10, centerY - radius);
  ctx.lineTo(centerX + 10, centerY - radius);
  ctx.closePath();
  ctx.fill();
}
let elementBtn: HTMLButtonElement;
export function spinWheelBtn(element: HTMLButtonElement) {
  elementBtn = element;
  element.addEventListener('click', () => spinWheel());
}
function spinWheel() {
  if (spinning) return;
  spinning = true;

  const turns = Math.floor(Math.random() * 10) + 5;
  let targetAngle = angle + turns * 2 * Math.PI + Math.random() * (2 * Math.PI);
  let speed = (targetAngle - angle) / 100;

  function animate() {
    angle += speed;
    speed *= 0.98;

    if (Math.abs(speed) > 0.0001) {
      drawWheel({ canvas, ctx, segments });
      requestAnimationFrame(animate);
      elementBtn.textContent = getSelectedSegment();
      AudioPlay();
    } else {
      spinning = false;
      AudioPause();
    }
  }
  animate();
}
