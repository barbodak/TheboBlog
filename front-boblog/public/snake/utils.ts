 export interface Point {
    x: number;
    y: number;
};

 export function addP(a : Point, b : Point, side_cells : number = 30) {
    return {x : (a.x + b.x + side_cells) % side_cells, y : (a.y + b.y + side_cells) % side_cells};
}

 export function rand_point(side_cells : number = 30) : Point {
    return {x : (Math.random()) % side_cells, y : (Math.random()) % side_cells};
}

 export function isEmpty(x : number, y : number, ctx : CanvasRenderingContext2D) {
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

export function main_draw(x : number, y : number, color : string, ctx : CanvasRenderingContext2D, side_cells : number, side_lenght : number) {
    ctx.beginPath();
    ctx.rect(Math.floor(x * (side_lenght / (side_cells + 0))), Math.floor(y * (side_lenght / (side_cells + 0))), Math.floor(side_lenght / (side_cells + 1)), Math.floor(side_lenght / (side_cells + 1)));
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
