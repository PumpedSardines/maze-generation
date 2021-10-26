import generate from "./maze";
import { Tile } from "./types";

const width = 50;
const height = 50;

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;

const ctx = canvas.getContext("2d")!;

const createMazeDrawer =
    (width: number, height: number, maze: (Tile | null)[][]) =>
    (size: number) => {
        canvas.width = size * width;
        canvas.height = size * height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (!maze[x][y]) {
                    continue;
                }

                const { up, down, left, right } = maze[x][y]!;

                if (!up) {
                    ctx.beginPath();
                    ctx.moveTo(x * size, y * size);
                    ctx.lineTo(x * size + size, y * size);
                    ctx.stroke();
                }

                if (!down) {
                    ctx.beginPath();
                    ctx.moveTo(x * size, y * size + size);
                    ctx.lineTo(x * size + size, y * size + size);
                    ctx.stroke();
                }

                if (!left) {
                    ctx.beginPath();
                    ctx.moveTo(x * size, y * size);
                    ctx.lineTo(x * size, y * size + size);
                    ctx.stroke();
                }
                if (!right) {
                    ctx.beginPath();
                    ctx.moveTo(x * size + size, y * size);
                    ctx.lineTo(x * size + size, y * size + size);
                    ctx.stroke();
                }
            }
        }
    };

generate({
    width,
    height,
}).then((maze) => {
    const draw = createMazeDrawer(width, height, maze);

    const executeDraw = () => {
        const size =
            window.innerHeight < window.innerWidth
                ? window.innerHeight
                : window.innerWidth;
        draw((size * 0.8) / width);
    };

    window.addEventListener("resize", executeDraw);
    executeDraw();
});
