// Creating variables
var savename = "";
var myX = 0, myY = 0;

var saveList;
//localStorage[savename] = {}
if (!localStorage.saveList) saveList = [];
else saveList = JSON.parse(localStorage.saveList);

function goToNewSave(){
    document.getElementById('saves-menu').style.display = 'none';
    document.getElementById('savename-menu').style.display = 'block';
}

function startGame(){
    savename = document.getElementById('save-name').value;
    document.getElementById('savename-menu').style.display = 'none';
    document.getElementById('canvas-id').style.display = 'block';
    saveList.push(savename);
    localStorage.saveList = JSON.stringify(saveList);
}

function update() {
    myX = myX+(mouseX-myX)/10;
    myY = myY+(mouseY-myY)/10;
}

function draw() {
    // This is how you draw a rectangle
    context.fillRect(myX, myY, 30, 30);
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
