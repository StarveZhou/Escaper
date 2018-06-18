function Reward(outer, main, type) {
    this.outer = outer;
    this.main = main;
    this.type = type;
    this.isPicked = false;
    /*
    {
        id : 0,
        weapon : weapon
    }
    0 : weapon
    1 : +1 HP
    2 : +5 speed
     */
}

function getRandomType() {
    var count = 3;
    var rdn = Math.floor(Math.random() * (count+1));
    var ret = {id : rdn};
    if (rdn == 0){
        ret["weapon"] = Math.floor(Math.random() * (weaponList.length));
        if (ret["weapon"] >= weaponList.length) ret["weapon"] = 0;
    }
    return ret;
}

function getRewardEntry() {
    if (rewardPool.length == 0){
        var pos = randomPos(hero.main.x, hero.main.y, rewardGenerateRadius);
        return new Reward(
            new thing(pos.x, pos.y, rewardRadius+10,
            {
                lineWidth : 4,
                strokeColor : "#FFF000",
                fillColor : "#FFFF00"
            }),

            new thing(pos.x, pos.y, rewardRadius,
            {
                lineWidth : 4,
                strokeColor : "#00FFFF",
                fillColor : "#00FFFF"
            }),
            getRandomType());
    }
    else{
        var reward = rewardPool.pop();
        reward.type = getRandomType();
        var pos = randomPos(hero.main.x, hero.main.y, rewardGenerateRadius);
        reward.main.x = pos.x;
        reward.main.y = pos.y;
        reward.outer.x = pos.x;
        reward.outer.y = pos.y;
        reward.isPicked = false;
        return reward;
    }
}

function refreshRewardBox(){
    var isChanged = false;
    for (var id in rewardBox){
        if (rewardBox[id].isPicked == true){
            var reward = rewardBox.splice(id, 1)[0];
            rewardPool.push(reward);
            isChanged = true;
            break;
        }
    }
    return isChanged;
}

function rewardInit() {
    while (rewardBox.length != 0){
        var reward = rewardBox.pop();
        rewardPool.push(reward);
    }
}