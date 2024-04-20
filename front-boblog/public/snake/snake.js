"use strict";
var snake;
(function (snake) {
    ;
    ;
    function addP(a, b) {
        return { x: (a.x + b.x + side_cells) % side_cells, y: (a.y + b.y + side_cells) % side_cells };
    }
    snake.addP = addP;
    function rand_point(side_cells = 30) {
        return { x: Math.floor((Math.random()) * side_cells), y: Math.floor((Math.random()) * side_cells) };
    }
    snake.rand_point = rand_point;
    function sp(point) {
        return JSON.stringify({ x: point.x, y: point.y });
    }
    const canvas = document.getElementById('gameCanvas');
    const b_u = document.getElementById("b-u");
    const b_l = document.getElementById("b-l");
    const b_r = document.getElementById("b-r");
    const b_d = document.getElementById("b-d");
    // Other variables and logic specific to ColorCube
    // basic game variables
    let side_cells = 30;
    let side_lenght = Math.min(window.innerWidth, window.innerHeight) * 0.9;
    const ctx = canvas.getContext('2d');
    const null_point = { x: -9, y: -9 };
    let lenght = 1;
    let body = [{ x: 0, y: 0 }];
    let direction = { x: 0, y: 0 };
    let last_direction = null_point;
    let head = { x: 50, y: 50 };
    let fruit = { x: 0, y: 0 };
    let map = new Map();
    let interval = 18;
    let frame = 0;
    function spawn_fruit() {
        console.log('b');
        fruit = rand_point(side_cells);
        let tmp = map.get(sp(fruit));
        while (tmp.type != "empty") {
            console.log(tmp);
            fruit = rand_point(side_cells);
            tmp = map.get(sp(fruit));
        }
        map.set(sp(fruit), { type: "fruit", is_empty: false });
    }
    function draw(x, y, color) {
        ctx.beginPath();
        ctx.rect(Math.floor(x * (side_lenght / (side_cells + 0))), Math.floor(y * (side_lenght / (side_cells + 0))), Math.floor(side_lenght / (side_cells + 1)), Math.floor(side_lenght / (side_cells + 1)));
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    function move() {
        frame++;
        if (frame < Math.max(interval - Math.floor(lenght / 2), 5))
            return;
        frame = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // console.log(head);
        head = addP(head, direction);
        console.log(map.get(sp(head)));
        if (map.get(sp(head)).type == "empty") {
            map.set(sp(body[0]), { type: "empty", is_empty: true });
            for (let i = 1; i < body.length; i++) {
                body[i - 1] = body[i];
            }
            body[lenght - 1] = head;
            map.set(sp(head), { type: "body", is_empty: false });
        }
        else if (map.get(sp(head)).type == "fruit") {
            map.set(sp(head), { type: "body", is_empty: false });
            body.push(head);
            lenght++;
            console.log('a');
            spawn_fruit();
        }
        else if (map.get(sp(head)).type == "body") {
            if (lenght > 1)
                init();
        }
        for (let i = 0; i < lenght; i++) {
            draw(body[i].x, body[i].y, "#0000FF");
        }
        draw(fruit.x, fruit.y, "#FF0000");
    }
    function handle_input(new_direction) {
        return (event) => {
            direction = new_direction;
            if (last_direction.x != new_direction.x * -1 || last_direction.y != new_direction.y * -1)
                last_direction = direction;
            else
                direction = last_direction;
        };
    }
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w':
            case 'W':
            case 'ArrowUp':
                handle_input({ x: 0, y: -1 })(event);
                break;
            case 'a':
            case 'A':
            case 'ArrowLeft':
                handle_input({ x: -1, y: 0 })(event);
                break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                handle_input({ x: 1, y: 0 })(event);
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                handle_input({ x: 0, y: 1 })(event);
                break;
            default:
                break;
        }
    });
    b_u.addEventListener('click', handle_input({ x: 0, y: -1 }));
    b_l.addEventListener('click', handle_input({ x: -1, y: 0 }));
    b_r.addEventListener('click', handle_input({ x: 1, y: 0 }));
    b_d.addEventListener('click', handle_input({ x: 0, y: 1 }));
    function init() {
        canvas.width = side_lenght;
        canvas.height = side_lenght;
        map.clear();
        lenght = 1;
        for (let i = 0; i <= side_cells; i++)
            for (let j = 0; j <= side_cells; j++)
                map.set(sp({ x: i, y: j }), { type: "empty", is_empty: true });
        last_direction = null_point;
        head = rand_point(side_cells);
        body = [head];
        map.set(sp(head), { type: "body", is_empty: false });
        spawn_fruit();
        frame = 0;
    }
    init();
    setInterval(move, 1);
})(snake || (snake = {}));
