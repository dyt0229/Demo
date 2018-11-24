
//封装正则表达式
//参数：
//要验证的类型（如：邮箱，ip地址，身份证号等）
//要验证的字符串
//返回值：true / false

function checkExp(type,str) { 
    var regObj={
        "email":/^\w+@\w+\.(com|cn|net)$/i,
        "phone":/^1[3-9]\d{ 9}$/i,
        "vipname":/^[a-zA-Z]\w{5,17}$/gi,
        "cardId":/^\d{6}[12]\d{3}(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])\d{3}(\d|X)$/gi,
        "ip": /^([12]\d{3}\-(0[1 - 9] | 1[0 - 2]) \-(0[1 - 9] | [12]\d | 3[01])| [12]\d{3} \.(0[1 - 9] | 1[0 - 2]) \.(0[1 - 9] | [12]\d | 3[01])| [12]\d{3} \/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))$/g,
        "date":/^[12]\d{3}\-(0[1-9]|1[0-2])\-(0[1-9]|[12]\d|3[01])|[12]\d{3}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])|[12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/g,
        "postCode":/^\d{6}$/g,
        "username": /^[\u4e00-\u9fa5]{2,15}$/gi,
        "password":/\w{6,16}/g,
    };
    return regObj[type].test(str);
 }

 //密码函数的封装
//密码格式要求。（必须包含字母、数字、特殊字符，长度6个字符以上
//参数：提示信息框
//键盘keyup事件或input输入框失焦时调用触发
function checkPass01(dom,errorSpan) {

    var pass = dom.value;
    var arrEor = [];//记录错误的信息
    if (pass.length < 6) {
        arrEor.push("密码长度必须大于或者等于六位, ");
    }
    //字母
    hasLetter = false;
    for (var i = 0; i < pass.length; i++) {
        var code = pass.charCodeAt(i);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            hasLetter = true;
            break;
        }
    }
    if (hasLetter == false) {
        arrEor.push("密码中必须含有字母, ");

    }
    //数字
    var hasNum = false;
    for (var i = 0; i < pass.length; i++) {
        var code = pass.charCodeAt(i);
        if (code >= 48 && code <= 57) {
            hasNum = true;
            break;
        }
    }
    if (hasNum == false) {
        arrEor.push("密码中必须含有数字, ");

    }
    //特殊符号
    var hasSpe = false;
    var arr = ["!", "$", "&", "*", "#", "@", "%"];
    for (var i = 0; i < pass.length; i++) {
        var ch = pass.charAt(i);
        if (arr.indexOf(ch) > -1) {
            hasSpe = true;
            break;
        }
    }
    if (hasSpe == false) {
        arrEor.push("密码中必须含有特殊字符");

    }
    //输出
    if (arrEor.length == 0) {
        errorSpan.innerHTML = "√";
    }
    else {
        errorSpan.innerHTML = arrEor;
    }
} 

//密码强中弱封装
//密码格式要求。（6到16位，数字、字母。特殊符号只含一种为弱，两种为中，三种为强）
//参数：错误信息提示框
//调用时机：键盘keyup事件时调用触发
function  checkPass02(dom,weakSpan,midSpan,strongSpan,errorTxt){
    let pass=dom.value;
    // let weakSpan=document.createElement("span");
    // weakSpan.style.cssText="width:20px;height:20px;text-align:center;display:inline-block;";
    // weakSpan.innerHTML="弱";
    // weakSpan.style.backgroundColor="#ccc";
    // errorSpan.appendChild(weakSpan);

    // let midSpan = document.createElement("span");
    // midSpan.style.cssText = "width:20px;height:20px;text-align:center;display:inline-block;";
    // midSpan.innerHTML = "中";
    // midSpan.style.backgroundColor = "#ccc";
    // errorSpan.appendChild(midSpan);

    // let strongSpan = document.createElement("span");
    // strongSpan.style.cssText = "width:20px;height:20px;text-align:center;display:inline-block;";
    // strongSpan.innerHTML = "强";
    // strongSpan.style.backgroundColor = "#ccc";
    // errorSpan.appendChild(strongSpan);

    // let errorTxt=document.createElement("span");
    errorTxt.innerHTML="√";
    // errorSpan.appendChild(errorTxt);

    if(pass.length>=6&&pass.length<=16){
        //包含数字
        var hasNum=false;
        var regNum=/\d/;
        if(regNum.test(pass)){
            hasNum=true;
        }
        //包含字母
        var hasLetter=false;
        var regLetter=/[a-zA-Z]/gi;
        if(regLetter.test(pass)){
            hasLetter=true;
        }
        //包含特殊字符
        var hasSpec=false;
        var regSpec=/[!@#%&\$\*]/g;
        if(regSpec.test(pass)){
            hasSpec=true;
        }
        let level=hasNum+hasLetter+hasSpec;
        if(level==1){
            weakSpan.style.backgroundColor="red";
            midSpan.style.backgroundColor="#ccc";
            strongSpan.style.backgroundColor="#ccc";
        }else if(level==2){
            weakSpan.style.backgroundColor = "#ccc";
            midSpan.style.backgroundColor = "orange";
            strongSpan.style.backgroundColor = "#ccc";
        }else if(level==3){
            weakSpan.style.backgroundColor = "#ccc";
            midSpan.style.backgroundColor = "#ccc";
            strongSpan.style.backgroundColor = "green";
        }
    }else{
        errorTxt.innerHTML="×，亲，请输入6-16位的密码";
    }
}