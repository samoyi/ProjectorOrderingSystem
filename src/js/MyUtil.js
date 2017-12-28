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

// 若干个点均匀分布在圆环上，得出每个点相对于圆心的坐标
/**
 * @param nRadius     {integer}  半径像素值
 * @param nAmount     {integer} 用几个点将圆环均分
 * @param nInitRadian {integer} 第一个点的弧度制，默认为0，3点钟方向，逆时针为正方向
 */
function coordinatesOnRing(nRadius, nAmount, nInitRadian=0){
    const nRadianInterval = Math.PI*2/nAmount;
    let nRadian = 0,
        aCoordinate = [];
    if(nInitRadian<0){nInitRadian+=Math.PI*2}
    for(let i=0; i<nAmount; i++){
        nRadian = (i*nRadianInterval+nInitRadian)%(Math.PI*2);
        aCoordinate.push([Math.round(Math.cos(nRadian)*nRadius),
                        Math.round(-Math.sin(nRadian)*nRadius)]);
    }
    return aCoordinate;
}

// 和coordinatesOnRing一样，只不过返回弧度值
function radiansOnRing(nRadius, nAmount, nInitRadian=0){
    const nRadianInterval = Math.PI*2/nAmount;
    let nRadian = 0,
        aRadian = [];

    if(nInitRadian<0){nInitRadian+=Math.PI*2}
    for(let i=0; i<nAmount; i++){
        nRadian = (i*nRadianInterval+nInitRadian)%(Math.PI*2);
        aRadian.push(nRadian);
    }
    return aRadian;
}

module.exports = {
    findAsciiIndexes,
    coordinatesOnRing,
    radiansOnRing,
};
