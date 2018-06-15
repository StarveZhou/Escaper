function refreshThingPos(th, moveHor, moveVer, speed) {
    var nx, ny;
    nx = th.x + moveHor * speed;
    ny = th.y + moveVer * speed;

    var xMin, xMax, yMin, yMax;
    xMin = th.r + (gameWidth - innerCameraWidth) / 2;
    xMax = MAP_WIDTH - th.r - (gameWidth - innerCameraWidth) / 2;
    yMin = th.r + (gameHeight - innerCameraHeight) / 2;
    yMax = MAP_HEIGHT - th.r - (gameHeight - innerCameraHeight) / 2;

    if (checkBorder(nx, xMin, xMax) == true) th.x = nx;
    if (checkBorder(ny, yMin, yMax) == true) th.y = ny;
}