class Tank{
    constructor (x_, y_, color_){
        this.x = x_;
        this.y = y_;
        this.color = color_;
        this.health = 100;
    }
    
    draw(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, 25, 0, 2*Math.PI);
        context.fill();
        if (this.health >= 0){context.fillRect(this.x - this.health/2, this.y-35, this.health, 5);}
    }
    
    isShot(){
        if (this.health <= 0){return;}
        for (let i=0; i<bullet.length; ++i){
            if (bullet[i].color != this.color && areCircleColliding(bullet[i].x, bullet[i].y, 5, this.x, this.y, 25)){
                this.health -= 10;
                bullet[i] = bullet[bullet.length-1];
                bullet.pop();
                --i;
            }
        }
    }
    
    shoot(targetX, targetY){
        if (this.health <= 0){return;}
        let dist = Math.sqrt( (this.x-targetX)*(this.x-targetX) + (this.y-targetY)*(this.y-targetY) )
        let dx = (targetX - this.x)*10/dist;
        let dy = (targetY - this.y)*10/dist;
        bullet.push( new Bullet(this.x, this.y, this.color, dx, dy) );
    }
}

class Bullet{
    constructor(x_, y_, color_, dx_, dy_){
        this.x = x_;
        this.y = y_;
        this.dx = dx_;
        this.dy = dy_;
        this.color = color_;
    }
    
    draw(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, 2*Math.PI);
        context.fill();
    }
    
    update(){
        this.x += this.dx;
        this.y += this.dy;
    }
}

function areCircleColliding(x1, y1, r1, x2, y2, r2){
    let dist = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
    return dist <= r1+r2;
}

var player = new Tank(400, 300, 'blue'); //wasd

var enemy = [];
for (let i=0; i<10; ++i){
    enemy[i] = new Tank(Math.random()*800, Math.random()*600, 'red');
}

var bullet = [];

function update() {
    if (player.health > 0){
        if (isKeyPressed[87]){player.y -= 5;}
        if (isKeyPressed[83]){player.y += 5;}
        if (isKeyPressed[65]){player.x -= 5;}
        if (isKeyPressed[68]){player.x += 5;}
    }
    
    player.isShot();
    for (let i=0; i<enemy.length; ++i){
        if (enemy[i].health > 0){
            enemy[i].x += Math.random()*10 - 5;
            enemy[i].y += Math.random()*10 - 5;
            enemy[i].isShot();
            enemy[i].shoot(player.x, player.y);
        }
    }
    
    for (let i=0; i<bullet.length; ++i){
        bullet[i].update();
        if (bullet[i].x > 800 || bullet[i].x < 0 || bullet[i].y > 600 || bullet[i].y < 0){
            bullet[i] = bullet[bullet.length-1];
            bullet.pop();
            i--;
        }
    }
}

function draw() {
    for (let i=0; i<enemy.length; ++i){
        enemy[i].draw();
    }
    for (let i=0; i<bullet.length; ++i){
        bullet[i].draw();
    }
    player.draw();
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    player.shoot(mouseX, mouseY);
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
