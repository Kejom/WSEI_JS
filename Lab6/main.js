const canvas = document.getElementById("ballsCanvas");
const context = canvas.getContext('2d');
const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");
const ballsInput = document.getElementById("balls-input");
const distanceInput = document.getElementById("distance-input");

var balls = [];
var mainLoopInterval;
var X = 20;
var Y = window.innerWidth / 5;


function Init(){
    resizeCanvas();
    setDefaultValues();
    mapButtons();
}

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


function setDefaultValues(){
    X = 20;
    Y = window.innerWidth / 5;
    ballsInput.value = X;
    distanceInput.value = Y;
}

function setValues(){
    X = ballsInput.value;
    if(X < 1)
        X = 1;
    else if(X > 100)
        X = 100;
    ballsInput.value = X;

    Y = distanceInput.value;
    if(Y < 10)
        Y = 10;
    else if(Y > 1000)
        Y = 1000;
    distanceInput.value = Y;
}

function mapButtons(){
    startButton.addEventListener("click", onStartButtonClick);
    resetButton.addEventListener("click", onResetButtonClick);
}

function onStartButtonClick(){
    if(mainLoopInterval)
        mainLoopInterval = clearInterval(mainLoopInterval);
    setValues();
    generateBalls(X);
    mainLoopInterval = setInterval(mainLoop, 1000/60);
}

function onResetButtonClick(){
    setDefaultValues();

    if(!mainLoopInterval)
        return;

    mainLoopInterval = clearInterval(mainLoopInterval);
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function generateBalls(amount){
    balls = [];
    for(let i = 0; i < amount; i++){
        let ball = {
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            xSpeed: Math.ceil(Math.random() * 10) * plusOrMinus(),
            ySpeed: Math.ceil(Math.random() * 10) * plusOrMinus(),
            color: randomColor()
        }

        ball.x = ball.x < 20 ? 20 : ball.x > canvas.width-20 ? canvas.width-20 : ball.x;
        ball.y = ball.y < 20 ? 20 : ball.y > canvas.height-20 ? canvas.height-20 : ball.y;
        balls.push(ball);
    }
}

function mainLoop(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBalls();
    drawLines();
    updateBalls();
}

function drawBalls(){
    balls.forEach(ball => drawBall(ball));
}

function drawBall(ball){
    context.beginPath();
    context.arc(ball.x, ball.y, 20, 0, 2*Math.PI);
    context.fillStyle = ball.color
    context.fill();
}

function updateBalls(){
    balls.forEach(ball => updateBall(ball));
}

function updateBall(ball){
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;

    if( ball.x > canvas.width-20){
        ball.x = 2*canvas.width-40 - ball.x;
        ball.xSpeed = changeSpeed(ball.xSpeed);
    }
    else if(ball.x < 20){
        ball.x = 40 - ball.x
        ball.xSpeed = changeSpeed(ball.xSpeed);
    }

    if(ball.y > canvas.height-20){
        ball.y = 2*canvas.height-40 - ball.y;
        ball.ySpeed = changeSpeed(ball.ySpeed);
    }
    else if(ball.y < 20){
        ball.y = 40 - ball.y;
        ball.ySpeed = changeSpeed(ball.ySpeed);
    }
}

function changeSpeed(speed){
    let sign = speed < 0 ? 1 : -1;
    let newVal = Math.ceil(speed * Math.random() * -2);
    return newVal === 0 ? Math.ceil(Math.random() * 10) * sign : newVal;
}

function drawLines(){
for(let i = 0; i < balls.length-1; i++){
    let ball1 = balls[i];

    for(let j = i+1; j< balls.length; j++){

        let ball2 = balls[j]

        if(checkDistance(ball1, ball2))
            drawLine(ball1, ball2);
    }
}
}

function drawLine(ball1, ball2){
    let gradient = context.createLinearGradient(ball1.x, ball1.y, ball2.x, ball2.y);
    gradient.addColorStop(0, ball1.color);
    gradient.addColorStop(1, ball2.color);

    context.strokeStyle = gradient;
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(ball1.x, ball1.y);
    context.lineTo(ball2.x, ball2.y);
    context.stroke();
}

function checkDistance(ball1, ball2){
    let x = (ball1.x - ball2.x) **2;
    let y = (ball1.y - ball2.y) **2;
    return Math.sqrt(x+y) < Y;
}

function plusOrMinus(){
    return Math.random() < 0.5 ? -1: 1;
}

function randomColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener("DOMContentLoaded", Init);