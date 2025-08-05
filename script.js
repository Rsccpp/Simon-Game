// Arrays to store user and game sequence

let gameSeq = [];
let userSeq = [];

let colors = ["red", "green", "orange", "blue"];

let started = false;
let level = 0;
let score = 0;
let hScore = 0;

let start = document.querySelector('.start');
let rst = document.querySelector(".reset");

let h3 = document.querySelector("h3");
let btn = document.querySelector(".btn");
let hiScore = document.querySelector(".hScore");

// first step -- to start game
start.addEventListener("click", function() {
   
   if(started == false){
    console.log("Game started");
    started = true;
    levelUp();
   }
});

// highest score

function highestScore() {
    
    if(score >= hScore){
        hScore = score;
    }
    hiScore.innerHTML = `Highest Score: ${hScore}`;
}

// second step
function levelUp() {
    userSeq = [];
    level++;

    h3.innerText = `Level ${level} Score: ${score}`;
    highestScore();

    // to flash random button
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = colors[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

// Game Button flash
function gameFlash(btn) {

    btn.classList.add("gameflash");
    setTimeout(function() {
        btn.classList.remove("gameflash");
    }, 250);
}

// User clicked button flash
function userFlash(btn) {

    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}



// check

function check(id) {
    if(gameSeq[id] == userSeq[id]){
       if(gameSeq.length == userSeq.length){
        score++;
        levelUp();
       }
    } else {
        h3.innerHTML = `Game Over! <b>Score: ${score}</b> <br> Press Start to restart the game.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(()=> {
            document.querySelector("body").style.backgroundColor = "#B0BEC5";
        }, 200);
        reset();
    }
}

// Btn Press implementation
function btnPress() {
    let btn = this;
    console.log(btn);
    userFlash(btn);

    userColor = btn.getAttribute("id"); // assuming the color is the second class

    userSeq.push(userColor);
    console.log(userSeq);
    check(userSeq.length-1);
}


let allBtns = document.querySelectorAll('.btn');

for(btn of allBtns){
    btn.addEventListener('click', btnPress);
}

// to reset game

rst.addEventListener("click", function() {
    reset();
    if(started == false){
    console.log("Game started");
    started = true;
    levelUp();
   }
});

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    score = 0;
    level = 0;
}