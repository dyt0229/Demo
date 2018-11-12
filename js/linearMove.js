
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