const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

let degrees = 0;
let new_degrees = 360;
let time = 0;

const color = "#ff0000";
const bgcolor = "rgba(10, 10, 10, 0.8)";
const originalBgColor2 = "rgba(255, 255, 255, 0.8)";
const successColor = "#00ff00";

let bgcolor2 = originalBgColor2;

let g_start = 0;
let g_end = 0;

let animation_loop = null;
let gameEndTimeout = null;

let needed = 4;
let streak = 0;

const DEG_TO_RAD = Math.PI / 180;
const CENTER_X = W / 2;
const CENTER_Y = H / 2;


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function drawFrame() {
    ctx.clearRect(0, 0, W, H);


    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.arc(CENTER_X, CENTER_Y, 125, 0, Math.PI * 2);
    ctx.fill();


    ctx.beginPath();
    ctx.strokeStyle = bgcolor;
    ctx.lineWidth = 15;
    ctx.arc(CENTER_X, CENTER_Y, 100, 0, Math.PI * 2);
    ctx.stroke();


    ctx.beginPath();
    ctx.strokeStyle = bgcolor2;
    ctx.lineWidth = 25;
    ctx.arc(
        CENTER_X,
        CENTER_Y,
        98,
        g_start - 90 * DEG_TO_RAD,
        g_end - 90 * DEG_TO_RAD
    );
    ctx.stroke();


    const radians = degrees * DEG_TO_RAD;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 40;
    ctx.arc(
        CENTER_X,
        CENTER_Y,
        90,
        radians - 0.08 - 90 * DEG_TO_RAD,
        radians - 90 * DEG_TO_RAD
    );
    ctx.stroke();
}



function startRotation(intervalTime) {
    if (animation_loop) clearInterval(animation_loop);

    degrees = 0;

    g_start = getRandomInt(20, 40) / 10;
    g_end = g_start + getRandomInt(5, 10) / 10;

    animation_loop = setInterval(() => {
        if (degrees >= new_degrees) {
            failGame();
            return;
        }

        degrees += 2;
        drawFrame();

    }, intervalTime);
}

function successRound() {
    streak++;
    clearInterval(animation_loop);

    if (streak === needed) {
        bgcolor2 = "rgba(0, 255, 0, 0.8)";
        drawFrame();

        $('.key-wrapper, .e-text').hide();
        $('.unlock').css('opacity', '100%').show();

        endGame(true);
    } else {
        startRotation(time);
    }
}

function failGame() {
    clearInterval(animation_loop);

    bgcolor2 = "rgba(255, 0, 0, 0.8)";
    drawFrame();

    $('.key-wrapper, .e-text').hide();
    $('.lock').css('opacity', '100%').show();

    endGame(false);
}


document.addEventListener("keydown", (ev) => {
    if (ev.key !== 'E' && ev.code !== 'KeyE') return;

    const d_start = g_start / DEG_TO_RAD;
    const d_end = g_end / DEG_TO_RAD;

    if (degrees < d_start || degrees > d_end) {
        failGame();
    } else {
        successRound();
    }
});


function startGame(intervalTime) {
    clearTimeout(gameEndTimeout);
    clearInterval(animation_loop);

    streak = 0;
    bgcolor2 = originalBgColor2;

    $('.lock, .unlock, .key-wrapper, .e-text').hide();
    $('#canvas').css('display', 'block');


    startRotation(intervalTime);
}

function endGame(status) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://${GetParentResourceName()}/${status ? "success" : "fail"}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({}));

    streak = 0;
    needed = 4;

    gameEndTimeout = setTimeout(() => {
        $('.key-wrapper, .lock, .unlock, .e-text').hide();
        $('#canvas').hide();

        bgcolor2 = originalBgColor2;
        drawFrame();

    }, 1100);
}

window.addEventListener("message", (event) => {
    if (event.data.action !== "start") return;

    needed = event.data.value ?? 4;
    time = event.data.time ?? 2;

    startGame(time);

    $('.key-wrapper').css('opacity', '100%').show();
    $('.e-text').show();
});
