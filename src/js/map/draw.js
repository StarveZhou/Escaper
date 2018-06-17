function drawCircle(obj) {
    context.beginPath();
    context.arc(obj.x, obj.y, obj.r, 0, 2*PI, false);
    context.strokeStyle = obj.strokeColor;
    context.lineWidth = obj.lineWidth;
    context.fillStyle = obj.fillColor;
    context.stroke();
    context.fill();
    context.closePath();
}

function drawRect(obj) {
    context.beginPath();
    context.fillStyle = obj.fillColor;
    context.strokeStyle = obj.strokeColor;
    context.lineWidth = obj.lineWidth;
    context.stroke();
    context.fillRect(obj.x, obj.y, obj.w, obj.h);
    context.closePath();
}

function drawWords(obj) {
    context.beginPath();
    context.font = obj.font;
    context.textAlign = obj.align;
    context.fillStyle = obj.color;
    context.fillText(obj.text, obj.x, obj.y);
    context.closePath();
}

function drawLine(obj) {
    context.beginPath();
    context.moveTo(obj.x0, obj.y0);
    context.lineTo(obj.x1, obj.y1);
    context.lineWidth = obj.lineWidth;
    context.strokeStyle = obj.strokeColor;
    context.stroke();
    context.closePath();
}

function clearAll() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
}

function playSound(sound) {
    sound.load();
    sound.play();
}