var canvas = document.getElementById("brick");
var ctx = canvas.getContext("2d");
var ballRadius = 8;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 3;
var dy = -3;
var paddleHeight = 10;
var paddleWidth = 74;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 6;
var brickColumnCount = 6;
var brickWidth = 74;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = true;
  }
  else if(e.keyCode == 37) {
      leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = false;
  }
  else if(e.keyCode == 37) {
      leftPressed = false;
  }
}

function collisionDetection() {
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("You stay winning!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        if (c == 0) {
          if (r == 0) ctx.fillStyle = "#9fc30d";
          if (r == 1) ctx.fillStyle = "#d13d42";
          if (r == 2) ctx.fillStyle = "#1bf839";
          if (r == 3) ctx.fillStyle = "#6776ef";
          if (r == 4) ctx.fillStyle = "#d13e9e";
          if (r == 5) ctx.fillStyle = "#339ca6";
        }
        if (c == 1) {
          if (r == 0) ctx.fillStyle = "#43f7ac";
          if (r == 1) ctx.fillStyle = "#8b97b5";
          if (r == 2) ctx.fillStyle = "#0f2aa5";
          if (r == 3) ctx.fillStyle = "#16c7b9";
          if (r == 4) ctx.fillStyle = "#9a02fc";
          if (r == 5) ctx.fillStyle = "#74c11c";
        }
        if (c == 2) {
          if (r == 0) ctx.fillStyle = "#eb4fe3";
          if (r == 1) ctx.fillStyle = "#a0745e";
          if (r == 2) ctx.fillStyle = "#c44240";
          if (r == 3) ctx.fillStyle = "#22c31f";
          if (r == 4) ctx.fillStyle = "#13abdf";
          if (r == 5) ctx.fillStyle = "#61cb89";
        }
        if (c == 3) {
          if (r == 0) ctx.fillStyle = "#e29a33";
          if (r == 1) ctx.fillStyle = "#269b9c";
          if (r == 2) ctx.fillStyle = "#b92b12";
          if (r == 3) ctx.fillStyle = "#212c5c";
          if (r == 4) ctx.fillStyle = "#ca60d3";
          if (r == 5) ctx.fillStyle = "#e1c015";
        }
        if (c == 4) {
          if (r == 0) ctx.fillStyle = "#fb6929";
          if (r == 1) ctx.fillStyle = "#56ee0f";
          if (r == 2) ctx.fillStyle = "#85156e";
          if (r == 3) ctx.fillStyle = "#177766";
          if (r == 4) ctx.fillStyle = "#75e36d";
          if (r == 5) ctx.fillStyle = "#196af1";
        }
        if (c == 5) {
          if (r == 0) ctx.fillStyle = "#d7128b";
          if (r == 1) ctx.fillStyle = "#a0cb2b";
          if (r == 2) ctx.fillStyle = "#ff9331";
          if (r == 3) ctx.fillStyle = "#adaff4";
          if (r == 4) ctx.fillStyle = "#c509de";
          if (r == 5) ctx.fillStyle = "#ccc8fa";
        }
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("Game Over!");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }

  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

// setInterval(draw, 10);
draw();
