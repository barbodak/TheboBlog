const canvas = document.getElementById('gameCanvas')! as HTMLCanvasElement;
const input = document.getElementById("mytext")! as HTMLInputElement;
const size_input = document.getElementById("mysize")! as HTMLInputElement;
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.7;
const ctx = canvas.getContext('2d')!;

let cubes : {x : number, y : number, x_dir : number, y_dir : number;}[] = [];
let colors : string[] = [];
let state = true;
let mouseOn = true;
let preVal = 0;
let mouseX : number;
let mouseY : number;
let siz = 25;
function draw(x : number, y : number, c : string, x_size : number = siz, y_size : number = siz) {
    ctx.beginPath();
    ctx.rect(x, y, x_size, y_size);
    ctx.fillStyle = "#" + c;
    ctx.fill();
    ctx.closePath();
}

function move(movment : {x : number, y : number, x_dir : number, y_dir : number}) {
    if (movment.x >= canvas.width - siz && movment.x_dir > 0) movment.x_dir *= -1;
    if (movment.x <= 0 && movment.x_dir <= 0) movment.x_dir *= -1;
    if (movment.y >= canvas.height - siz && movment.y_dir > 0) movment.y_dir *= -1;
    if (movment.y <= 0 && movment.y_dir <= 0) movment.y_dir *= -1;
    let dis = Math.sqrt(Math.abs(movment.x - mouseX) * Math.abs(movment.x - mouseX) + Math.abs(movment.y - mouseY) * Math.abs(movment.y - mouseY));
    if (dis <= 300)
        movment.x += movment.x_dir * 5, movment.y += movment.y_dir * 5;
    else
        movment.x += movment.x_dir, movment.y += movment.y_dir;
}

function init_cube() { 
    if (state) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw(0, 0, "000000", canvas.width, canvas.height);
    }
    for (let i = 0; i < cubes.length; i++) {
        draw(cubes[i].x, cubes[i].y, colors[i]);
        move(cubes[i]);
    }
}



function handleChange() {
    if (preVal < input.valueAsNumber)
        for (let i = preVal; i < input.valueAsNumber; i++) {
            let tmp1 = Math.random();
            let tmp2 = Math.sqrt(1 - tmp1 * tmp1);
            tmp1 *= 2, tmp2 *= 2;
            cubes.push({x : Math.floor(Math.random() * canvas.width), y : Math.floor(Math.random() * canvas.height), x_dir : tmp1 * (Math.random() < 0.5 ? -1 : 1), y_dir : tmp2 * (Math.random() < 0.5 ? -1 : 1)});
            colors.push(Math.floor(Math.random()*16777215).toString(16));
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


canvas.addEventListener('mousemove', function(event) {
    // Calculate mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    if (mouseOn) {
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    }

});



input.addEventListener('change', handleChange);
size_input.addEventListener('change', () => {siz = size_input.valueAsNumber;});
setInterval(init_cube, 10);

