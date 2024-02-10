const canvas = document.getElementById('gameCanvas')! as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;


let cubes:{x : number, y : number, x_dir : number, y_dir : number;}[] = [];
let colors : string[] = [];

function draw(x : number, y : number, c : string) {
    ctx.beginPath();
    ctx.rect(x, y, 30, 30);
    ctx.fillStyle = "#" + c;
    ctx.fill();
    ctx.closePath();
}

function move(movment : {x : number, y : number, x_dir : number, y_dir : number}) {
    if (movment.x >= canvas.width - 30 && movment.x_dir > 0) movment.x_dir *= -1;
    if (movment.x <= 0 && movment.x_dir <= 0) movment.x_dir *= -1;
    if (movment.y >= canvas.height -30 && movment.y_dir > 0) movment.y_dir *= -1;
    if (movment.y <= 0 && movment.y_dir <= 0) movment.y_dir *= -1;
    movment.x += movment.x_dir, movment.y += movment.y_dir;
}

function init_cube() { 
    for (let i = 0; i < cubes.length; i++) {
        draw(cubes[i].x, cubes[i].y, colors[i]);
        move(cubes[i]);
        console.log(cubes[i]);
    }
}

for (let i = 0; i < 200; i++) {
    let tmp1 = Math.random();
    let tmp2 = Math.sqrt(1 - tmp1 * tmp1);
    tmp1 *= 2, tmp2 *= 2;
    cubes.push({x : Math.floor(Math.random() * canvas.width), y : Math.floor(Math.random() * canvas.height), x_dir : tmp1 * (Math.random() < 0.5 ? -1 : 1), y_dir : tmp2 * (Math.random() < 0.5 ? -1 : 1)});
    colors.push(Math.floor(Math.random()*16777215).toString(16));
}


setInterval(init_cube, 1);


