;
export function addP(a, b, side_cells = 30) {
    return { x: (a.x + b.x + side_cells) % side_cells, y: (a.y + b.y + side_cells) % side_cells };
}
export function rand_point(side_cells = 30) {
    return { x: (Math.random()) % side_cells, y: (Math.random()) % side_cells };
}
export function isEmpty(x, y, ctx) {
    const imageData = ctx.getImageData(x, y, 1, 1);
    const data = imageData.data;
    const r = data[0];
    const g = data[1];
    const b = data[2];
    const a = data[3];
    if (a !== 0 && (r !== 238 || g !== 238 || b !== 238))
        return false;
    return true;
}
export function main_draw(x, y, color, ctx, side_cells, side_lenght) {
    ctx.beginPath();
    ctx.rect(Math.floor(x * (side_lenght / (side_cells + 0))), Math.floor(y * (side_lenght / (side_cells + 0))), Math.floor(side_lenght / (side_cells + 1)), Math.floor(side_lenght / (side_cells + 1)));
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
