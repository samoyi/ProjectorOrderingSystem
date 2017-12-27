'use strict';

/**
 * @param x            {int}   Abscissa of dial center
 * @param y            {int}   Ordinate of dial center
 * @param r            {int}   Pixel value of radius
 * @param curRotation  {int}   If the dial has been rotated beforen touch,
 *                               curRotation is the rotated angle value.
 */
function Rotation(x, y, r, curRotation=0){

    let startX = null, // touchstart X
        startY = null, // touchstart Y
        touchstartAngle = null, // angle value when touchstart
        lastAngle = 0, // angle value after the last touchmove
        moveEndAngle = 0, // angle value after a touchmove
        moveAngles = 0; // angles of rotation on every touchmove

     // returned by curDeg, for 'transform: rotateZ';
    let cssRotationValue = 0;

    // empty the last record
    window.addEventListener('touchend', ()=>{
        startX = null;
        startY = null;
        touchstartAngle = null;
    });

    // if a point is inside the circle
    function isInsideCircle(moveX, moveY){
        return moveX>=x-r && moveX<=x+r
               && (Math.sqrt((moveX-x)*(moveX-x) + (moveY-y)*(moveY-y))<=r);
    }

    // calculate angle value of a given point
    function touchAngle(touchX, touchY){
        let arctan = Math.atan((touchY-y)/(touchX-x)),
            radian = Math.PI/2 + arctan + ((touchX<x)?Math.PI:0),
            angle = radian*180/Math.PI;
        return angle;
    }

    // Input the coordinates of touchstart when toushstart
    /**
     * @param nNewAngle  {int}  If the angle of dial has changed after touchend,
     *                            the new angle value should be passed in the
     *                            next start.
     */
    this.start = function(nStartX, nStartY, nNewAngle){
        if(isInsideCircle(nStartX, nStartY)){
            startX = nStartX,
            startY = nStartY;
            touchstartAngle = touchAngle(startX, startY);
            lastAngle = touchstartAngle;
            if(nNewAngle || nNewAngle===0) cssRotationValue = nNewAngle;
        }
    };

    // Calculate dial rotation angle after a touchmove
    // Input the coordinates of touchstart
    // Returns angle value used by css transform:rotateZ
    this.curDeg = function(moveX, moveY){
        if(touchstartAngle !==null){
            moveEndAngle = touchAngle(moveX, moveY);
            moveAngles = moveEndAngle - lastAngle;
            cssRotationValue += moveAngles;
            lastAngle = lastAngle + moveAngles;
            return cssRotationValue + curRotation;
        }
    };

    // By default, the dial will stop at the end of the last touchmove.
    // You can call this method if you want the dial to be automatically
    // adjusted to the suitable position after the touch has ended.
    // If using this method, the next time you call start method, you should set
    //  nNewAngle to the adjusted angle value.
    /**
     * @param nEndAngle        {int}   Angle value after the last touchmove,
     *                                   returned by curDeg
     * @param nIconAmount      {int}   Pieces amount which the dial is divided
     *                                   into, valid value is 2, 3 or 4.
     * @return nSuitableAngle  {int}   Suitable angle value after adjustion.
     */
    this.adjust = function(nEndAngle, nIconAmount){
        let absMod = Math.abs(nEndAngle)%360,
            nSign = Math.sign(nEndAngle),
            nSuitableAngle = 0;

        if(nIconAmount===4){
            if(absMod>=0 && absMod<45){
                nSuitableAngle = 0;
            }
            else if(absMod>=315 && absMod<360){
                nSuitableAngle = nSign*360 ;
            }
            else if(absMod>=45 && absMod<135){
                nSuitableAngle = nSign*90;
            }
            else if(absMod>=135 && absMod<225){
                nSuitableAngle = nSign*180;
            }
            else{
                nSuitableAngle = nSign*270;
            }
        }
        else if(nIconAmount===3){
            if(absMod>=0 && absMod<60){
                nSuitableAngle = 0;
            }
            else if(absMod>=300 && absMod<360){
                nSuitableAngle = nSign*360;
            }
            else if(absMod>=60 && absMod<180){
                nSuitableAngle = nSign*120;
            }
            else{
                nSuitableAngle = nSign*240;
            }
        }
        else if(nIconAmount===2){
            const agl2rad = Math.PI/180;
            nSuitableAngle = Math.cos(nEndAngle*agl2rad)>0 ? 0 : nSign*180;
        }
        else{
            nSuitableAngle = nEndAngle;
        }

        return nSuitableAngle;
    };
}

module.exports = {
    Rotation,
};
