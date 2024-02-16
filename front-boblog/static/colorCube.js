var canvas = document.getElementById('gameCanvas');
var input = document.getElementById("mytext");
var size_input = document.getElementById("myRange");
var check = document.getElementById("myCheck");
var hmmbutton = document.getElementById("hmmButton");
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.75;
var ctx = canvas.getContext('2d');
var cubes = [];
var colors = [];
var state = true;
var mouseOn = false;
var preVal = 0;
var mouseX;
var mouseY;
var siz = 25;
function isEmpty(x, y) {
    var imageData = ctx.getImageData(x, y, 1, 1);
    var data = imageData.data;
    var r = data[0];
    var g = data[1];
    var b = data[2];
    var a = data[3];
    if (a !== 0 && (r !== 238 || g !== 238 || b !== 238))
        return false;
    return true;
}
function draw(x, y, c, x_size, y_size) {
    if (x_size === void 0) { x_size = siz; }
    if (y_size === void 0) { y_size = siz; }
    ctx.beginPath();
    ctx.rect(x, y, x_size, y_size);
    ctx.fillStyle = "#" + c;
    ctx.fill();
    ctx.closePath();
}
function move(movment) {
    if (movment.x >= canvas.width - siz && movment.x_dir > 0)
        movment.x_dir *= -1;
    if (movment.x <= 0 && movment.x_dir <= 0)
        movment.x_dir *= -1;
    if (movment.y >= canvas.height - siz && movment.y_dir > 0)
        movment.y_dir *= -1;
    if (movment.y <= 0 && movment.y_dir <= 0)
        movment.y_dir *= -1;
    var dis = Math.sqrt(Math.abs(movment.x - mouseX) * Math.abs(movment.x - mouseX) + Math.abs(movment.y - mouseY) * Math.abs(movment.y - mouseY));
    if (dis <= 220)
        movment.x += movment.x_dir * 6, movment.y += movment.y_dir * 6;
    else
        movment.x += movment.x_dir, movment.y += movment.y_dir;
}
function init_cube() {
    if (state) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw(0, 0, "000000", canvas.width, canvas.height);
    }
    for (var i = 0; i < cubes.length; i++) {
        draw(cubes[i].x, cubes[i].y, colors[i]);
        move(cubes[i]);
    }
}
function handleChange() {
    if (preVal < input.valueAsNumber)
        for (var i = preVal; i < input.valueAsNumber; i++) {
            var tmp1 = Math.random();
            var tmp2 = Math.sqrt(1 - tmp1 * tmp1);
            tmp1 *= 2, tmp2 *= 2;
            cubes.push({ x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height), x_dir: tmp1 * (Math.random() < 0.5 ? -1 : 1), y_dir: tmp2 * (Math.random() < 0.5 ? -1 : 1) });
            colors.push(Math.floor(Math.random() * 16777215).toString(16));
        }
    else
        while (cubes.length > input.valueAsNumber && cubes.length > 0) {
            cubes.pop();
            colors.pop();
        }
    preVal = Math.max(0, input.valueAsNumber);
}
function handleClick() {
    state = !state;
}
function dissMouse() {
    mouseOn = !mouseOn;
    mouseX = mouseY = NaN;
}
canvas.addEventListener('mousemove', function (event) {
    // Calculate mouse position relative to the canvas
    var rect = canvas.getBoundingClientRect();
    if (mouseOn) {
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    }
});
handleChange();
check.addEventListener('change', dissMouse);
input.addEventListener('change', handleChange);
size_input.addEventListener('change', function () { siz = Math.max((size_input.valueAsNumber / 100) * (size_input.valueAsNumber / 100) * (size_input.valueAsNumber / 100) * Math.min(canvas.height, canvas.width), 1); });
hmmbutton.addEventListener('click', handleClick);
setInterval(init_cube, 10);
