function Hero(body, speed) {
    this.main = body;
    this.drct = null;

    this.speed =speed;
    this.isColliped = false;

    this.weaponList = [];
    this.weaponID = 0;
    this.aspeedStage = 0;
    this.bulletCount = null;
    this.changeBulletStage = 0;

    this.HP = heroInitialHP;
    this.HPProtect = 0;

    this.killMonsterCount = 0;

    this.lastScore = 0;
    this.score = 0;

    this.initHead = function () {
        var head = new thing(this.main.x, this.main.y, this.main.r/3,
            {
                lineWidth : 2,
                strokeColor : "#99CC00",
                fillColor : "#000000"
            });
        return head;
    }

    this.head = null;


    this.refreshDrct = function (mouseX, mouseY) {
        var x = mouseX - (this.main.x - cameraX);
        var y = mouseY - (this.main.y - cameraY);
        var d = Math.sqrt(x*x + y*y);
        x = x / d; y = y / d;
        this.drct = {
            x : x,
            y : y
        };
        //console.log(this.drct.x, this.drct.y);
    }

    this.refreshHead = function(){
        //console.log(this.head);
        this.head.x = this.main.x + this.main.r * this.drct.x * 0.5;
        this.head.y = this.main.y + this.main.r * this.drct.y * 0.5;
    }

    this.fire = function () {
        if (this.aspeedStage != 0) return;
        if (this.changeBulletStage != 0) return;
        //console.log("count : ", gameCount);
        this.aspeedStage = 1;
        //console.log("list", this.weaponList);
        //console.log(pistolWeapon);
        this.weaponList[this.weaponID].fire(this.main.x, this.main.y, this.drct);
        this.bulletCount --;
        if (this.bulletCount == 0){
            this.changeBulletStage += 1;
        }
    }

    this.reload = function(){
        this.changeWeapon(0);
    }

    this.refresh = function (moveHor, moveVer, mouseX, mouseY) {
        if (this.changeBulletStage != 0){
            if (this.changeBulletStage == 1){
                playSound(changeWeaponSound);
            }
            this.changeBulletStage += 1;
            if (this.changeBulletStage > this.weaponList[this.weaponID].cspeed){
                this.changeBulletStage = 0;
                this.bulletCount = this.weaponList[this.weaponID].capacity;
            }
        }
        if (this.aspeedStage != 0){
            this.aspeedStage += 1;
            //.log("aspeed", this.aspeedStage);
            if (this.aspeedStage > this.weaponList[this.weaponID].aspeed+1){
                this.aspeedStage = 0;
            }
        }
        if (this.HPProtect != 0){
            this.HPProtect += 1;
            if (this.HPProtect > heroHPProtect){
                this.HPProtect = 0;
                this.main.attr.fillColor = heroNormalColor;
            }
        }
        //console.log(hero.aspeedStage, this.weaponList[this.weaponID].aspeed);

        if (this.head == null) this.head = this.initHead();

        this.refreshDrct(mouseX, mouseY);
        this.refreshHead();

    }

    this.refreshScore = function () {
        this.lastScore = this.score;
    }

    this.changeWeapon = function (x) {
        this.weaponID += x;
        if (this.weaponID >= this.weaponList.length) this.weaponID = 0;
        if (this.weaponID < 0) this.weaponID = this.weaponList.length - 1;
        this.bulletCount = 0;
        this.changeBulletStage = 1;
    }

    this.rewardWeapon = function(wea){
        console.log(wea);
        for (var id in this.weaponList){
            if (this.weaponList[id].name == wea.name){
                if (this.weaponList[id].capacity < 30){
                    ulog(wea.name + " capacity + 1");
                    this.weaponList[id].capacity += 1;
                }
                else{
                    ulog(wea.name + " reach max capacity");
                }

                return;
            }
        }
        ulog("receive weapon : " + wea.name);
        this.weaponList.push(deepCloneWeapon(wea));
    }

    this.receiveReward = function(reward){
        if (reward.type.id == 0){
            console.log(reward.type.weapon);
            console.log(weaponList, weaponList[reward.type.weapon]);
            this.rewardWeapon(weaponList[reward.type.weapon]);
        }
        else if (reward.type.id == 1){
            if (this.HP < 10){
                ulog("HP + 1");
                this.HP += 1;
            }
            else{
                ulog("HP reach max capacity");
            }
        }
        else if (reward.type.id == 2){
            if (this.speed < 30){
                ulog("speed + 4");
                this.speed += 4;
            }
            else{
                ulog("speed reach max capacity");
            }
        }
        else{
            ulog(reward.type.id + " Empty");
        }
        reward.isPicked = true;
    }



    this.colliMonster = function(){
        if (this.HPProtect != 0) return;
        this.HP -= 1;
        this.HPProtect = 1;
        this.main.attr.fillColor = heroProtectedColor;
        this.isColliped = true;
        ulog("you get hit");

        if (this.HP == 0){
            this.die();
        }
        else{
            playSound(heroHurtSound);
        }
    }

    this.die = function () {
        playSound(gameOverSound);
        alert("you are killed!");

        gameState = 0;
    }

    this.init = function () {
        this.weaponList.splice(0, this.weaponList.length);
        this.weaponList.push(deepCloneWeapon(pistolWeapon));
        this.weaponID = 0;
        this.bulletCount = pistolWeapon.capacity;

        this.speed = 10;
        this.score = 0;
        this.lastScore = 0;
        this.aspeedStage = 0;
        this.changeBulletStage = 0;
        this.HP = 8;
    }

    this.tempPosi = null;

    this.storePosi = function () {
        this.tempPosi = {
            x : this.main.x,
            y : this.main.y
        };
    }
    this.loadPosi = function () {
        this.main.x = this.tempPosi.x;
        this.main.y = this.tempPosi.y;
    }

    this.testInit = function () {
        this.weaponList.splice(0, this.weaponList.length);
        this.weaponList.push(deepCloneWeapon(pistolWeapon));
        this.weaponList.push(deepCloneWeapon(subMachineWeapon));
        this.weaponList.push(deepCloneWeapon(cannonWeapon));
        this.weaponList.push(deepCloneWeapon(shotGunWeapon));
        this.weaponID = 0;
        this.bulletCount = pistolWeapon.capacity;

        this.speed = 10;
        this.score = 0;
        this.lastScore = 0;
        this.aspeedStage = 0;
        this.changeBulletStage = 0;
        this.HP = 8;
    }
}