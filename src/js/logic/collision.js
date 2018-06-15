function colliHero2Reward() {
    for (var id in rewardBox){
        if (isCollided(rewardBox[id].main, hero.main) == true){
            //console.log("colli",rewardBox[id]);
            hero.receiveReward(rewardBox[id]);
        }
    }
}

function colliHero2Monster() {
    hero.isColliped = false;
    for (var id in monsterBox){
        if (isCollided(monsterBox[id].main, hero.main) == true){
            hero.colliMonster();
        }
    }
}

function colliBullet2Monster() {
    for (var bid in bulletBox){
        var bullet = bulletBox[bid];
        for (var mid in monsterBox){
            var monster = monsterBox[mid];
            if (isCollided(bullet.bullet, monster.main) == true){
                bullet.hit = true;
                monster.hit(bullet.damage);
                break;
            }
        }
    }
}