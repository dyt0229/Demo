
//输出自己的日期格式
//把日期转换为字符串如 2018-11-3  2018/11/3 2018-11-3
//参数：d1,必须的参数
//分隔符 sep 可选，如果没有传入该参数，就以汉字分割，如果传入，就以改分割符连接
function toDateString(d1,sep){
    if(sep==undefined){
        return d1.getFullYear()+"年"+d1.getMonth()+"月"+d1.getDate()+"日";
    }else{
        return d1.getFullYear()+sep+d1.getMonth()+sep+d1.getDate();
    }
}
//输出自己的日期时间格式
//如：2018-11-4 14:15:12   2018/11/3 14:15:12   2018年11月3日 下午 2:45:12
//参数：d1,必须的参数
//分隔符 sep 可选，如果没有传入该参数，就以汉字分割，如果传入，就以该分割符连接
function toDateTimeString(d1,sep){
    var str=d1.toDateString(d1,sep);
    if(sep==undefined){
        if(d1.getHours()<=12){
            str+="上午";
        }else{
            str+="下午";
        }
        str+=" "+d1.getHours()<=12?d1.getHours():d1.getHours()-12;
        str+=":"+d1.getMinutes()+":"+d1.getSeconds();
    }else{
        str+=" "+d1.getHours()+":"+d1.getMinutes()+":"+d1.getSeconds();
    }
    return str;
}