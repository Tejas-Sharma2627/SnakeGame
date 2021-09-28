//Game Constants and Game Variables

let inputDir = {x :0,y:0}; //Posistion of snake before starting the game
const foodsound = new Audio('foodSound.mp3'); //Sound file
const gameOverSound = new Audio('gameOverSound.mp3');
const moveSound = new Audio('1');
const musicSound = new Audio('2');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x :13, y:15}
]
food = {x : 6, y:7};

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();

}
function isDard(snake){
    //If you eat yourself
    for(let i =1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true
        }
    }
    //Collision with wall
        if(snake[0].x>=30 || snake[0].x<=0 || snake[0].y>=30|| snake[0].y<=0){
            return true;
        }

    
    
}

function gameEngine(){
    //Part 1 : Updating Snake array and Food
    if(isDard(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        speed=5;
        inputDir = {x :0,y:0};
        alert("Game is Over");
        snakeArr = [{x :13, y:15}];
        musicSound.play();
        score = 0;


    }
    //After eating the food , increase the score and render new food
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        let a = 2;
        score+=1;
        speed+=1;
        // if(score>hiscoreval){
        //     hihscoreval=score;
        //     localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        //     hiscorebox.innerHTML = "High Score :"+hiscoreval;
        // }
        scoreBox.innerHTML="Score :" + score;
        foodsound.play();
        let b = 16;
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y});//Unshift appends new elemnt in starting of array , this line is for adding food in snake's body
        food = {x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())}
    }

    //Movement 
    for(let i = snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]}; // To update the posistion and preventing refernece problem

    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y+=inputDir.y;


    //Part 2 : Render the snake and group
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{  //For every element in snakeArr
    snakeElement=document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    
    if(index==0){
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');
    }
    
    board.appendChild(snakeElement);



    });
    //Food Display
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);



}









//Main Logic starts here

window.requestAnimationFrame(main);//Animation Rendering
// let hiscore = localStorage.getItem("hiscore");
// if(hiscore===null){
//     hiscoreval=0;
//     localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
// }
// else{
//     hiscoreval=JSON.parse(hiscore);
//     hiscorebox.innerHTML = "High Score :"+hiscoreval;
// }
window.addEventListener('keydown', e =>{   // Reading the movement input
    inputDir = {x:0, y:1} //Start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x =0 ;
            inputDir.y =1 ;
            break;
        case "ArrowRight":
             console.log("ArrowRight");
             inputDir.x = 1;
            inputDir.y =0 ;
              break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y =0 ;
            break;
        default :
            break;
    }



});