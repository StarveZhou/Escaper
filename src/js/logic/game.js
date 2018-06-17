function randomGame() {
    if (testMode == 1) return;
    if (gameCount % monsterGenerateTimePeriod == 0){
        var rd = Math.random();
        var prob = 0;
        for (var i=0; i<monsterClassList.length; i++){
            prob += monsterProb[i];
            if (rd <= prob){
                monsterBox.push(getMonsterEntry(monsterClassList[i]));
                //console.log(monsterBox);
                break;
            }
        }
    }

    if (Math.floor(hero.score / rewardGenerateTimePeriod) != Math.floor(hero.lastScore / rewardGenerateTimePeriod)){
        ulog("award is set");
        rewardBox.push(getRewardEntry());
    }
}

function gamePlayStateRefresh() {
    hero.storePosi();
    colliBullet2Monster();
    colliHero2Reward();
    colliHero2Monster();

    randomGame();
    hero.refreshScore();
    //console.log(mouseX, mouseY);
    //console.log(hero);
    drawGame();
}

function gameOptionRefresh() {
    var colliRes = colliOption2Hero();

    if (colliRes == 0){
        drawOption();
    }
    else if (colliRes == 1){
        newGame();
    }
    else if (colliRes == 2){
        hero.loadPosi();
        gameState = 1;
    }
    else if (colliRes == 3){
        newTestGame();
    }
}

function newGame() {
    hero.init();
    monsterInit();
    rewardInit();
    bulletInit();
    gameState = 1;
    testMode = 0;
}

function newTestGame() {
    newGame();
    hero.testInit();
    testMode = 1;
}


function refresh() {
    clearAll();
    refreshThingPos(hero.main, moveHor, moveVer, hero.speed);
    hero.refresh(moveHor, moveVer, mouseX, mouseY);
    cameraMove();
    if (gameState == 0){
        newGameOption.isOn = true;
        continueGameOption.isOn = false;
        testGameOption.isOn = true;
        gameOptionRefresh();
    }
    else if (gameState == 1){
        newGameOption.isOn = false;
        continueGameOption.isOn = false;
        testGameOption.isOn = false;
        gamePlayStateRefresh();
    }
    else if (gameState == 2){
        newGameOption.isOn = true;
        continueGameOption.isOn = true;
        testGameOption.isOn = true;
        gameOptionRefresh();
    }

    setTimeout(refresh, framePeriod);
    gameCount ++;
}

function init() {
    refreshOptionPosi();
    initialLineBox();
    //hero.weaponList.push(deepCloneWeapon(cannonWeapon));
    //hero.weaponList.push(deepCloneWeapon(shotGunWeapon));

    gameCount = 0;

    //rewardBox.push(getRewardEntry());
    //monsterBox.push(getMonsterEntry(monsterClass5));
    //console.log(rewardBox);
    //console.log(lineBox);
}

function runGame() {
    init();
    refresh();
    /*
    while (true){
        //setTimeout("refresh()", framePeriod);
        refresh();
    }*/
}