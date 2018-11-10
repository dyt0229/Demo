
//封装正则表达式
//参数：
//要验证的类型（如：邮箱，ip地址，身份证号等）
//要验证的字符串
//返回值：true / false

function checkExp(type,str) { 
    var regObj={
        "email":/^[0-9a-zA-Z_]+@[0-9a-zA-Z_]+\.(com|cn|net)$/i,
        "phone":/^1[3-9]\d{9}$/i,
    };
    return regObj[type].test(str);
 }