let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", startGame);
h2.addEventListener("click", startGame);
h2.addEventListener("touchstart", startGame);

function startGame() {
    if (!started) {
        console.log("Game started");
        started = true;
        levelup();
    }
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns() {
    let idx = userSeq.length - 1; 
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerText = `Game Over!your score is ${level} Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.classList[1]; 
    userSeq.push(userColor);
    checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for (let bt of allBtns) { 
    bt.addEventListener("click", btnPress);
}

function levelup() {
    userSeq = [];
    level += 1;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); 
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
