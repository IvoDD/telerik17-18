// Creating variables
var myX = 0, myY = 0;
var username = "";

function startgame(){
    username = document.getElementById('username').value;
    if (username == "") return;
    document.getElementById('form-id').style.display = 'none';
    document.getElementById('button-id').style.display = 'none';
    document.getElementById('canvas-id').style.display = 'block';
    if (!localStorage[username]){
        localStorage[username] = 0;
    }
}

function update() {
    myX = myX+(mouseX-myX)/10;
    myY = myY+(mouseY-myY)/10;
}

function draw() {
    // This is how you draw a rectangle
    context.font = "30px Arial";
    context.fillText(localStorage[username], 400, 100);
    context.fillText(username, myX, myY-20);
    context.fillRect(myX, myY, 30, 30);
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    if (username != ""){
        ++localStorage[username];
    }
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
