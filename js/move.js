
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

//封装匀速运动（正反向都有）
//参数：
//DOM元素
//样式属性
//终止位置
//时长（总路程/速度=总路程/步长*时间间隔）

//推导：时长/时间间隔=总路程/步长
function linearMove4(domObj,attr,endValue,timeLong){
    let startValue=parseFloat(getStyle(domObj,attr));
    //假定时间间隔
    let timeSpace=10;
    //计算步长
    let step=Math.abs(endValue-startValue)/(timeLong/timeSpace);
    //给当前值赋值初始值
    let currValue=startValue;
    //方向
    let direction=endValue>startValue?1:-1;
    var myTimer=setInterval(function(){
        //改变数据
        currValue+=direction*step;
        //边界处理
        if((currValue-direction*step)-endValue<=step){
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
        // if(step<=5){
        //     step=5;
        // }
        currValue+=step;
        if(currValue>=endValue){
            currValue=endValue;
            window.clearInterval(myTimer);
        }
        //改变外观
        domObj.style[attr]=currValue+"px";
    },timeSpace);
}

//封装抛物线运动
//参数：
//DOM元素
//起始位置
//结束位置
//时间长度
     //开口方向（上下左右）

function parabola01(domObj,startPoint,endPoint,timeLong){
    //平移到原点
    let x=endPoint.x-startPoint.x;
    let y=endPoint.y-startPoint.y;

    let p=y*y/(2*x); //依赖于开口方向决定
    let left1=0;
    let top1=0;
    let direction=1; //依赖于起点和终点的位置，开口方向决定
    //假定时间间隔
    let timeSpace=10;
    //计算出步长
    let step=Math.abs(endPoint-startPoint)/(timeLong/timeSpace);  //依赖于开口方向决定

    var myTimer=setInterval(function(){
        //改变数据
        left1+=direction*step;
        //此处计算top值要考虑正负，因为开完根都是正数，top的正负方向和方向的正负刚好相反
        top1=Math.sqrt(2*p*left1);
        //处理边界
        if(left1>=(endPoint.x-startPoint.x)){
            left1=endPoint.x-startPoint.x;
            window.clearInterval(myTimer);
        }
        //改变外观
        domObj.style.left=left1+startPoint.x+"px";
        domObj.style.top = top1 + startPoint.y + "px";
    },timeSpace);
}

//封装抛物线运动
//参数：
//DOM元素
//起始位置
//终止位置
//时间长度
         //开口方向（上下左右）
//回调函数（当运动完成后要执行的代码）

function parabola02(domObj,startPoint,endPoint,timeLong,func){
    let x=endPoint.x-startPoint.x;
    let y=endPoint.y-startPoint.y;
    let p =y*y/(2*x);
    
    let left1=0;
    let top1=0;
    let direction=1;
    let timeSpace=10;
    let step=Math.abs(endPoint.x-startPoint.x)/(timeLong/timeSpace);

    var myTimer=setInterval(function(){
        //改变数据
        left1+=direction*step;
        top1=Maths.sqrt(2*p*left1);
        //边界处理
        if(left1>=(endPoint.x-startPoint.x)){
            left1=endPoint.x-startPoint.x;
            window.clearInterval(myTimer);
            func();
        }
        //改变外观
        domObj.style.left=left1+"px";
        domObj.style.top=top1+"px";
    },timeSpace);
}

//封装抛物线运动
//参数：
//DOM元素
//起始位置
//结束位置
//时间长度
// 开口方向（上下左右）
//回调函数（运动执行完后要执行的代码）

function parabola03(domObj,startPoint,endPoint,timeLong,openDirection,func){
    let x=endPoint.x-startPoint.x;
    let y=endPoint.y-startPoint.y;

    let p;
    switch (openDirection){
        case "左": P=Math.abs(y*y/(2*x)); break;
        case "上": P = Math.abs(x*x/(2*y)); break;
        case "右": P = Math.abs(y*y/(2*x)); break;
        case "下": P = Math.abs(x*x/(2*y)); break;
        default: P = Math.abs(y*y/(2*x)); break;
    }
    let left1=0;
    let top1=0;

    let direction;
    switch(openDirection){
        case "左": direction=-1;break;
        case "上": direction=-1;break;
        case "右": direction=1; break;
        case "下": direction=1;break;
        default:direction=1;break;
    }
    let timeSpace=10;
    let dis;
    switch(openDirection){
        case "左":;
        case "右":dis=startPoint.x-endPoint.x;break;
        case "上":;
        case "下":dis=startPoint.y-endPoint.y;break;
        default:dis=startPoint.x-endPoint.x;break;
    }
    let step=Math.abs(dis)/(timeLong/timeSpace);
    var myTimer=setInterval(function(){
        switch(openDirection){
            case "左":;
            case "右":{
                //纵向的方向
                let VDirection=endPoint.x>startPoint.x?1:-1;
                left1+=direction*step;
                top1=VDirection*Math.sqrt(2*p*Math.abs(left1));
                break;
            }
            case "上":;
            case "下":{
                //横向的方向
                let HDirection=endPoint.y-startPoint.y?1:-1;
                top1+=direction*step;
                left1+=HDirection*Math.sqrt(2*p*Math.abs(top1));
                break;
            }
            default:{
                //纵向的方向
                let VDirection = endPoint.x > startPoint.x ? 1 : -1;
                left1 += direction * step;
                top1 = VDirection * Math.sqrt(2 * p * Math.abs(left1));
                break;
            }
        }
        //边界处理
        let isOver=false;
        switch(openDirection){
            case "左":if(left1<=endPoint.x-startPoint.x){
                left1=endPoint.x-startPoint.x;
                isOver=true;
            }
            break;
            case "右":if(left1>=endPoint.x-startPoint.x){
                left1=endPoint.x-startPoint.x;
                isOver=true;
            }
            break;
            case "上":if(top1<=endPoint.y-startPoint.y){
                top1=endPoint.y-startPoint.y;
                isOver=true;
            }
            break;
            case "下":if(top1>endPoint.y-startPoint.y){
                top1=endPoint.y-startPoint.y;
                isOver=true;
            }
            break;
            default: if (left1 >= endPoint.x - startPoint.x) {
                left1 = endPoint.x - startPoint.x;
                isOver = true;
            }
                break;
        }
        if(isOver){
            window.clearInterval(myTimer);
            func();
        }
        //改变外观
        domObj.style.left=left1+"px";
        domObj.style.top=top1+"px";
    },timeSpace);
}

//多属性运动的封装
//参数：
//DOM元素
//json对象（样式属性名和终止值组成的键值对） 
//时长（总路程/速度=总路程/步长*时间间隔）
//回调函数

//推导：时长/时间间隔=总路程/步长
/* 
animate($("#box"),{
    "left":300,
    "top":500,
    "width":200
},3000)
*/
function animate(domObj,attrObj,timeLong,func){
    let startObj={};
    for(let key in attrObj){
        startObj[key]=parseFloat(getStyle(domObj,key));
    }
    let timeSpace=10;
    let stepObj={};
    for(let key in attrObj){
        stepObj[key]=Math.abs(attrObj[key]-startObj[key])/(timeLong/timeSpace);
    }
    let currObj={};
    for(let key in attrObj){
        currObj[key]=startObj[key];
    }
    let directionObj={};
    for(let key in attrObj){
        directionObj[key]=attrObj[key]-startObj[key]?1:-1;
    }
    var myTimer=setInterval(function(){
        //改变数据
        for(let key in currObj){
            currObj[key]+=directionObj[key]*stepObj[key];
        }
        //边界处理
        let isOver=false;
        for(let key in currObj){
            if((Math.abs(currObj[key]-directionObj[key]*stepObj[key])-attrObj[key])<=stepObj[key]){
                currObj[key]=attrObj[key];
                isOver=true;
            }
        }
        if(isOver){
            window.clearInterval(myTimer);
            func&&func();
        }
        //改变外观
        for(let key in currObj){
            if(key=="opacity"){
                domObj.style[key]=currObj[key];
            }else{
                domObj.style[key]=currObj[key]+"px";
            }
        }
    },timeSpace);
}

//淡入
//参数
//DOM元素
//时长
function fadeIn(domOj,timeLong){
    linearMove3(domObj,"opacity",0,1,timeLong);
}

//淡出
//参数
//DOM元素
//时长
function fadeOut(domObj,timeLong){
    linearMove3(domObj,"opacity",1,0,timeLong);
}

//两张图片的淡入和淡出
function fadeInOut(outDomObj,inDomObj,timeLong){
    //假定时间间隔
    let timeSpace=10;
    //计算步长
    let step=1/(timeLong/timeSpace);
    //给当前值赋值为初始值
    let currOpacity=0;
    //方向（针对此功能不考虑）
    var myTimer=setInterval(function(){
        //改变数据
        currOpacity+=step;
        //边界处理
        if(currOpacity>=1){
            currOpacity=1;
            window.clearInterval(myTimer);
        }
        //改变外观
        inDomObj.style.opacity=currOpacity;
        outDomObj.style.opacity=1-currOpacity;
    },timeSpace);
}