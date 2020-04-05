
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
let Touch;

if(window.matchMedia("(pointer: coarse)").matches) Touch = true
else Touch = false

let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;

let timeoutStart
let stop

let edge = 100;

if (innerHeight > innerWidth) edge = edge*Math.floor(innerWidth/edge)
else edge = edge*Math.floor(innerHeight/edge)

canvas.width = edge
canvas.height = edge

if (Touch === true) document.getElementById("touchHere").style.opacity = 1

document.getElementById("final").style.fontSize = Math.floor(edge/5)+"px";
document.getElementById("points").style.fontSize = Math.floor(edge/15)+"px";
document.getElementById("touchHere").style.fontSize = Math.floor(edge/20)+"px";
document.getElementById("stop").style.width = Math.floor(edge/22)+"px";
document.getElementById("paused").style.width = Math.floor(edge/2)+"px";
    
document.getElementById("points").style.top = Math.floor(edge/25)+"px";
document.getElementById("points").style.left = Math.floor(edge/25)+"px";
document.getElementById("stop").style.top = Math.floor(edge/22)+"px";
document.getElementById("stop").style.right = Math.floor(edge/25)+"px";


function start(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    refresh();
}

function Snake() {
  this.posX = (edge/20) * randInt(20,0)
  this.posY = (edge/20) * randInt(20,0)
  this.headingX = 0
  this.headingY = -1
  this.cells =[]
  this.cellCount = 3
  this.dead = false
}

let snake = new Snake()

function Apple() {
    this.posX= (edge/20) * randInt(20,0)
    this.posY= (edge/20) * randInt(20,0)
    this.colour = `rgb(
            ${Math.floor(255 - 32.5 * randInt(7, 1))},
            ${Math.floor(255 - 32.5 * randInt(7, 1))},
            0)`
}

let apple = new Apple()

window.addEventListener('resize', function() {
    
    edge = 100;
    
    if (innerHeight > innerWidth) edge = edge*Math.floor(innerWidth/edge)
    else edge = edge*Math.floor(innerHeight/edge)
    
    canvas.width = edge
    canvas.height = edge
    
    document.getElementById("final").style.fontSize = Math.floor(edge/5)+"px";
    document.getElementById("points").style.fontSize = Math.floor(edge/15)+"px";
    document.getElementById("touchHere").style.fontSize = Math.floor(edge/20)+"px";
    document.getElementById("stop").style.width = Math.floor(edge/22)+"px";
    document.getElementById("paused").style.width = Math.floor(edge/2)+"px";
    
    document.getElementById("stop").style.top = Math.floor(edge/22)+"px";
    document.getElementById("stop").style.right = Math.floor(edge/25)+"px";
    document.getElementById("points").style.top = Math.floor(edge/25)+"px";
    document.getElementById("points").style.left = Math.floor(edge/25)+"px";

    snake = new Snake()
    apple = new Apple()
}, false);

document.getElementById('stop').addEventListener('click', function() {
    if (stop === false) {
        document.getElementById("paused").style.opacity = 0.5
        stop = true
    }
    else {
        stop = false
        document.getElementById("paused").style.opacity = 0
    }
        
})

document.addEventListener('keydown', function(key) {
    
    if (stop === true) return
    
    if (snake.dead){
        if ((Date.now() - timeoutStart) > 1000) {
            snake = new Snake()
            document.getElementById("points").innerHTML = snake.cellCount-3
            document.getElementById("points").style.opacity = 1
            document.getElementById("final").style.opacity = 0
        }
        return
    }
    
    if (key.which == 37 && snake.headingX != 1){
        snake.headingX = -1;
        snake.headingY = 0;
    }

  else if (key.which == 38 && snake.headingY != 1) {
    snake.headingY = -1;
    snake.headingX = 0;
  }

  else if (key.which == 39 && snake.headingX != -1) {
    snake.headingX = 1;
    snake.headingY = 0;
  }

  else if (key.which === 40 && snake.headingY != -1) {
    snake.headingY = 1;
    snake.headingX = 0;
  }
});

document.getElementById('touchy').addEventListener('touchstart', function(touchy){
//document.body.addEventListener('touchstart', function(touchy){
    
    if (stop === true) return
    
    if (document.getElementById("touchHere").style.opacity !== 0) document.getElementById("touchHere").style.opacity = 0
    
    if (snake.dead){
        if ((Date.now() - timeoutStart) > 1000) {
            snake = new Snake()
            document.getElementById("points").innerHTML = snake.cellCount-3
            document.getElementById("points").style.opacity = 1
            document.getElementById("final").style.opacity = 0
        }
        return
    }
    
    if (touchy.changedTouches[0].pageX > innerWidth/2){
        //right
        if (snake.headingY !== 0 &&  snake.headingX === 0) {
            snake.headingX = 0-snake.headingY
            snake.headingY = 0;
        }  else if (snake.headingX !== 0 &&  snake.headingY === 0) {
            snake.headingY = snake.headingX
            snake.headingX = 0
        }
    } else if  (touchy.changedTouches[0].pageX < innerWidth/2){
        //left
        if (snake.headingY !== 0 &&  snake.headingX === 0) {
            snake.headingX = snake.headingY
            snake.headingY = 0
        }  else if (snake.headingX !== 0 &&  snake.headingY === 0) {
            snake.headingY = 0-snake.headingX
            snake.headingX = 0
        }
    }
}, false)

function refresh(){
    
    requestAnimationFrame(refresh);
    
    if (stop === true) return
    
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            
            c.clearRect(0, 0, canvas.width, canvas.height);
            
            c.fillStyle = apple.colour;
            c.fillRect(apple.posX, apple.posY, edge/20, edge/20);
            c.fillStyle = 'black'
            
            if (snake.dead){
                document.getElementById("final").innerHTML = snake.cellCount-3
                
                document.getElementById("points").style.opacity = 0
                document.getElementById("final").style.opacity = 1
                return
            }
            
            snake.posX += snake.headingX * edge/20;
            snake.posY += snake.headingY * edge/20;
            
            if (snake.posX < 0) {
                snake.posX = canvas.width - edge/20;
            } else if (snake.posX >= canvas.width) {
                snake.posX = 0;
            }
            
            if (snake.posY < 0) {
                snake.posY = canvas.height - edge/20
            } else if (snake.posY >= canvas.height) {
                snake.posY = 0;
            }
    
            snake.cells.unshift([snake.posX, snake.posY]);
            
            if (snake.cells.length > snake.cellCount) snake.cells.pop();
        
            snake.cells.forEach(function(cell, index) {
                c.fillRect(cell[0], cell[1], edge/20, edge/20);
                
                for (let cl = index+1; cl < snake.cells.length; cl++) {
                    
                    if(cell[0] == apple.posX && cell[1] == apple.posY) {
                        apple = new Apple()
                        snake.cellCount++
                        document.getElementById("points").innerHTML = snake.cellCount-3;
                    }
                    
                    if (cell[0] == snake.cells[cl][0] && cell[1] == snake.cells[cl][1]) {
                        snake.dead = true;
                        snake.cells = []
                        timeoutStart = Date.now();
                    }
                }
            })
}}

function refreshPage() {
    c.clearRect(0, 0, canvas.width, canvas.height);
}

function randInt(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

start(10)