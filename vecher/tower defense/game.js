// Creating variables
var myX = [], myY = [], health = [];
var targetX = 15, targetY = 15;
var s = 20, cs = 30;
var grid = [], dist = [];
var colors = ["green", "black"];
var t=0, hasToMove=0;
var bulletX = [], bulletY = [];

for (let i=0; i<s; ++i){
    grid[i] = [];
    dist[i] = [];
    for (let j=0; j<s; ++j){
        grid[i][j] = 0;
    }
}
calcDist();
function calcDist(){
    for (let i=0; i<s; ++i){
        for (let j=0; j<s; ++j){
            dist[i][j] = 0;
        }
    }
    dist[targetX][targetY] = 2;
    for (let d=2;; ++d){
        let flag = 0;
        for (let i=0; i<s; ++i){
            for (let j=0; j<s; ++j){
                if (dist[i][j] == d){
                    if (i>0 && dist[i-1][j]==0 && grid[i-1][j]==0){dist[i-1][j]=d+1; flag=1;}
                    if (i<s-1 && dist[i+1][j]==0 && grid[i+1][j]==0){dist[i+1][j]=d+1; flag=1;}
                    if (j>0 && dist[i][j-1]==0 && grid[i][j-1]==0){dist[i][j-1]=d+1; flag=1;}
                    if (j<s-1 && dist[i][j+1]==0 && grid[i][j+1]==0){dist[i][j+1]=d+1; flag=1;}
                }
            }
        }
        if (!flag){break;}
    }
}

function dist2(x1, y1, x2, y2){
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

function shoot(x, y){
    bulletX.push(x);
    bulletY.push(y);
}

function del(ind){
    myX[ind] = myX[myX.length-1];
    myY[ind] = myY[myY.length-1];
    health[ind] = health[health.length-1];
    myX.pop();
    myY.pop();
    health.pop();
}

function delBul(ind){
    bulletX[ind] = bulletX[bulletX.length-1];
    bulletY[ind] = bulletY[bulletY.length-1];
    bulletX.pop();
    bulletY.pop();
}

function update() {
    if (t%150==0){
        myX.push(0);
        myY.push(0);
        health.push(10);
    }
    if (t%50==0){
        for (let i=0; i<s; ++i){
            for (let j=0; j<s; ++j){
                if (grid[i][j] == 1){
                    let inRange = false;
                    for (let a=0; a<myX.length; ++a){
                        if (dist2(myX[a]*cs, myY[a]*cs, i*cs, j*cs) < 200){
                            inRange = true;
                            break;
                        }
                    }
                    if (inRange){shoot(i*cs, j*cs);}
                }
            }
        }
    }
    if (t%10==0){
        for (let i=0; i<myX.length; ++i){
            if(dist[myX[i]][myY[i]]==0){console.log("no path");}
            else{
                if (myX[i]>0 && dist[myX[i]-1][myY[i]] == dist[myX[i]][myY[i]]-1){--myX[i];}
                else if (myX[i]<s-1 && dist[myX[i]+1][myY[i]] == dist[myX[i]][myY[i]]-1){++myX[i];}
                else if (myY[i]>0 && dist[myX[i]][myY[i]-1] == dist[myX[i]][myY[i]]-1){--myY[i];}
                else if (myY[i]<s-1 && dist[myX[i]][myY[i]+1] == dist[myX[i]][myY[i]]-1){++myY[i];}
            }
        }
    }
    for (let b=0; b<bulletX.length; ++b){
        let bestdist = 1000, ind=0;
        for (let e=0; e<myX.length; ++e){
            let cdist = dist2(bulletX[b], bulletY[b], myX[e]*cs, myY[e]*cs);
            if (cdist < bestdist){
                bestdist = cdist;
                ind = e;
            }
        }
        bulletX[b] += (myX[ind]*cs-bulletX[b])*5/bestdist;
        bulletY[b] += (myY[ind]*cs-bulletY[b])*5/bestdist;
        if (areColliding(bulletX[b], bulletY[b], 10, 10, myX[ind]*cs, myY[ind]*cs, 30, 30)){
            delBul(b);--b;
            --health[ind];
            if (health[ind]<=0){
                del(ind);
            }
        }
    }
    ++t;
}

function draw() {
    for (let i=0; i<s; ++i){
        for (let j=0; j<s; ++j){
            context.fillStyle = colors[grid[i][j]];
            context.fillRect(i*cs, j*cs, cs-1, cs-1);
        }
    }
    for (let i=0; i<myX.length; ++i){
        context.fillStyle = "red";
        context.fillRect(myX[i]*cs, myY[i]*cs, cs-1, cs-1);
    }
    context.fillStyle = "blue";
    context.fillRect(targetX*cs, targetY*cs, cs-1, cs-1);
    context.fillStyle = "yellow";
    for (let i=0; i<bulletX.length; ++i){
        context.fillRect(bulletX[i], bulletY[i], 10, 10);
    }
};

function keyup(key) {
    if (key == 32){
        t = 0;
        hasToMove = 1 - hasToMove;
    }
};

function mouseup() {
    let i = Math.floor(mouseX/cs);
    let j = Math.floor(mouseY/cs);
    if (i==0 && j==0){return;}
    for (let a=0; a<myX.length; ++a){
        if (i == myX[a] && j == myY[a]){return;}
    }
    grid[i][j] = 1 - grid[i][j];
    calcDist();
};
