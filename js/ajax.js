
//封装ajax
//参数：请求方式，请求地址，请求参数，是否异步，回调函数
//返回值：？？？？

function ajax01(mehod,url,param,isAsync,func){
    //创建对象
    let xhr=new XMLHttpRequest();
    //设置请求参数
    let urlAndParam=url;
    if(mehod.toLowerCase()=="get"&&param!=""){
        urlAndParam+="?"+param;
    }
    xhr.open(method,urlAndParam,isAsync);
    //设置回调函数
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            func&&func(xhr.responseText);
        }
    }
    //发送请求
    if(method.toLowerCase()=="post"){
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(param);
    }
    xhr.send();
       
}
  

//封装ajax
//参数：对象
//返回值：

function ajax02(obj){
    //创建对象
    let xhr=new XMLHttpRequest();
    //设置请求参数
    let urlAndParam=obj.url;
    if(obj.mehod.toLowerCase()=="get"&&obj.param!=""){
        urlAndParam+="?"+obj.param;
    }
    xhr.open(obj.method,urlAndParam,obj.isAsync);
    //设置回调函数
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            obj.func&&obj.func(xhr.responseText);
        }
    }
    //发送请求
    if(obj.mehod.toLowerCase()=="post"){
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(obj.param);
    }else{
        xhr.send();
    }

}

function ajax03(obj){
    let defaultObj={
        "method":"get",
        "url":"#",
        "param":"",
        "isAsync":true,
        "func":null
    };
    for(let key in defaultObj){
        obj[key] && (defaultObj[key] =obj[key]);
    }
    //创建一个对象
    let xhr=new XMLHttpRequest();
    //设置请求参数
    let urlAndParam=defaultObj.url;
    if(defaultObj.method.toLowerCase()=="get"&&defaultObj.param!=""){
        urlAndParam+="?"+defaultObj.param;
    }
    xhr.open(defaultObj.method,urlAndParam,defaultObj.isAsync);
    //设置回调函数
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            defaultObj.func&&defaultObj.func(xhr.responseText);
        }
    }
    //发送请求
    if(defaultObj.method.toLowerCase()=="post"){
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(defautltObj.param);
    }else{
        xhr.send();
    }
}