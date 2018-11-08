
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