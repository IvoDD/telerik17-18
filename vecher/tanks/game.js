class Tank{
    constructor(x_, y_, color_){
        this.x = x_;
        this.y = y_;
        this.color = color_;
    }
    move(dx, dy){
        this.x += dx;
        this.y += dy;
        if (this.x > 800){this.x = 800;}
        if (this.x < 0){this.x = 0;}
        if (this.y > 600){this.y = 600;}
        if (this.y < 0){this.y = 0;}
    }
    draw(){
        context.beginPath();
        context.arc(this.x, this.y, 20, 0, Math.PI*2);
        context.fillStyle = this.color;
        context.fill();
    }
};

class Bullet{
    constructor(x_, y_, tx, ty){
        this.x = x_;
        this.y = y_;
        let dist = Math.sqrt((tx-x_)*(tx-x_) + (ty-y_)*(ty-y_));
        this.dx = (tx-x_)/dist*10;
        this.dy = (ty-y_)/dist*10;
    }
    update(){
        this.x += this.dx;
        this.y += this.dy;
    }
    draw(){
        context.fillStyle = "black";
        context.fillRect(this.x, this.y, 10, 10);
    }
};
var colors = ['blue', 'red', 'green', 'yellow', 'pink'];
var tanks = [];
var rot = [];
var bullet = [];
tanks[0] = new Tank(400, 300, 'red');
for (let i=1; i<10; ++i){
    tanks[i] = new Tank(Math.random()*800, Math.random()*600, 'blue');
    rot[i] = Math.floor(Math.random()*2)*2-1; //-1 or 1
}

function dist(a, b){
    return Math.sqrt((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y));
}

function update() {
    if (isKeyPressed[65]){tanks[0].move(-3, 0);}
    if (isKeyPressed[68]){tanks[0].move(3, 0);}
    if (isKeyPressed[83]){tanks[0].move(0, 3);}
    if (isKeyPressed[87]){tanks[0].move(0, -3);}
    for (let i=1; i<10; ++i){
        let d = dist(tanks[0], tanks[i]);
        let dx = (tanks[0].y-tanks[i].y)/d*3, dy = -(tanks[0].x - tanks[i].x)/d*3;
        dx *= rot[i]; dy *= rot[i];
        tanks[i].move(dx, dy);
        if (Math.random()<0.01){rot[i]*=-1;}
        if (Math.random()<0.1){
            bullet.push(new Bullet(tanks[i].x, tanks[i].y, tanks[0].x, tanks[0].y));
        }
    }
    for (let i=0; i<bullet.length; ++i){
        bullet[i].update();
    }
}

function draw() {
    for (let i=0; i<10; ++i){
        tanks[i].draw();
    }
    for (let i=0; i<bullet.length; ++i){
        bullet[i].draw();
    }
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    bullet.push(new Bullet(tanks[0].x, tanks[0].y, mouseX, mouseY));
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
