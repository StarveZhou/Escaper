function Monster(main, speed, HP, score, hatred) {
    this.main = main;
    this.speed = speed;
    this.HP = HP;
    this.score = score;
    this.hatred = hatred;

    this.move = function (aimX, aimY) {
        //if (gameCount % 10 != 0) return;

        var dx, dy;
        dx = this.main.x - aimX;
        dy = this.main.y - aimY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= this.hatred) return;

        aimX = aimX - this.main.x;
        aimY = aimY - this.main.y;

        var bot;
        bot = Math.sqrt(aimX * aimX + aimY * aimY);
        aimX /= bot; aimY /= bot;
        this.main.x += aimX;
        this.main.y += aimY;
        this.main.r = this.HP * 20;
    }

    this.hit = function (damage) {
        this.HP -= damage;
    }
}

function getMonsterEntry(monsterClass) {
    var rpos = randomPos(hero.main.x, hero.main.y, monsterGenerateRadius);
    var main = new thing(rpos.x, rpos.y, monsterClass.HP*20, monsterClass.attr);
    if (monsterPool.length == 0){
        console.log(main);
        return new Monster(main, monsterClass.speed, monsterClass.HP, monsterClass.score, monsterClass.hatred);
    }
    else{
        var monster = monsterPool.pop();
        monster.main = deepCloneThing(main);
        monster.speed = monsterClass.speed;
        monster.HP = monsterClass.HP;
        monster.score = monsterClass.score;
        monster.hatred = monsterClass.hatred;
        return monster;
    }
}

function refreshMonsterBox() {
    var isChanged = false;
    for (var id in monsterBox){
        if (monsterBox[id].HP <= 0){
            var monster = monsterBox.splice(id, 1)[0];
            monsterPool.push(monster);
            hero.score += monster.score;
        }
    }
    return isChanged;
}