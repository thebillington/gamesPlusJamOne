// Setup physics
var gravity = 0.07;
var xSpeed = 0;
var ySpeed = 0;
var fallSpeed = 2;
var jumpSpeed = -2;
var jumped = false;
var prevX = 0;
var prevY = 0;
var onIce = false;

// Physics update
function physics() {
    
    // Check gravity
    testGravity();
    
    // Check if the player has collided with any game objects
    playerCollision();
    
    // Store the previous locations
    prevY = playerRect.y;
    
    // Move the player
    playerRect.x += xSpeed;
    playerRect.y += ySpeed;
    
}

// Function to apply gravity
function testGravity() {
    
    // Check whether the players fall speed is greater than or equal to max
    if (ySpeed < fallSpeed) {
        
        // Increase the fall speed
        ySpeed += gravity;
        
    }
    
}

// Collision detection for the player
function playerCollision() {
    
    // Store whether this round of physics checks has collided with ice
    var currentIce = false;
    
    // Look at each game object
    for (var i = 0; i < gameObjects.length; i++) {
        
        // Check whether the game object is collidable
        if (gameObjects[i].collidable) {
            
            // Check whether the player is drowning
            if (drowning) {
                
                // Check if the player has hit the floor of the pond
                if (blockCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY})) {
                 
                    // Reset the location
                    playerRect.x = 300;
                    playerRect.y = 50;
                    
                    // Set drowning to false
                    drowning = false;
                    
                    // Set on ice to false
                    onIce = false;
                    
                }
                
            }
            
            // Check for ice
            if (gameObjects[i].type == "ice") {
                
                // Check for collision
                if (blockCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY})) {
                    
                    // Set ice collide flag
                    onIce = true;
                    
                    // Set current ice to true
                    currentIce = true;
                    
                    // Reset jump
                    jumped = false;
                }
            }
        
            // If the player collided with the object
            while (fallCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY})) {

                // Move the player up until they aren't colliding
                playerRect.y -= gravity;
                
                // Set the y speed to 0
                ySpeed = 0;
                
                // Reset jump
                jumped = false;
                
                // If we aren't on ice
                if (!currentIce) {
                    
                    // Set on ice to false
                    onIce = false;
                    
                }

            }
            
        }
        
        // Check for water
        if (gameObjects[i].type == "water") {
            
            // Check for a collision
            if (blockCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY})) {
            
                // Set the ySpeed
                ySpeed = gravity;
                
                // Set the drowning flag
                drowning = true;
                
            }
            
        }
        
        // If the game object is ground
        if (gameObjects[i].type == "ground") {
            
            // Check for side collision
            checkSideCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY});
            
        }
        
    }
    // Check whether we were on any ice
    if (!onIce || drowning) {
        xSpeed = 0;
    }
    else {

        // Check the previous x location
        if (prevX < playerRect.x) {
            // Set the x speed to move right
            xSpeed = 1;
        }
        else if (prevX > playerRect.x) {
            // Left
            xSpeed = -1;
        }
    }
    
}

// Check for side collision
function checkSideCollision(rectOne, rectTwo) {
    
    //console.log(prevX);
    
    // Check whether the previous y location is greater than the top of the platform
    if (prevX - rectOne.width > rectTwo.x) {
        while (blockCollision(rectOne, rectTwo)) {
            rectOne.x += 0.7;
        }
    }
    // Check whether the previous y location is greater than the top of the platform
    if (prevX + rectOne.width < rectTwo.x + gridSquareSizeX) {
        while (blockCollision(rectOne, rectTwo)) {
            rectOne.x -= 0.7;
        }
    }
    
}

// Check for collision between two rectangles
function fallCollision(rectOne, rectTwo) {
    
    // Check whether the previous y location is greater than the top of the platform
    if (prevY + rectOne.height > rectTwo.y) {
        return false;
    }
    
    // Check whether there is a collision on the x and y
    return Math.abs((rectOne.x + rectOne.width / 2) - (rectTwo.x + rectTwo.width / 2)) < rectOne.width / 2 + rectTwo.width / 2 && Math.abs((rectOne.y + rectOne.height / 2) - (rectTwo.y + rectTwo.height / 2)) < rectOne.height / 2 + rectTwo.height / 2;
    
}

// Function to check for a standard block collision
function blockCollision(rectOne, rectTwo) {
    
    // Check whether there is a collision on the x and y
    return Math.abs((rectOne.x + rectOne.width / 2) - (rectTwo.x + rectTwo.width / 2)) < rectOne.width / 2 + rectTwo.width / 2 && Math.abs((rectOne.y + rectOne.height / 2) - (rectTwo.y + rectTwo.height / 2)) < rectOne.height / 2 + rectTwo.height / 2;
    
}