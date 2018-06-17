function drawGameScene() {
    drawRect(frameInnRecObj);
}

function drawOuterFrame() {
    var rec = deepClone(frameOutRecObj);

    //up
    rec.x = 0; rec.y = 0;
    rec.w = WIDTH; rec.h = gameShiftHeight;
    drawRect(rec);

    //left
    rec.x = 0; rec.y = 0;
    rec.w = gameShiftWidth; rec.h = HEIGHT;
    drawRect(rec);

    //right
    rec.x = gameWidth + gameShiftWidth; rec.y = 0;
    rec.w = gameShiftWidth; rec.h = HEIGHT;
    drawRect(rec);

    //bottom
    rec.x = 0; rec.y = gameHeight + gameShiftHeight;
    rec.w = WIDTH; rec.h = HEIGHT - rec.y;
    drawRect(rec);

}

/**
 * drawFrame
 */
function drawFrame() {
    //drawGameScene();
    drawOuterFrame();
    //console.log(hero.bulletCount);
    drawClip(hero.bulletCount);
    drawHP(hero.HP);
    drawWeaponPool();
    drawHeroPosition();
    drawLog();
}

function drawOptionFrame() {
    drawOuterFrame();
    drawLog();
}

function drawClip(count) {
    for (var i=0; i<count; i++){
        var bullet = deepClone(frameClipBulletRecObj);
        bullet.fillColor = hero.weaponList[hero.weaponID].bullet.attr.fillColor;
        bullet.strokeColor = hero.weaponList[hero.weaponID].bullet.attr.strokeColor;
        bullet.y = clipBaseHeight - i*clipShiftHeight;
        drawRect(bullet);
    }
    var words = deepClone(frameClipLeftWordsObj);
    if (count == 0) words.text = "CHANGING";
    else if (hero.aspeedStage != 0) words.text = "LOADING";
    else words.text += " : " + count;
    words.y = clipBaseHeight - count*clipShiftHeight;
    drawWords(words);
}

function drawHP(count){
    for (var i=0; i<count; i++){
        var heart = deepClone(frameHPHearCirObj);
        heart.y = HPBaseHeight - i*HPShiftHeight;
        drawCircle(heart);
    }
    var words = deepClone(frameHPLeftWordsObj);
    words.text += " : " + count;
    words.y = HPBaseHeight - count*HPShiftHeight;
    drawWords(words);
}

function drawWeaponPool() {
    var count = hero.weaponList.length;
    for (var i=0; i<count; i++){
        var weapon = deepClone(frameWeaponListRecObj);
        weapon.x = weaponListBaseWidth + i*weaponListShiftWidth;
        weapon.fillColor = hero.weaponList[i].bullet.attr.fillColor;
        drawRect(weapon);
        var words = deepClone(frameWeaponListTextObj);
        words.text = hero.weaponList[i].name;
        words.x = weapon.x + weapon.w / 2;
        if (i == hero.weaponID) words.font = "bold " + words.font;
        drawWords(words);
    }
}

function drawHeroPosition() {
    var words = deepClone(frameHeroPosiTextObj);
    words.text = "x : " + hero.main.x + "   y : " + hero.main.y + "   speed : " + hero.speed + "   score : " + hero.score;
    drawWords(words);
}

function drawLog(){
    drawWords(frameLogTextObj);
}

//TODO 可以优化性能
function drawFrameLine(obj) {
    var nobj = deepClone(obj);
    nobj.x0 += gameShiftWidth - cameraX; nobj.x1 += gameShiftWidth - cameraX;
    nobj.y0 += gameShiftHeight - cameraY; nobj.y1 += gameShiftHeight - cameraY;
    drawLine(nobj);
}

function drawFrameCir(obj) {
    var nobj = deepClone(obj);
    nobj.x += gameShiftWidth - cameraX;
    nobj.y += gameShiftHeight -cameraY;
    //console.log("nobj", nobj);
    drawCircle(nobj);
}

function drawFrameRect(obj) {
    var nobj = deepClone(obj);
    nobj.x += gameShiftWidth - cameraX;
    nobj.y += gameShiftHeight - cameraY;
    drawRect(nobj);
}

function drawFrameWords(obj) {
    var nobj = deepClone(obj);
    nobj.x += gameShiftWidth - cameraX;
    nobj.y += gameShiftHeight - cameraY;
    drawWords(nobj);
}
