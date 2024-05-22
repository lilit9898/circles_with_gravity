const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Circle {
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dy = 0;
        this.gravity = 0.98;
        this.friction = 0.7;
        this.color = this.randomColor();
    }
    randomColor() {
        const colors = [
            "#FF5733",
            "#33FF57",
            "#3357FF",
            "#F3FF33",
            "#FF33A1"
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    draw(ctx) {
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
        this.draw(ctx);
    }
}
class App {
    constructor(){
        this.circles = [];
        this.animate = ()=>{
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                console.log({
                    circles: this.circles
                });
                for (const circle of this.circles)circle.update();
                requestAnimationFrame(this.animate.bind(this));
            }
        };
        canvas.addEventListener("click", this.spawnCircle.bind(this));
        this.animate();
    }
    spawnCircle(event) {
        const radius = Math.random() * 20 + 10;
        const x = event.clientX;
        const y = event.clientY;
        const circle = new Circle(x, y, radius);
        this.circles.push(circle);
    }
}
new App();

//# sourceMappingURL=index.377278e2.js.map
