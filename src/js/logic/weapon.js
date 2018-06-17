function Weapon(bullet, fspeed, ftime, aspeed, damage, capacity, cspeed, name, sound, fire) {
    this.bullet = bullet;
    this.fspeed = fspeed;//飞行速度
    this.ftime  =  ftime;//飞行时间
    this.aspeed = aspeed;//攻击速度
    this.damage = damage;
    this.capacity = capacity;
    this.cspeed = cspeed;//换子弹速度
    this.name = name;
    this.sound = sound;

    this.fire = function (x, y, drct) {
        playSound(this.sound);
        this.bullet.x = x + drct.x * hero.main.r;
        this.bullet.y = y + drct.y * hero.main.r;

        var ndrct = deepClone(drct);


        var mbullet = getBulletEntry(deepCloneThing(this.bullet), this.fspeed, this.ftime, this.damage, drct);
        bulletBox.push(mbullet);
    };
    if (fire != null){
        this.fire = fire;
        //console.log(this.fire);
    }

}

function deepCloneWeapon(wea) {
    return new Weapon(deepCloneThing(wea.bullet), wea.fspeed, wea.ftime, wea.aspeed, wea.damage, wea.capacity, wea.cspeed, wea.name, wea.sound, wea.fire);
}

function Bullet(bullet, fspeed, ftime, damage, drct) {
    this.bullet = bullet;
    this.fspeed = fspeed;
    this.ftime = ftime;
    this.damage = damage;
    this.drct = drct;
    this.ntime = 0;
    this.hit = false;

    this.fly = function () {
        this.bullet.x = this.bullet.x + this.fspeed * this.drct.x;
        this.bullet.y = this.bullet.y + this.fspeed * this.drct.y;
        this.ntime = this.ntime + 1;
    }

    this.flyFinished = function () {
        if (this.ftime < this.ntime || this.hit) return true;
        else return false;
    }
}

function getBulletEntry(bullet, fspeed, ftime, damage, drct) {
    if (bulletPool.length == 0){
        return new Bullet(bullet, fspeed, ftime, damage, drct);
    }
    else{
        var b = bulletPool.pop();
        b.bullet = bullet;
        b.fspeed = fspeed;
        b.ftime = ftime;
        b.damage = damage;
        b.drct = drct;
        b.ntime = 0;
        b.hit = false;

        return b;
    }
}

function refreshBulletBox() {
    var changed = false;

    for (var id in bulletBox) {
        //console.log(id, bulletBox.length, bulletBox[id]);
        if (bulletBox[id].flyFinished() == true){
            var bullet = bulletBox.splice(id, 1)[0];
            bulletPool.push(bullet);
            changed = true;
            break;
        }
    }
    return changed;
    //console.log("refresh", bulletBox);
    //console.log(bulletPool);
}

function bulletInit() {
    while (bulletBox.length != 0){
        var bullet = bulletBox.pop();
        bulletPool.push(bullet);
    }
}