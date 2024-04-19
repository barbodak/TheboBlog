namespace snake{
    interface Point {
        x: number;
        y: number;
    };
    interface Cell {
        type: string;
        is_empty: boolean;
    };

    export function addP(a : Point, b : Point) {
        return {x : (a.x + b.x + side_cells) % side_cells, y : (a.y + b.y + side_cells) % side_cells};
    }

    export function rand_point(side_cells : number = 30) : Point {
        return {x : Math.floor((Math.random()) * side_cells), y : Math.floor((Math.random()) * side_cells)};
    }

    function sp(point : Point) {
        return JSON.stringify({ x: point.x, y: point.y });
    }
    const canvas = document.getElementById('gameCanvas')! as HTMLCanvasElement;
    // Other variables and logic specific to ColorCube

    // basic game variables
    let side_cells = 30;
    let side_lenght = Math.min(window.innerWidth, window.innerHeight) * 0.9;
    const ctx = canvas.getContext('2d')!;
    const null_point = {x : -9, y : -9};

    let lenght = 1;
    let body : Point[] = [{x : 0, y : 0}];
    let direction = {x : 0, y : 0};
    let last_direction = null_point;
    let head = {x : 50, y : 50};
    let fruit = {x : 0, y : 0};
    let map = new Map<String, Cell>();
    let interval = 18;
    let frame = 0;


    function spawn_fruit() {
        fruit = rand_point(side_cells);
        let tmp : Cell = map.get(sp(fruit))!;
        while (tmp.type != "empty") {
            fruit = rand_point(side_cells);
        }
        map.set(sp(fruit), {type : "fruit", is_empty : false});
    }

    function draw(x : number, y : number, color : string) {
        ctx.beginPath();
        ctx.rect(Math.floor(x * (side_lenght / (side_cells + 0))), Math.floor(y * (side_lenght / (side_cells + 0))), Math.floor(side_lenght / (side_cells + 1)), Math.floor(side_lenght / (side_cells + 1)));
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }


    function move() : void {
        frame++;
       if (frame < Math.max(interval - Math.floor(lenght / 2), 5)) 
            return;
        frame = 0;
            
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // console.log(head);
        head = addP(head, direction);
        console.log(map.get(sp(head)));

        if (map.get(sp(head))!.type == "empty") {
            map.set(sp(body[0]), {type : "empty", is_empty : true});
            for (let i = 1; i < body.length; i++) {
                body[i - 1] = body[i];
            }
            body[lenght - 1] = head;
            map.set(sp(head), {type : "body", is_empty : false});
        }
        else if (map.get(sp(head))!.type == "fruit") {
            map.set(sp(head), {type : "body", is_empty : false});
            body.push(head);
            lenght++;
            spawn_fruit();
        }
        else if (map.get(sp(head))!.type == "body") {
            if (lenght > 1)
               init();
        }

        for (let i = 0; i < lenght; i++) {
            draw(body[i].x, body[i].y, "#0000FF");
        }
        draw(fruit.x, fruit.y, "#FF0000");
    }

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        switch (event.key) {
            case 'w':
            case 'W':
                direction = {x : 0, y : -1};
                console.log('W key was pressed');
                break;
            case 'a':
            case 'A':
                direction = {x : -1, y : 0};
                console.log('A key was pressed');
                break;
            case 's':
            case 'S':
                direction = {x : 0, y : 1};
                console.log('S key was pressed');
                break;
            case 'd':
            case 'D':
                direction = {x : 1, y : 0};
                console.log('D key was pressed');
                break;
            default:
                // Handle any other key press
                break;
        }
        if (direction.x != last_direction.x * -1 || direction.y != last_direction.y * -1)
            last_direction = direction;
        else
            direction = last_direction;
    });
    function init() {
        canvas.width = side_lenght;
        canvas.height = side_lenght;
        map.clear();
        lenght = 1;
        for (let i = 0; i <= side_cells; i++) 
        for (let j = 0; j <= side_cells; j++)
        map.set(sp({x : i, y : j}), {type : "empty", is_empty : true});
        last_direction = null_point;
        head = rand_point(side_cells);
        body = [head];
        map.set(sp(head), {type : "body", is_empty : false});
        spawn_fruit();
        frame = 0;
    }
    init();

    setInterval(move, 1);
}