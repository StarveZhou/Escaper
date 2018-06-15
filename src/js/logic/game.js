function randomGame() {
    if (gameCount % monsterGenerateTimePeriod == 0){
        var rd = Math.random();
        var prob = 0;
        for (var i=0; i<monsterClassList.length; i++){
            prob += monsterProb[i];
            if (rd <= prob){
                monsterBox.push(getMonsterEntry(monsterClassList[i]));
                console.log(monsterBox);
                break;
            }
        }
    }

    if (Math.floor(hero.score / rewardGenerateTimePeriod) != Math.floor(hero.lastScore / rewardGenerateTimePeriod)){
        ulog("award is set");
        rewardBox.push(getRewardEntry());
    }
}


function refresh() {
    clearAll();

    refreshThingPos(hero.main, moveHor, moveVer, hero.speed);
    hero.refresh(moveHor, moveVer, mouseX, mouseY);
    colliBullet2Monster();
    colliHero2Reward();
    colliHero2Monster();
    cameraMove();
    randomGame();
    hero.refreshScore();
    //console.log(mouseX, mouseY);
    //console.log(hero);
    drawGame();

    //hero.fire();
    //if (gameCount == 10) return;
    if (gameStop == false){
        setTimeout(refresh, framePeriod);
    }
    gameCount ++;
    //console.log("in fresh");
}

function init() {
    initialLineBox();
    hero.weaponList.push(pistolWeapon);
    //hero.weaponList.push(subMachineWeapon);
    hero.bulletCount = pistolWeapon.capacity;
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