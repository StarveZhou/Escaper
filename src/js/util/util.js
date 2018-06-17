//深拷贝
function deepClone(obj){
    var objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

//判断边界
function checkBorder(x, xMin, xMax) {
    if (x < xMin || x > xMax){
        return false;
    }
    else{
        return true;
    }
}

function umin(x, y){
    if (x < y){
        return x;
    }
    else{
        return y;
    }
}

function umax(x, y) {
    if (x > y){
        return x;
    }
    else{
        return y;
    }

}

function containPoint(x, y, xMin, xMax, yMin, yMax) {
    return checkBorder(x, xMin, xMax)
        && checkBorder(y, yMin, yMax);
}

//在圆心为(x, y)，半径为r的圆内随机生成点。
function randomPos(x, y, r) {
    var R = 2 * (r * (Math.random() + 0.5));
    var dx = Math.random() - 0.5, dy = Math.random() - 0.5;

    return {
        x : x + dx * R,
        y : y + dy * R
    };
}

function isCollided(a, b){
    var dis = (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
    var rad = (a.r + b.r) * (a.r + b.r);
    if (dis < rad) return true;
    else  return false;
}

function ulog(text) {
    frameLogTextObj.text = "[" + frameCount + "]" + text;
}

function rotateVec(x, y, angle) {
    var an = 2 * PI * angle / 360;
    var si = Math.sin(an);
    var co = Math.cos(an);

    return {
        x : (x*co + y * si) / sqrt2,
        y : (-1 * x * si + y * co)/sqrt2
    };
}