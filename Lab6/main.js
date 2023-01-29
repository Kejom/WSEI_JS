const canvas = document.getElementById("ballsCanvas");
const context = canvas.getContext('2d');

var balls = [];
var mainLoopInterval;


function Init(){
    resizeCanvas();
    generateBalls(20);
    mainLoop = setInterval(mainLoop, 1000/60);
}

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function generateBalls(amount){

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

function plusOrMinus(){
    return Math.random() < 0.5 ? -1: 1;
}

function randomColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

document.addEventListener("DOMContentLoaded", Init);