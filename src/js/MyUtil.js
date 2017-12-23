'use strict';

function findAsciiIndexes(str){
    let aStr = [...str],
        aIndex = [];
    aStr.filter((char,index)=>{
        if(char.codePointAt(0)<127){
            aIndex.push(index);
        }
    });
    return aIndex;
}


function DialAngle(x, y, r, curRotation=0){

    let startX = null, // touchstart X
        startY = null, // touchstart Y
        touchstartAngle = null, // angle value when touchstart
        lastAngle = 0, // angle value after the last touchmove
        moveEndAngle = 0, // angle value after a touchmove
        moveAngles = 0; // angles of rotation on every touchmove

     // returned by curDeg, for 'transform: rotateZ';
    let cssRotationValue = 0;

    // if a point is inside the circle
    function isInsideCircle(moveX, moveY){
        return moveX>=x-r && moveX<=x+r && moveY>=y-r && moveY<=y+r;
    }

    // calculate angle value of a given point
    function touchAngle(touchX, touchY){
        let arctan = Math.atan((touchY-y)/(touchX-x)),
            radian = Math.PI/2 + arctan + ((touchX<x)?Math.PI:0),
            angle = radian*180/Math.PI;
        return angle;
    }

    // input the coordinates of touchstart
    this.start = function(nStartX, nStartY, nNewAngle){
        if(isInsideCircle(nStartX, nStartY)){
            startX = nStartX,
            startY = nStartY;
            touchstartAngle = touchAngle(startX, startY);
            lastAngle = touchstartAngle;
            if(nNewAngle!==null) cssRotationValue = nNewAngle;
        }
        else{ // empty the last record
            startX = null;
            startY = null;
            touchstartAngle = null;
        }
    };

    // calculate dial rotation angle after a touchmove
    this.curDeg = function(moveX, moveY){
        if(touchstartAngle !==null){
            moveEndAngle = touchAngle(moveX, moveY);
            moveAngles = moveEndAngle - lastAngle;
            cssRotationValue += moveAngles;
            lastAngle = lastAngle + moveAngles;
            // console.log('c ' + cssRotationValue);
            return cssRotationValue + curRotation;
        }
    };
}

module.exports = {
    findAsciiIndexes,
    DialAngle,
};
