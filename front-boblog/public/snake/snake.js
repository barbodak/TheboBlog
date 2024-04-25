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
    function isMobileDevice() {
        const userAgent = navigator.userAgent;
        return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    }
    const canvas = document.getElementById('gameCanvas');
    // Other variables and logic specific to ColorCube
    // basic game variables
    let side_cells = isMobileDevice() ? 18 : 20;
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
    let interval = 23;
    let frame = 0;
    let pause = false;
    function spawn_fruit() {
        fruit = rand_point(side_cells);
        let tmp = map.get(sp(fruit));
        while (tmp.type != "empty") {
            console.log(tmp);
            fruit = rand_point(side_cells);
            tmp = map.get(sp(fruit));
        }
        map.set(sp(fruit), { type: "fruit", is_empty: false });
    }
    function draw(x, y, color, type = "rect") {
        ctx.beginPath();
        if (type == "rect")
            ctx.rect(Math.floor(x * (side_lenght / (side_cells + 0))), Math.floor(y * (side_lenght / (side_cells + 0))), Math.floor(side_lenght / (side_cells + 1)), Math.floor(side_lenght / (side_cells + 1)));
        else if (type == "circle")
            ctx.arc(Math.floor(x * (side_lenght / (side_cells + 0))) + Math.floor(side_lenght / (side_cells + 1)) / 2, Math.floor(y * (side_lenght / (side_cells + 0))) + Math.floor(side_lenght / (side_cells + 1)) / 2, Math.floor(side_lenght / (side_cells + 1)) / 2, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = (n) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0'); // Convert to Hex and format
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }
    // Generate snake segment colors
    function getSnakeSegmentColors(length, saturation = 100, lightness = 50) {
        const colors = [];
        const colorStep = (100) / length; // Full range of hues from 0 to 360 degrees
        const base = 300; // Full range of hues from 0 to 360 degrees
        for (let i = 0; i < length; i++) {
            // Calculate the hue for each segment
            let hue = (base + i * colorStep) % 360;
            // Convert HSL to HEX
            let color = hslToHex(hue, saturation, lightness);
            colors.unshift(color); // Add color at the beginning to keep the head's color the same
        }
        return colors;
    }
    function move() {
        frame++;
        if (frame < Math.max(interval - Math.floor(lenght / 9), 5))
            return;
        frame = 0;
        console.log(lenght);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // console.log(head);
        head = addP(head, direction);
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
            spawn_fruit();
        }
        else if (map.get(sp(head)).type == "body") {
            if (lenght > 1) {
                while (body[0].x != head.x || body[0].y != head.y) {
                    frame = -200;
                    console.log(body[0]);
                    console.log("yo");
                    map.set(sp(body[0]), { type: "empty", is_empty: true });
                    lenght--;
                    body.shift();
                }
                map.set(sp(body[0]), { type: "empty", is_empty: true });
                body.shift();
                head.x -= direction.x;
                head.y -= direction.y;
                length--;
                console.log(body.length);
            }
        }
        let colo = getSnakeSegmentColors(lenght);
        for (let i = 0; i < lenght; i++) {
            draw(body[i].x, body[i].y, colo[i]);
        }
        draw(fruit.x, fruit.y, "#FBFF12", "circle");
    }
    function handle_input(new_direction) {
        direction = new_direction;
        if (last_direction.x != new_direction.x * -1 || last_direction.y != new_direction.y * -1)
            last_direction = direction;
        else
            direction = last_direction;
    }
    document.addEventListener('keydown', (event) => {
        pause = false;
        switch (event.key) {
            case 'w':
            case 'W':
            case 'ArrowUp':
                handle_input({ x: 0, y: -1 });
                break;
            case 'a':
            case 'A':
            case 'ArrowLeft':
                handle_input({ x: -1, y: 0 });
                break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                handle_input({ x: 1, y: 0 });
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                handle_input({ x: 0, y: 1 });
                break;
            default:
                break;
        }
    });
    // Initial touch position
    let startX = 0;
    let startY = 0;
    // Threshold in pixels for a swipe to be detected
    const threshold = 50;
    document.getElementById('swipeZone').addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, false);
    document.getElementById('swipeZone').addEventListener('touchmove', (e) => {
        // Prevent scrolling by touch
        e.preventDefault();
    }, { passive: false });
    document.getElementById('swipeZone').addEventListener('touchend', (e) => {
        const moveX = e.changedTouches[0].clientX - startX;
        const moveY = e.changedTouches[0].clientY - startY;
        if (Math.abs(moveX) > threshold || Math.abs(moveY) > threshold) {
            if (Math.abs(moveX) > Math.abs(moveY)) {
                // Horizontal swipe
                if (moveX > 0) {
                    handle_input({ x: 1, y: 0 });
                }
                else {
                    handle_input({ x: -1, y: 0 });
                }
            }
            else {
                // Vertical swipe
                if (moveY > 0) {
                    handle_input({ x: 0, y: 1 });
                }
                else {
                    handle_input({ x: 0, y: -1 });
                }
            }
        }
    }, false);
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
