# Lesson 2

### Exercise 1 - Review class syntax

Aim - Learn how to create new instance of a class.

Try to create new balls in different speed, color, x, y

```js
var ball2 = new Ball(10, 20, 60, 500, "green")
```

Remember to call update and draw in the loop

```js
ball2.update(deltaTime)
ball2.draw(ctx)
```

After this, delete all the balls except for one.

### Exercise 2 - Add players

Aim - add players to canvas.

`Character` class should already exist. (Maybe rename to player?)

```js
let playerOne = new Character(
  canvas.width / 2 - 100,
  canvas.height - 100,
  "red",
)
let playerTwo = new Character(
  canvas.width / 2 + 100,
  canvas.height - 100,
  "green",
)
```

Also remember to call update and draw in the loop!

```js
playerOne.update(deltaTime)
playerOne.draw(ctx)

playerTwo.update(deltaTime)
playerTwo.draw(ctx)
```

Now you should be able to see two players, red and green.

### Exercise 3 - Make the players controllable

#### Add variables to control horizontal speed

`Update` function should be used to move players around.
We can add two variables
`isMovingLeft` and `isMovingRight` to move chracters in the X direction.

```js
// Update speed based on input
if (this.isMovingLeft) {
  this.speedX = -this.speed
} else if (this.isMovingRight) {
  this.speedX = this.speed
} else {
  this.speedX = 0
}

// Update the position!
this.x += this.speedX * dt
```

#### Add controls

Then we can update the controls to set that variable

```js
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    // player one controls
    case "a":
      playerOne.isMovingLeft = true
      break
    case "d":
      playerOne.isMovingRight = true
      break
  }
})
```

Remember to reset the variable on `keyup`

```js
document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      playerOne.isMovingLeft = false
      break
    case "d":
      playerOne.isMovingRight = false
      break
  }
})
```

Now start the game, and player will move left and right when you press `a`,`d`

Also try to do this with player 2

### Other ideas

- add image to background canvas
- add image to charactor, ball
