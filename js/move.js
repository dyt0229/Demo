
//匀速运动（正向）
//参数：DOM元素，样式属性，起始位置，终止位置，步长，时间间隔

function linearMove1(domObj,attr,startValue,endValue,step,timeSpace){
    let currValue=startValue;
    var myTimer=setInterval(function(){
        //处理数据
        currValue+=step;
        //处理边界
        if(currValue>=endValue){
            currValue=endValue;
            window.clearInterval(myTimer);
        }
        //改变外观
        domObj.style[attr]=currValue+"px";
    },timeSpace);
}

//匀速运动（正向）
//参数：DOM元素，样式属性，起始位置，终止位置，时长

function linearMove2(domObj,attr,startValue,endValue,timeLong){
    //假定时间间隔
    let timeSpace=10;
    //计算步长
    let step=(endValue-startValue)/(timeLong/timeSpace);
    //给当前值赋值为初始值
    let currValue=startValue;
    var myTimer=setInterval(function(){
        //处理数据
        currValue+=step;
        //处理边界
        if(currValue>=endValue){
            currValue=endValue;
            window.clearInterval(myTimer);
        }
        //改变外观
        domObj.style[attr]=currValue+"px";
    },timeSpace);
}

//匀速运动（正反向都有）
//参数：
//DOM元素、
//样式属性、
//起始位置、
//终止位置、
//时长
//推导出步长=(终止位置-起始位置)/（时长/时间间隔）

function linearMove3(domObj,attr,startValue,endValue,timeLong){
    //假定时间间隔
    let timeSpace=10;
    //计算步长
    let step=(endValue-startValue)/(timeLong/timeSpace);
    //给当前值赋值
    let currValue=startValue;
    //方向
    let direction=startValue<endValue?1:-1;
    var myTimer=setInterval(function(){
        //处理数据
        currValue+=direction*step;
        //处理边界
        if(Math.abs((currValue-direction*step)-endValue)<=step){
            currValue=endValue;
            window.clearInterval(myTimer);
        }
        //改变外观
        if(attr=="opacity"){
            domObj.style[attr]=currValue;
        }else{
            domObj.style[attr]=currValue+"px";
        }
    },timeSpace);
    
}

//封装加速运动（改变时间间隔来加速） ====封装失败
//参数
//DOM元素
//样式属性
//起始位置
//终止位置
//起始时间间隔
//终止时间间隔
/*
function accelerateMove(domObj,attr,startValue,endValue,startTimeSpace,endTimeSpace){
    let step=10;
    let currValue=startValue;
    var currTimeSpace=startTimeSpace;
    //变多少次
    let count=(endValue-startValue)/step;
    let timeSpaceInc=(startTimeSpace-endTimeSpace)/count;
    var myTimer=null;
    function goStep(){
        //改变数据
        currTimeSpace-=timeSpaceInc;
        currValue+=step;

        var isExit=false;
        //处理边界
        if(currValue>=endValue){
            currValue=endValue;
            window.clearTimeout(myTimer);
            isExit=true;
        }
        //改变外观
        domObj.style[attr]=currValue+"px";
        if(isExit){
            return;
        }
        myTimer=setTimeOut(goStep, currTimeSpace)
    }
}
*/

//封装加速运动（改变步长来加速） 
//参数
//DOM元素
//样式属性
//起始位置
//终止位置
//起始步长
//步长每次变化长度（决定加速大小）
//时间间隔
function accelerateMove(domObj,attr,startValue,endValue,startStep,stepSpeed,timeSpace){
    let step=startStep;
    let currValue=startValue;

    // let direction = startValue < endValue ? 1 : -1;
    var myTimer=setInterval(function(){
        step+=stepSpeed;
        if(step<=5){
            step=5;
        }
        currValue+=step;
        if(currValue>=endValue){
            currValue=endValue;
            window.clearInterval(myTimer);
        }
        //改变外观
        domObj.style[attr]=currValue+"px";
    },timeSpace);
}