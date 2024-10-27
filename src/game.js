
class Character {
    constructor(x, y, color = "blue") {
        this.initialX = x;  // Store initial position
        this.initialY = y;
        this.reset();
        this.color = color;
    }

    reset() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.width = 40;
        this.height = 60;
        this.speed = 300;
        this.velocityX = 0;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isTouching = false;
        this.isHit = false;
    }

    update(deltaTime) {
        // Convert deltaTime to seconds
        const dt = deltaTime / 1000;
        
        // Update velocity based on input
        if (this.isMovingLeft) {
            this.velocityX = -this.speed;
        } else if (this.isMovingRight) {
            this.velocityX = this.speed;
        } else {
            this.velocityX = 0;
        }
        
        // Update position
        this.x += this.velocityX * dt;
        
        // Keep character within canvas bounds
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Check if a point is within the character's bounds
    containsPoint(x, y) {
        return x >= this.x && x <= this.x + this.width &&
                y >= this.y && y <= this.y + this.height;
    }

    setIsTouching(ball) {
        // Find the closest point to the ball within the character's bounds
        let closestX = Math.max(this.x, Math.min(ball.x, this.x + this.width));
        let closestY = Math.max(this.y, Math.min(ball.y, this.y + this.height));
        
        // Calculate the distance between the ball's center and the closest point
        let distanceX = ball.x - closestX;
        let distanceY = ball.y - closestY;
        
        // If the distance is less than the ball's radius, there is a collision
        let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
        this.isTouching = distanceSquared < (ball.radius * ball.radius);
    }

    hit(ball) {
        if(this.isTouching) {
            ball.getHit();
        }
    }
}

var questions = [];
for (var i = 0; questions.length < 10; i++) {
    var question = questions[i]

    new QuestionDetails(question.name)
}

class Ball {
    constructor(x, y, angle, initialSpeed) {
        this.initialX = x;  // Store initial position
        this.initialY = y;
        this.initialAngle = angle;
        this.initialSpeed = initialSpeed;
        this.reset();
    }

    reset() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.speed = this.initialSpeed;
        this.gravity = 9.81 * 50;
        this.radius = 10;


        this.angle = this.initialAngle * (Math.PI / 180);
        this.speedX = Math.cos(this.angle) * this.speed;
        this.speedY = -Math.sin(this.angle) * this.speed;
    }

    update(deltaTime) {
        // Convert deltaTime to seconds
        const dt = deltaTime / 1000;
        
        // Update position
        this.x += this.velocityX * dt;


        this.y += this.velocityY * dt;
        
        // Apply gravity to vertical velocity
        this.speedY += 9.8 * dt;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if (this.isColliding) {
            ctx.fillStyle = 'white';
        } else {
            ctx.fillStyle = 'red';
        }
        ctx.fill();
        ctx.closePath();

    }

    getHit() {
        this.velocityX = -this.velocityX;
        // Reverse the vertical direction and apply a slight upward boost
        this.velocityY = -Math.abs(this.velocityY) ;
        this.isColliding = false;
    }
}




// Example usage:
let lastTime = 0;
let canvas = document.getElementById('gameCanvas');
canvas.style.border = '1px solid black';
canvas.style.background = '#fff';
let playerOne = new Character(canvas.width / 2 - 100, canvas.height - 100, "red");
let playerTwo = new Character(canvas.width / 2 + 100, canvas.height - 100, "green");
let ctx = canvas.getContext('2d');
let ball = null; 

function gameLoop(currentTime) {
    // Calculate delta time
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw game objects
    playerOne.update(deltaTime);
    playerOne.draw(ctx);

    playerTwo.update(deltaTime);
    playerTwo.draw(ctx);


    
    if(ball) {
        // Update and draw ball
        ball.update(deltaTime);
        ball.draw(ctx);
        playerOne.setIsTouching(ball);
        playerTwo.setIsTouching(ball);
    }
    
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

// Set up keyboard controls
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        // player one controls
        case 'a':
            playerOne.isMovingLeft = true;
            break;
        case 'd':
            playerOne.isMovingRight = true;
            break;
        case 'w':
            if(ball) {
                playerOne.hit(ball);
            } else {
                // if there is no ball, create one
                ball = new Ball(playerOne.x, playerOne.y - playerOne.height / 2, 60, 450);
            }
            break;

        // player two controls
        case 'ArrowLeft':
            playerTwo.isMovingLeft = true;
            break;
        case 'ArrowRight':
            playerTwo.isMovingRight = true;
            break;
        case 'ArrowUp': 
            if(ball) {
                playerTwo.hit(ball);
            } 
            break;
        case 'r':
            playerOne.reset();
            playerTwo.reset();
            ball = null;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'a':
            playerOne.isMovingLeft = false;
            break;
        case 'd':
            playerOne.isMovingRight = false;
            break;
        case 'ArrowLeft':
            playerTwo.isMovingLeft = false;
            break;
        case 'ArrowRight':
            playerTwo.isMovingRight = false;
            break;
    }
});