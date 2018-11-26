<?php
    header("Content-type:text/html;charset=utf-8");
    //接收前端数据
    $sayer=$_POST['sayer'];
    $sendCont=$_POST['sendCont'];
    //连接服务器
    $conn=mysql_connect("localhost","root","root");
    if(!$conn){
        die("连接错误".mysql_error());
    }else{
        //选择数据库
        mysql_select_db("mydata",$conn);
        //运输数据，（执行SQL语句，传输数据）
        $data=date_create(null);
        $str=date_format($date,"Y-m-d");
        $sqlstr="insert into chat(sayer,cont) values('".$sayer."','".$sendCont."')";
        echo $sqlstr;
        mysql_query($sqlstr,$conn);
        mysql_close($conn);

    }
?>