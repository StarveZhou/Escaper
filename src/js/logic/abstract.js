function thing(x, y, r, attr){
    this.x = x;
    this.y = y;
    this.r = r;
    this.attr = attr;

    this.getMObj = function () {
        //console.log(this.attr);
        return {
            x : this.x,
            y : this.y,
            r : this.r,
            lineWidth : this.attr.lineWidth,
            strokeColor : this.attr.strokeColor,
            fillColor : this.attr.fillColor
        };
    }
}

function deepCloneThing(th) {
    return new thing(th.x, th.y, th.r, deepClone(th.attr));
}
