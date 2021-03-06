// Store the width and heaight of the canvas
var cWidth = 800;
var cHeight = 600;

// Store the number of squares to hold in our grid
var gridSquaresX = 60;
var gridSquaresY = 50;

// Store the width of each grid square
var gridSquareSizeX;
var gridSquareSizeY;

// Variable to hold all of our game objects
var gameObjects;

// Store the current object
var currentObject;

// Store which object we are creating
var creationSelection = "GROUND";

// Variables to hold game elements
var season = 0;
var player;
var goalRect;
var keyArray;
var ground;
var water;
var rocks;
var trees;

// Get the key image
var keyImg;
var playerImg;

// Create the setup function to run before the game is initialized
function setup() {
    
    // Create a canvas
    createCanvas(cWidth,cHeight);
    
    // Set the grid square size
    gridSquareSizeX = cWidth / gridSquaresX;
    gridSquareSizeY = cHeight / gridSquaresY;
    
    // Create an empty array to hold the game objects
    gameObjects = [];
    
    // Create the player and goal rects
    player = {x: -100, y: -1, width: gridSquareSizeX * 0.7, height: 2*gridSquareSizeY};
    goalRect = {x: -100, y: -1, width: gridSquareSizeX, height: gridSquareSizeY*2, colour: color(0)};
    
    // Create game elements arrays
    keyArray = [];
    ground = [];
    water = [];
    rocks = [];
    trees = [];
    
    // Set the current object to -1
    currentObject = -1;
    
    // Get the key image
    keyImg = loadImage("assets/key.png");
    playerImg = loadImage("assets/playerAnimation/playerStill1.png");
    
}

// Create the draw function to house our update code
function draw() {
    
    // Clear the canvas
    clear();
    
    // Draw the grid
    drawGrid();
        
    // Draw all of the game objects
    drawGameObjects();
    
    // Draw the keys
    drawKeysEditor();
    
    // Draw the player
    drawPlayerEditor();
    
    // Draw the goal
    drawGoalEditor();
    
}
    
// Function to draw the player
function drawPlayerEditor() {
    
    // Draw the player image
    image(playerImg, player.x * gridSquareSizeX, player.y * gridSquareSizeY + gridSquareSizeY, player.width, player.height);
    
}

// Function to draw the goal 
function drawGoalEditor(){
    //Draw the goal on screen
    drawRect((goalRect.x - 2) * gridSquareSizeX, (goalRect.y - 2) * gridSquareSizeY, goalRect.width, goalRect.height, goalRect.colour);
}

// Function to draw the keys for the goal
function drawKeysEditor(){
    // Draw the keys on screen
    for(var i = 0; i < keyArray.length; i++) {
        if(keyArray[i].visible) {
            image(keyImg, keyArray[i].x * gridSquareSizeX, (keyArray[i].y - 2) * gridSquareSizeY, keyArray[i].width, keyArray[i].height);
        }
    }
}

// Function to deal with mouse clicks
function mouseReleased() {
    
    // Check that the mouse click is in the grid
    if (!((mouseX >= 0 && mouseX <= cWidth) && (mouseY >= 0 && mouseY <= cHeight))) {

        // Return
        return;

    }

    // Get the x and y
    var x = Math.floor(mouseX / gridSquareSizeX);
    var y = Math.floor(mouseY / gridSquareSizeY);

    // Check the mouse button
    if (mouseButton === LEFT) {

        // If we haven't got an object selected
        if (currentObject == -1) {

            // Check whether we have clicked on an object
            if (!objectAtLocation(x, y)) {
                
                // Switch for the different types of elements
                switch(creationSelection) {
                        
                    case "PLAYER":
                        
                        // Set the players location
                        player.x = x;
                        player.y = y - 2;
                        break;
                        
                    case "GOAL":
                        
                        // Set the players location
                        goalRect.x = x + 2;
                        goalRect.y = y + 1;
                        break;
                        
                    case "KEY":
                        
                        // Add a new key
                        keyArray.push({x: x, y: y + 1, width: gridSquareSizeX * 2, height: gridSquareSizeY * 2, visible: true});
                        break;

                    case "GROUND":
                
                        // Add some ground
                        ground.push(GameElement(x, y, parseInt(document.getElementById('gWidth').value), parseInt(document.getElementById('gHeight').value)));
                        break;

                    case "WATER":

                        // Add water
                        water.push(GameElement(x, y, parseInt(document.getElementById('wWidth').value), parseInt(document.getElementById('wHeight').value)));
                        break;

                    case "ROCK":

                        // Add rock
                        rocks.push(GameElement(x, y, parseInt(document.getElementById('rWidth').value), -1));
                        break;

                    case "TREE":

                        // Add tree
                        trees.push(GameElement(x, y, -1, parseInt(document.getElementById('tHeight').value)));
                        break;
                }
                
                // Rebuild the game objects
                makeGameObjects();
            }
        }
    }
}

