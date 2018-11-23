
//功能：获取某个DOM元素的样式属性的兼容性写法
//参数：DOM元素，样式属性名
//返回值：样式属性的值

function getStyle(domObj,attr){
    if (domObj.currentStyle) {
        return domObj.currentStyle[attr];  //当对象的属性名是变量时，用方括号二不能用点
    }else{
        return window.getComputedStyle(domObj)[attr];
    }
}

//封装获取DOM元素
//参数：DOM元素的类名(id,class,tag)
//返回值：获取到的DOM元素

function $(str){
    if(str.charAt(0)=="#"){
        return document.getElementById(str.substring(1));
    }else if(str.charAt(0)=="."){
        return document.getElementsByClassName(str.substring(1));
    }else{
        return document.getElementsByTagName(str);
    }
}

//获取随机颜色
//参数：无
//返回值：随机颜色
function getColor(){
    let str="#";
    for(let i=0;i<6;i++){
        str+=parseInt(Math.random()*16).toString(16);
    }
    return str;
}

//动态创建标签
//参数：要创建的标签名
//返回值：创建的对象
function $create(tagname) {
    return document.createElement(tagname);
}