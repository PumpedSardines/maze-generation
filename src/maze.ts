import shuffleArray from "./lib/shuffle-array";
import { Position, Tile } from "./types";

interface GenerationOptions {
    width?: number;
    height?: number;
    start?: Position;
    cb?: (maze: (Tile | null)[][]) => void | Promise<void>
}

async function generate(options: GenerationOptions = {}): Promise<Tile[][]> {
    const height = options.height ?? 8;
    const width = options.width ?? 8;
    const start = options.start ?? [0, 0];

    const maze: (Tile | null)[][] = new Array(width)
        .fill(null)
        .map(() => new Array(height).fill(null));

    const recursive = async (
        pos: Position,
        from?: keyof typeof nameMap
    ) => {
        const [posX, posY] = pos;

        maze[posX][posY] = {
            up: false,
            down: false,
            left: false,
            right: false,
        };

        if (from) {
            maze[posX][posY]![nameMapOpposite[from]] = true;
        }

        const directions = ["up", "down", "left", "right"] as const;

        for (const direction of shuffleArray(directions)) {
            const [dirX, dirY] = nameMap[direction];
            const newPosX = posX + dirX;
            const newPosY = posY + dirY;

            if (
                newPosX === -1 ||
                newPosY === -1 ||
                newPosX === width ||
                newPosY === height
            ) {
                continue;
            }

            if (maze[newPosX][newPosY]) {
                continue;
            }

            maze[posX][posY]![direction] = true;

            if(options.cb) {
                await options.cb(JSON.parse(JSON.stringify(maze)));
            }

            await recursive([newPosX, newPosY], direction);
        }
    };

    await recursive(start);

    return maze as Tile[][];
}

const nameMap = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0],
};

const nameMapOpposite = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
};

export default generate;
