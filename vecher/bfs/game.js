// Creating variables
var myX = [], myY = [];
var targetX = 15, targetY = 15;
var s = 20, cs = 30;
var grid = [], dist = [];
var colors = ["green", "black"];
var t, hasToMove=0;

for (let i=0; i<10; ++i){
    myX[i] = Math.floor(Math.random()*s);
    myY[i] = Math.floor(Math.random()*s);
}
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

function update() {
    if (hasToMove){
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
        ++t;
    }
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
    grid[i][j] = 1 - grid[i][j];
    calcDist();
};
