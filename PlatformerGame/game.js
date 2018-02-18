// Store the width and heaight of the canvas
var cWidth = 800;
var cHeight = 600;

// Store the number of squares to hold in our grid
var gridSquaresX = 40;
var gridSquaresY = 30;

// Store the width of each grid square
var gridSquareSizeX;
var gridSquareSizeY;

// Variable to hold all of our game objects
var gameObjects;

// Variable used to switch seasons (0 = summer, 1 = autumn, 2 = winter, 3 =  spring)
var currentSeason;

// Variables to store specific state of game objects for each season
var summerObjects;
var autumnObjects;
var winterObjects;
var springObjects;

// Get the player sprite and rectangle
var playerImg;
var playerRect;

// Set the player speed
PLAYER_SPEED = 3;

// Key codes
SPACE = 32;
KEY_S = 83;

// Load objects in before the game loads
function preload() {
    
    // Get the sprite image
    playerImg = loadImage("assets/player.png");
    
}

// Create the setup function to run before the game is initialized
function setup() {
    
    // Create a canvas
    createCanvas(cWidth,cHeight);
    
    // Set the grid square size
    gridSquareSizeX = cWidth / gridSquaresX;
    gridSquareSizeY = cHeight / gridSquaresY;
    
    // Get the player rectangle
    playerRect = Rectangle(300, 50, gridSquareSizeX, 2*gridSquareSizeY);

    // Initilise season object arrays
    summerObjects = [];
    autumnObjects = [];
    winterObjects = [];
    springObjects = [];
    
    // Create an empty array to hold the game objects
    gameObjects = [];

    // Initilise the season to summer
    currentSeason = 0;
    
    // ground creation:
    makeGround(10, 20, 20, 1);
    makeGround(20, 9, 20, 1);
    // tree creation
    makeTree(16,19,4,"evergreen");
    // water creation
    makeWater(20, 19, 10, 2);
    // terrarin creation
    makeRock(10, 19, 2);

    gameObjects = summerObjects;
    
}

// Create the draw function to house our update code
function draw() {
    
    // Clear the canvas
    clear();
    
    // Physics update
    physics();
    
    // Draw the grid
    drawGrid();
        
    // Draw all of the game objects
    drawGameObjects();
    
    // Draw the player
    drawPlayer();
    
    // Check key presses
    if (keyIsDown(RIGHT_ARROW)) {
        playerRect.x+=PLAYER_SPEED;
    }
    if (keyIsDown(LEFT_ARROW)) {
        playerRect.x-=PLAYER_SPEED;
    }

    
}

function changeSeason(currentSeason) {
    switch(currentSeason) {
        case(0):
            gameObjects = summerObjects;
            break;
        case (1):
            gameObjects = autumnObjects;
            break;
        case (2):
            gameObjects = winterObjects;
            break;
        case (3):
            gameObjects = springObjects;
            break;
    }
}


// Function to check key presses
function keyPressed() {
    
    // Check for space bar and not jumped
    if (keyCode == SPACE && !jumped) {
        
        // Set the y speed to jump speed
        ySpeed = jumpSpeed;
        
        // Set jumped to true
        jumped = true;
        
    }

    if (KEY_S) {
        currentSeason++;
        if(currentSeason > 3) {
            currentSeason = 0;
        }
        changeSeason(currentSeason);
        

        console.log(currentSeason);
    }
}