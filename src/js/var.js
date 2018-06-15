/**
PREDEF
 */

var WIDTH = 1350, HEIGHT = 640;
var PI = 3.141592654;

var gameWidth = 1200, gameHeight = 500;
var gameShiftWidth = 75, gameShiftHeight = 40;

//整个界面背景
var frameOutRecObj = {
    x : null,
    y : null,
    w : null,
    h : null,
    lineWidth : 0,
    strokeColor : "#000000",
    fillColor : "#000000"
};

//游戏界面背景
var frameInnRecObj = {
    x : gameShiftWidth,
    y : gameShiftHeight,
    w : gameWidth,
    h : gameHeight,
    lineWidth : 0,
    strokeColor : "#FFFFFF",
    fillColor : "#FFFFFF"
};

//弹夹中子弹
var clipShiftHeight = 15;
var clipBaseHeight  = 530;
var frameClipBulletRecObj = {
    x : 5,
    y : null,
    w : 65,
    h : 10,
    lineWidth : 0,
    strokeColor : "#FFFFFF",
    fillColor : "#CC0033"
};
var frameClipLeftWordsObj = {
    x : 5,
    y : null,
    text : "BULLET",
    font : "13px italic arial sans-serif",
    align : "start",
    color : "#FFFFFF"
};

//单个生命值
var HPShiftHeight = 40;
var HPBaseHeight = 510;
var frameHPHearCirObj = {
    x : 1313,
    y : null,
    r : 30,
    lineWidth : 0,
    strokeColor : "#CC0033",
    fillColor : "#CC0033"
};
var frameHPLeftWordsObj = {
    x : 1313,
    y : null,
    text : "HP",
    font : "18px italic arial sans-serif",
    align : "center",
    color : "#FFFFFF"
};

//武器库
var weaponListShiftHeight = 580;
var weaponListBaseWidth = 75;
var weaponListShiftWidth = 130;
var frameWeaponListRecObj = {
    x : null,
    y : 580,
    w : 120,
    h : 40,
    lineWidth : 0,
    strokeColor : "#FFFFFF",
    fillColor : null
};
var frameWeaponListTextObj = {
    x : null,
    y : 605,
    text : null,
    font : "14px italic arial sans-serif",
    align : "center",
    color : "#000000"
};

//Log
var frameLogTextObj = {
    x : 1340,
    y : 20,
    text : "no log now",
    font : "18px italic arial sans-serif",
    align : "end",
    color : "#FFFFFF"
};

//英雄位置
var frameHeroPosiTextObj = {
    x : 10,
    y : 20,
    text : "",
    font : "18px italic arial sans-serif",
    align : "start",
    color : "#FFFFFF"
};
frameCount = 0;

/**
MAP
 */

//MAP 地图信息
var MAP_WIDTH = 10000, MAP_HEIGHT = 10000;


//地图线
var lineHorInterval = 200;
var lineVerInterval = 200;
var lineObj = {
    x0 : null,
    y0 : null,
    x1 : null,
    y1 : null,
    lineWidth : 4,
    strokeColor : "#000000"
};


/**
CAMERA
 */

//视角信息，坐标为Scene的左上角坐标
var cameraX = 5000, cameraY = 5000;

var innerCameraWidth = 800, innerCameraHeight = 300;

var cameraSpeed = 5;


/**
CANVAS
 */
var canvas = document.getElementById("game");

canvas.height = HEIGHT; canvas.width = WIDTH;

var context = canvas.getContext("2d");

/**
GAME ARRAY
 */

//MAP LINE
var lineBox = [];

var heroRadius = 30;
var heroInitialHP = 8;
var hero = new Hero(new thing(5600, 5250, 30,
    {
        lineWidth : 4,
        strokeColor : "#FFFFFF",
        fillColor : "#99CC00"
    }
    ), 10);

var heroHPProtect = 200;
var heroNormalColor = "#99CC00";
var heroProtectedColor = "#4B4B4B";
var bulletBox = [];
var rewardBox = [];
var monsterBox = [];

/**
CONTROL
 */

//MOVE
var moveHor = 0, moveVer = 0;

//MOUSE
var mouseX = WIDTH, mouseY=HEIGHT;
var mouseXShift = 8, mouseYShift = 8;

/**
KEY_CODE
 */
var KEY_LEFT_ARROW = 37;
var KEY_UP_ARROW = 38;
var KEY_RIGHT_ARROW = 39;
var KEY_DOWN_ARROW = 40;
var KEY_ENTER = 13;

var KEY_W = 87;
var KEY_A = 65;
var KEY_S = 83;
var KEY_D = 68;
var KEY_Q = 81;
var KEY_E = 69;
var KEY_R = 82;

var KEY_SB = 32;//spacebar


//GAME SETTING
var framePeriod = 10;

/**
GAME_STATE
 */
var gameCount = 0;

var gameStop = false;

/**
POOL
 */
var bulletPool = [];
var rewardPool = [];
var monsterPool = [];



/**
WEAPON
 */
var pistolWeapon = new Weapon(new thing(0, 0, 10,
    {
        lineWidth : 1,
        strokeColor : "#000000",
        fillColor : "#003366"
    }
    ), 20, 10, 100, 1, 10, 200, "pistol");

var subMachineWeapon = new Weapon(new thing(0, 0, 14,
    {
        lineWidth : 1,
        strokeColor : "#000000",
        fillColor : "#CC3333"
    }
), 20, 10, 30, 1, 20, 500, "submachinae");

var cannonWeapon = new Weapon(new thing(0, 0, 20,
    {
        lineWidth : 1,
        strokeColor : "#000000",
        fillColor : "#009966"
    }
), 20, 10, 100, 5, 8, 500, "cannon");

var weaponList = [pistolWeapon, subMachineWeapon, cannonWeapon];

/**
REWARD
 */
var rewardGenerateRadius = 300;
var rewardRadius = 30;
var rewardGenerateTimePeriod = 20;

/**
MONSTER
 */
var monsterGenerateRadius = 800;

var monsterClass1 = {
    HP : 1,
    attr : {
        lineWidth : 1,
        strokeColor : "#000000",
        fillColor : "#0000CC"
    },
    speed : 14,
    score : 1,
    hatred : 800
};


var monsterClass2 = {
    HP : 2,
    attr : {
        lineWidth : 3,
        strokeColor : "#000000",
        fillColor : "#000099"
    },
    speed : 10,
    score : 2,
    hatred : 1200
};


var monsterClass3 = {
    HP : 3,
    attr : {
        lineWidth : 5,
        strokeColor : "#000000",
        fillColor : "#000066"
    },
    speed : 8,
    score : 3,
    hatred : 1600
};


var monsterClass4 = {
    HP : 4,
    attr : {
        lineWidth : 7,
        strokeColor : "#000000",
        fillColor : "#000033"
    },
    speed : 8,
    score : 4,
    hatred : 2000
};


var monsterClass5 = {
    HP : 5,
    attr : {
        lineWidth : 9,
        strokeColor : "#000000",
        fillColor : "#660000"
    },
    speed : 6,
    score : 5,
    hatred : 2400
};

var monsterClassList = [monsterClass1, monsterClass2, monsterClass3, monsterClass4, monsterClass5];
var monsterProb = [0.2, 0.2, 0.2, 0.2, 0.2];
var monsterGenerateTimePeriod = 400;





