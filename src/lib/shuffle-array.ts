export default function shuffleArray<T>(array: readonly T[]): T[] {
    const newArray: T[] = JSON.parse(JSON.stringify(array));
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }
    return newArray;
}