const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Circle {
  x: number;
  y: number;
  radius: number;
  dy: number;
  gravity: number;
  friction: number;
  color: string;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dy = 0;
    this.gravity = 0.98;
    this.friction = 0.7;
    this.color = this.generateColor();
  }

  generateColor(): string {
    const colors = ['#e97f67', '#00ff2f', '#6075d1', '#e8f800', '#ff038a'];
    return colors[Math.round(Math.random() * colors.length)];
  }

  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.dy += this.gravity;
    this.y += this.dy;

    console.log(this.y);

    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.dy *= -this.friction;
    }

    this.drawCircle(ctx);
  }
}

class App {
  circles: Circle[] = [];

  constructor() {
    canvas.addEventListener('click', this.createCircle.bind(this));
    this.animateCircles();
  }

  createCircle(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;
    const radius = Math.random() * 20 + 10;
    const circle = new Circle(x, y, radius);
    this.circles.push(circle);
  }

  animateCircles = () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      console.log({
        circles: this.circles,
      });
      for (const circle of this.circles) {
        circle.update();
      }

      requestAnimationFrame(this.animateCircles.bind(this));
    }
  };
}

new App();
