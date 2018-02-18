// Creating variables
var myX = 0, myY = 0;
var s = 11, cellSize = 50;
function update() {
    myX = myX+(mouseX-myX)/10;
    myY = myY+(mouseY-myY)/10;
}

function draw() {
    // This is how you draw a rectangle
    /*for (var i=0; i<s; ++i){
        context.fillRect((s*cellSize-i*cellSize)/2, i*cellSize, i*cellSize, cellSize-1);
    }*/
    //https://pastebin.com/233gLmB7
    var c = Math.floor(s/2);
    for (var x=0; x<s; x=x+1){
        for (var y=0; y<s; ++y){
            var dx = Math.abs(x-c);
            var dy = Math.abs(y-c);
            if (dx < dy){
                context.fillStyle = 'red';
            }else if (dx > dy){
                context.fillStyle = 'blue';
            }else{
                context.fillStyle = 'green';
            }
            context.fillRect(x*cellSize, y*cellSize, cellSize-1, cellSize-1);
        }
    }
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
