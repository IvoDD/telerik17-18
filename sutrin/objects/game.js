// Creating variables
//var myX = 0, myY = 0;

class Player{
    constructor(x_, y_, sizex_, sizey_, color_){
        this.x = x_;
        this.y = y_;
        this.sizex = sizex_;
        this.sizey = sizey_;
        this.color = color_;
    }
}

class Enemy{
    constructor(x_, y_, sizex_, sizey_, color_){
        this.x = x_;
        this.y = y_;
        this.sizex = sizex_;
        this.sizey = sizey_;
        this.color = color_;
    }
}

class Bullet{
    constructor(x_, y_, target_x, target_y, sizex_=10, sizey_=10, color_='black'){
        this.x = x_;
        this.y = y_;
        this.sizex = sizex_;
        this.sizey = sizey_;
        this.color = color_;
        let dist = Math.sqrt((target_x-x_)*(target_x-x_) + (target_y-y_)*(target_y-y_))
        this.dx = (target_x-x_)/dist * 20;
        this.dy = (target_y-y_)/dist * 20;
    }
}

var n_enemy = 20;
var colors = ['red', 'green', 'blue', 'yellow', 'pink', 'lime', 'magenta'];
var enemy = [], bullet = [];
var player = new Player(375, 275, 50, 50, 'black');

for (let i=0; i<n_enemy; ++i){
    let color = colors[Math.floor(Math.random()*colors.length)];
    let sizex = Math.floor(Math.random()*150 + 50);
    let sizey = Math.floor(Math.random()*150 + 50);
    let x = Math.floor(Math.random()*(800-sizex));
    let y = Math.floor(Math.random()*(800-sizey));
    enemy[i] = new Enemy(x, y, sizex, sizey, color);
}

function draw2(obj){
    context.fillStyle = obj.color;
    context.fillRect(obj.x, obj.y, obj.sizex, obj.sizey);
}

function update() {
    //myX = myX+(mouseX-myX)/10;
    //myY = myY+(mouseY-myY)/10;
    for (let i=0; i<enemy.length; ++i){
        let dx = Math.random()*10-5;
        let dy = Math.random()*10-5;
        enemy[i].x += dx;
        enemy[i].y += dy;
    }
    
    if (isKeyPressed[key_down]){player.y += 5;}
    if (isKeyPressed[key_up]){player.y -= 5;}
    if (isKeyPressed[key_right]){player.x += 5;}
    if (isKeyPressed[key_left]){player.x -= 5;}
    
    for (let i=0; i<bullet.length; ++i){
        bullet[i].x += bullet[i].dx;
        bullet[i].y += bullet[i].dy;
        for (let j=0; j<enemy.length; ++j){
            console.log(bullet[i], enemy[j]);
            if (areCol(bullet[i], enemy[j])){
                bullet[i] = bullet[bullet.length-1];
                bullet.pop();
                enemy[j].sizex -= 1000/enemy[j].sizey;
                if (enemy[j].sizex < 0){
                    enemy[j].sizex = 0;
                }
                break;
            }
        }
    }
}

function areCol(obj1, obj2){
    return areColliding(obj1.x, obj1.y, obj1.sizex, obj1.sizey, 
                        obj2.x, obj2.y, obj2.sizex, obj2.sizey);
}

function draw() {
    
    for (let i=0; i<enemy.length; ++i){
        draw2(enemy[i]);
    }
    draw2(player)
    for (let i=0; i<bullet.length; ++i){
        draw2(bullet[i]);
    }
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    bullet.push(new Bullet(player.x, player.y, mouseX, mouseY));
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
