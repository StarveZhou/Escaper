document.onkeydown = function (ev) {
    if (ev.keyCode == KEY_UP_ARROW || ev.keyCode == KEY_W){
        moveVer = -1;
    }
    else if (ev.keyCode == KEY_DOWN_ARROW || ev.keyCode == KEY_S){
        moveVer = 1;
    }
    else if (ev.keyCode == KEY_RIGHT_ARROW || ev.keyCode == KEY_D){
        moveHor = 1;
    }
    else if (ev.keyCode == KEY_LEFT_ARROW || ev.keyCode == KEY_A){
        moveHor = -1;
    }
    else if (ev.keyCode == KEY_SB){
        hero.fire();
    }

    //console.log("down", moveHor, moveVer);
}


document.onkeyup = function (ev) {
    if (ev.keyCode == KEY_UP_ARROW || ev.keyCode == KEY_W){
        moveVer = 0;
    }
    else if (ev.keyCode == KEY_DOWN_ARROW || ev.keyCode == KEY_S){
        moveVer = 0;
    }
    else if (ev.keyCode == KEY_RIGHT_ARROW || ev.keyCode == KEY_D){
        moveHor = 0;
    }
    else if (ev.keyCode == KEY_LEFT_ARROW || ev.keyCode == KEY_A){
        moveHor = 0;
    }
    else if (ev.keyCode == KEY_Q){
        hero.changeWeapon(-1);
    }
    else if (ev.keyCode == KEY_E){
        hero.changeWeapon(1);
    }
    else if (ev.keyCode == KEY_ENTER){
        gameStop = ~gameStop;
        refresh();
    }
    else if (ev.keyCode == KEY_R){
        hero.reload();
    }
    //console.log("up", moveHor, moveVer);
}

document.onmousemove = function (ev) {
    mouseX = ev.pageX - mouseXShift;
    mouseY = ev.pageY - mouseYShift;
    //console.log(ev.pageX, ev.pageY);
}

document.onmousedown = function (ev) {
    hero.fire()
}