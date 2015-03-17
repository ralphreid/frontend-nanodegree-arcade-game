// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random();
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var rate = 300;
    if (this.x >= 450) {
        this.x = -150;
        this.speed = Math.random();
    } else {
        this.x = this.x + (rate * dt * this.speed);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var playerX = 250;
var playerY = 475;

var player = function(){
    this.x = playerX;
    this.y = playerY;
    this.sprite = 'images/char-boy.png';
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
player.prototype.update = function() {
    var rightBorder = 475;
    var leftBorder = -55;
    var bottomBorder = 475;
    var enemyDistance = 55;
    var bugDistance = 60;
    var winner = 0;
    if (this.y <= winner) {
        this.x = playerX;
        this.y = playerY;
    } else if (this.x < leftBorder) {
        this.x = leftBorder;
    } else if (this.x > rightBorder) {
        this.x = rightBorder;
    } else if (this.y > bottomBorder) {
        this.y = bottomBorder;
    }
    for (i = 0; i < allEnemies.length; i++) {
        if (player.x > allEnemies[i].x - bugDistance &&
            player.x < allEnemies[i].x + bugDistance &&
            player.y > allEnemies[i].y - enemyDistance &&
            player.y < allEnemies[i].y + enemyDistance) {
            player.x = playerX;
            player.y = playerY;
        }
    }
};

player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput = function(key) {
    var stepValue = 15;
    switch (key) {
        case 'left':
            this.x -= stepValue;
            break;
        case 'up':
            this.y -= stepValue;
            break;
        case 'right':
            this.x += stepValue;
            break;
        case 'down':
            this.y += stepValue;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

var Enemies = {
    // TODO think about levels & rows
};

var player = new player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
