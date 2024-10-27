
class Character {
    constructor(x, y, color = "blue") {
        this.initialX = x;  // Store initial position
        this.initialY = y;
        this.color = color;
        this.reset();
    }

    reset() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.width = 40;
        this.height = 60;
    }

    update(deltaTime) {
        // Convert deltaTime to seconds
        const dt = deltaTime / 1000;
        // update user's position
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Ball {
    radius = 10;
    speedX = 20;
    speedY = 20;

    constructor(x, y) {
        this.initialX = x;  // Store initial position
        this.initialY = y;
        this.reset();
    }

    reset() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.angle = this.initialAngle * (Math.PI / 180);
    }

    update(deltaTime) {
        // Convert deltaTime to seconds
        const dt = deltaTime / 1000;
        
        // Update X position

        // Update Y position
        
        // Apply gravity to vertical velocity
    }

    draw(ctx) {
        // draw ball
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}

var lastTime = 0;
var canvas = document.getElementById('gameCanvas');
canvas.style.border = '1px solid black';
canvas.style.background = '#fff';
var ctx = canvas.getContext('2d');

// initialize ball here
var ball = new Ball(canvas.width / 2, canvas.height - 100);

function gameLoop(currentTime) {
    // Calculate delta time
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Update and draw game objects
    if(ball) {
        // Update and draw ball
        ball.update(deltaTime);
        ball.draw(ctx);
    }
    
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

// Set up keyboard controls
// when key is pressed DOWN
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        // player one controls
        case 'a':
            break;
        case 'd':
            break;
        case 'w':
            break;

        // player two controls
        case 'ArrowLeft':
            break;
        case 'ArrowRight':
            break;
        case 'ArrowUp': 
            break;

        // system controls
        case 'r':
            // reset game
            break;
    }
});

// when key is released
document.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'a':
            break;
        case 'd':
            break;
        case 'ArrowLeft':
            break;
        case 'ArrowRight':
            break;
    }
});