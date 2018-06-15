function testAbs() {
    var attr = {
        lineWidth : 4,
        strokeColor : "#666699",
        fillColor : "#009999"
    };
    var hero = new thing(10, 10, 5, attr);
    console.log(hero.getObj());
}


function testFrame() {
    drawFrame();
    drawClip(10);
    drawHP(5);
}



function testDraw() {
    var cirObj = {
        x : -1,
        y : -1,
        r : 30,
        lineWidth : 4,
        strokeColor : "#333300",
        fillColor : "#666666"
    };

    var recObj = {
        x : 0,
        y : 0,
        w : WIDTH,
        h : HEIGHT,
        lineWidth : 0,
        strokeColor : "#000000",
        fillColor : "#000000"
    };

    var wordsObj = {
        x : 50,
        y : 50,
        text : "hello world",
        font : "font:italic arial,14px,sans-serif",
        align : "center",
        color : "#FFFFFF"
    };

    var lineObj = {
        x0 : 100,
        y0 : 100,
        x1 : 1000,
        y1 : 1200,
        lineWidth : 5,
        strokeColor : "#FFFFFF"
    };

    drawRect(recObj);
    drawCircle(cirObj);
    drawWords(wordsObj);
    drawLine(lineObj);

    console.log("cl", checkContainedLine(lineObj));
}