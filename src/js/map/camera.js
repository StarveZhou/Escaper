var CAMERA = {
    xMin : 0,
    xMax : MAP_WIDTH - gameWidth,
    yMin : 0,
    yMax : MAP_HEIGHT - gameHeight
};



function checkCamera(x, y) {
    return {
        x : checkBorder(x, CAMERA.xMin, CAMERA.xMax),
        y : checkBorder(y, CAMERA.yMin, CAMERA.yMax)
    };
}

function checkContainedCir(obj) {
    //console.log("check", obj, cameraX, cameraY);

    var xMin, xMax, yMin, yMax;
    xMin = cameraX - obj.r;
    xMax = cameraX + gameWidth + obj.r;
    yMin = cameraY - obj.r;
    yMax = cameraY + gameHeight + obj.r;
    //console.log(xMin, xMax, yMin, yMax);

    return containPoint(obj.x, obj.y, xMin, xMax, yMin, yMax);
}

function checkContainedLine(obj) {
    var xMin, xMax, yMin, yMax;
    xMin = cameraX - obj.lineWidth;
    xMax = cameraX + gameWidth + obj.lineWidth;
    yMin = cameraY - obj.lineWidth;
    yMax = cameraY + gameHeight + obj.lineWidth;

    var lx, rx, ly, ry;
    lx = umin(obj.x0, obj.x1); rx = umax(obj.x0, obj.x1);
    ly = umin(obj.y0, obj.y1); ry = umax(obj.y0, obj.y1);

    if (containPoint(obj.x0, obj.y0, xMin, xMax, yMin, yMax)
     || containPoint(obj.x1, obj.y1, xMin, xMax, yMin, yMax)){
        return true;
    }

    if (obj.x0 == obj.x1){
        return checkBorder(obj.x0, xMin, xMax)
            && ly <= yMax
            && ry >= yMin;
    }
    else if (obj.y0 == obj.y1){
        return checkBorder(obj.y0, yMin, yMax)
            && lx <= xMax
            && rx >= xMin;
    }
    else{
        var dx = 1.0 * (obj.x0 - obj.x1) / (obj.y0 - obj.y1);
        var ux;

        ux = obj.x0 - dx * (obj.y0 - yMin);
        if (checkBorder(ux, xMin, xMax) && checkBorder(ux, lx, rx)){
            return true;
        }

        ux = obj.x0 - dx * (obj.y0 - yMax);
        if (checkBorder(ux, xMin, xMax) && checkBorder(ux, lx, rx)){
            return true;
        }

        var dy = 1.0 * (obj.y0 - obj.y1) / (obj.x0 - obj.x1);
        var uy;

        uy = obj.y0 - dy * (obj.x0 - xMin);
        if (checkBorder(uy, yMin, yMax) && checkBorder(uy, ly, ry)){
            return true;
        }

        uy = obj.y0 - dy * (obj.x0 - xMax);
        if (checkBorder(uy, yMin, yMax) && checkBorder(uy, ly, ry)){
            return true;
        }
        return false;
    }
}

function slowRec(){
    var xMin, xMax, yMin, yMax;
    xMin = cameraX + (gameWidth - innerCameraWidth) / 2;
    xMax = cameraX + gameWidth - (gameWidth - innerCameraWidth) / 2;
    yMin = cameraY + (gameHeight - innerCameraHeight) / 2;
    yMax = cameraY + gameHeight - (gameHeight - innerCameraHeight) / 2;

    return {
        xMin : xMin,
        xMax : xMax,
        yMin : yMin,
        yMax : yMax
    };
}

function cameraMove() {
    rec = slowRec();
    var ncameraX, ncameraY;

    if (checkBorder(hero.main.x, rec.xMin, rec.xMax) == true){
        ncameraX = cameraX + moveHor * cameraSpeed;
    }
    else{
        ncameraX = cameraX + moveHor * hero.speed;
    }

    if (checkBorder(hero.main.y, rec.yMin, rec.yMax) == true){
        ncameraY = cameraY + moveVer * cameraSpeed;
    }
    else{
        ncameraY = cameraY + moveVer * hero.speed;
    }



    cm = checkCamera(ncameraX, ncameraY);



    if (cm.x == true) cameraX = ncameraX;
    if (cm.y == true) cameraY = ncameraY;
}