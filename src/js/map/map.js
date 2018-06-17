function initialLineBox() {
    for (var i=0; i<=MAP_HEIGHT; i+=lineVerInterval){
        var line = deepClone(lineObj);
        line.x0 = 0; line.x1 = MAP_WIDTH;
        line.y0 = i; line.y1 = i;
        lineBox.push(line);
    }
    for (var i=0; i<=MAP_WIDTH; i+=lineHorInterval){
        var line = deepClone(lineObj);
        line.x0 = i; line.x1 = i;
        line.y0 = 0; line.y1 = MAP_HEIGHT;
        lineBox.push(line);
    }
}

function drawHero() {
    //console.log("drawHero : ", checkContainedCir(hero.main.getObj()), checkContainedCir(hero.head.getObj()));
    //console.log(hero.main, hero.head);
    if (checkContainedCir(hero.main.getMObj())){
        drawFrameCir(hero.main.getMObj());
    }
    if (checkContainedCir(hero.head.getMObj())){
        drawFrameCir(hero.head.getMObj());
    }
}

function drawMapLine(){
    for (var id in lineBox){
        if (checkContainedLine(lineBox[id])){
            //console.log("contain : ", lineBox[id]);
            drawFrameLine(lineBox[id]);
        }
    }
}

function drawBullet() {
    //console.log(bulletBox);
    for (var id in bulletBox){
        if (checkContainedCir(bulletBox[id].bullet.getMObj())){
            drawFrameCir(bulletBox[id].bullet.getMObj());
        }
    }
    for (var id in bulletBox){
        bulletBox[id].fly();
    }
    while (refreshBulletBox() == true);
}

function drawReward() {
    for (var id in rewardBox){
        if (checkContainedCir(rewardBox[id].outer)){
            drawFrameCir(rewardBox[id].outer.getMObj());
            drawFrameCir(rewardBox[id].main.getMObj());
        }
    }
    while (refreshRewardBox() == true);
}

function drawMonster() {
    for (var i=5; i>=1; i--){
        for (var id in monsterBox){
            if (monsterBox[id].HP != i) continue;
            if (checkContainedCir(monsterBox[id].main)){
                drawFrameCir(monsterBox[id].main.getMObj());
            }
        }
    }

    for (var id in monsterBox){
        //console.log(monsterBox[id]);
        monsterBox[id].move(hero.main.x, hero.main.y);
    }
    while (refreshMonsterBox());
}

function drawOptionCir() {
    //console.log(newGameOption);
    //console.log(continueGameOption);
    if (newGameOption.isOn == true && checkContainedCir(newGameOption.main)){
        drawFrameCir(newGameOption.main.getMObj());
        drawFrameWords(newGameOption.textObj);
    }
    if (continueGameOption.isOn == true && checkContainedCir(continueGameOption.main)){
        drawFrameCir(continueGameOption.main.getMObj());
        drawFrameWords(continueGameOption.textObj);
    }
    if (testGameOption.isOn == true && checkContainedCir(testGameOption.main)){
        drawFrameCir(testGameOption.main.getMObj());
        drawFrameWords(testGameOption.textObj);
    }
}

function drawGame() {
    drawMapLine();
    drawMonster();
    drawHero();
    drawReward();
    drawBullet();
    drawFrame();
}

function drawOption() {
    drawMapLine();
    drawOptionCir();
    drawHero();
    drawOptionFrame();
}