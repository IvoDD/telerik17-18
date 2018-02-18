// Creating variables
var socket = io();

var id = -1;
var pole;
var risuvanoPole = [];


var maxKamuniVkolona = 10;
var kupchinki = 6;

var naHod = 0;

socket.on("id", function( myId )
{
    id = myId;
})
socket.on("pole", function( myPole )
{
    pole = myPole;
})

function update() {
}

function draw() {
    if (pole == undefined){return;}
    for (let x=0; x<pole.length; ++x){
        risuvanoPole[x] = [];
        for (let y=0;y<maxKamuniVkolona;++y){
            if( y<pole[x] )
                risuvanoPole[x][y] = 1;
            else
                risuvanoPole[x][y] = 0;
        }
    }
    context.fillStyle = 'red';
    for (let x=0; x<risuvanoPole.length; ++x ){
        for (let y=0; y<risuvanoPole[x].length; ++y){
            if (risuvanoPole[x][y] == 1 ){
                context.fillRect( (risuvanoPole.length - x)*20, (risuvanoPole[x].length - y)*20, 19, 19);
            }
        }
    }
}

function keyup(key) {
	
}
function mouseup() {
    //if (naHod != id){return;}
    
    x = Math.floor(mouseX/risuvanoPole.length);
    y = Math.floor(mouseY/risuvanoPole[0].length);
    console.log(x, y);
    if ( x>=0 && y>=0 && x< risuvanoPole.length * 20 && y<risuvanoPole.length[0]*20 ){
        
        socket.emit('move', x, y);
    }

}