function objectAtLocation(x, y) {
    return false;
}

// Create a function to select an object drawing tool
function select(obj) {
    
    // Check if we are setting the season
    if (obj == "SEASON") {
        season = document.getElementById('season').value;
        return;
    }
    
    // Select the object
    creationSelection = obj;  
    
}

// Function to get the level data
function getLevelData() {
	
	// Create an empty string to store the level data
	var levelData = "";
	
	// Get the attribute numbers
	levelData += "\n" + season + "\n" + player.x + "\n" + player.y + "\n" + goalRect.x + "\n" + goalRect.y + "\n" + keyArray.length + "\n";
    levelData += ground.length + "\n" + water.length + "\n" + rocks.length + "\n" + trees.length + "\n";
    
    // For each key element
    for (var i = 0; i < keyArray.length; i++) {
        
        // Make keys
        levelData += keyArray[i].x + " " + keyArray[i].y + "\n";
        
    }
    
    // For each game element
    for (var i = 0; i < ground.length; i++) {

        // Make ground
        levelData += ground[i].x + " " + ground[i].y + " " + ground[i].width + " " + ground[i].height + "\n";
        
    }
    for (var i = 0; i < water.length; i++) {

        // Make water
        levelData += water[i].x + " " + water[i].y + " " + water[i].width + " " + water[i].height + "\n";
        
    }
    for (var i = 0; i < rocks.length; i++) {

        // Make rock
        levelData += rocks[i].x + " " + rocks[i].y + " " + rocks[i].width + "\n";
        
    }
    for (var i = 0; i < trees.length; i++) {

        // Make ground
        levelData += trees[i].x + " " + trees[i].y + " " + trees[i].height + "\n";
        
    }
    
    // Store the text
    document.getElementById("levelData").value = levelData.trim();
    
    // Select the level data
    document.getElementById("levelData").select();
    
    // Copy the level data
    document.execCommand("Copy");
	
}

// Function to get the level data
function setLevelData() {
	
	// Load the level data
	var levelData = document.getElementById("levelData").value.split("\n");
    
    // Empty the game objects
    keyArray = [];
    ground = [];
    water = [];
    rocks = [];
    trees = [];
    
    // Set the number of set variables
    var setVars = 11;
	
	// Check the number of each game elements
    nextLevel = levelData[0];
    currentSeason = parseInt(levelData[1]);
    player.x = parseInt(levelData[2]) * gridSquareSizeX;
    player.y = parseInt(levelData[3]) * gridSquareSizeY;
    goalRect.x = (parseInt(levelData[4]) - 2) * gridSquareSizeX;
    goalRect.y = (parseInt(levelData[5]) - 2) * gridSquareSizeY;
    var noKeys = parseInt(levelData[6]);
	var noGround = parseInt(levelData[7]);
	var noWater = parseInt(levelData[8]);
	var noRocks = parseInt(levelData[9]);
	var noTrees = parseInt(levelData[10]);
    
    // Fetch the keys
    for (var i = setVars; i < setVars + noKeys; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");

        // Add the key
        keyArray.push({x: parseInt(data[0]), y: parseInt(data[1]), width: gridSquareSizeX* 2, height: gridSquareSizeY * 2, visible: true});

    }
    
    // Fetch the ground
    for (var i = setVars + noKeys; i < setVars + noKeys + noGround; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");
        
        // Create the ground
        ground.push(GameElement(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3])));
        
    }
    
    // Fetch the water
    for (var i = setVars + noKeys + noGround; i < setVars + noKeys + noGround + noWater; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");
        
        // Create the ground
        water.push(GameElement(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3])));
        
    }
    
    // Fetch the water
    for (var i = setVars + noKeys + noGround + noWater; i < setVars + noKeys + noGround + noWater + noRocks; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");
        
        // Create the ground
        rocks.push(GameElement(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), -1));
        
    }
    
    // Fetch the water
    for (var i = setVars + noKeys + noGround + noWater + noRocks; i < setVars + noKeys + noGround + noWater + noRocks + noTrees; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");
        
        // Create the ground
        trees.push(GameElement(parseInt(data[0]), parseInt(data[1]), -1, parseInt(data[2])));
        
    }
    
    // Rebuild the game objects
    makeGameObjects();
	
}