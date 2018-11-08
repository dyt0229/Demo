
//添加cookie
//参数：键，值，有效期（单位：天）
//返回值：无

function addCookie(key,value,dayCount,path){
    var d =new Date();
    d.setDate(d.getDate()+dayCount);

    var str=key+"="+escape(value)+";expires="+d.toGMTString();
    if(path!=undefined){
        str+=";path="+path;
    }
    document.cookie=str;
}

//获取cookie（根据键获取值）
//参数：键
//返回值：值

function getCookie(key){
    var str=unescape(document.cookie);
    //将字符串分割成数组
    var arr=str.split("; ");
    //遍历数组，查找键
    for(var i in arr){
        if(arr[i].indexOf(key+"=")==0){
            return arr[i].substring((key+"=").length);
        }
    }
    return null;
}

//删除cookie
//参数：键
//返回值：无

function removeCookie(key){
    addCookie(key,"",-1);
}