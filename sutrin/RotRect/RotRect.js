class RotRect{
    constructor(cx, cy, len, wid, angle, color){
        this.cx = cx;
        this.cy = cy;
        this.len = len;
        this.wid = wid;
        this.angle = angle;
        this.color = color;
        this.sin = Math.sin(angle);
        this.cos = Math.cos(angle);
    }
    
    teleport(x, y){
        this.cx = x;
        this.cy = y;
    }
    
    move(x, y){
        this.cx += x;
        this.cy += y;
    }
    
    moveForward(dist){
        this.cx += this.cos*dist;
        this.cy += this.sin*dist;
    }
    moveBack(dist){
        this.cx -= this.cos*dist;
        this.cy -= this.sin*dist;
    }
    moveLeft(dist){
        this.cx += this.sin*dist;
        this.cy -= this.cos*dist;
    }
    moveRight(dist){
        this.cx -= this.sin*dist;
        this.cy += this.cos*dist;
    }
    
    rotate(ang){
        this.angle += ang;
        this.sin = Math.sin(this.angle);
        this.cos = Math.cos(this.angle);
    }
    setAngle(ang){
        this.angle = ang;
        this.sin = Math.sin(this.angle);
        this.cos = Math.cos(this.angle);
    }
    
    draw(){
        context.fillStyle = this.color;
        let x=[], y=[];
        x[0] = this.cos*this.len/2;
        y[0] = this.sin*this.len/2;
        x[1] = -this.sin*this.wid/2;
        y[1] = this.cos*this.wid/2;
        x[2] = -this.cos*this.len/2;
        y[2] = -this.sin*this.len/2;
        x[3] = this.sin*this.wid/2;
        y[3] = -this.cos*this.wid/2;
        context.beginPath();
        context.moveTo(this.cx + x[3] + x[0], this.cy + y[3] + y[0]);
        for (let i=0; i<3; ++i){
            context.lineTo(this.cx + x[i] + x[i+1], this.cy + y[i] + y[i+1]);
        }
        context.fill();
    }
};