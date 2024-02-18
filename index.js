//Game constants
let inputDir = {x:0,y:0};
const gameSound = new Audio("snake_music.mp3");
const foodSound = new Audio("eat.wav");
const endSound = new Audio("end.wav");
const ChangeDir = new Audio("move.wav");
let speed = 8;
let lastPaintTime = 0;
let snakeArr = [
    {x:13,y:15}
]
let toSpeed = 5;
let score = 0;
let hscore = 0;
food = {x:11,y:8};

//Game functions
function main(ctime){
    if(!isPaused){
        window.requestAnimationFrame(main);
        if((ctime-lastPaintTime)/1000 < 1/speed){
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
    }
    
}

function isCollide(snake){
    for(let i = 1 ; i<snake.length ; i++){
        if( snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
            return true;
        }
    }

    if(snake[0].x >= 19 || snake[0].x <= 0 || snake[0].y >= 19 || snake[0].y <= 0){
        return true;
    }
    return false;
}
 

function gameEngine(){
    //Update the snake and food
    if(isCollide(snakeArr)){
        endSound.play();
        gameSound.pause();
        inputDir = {x:0,y:0};
        snakeArr = [{x:13,y:15}];
        gameSound.play();
        score = 0;
        scr.innerHTML = "Score :"+score;
        speed = 8;
        cmt.innerHTML="Game Over! Press a Key to Start Again"
    }

    //food is eaten
    if(snakeArr[0].x === food.x  && snakeArr[0].y === food.y){
        score+=1;
        if(score === toSpeed){
            speed+=2.5;
            toSpeed+=5;
        }
      
        scr.innerHTML = "Score :"+score;
        if(score > hscore){
            hscore = score;
            high.innerHTML = "High Score :"+score;
        }
        
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x , y:snakeArr[0].y+inputDir.y });
        food = { x:Math.round(2+14*Math.random()) , y:2+Math.round(2+14*Math.random())};
        
    }

    //moving the snake
    for(let i = snakeArr.length-2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


   //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    cmt.innerHTML="";
    ChangeDir.play();
    if(e.key == 'p' || e.key == " "){
        pause();
    }else if (!isPaused){
        switch(e.key){
            case "ArrowUp":
                console.log("ArrowUp");
                inputDir.x = 0;
                inputDir.y = -1;
            break;
            case "ArrowDown":
                console.log("ArrowDown");
                inputDir.x = 0;
                inputDir.y = 1;
            break;
            case "ArrowLeft":
                console.log("ArrowLeft");
                inputDir.x = -1;
                inputDir.y = 0;
            break;
            case "ArrowRight":
                console.log("ArrowRight");
                inputDir.x = 1;
                inputDir.y = 0;
            break;
            default:
                break;
        }
    }
})

let isPaused = false;
function pause(){
    isPaused = !isPaused;
    if (isPaused) {
        gameSound.pause();
        cmt.innerHTML="Game Paused!! Press 'P' or SpaceBar to resume";
    }else {
        gameSound.play();
        cmt.innerHTML="";
        window.requestAnimationFrame(main);
    }
}
