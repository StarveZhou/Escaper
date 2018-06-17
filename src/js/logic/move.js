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
        if (gameState == 1){
            hero.changeWeapon(-1);
        }
    }
    else if (ev.keyCode == KEY_E){
        if (gameState == 1){
            hero.changeWeapon(1);
        }
    }
    else if (ev.keyCode == KEY_ENTER){
        if (gameState == 1){
            gameState = 2;
            refreshOptionPosi();
        }
    }
    else if (ev.keyCode == KEY_R){
        if (gameState == 1){
            hero.reload();
        }
    }
    else if (ev.keyCode == KEY_N){
        if (testMode == 1){
            monsterBox.push(getMonsterEntry(monsterClassList[4]));
        }
    }
    else if (ev.keyCode == KEY_M){
        if (testMode == 1){
            ulog("award is set");
            rewardBox.push(getRewardEntry());
        }
    }
    //console.log("up", moveHor, moveVer);
}

document.onmousemove = function (ev) {
    mouseX = ev.pageX - mouseXShift - gameShiftWidth;
    mouseY = ev.pageY - mouseYShift - gameShiftHeight;
    //console.log(ev.pageX, ev.pageY);
}

document.onmousedown = function (ev) {
    if (gameState == 1){
        hero.fire()
    }
}