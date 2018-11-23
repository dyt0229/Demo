<?php
    header("Content-type:text/html;charset:utf-8");
    //接受前端数据
    $username=$_POST['username'];
    $userpass=$_POST['userpass'];
    //连接数据库服务器
    $conn=mysql_connect("localhost","root","root");
    if(!$conn){
        die("连接失败".mysql_error());
    }else{
        //选择数据库
        mysql_select_db("mydata",$conn);
        //执行SQL语句
        $sqlstr="select * from user01 where 
                 username='$username'and userpass='$userpass'";
        $result=mysql_query($sqlstr,$conn);
        //关闭数据库
        mysql_close($conn);
        if(mysql_num_rows($result)==0){
            echo "0";
        }else{
            echo "1";
        }
    }

?>