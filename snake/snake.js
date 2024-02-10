var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var cubes = [];
var colors = [];
function draw(x, y, c) {
    ctx.beginPath();
    ctx.rect(x, y, 30, 30);
    ctx.fillStyle = "#" + c;
    ctx.fill();
    ctx.closePath();
}
function move(movment) {
    if (movment.x >= canvas.width - 30 && movment.x_dir > 0)
        movment.x_dir *= -1;
    if (movment.x <= 0 && movment.x_dir <= 0)
        movment.x_dir *= -1;
    if (movment.y >= canvas.height - 30 && movment.y_dir > 0)
        movment.y_dir *= -1;
    if (movment.y <= 0 && movment.y_dir <= 0)
        movment.y_dir *= -1;
    movment.x += movment.x_dir, movment.y += movment.y_dir;
}
function init_cube() {
    for (var i = 0; i < cubes.length; i++) {
        draw(cubes[i].x, cubes[i].y, colors[i]);
        move(cubes[i]);
        console.log(cubes[i]);
    }
}
for (var i = 0; i < 200; i++) {
    var tmp1 = Math.random();
    var tmp2 = Math.sqrt(1 - tmp1 * tmp1);
    tmp1 *= 2, tmp2 *= 2;
    cubes.push({ x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height), x_dir: tmp1 * (Math.random() < 0.5 ? -1 : 1), y_dir: tmp2 * (Math.random() < 0.5 ? -1 : 1) });
    colors.push(Math.floor(Math.random() * 16777215).toString(16));
}
setInterval(init_cube, 1);
