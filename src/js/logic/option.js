function Option(main, text, type) {
    this.main = main;
    this.textObj = {
        x : main.x,
        y : main.y,
        text : text,
        font : "bold 18px italic arial sans-serif",
        align : "center",
        color : "#0099CC"
    };
    this.opType = type;
    this.isOn = true;
    this.refreshTextPosi = function () {
        this.textObj.x = main.x;
        this.textObj.y = main.y + 5;
    }
}

function refreshOptionPosi() {
    newGameOption.main.x = hero.main.x - 100;
    newGameOption.main.y = hero.main.y - 100;
    newGameOption.refreshTextPosi();

    continueGameOption.main.x = hero.main.x + 100;
    continueGameOption.main.y = hero.main.y + 100;
    continueGameOption.refreshTextPosi();

    testGameOption.main.x = hero.main.x - 100;
    testGameOption.main.y = hero.main.y + 100;
    testGameOption.refreshTextPosi();
}