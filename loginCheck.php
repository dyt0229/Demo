<?php
    header("content-type:text/html;charset=utf-8");
    //接收前端数据库
    $vipid=$_POST['vipid'];
    $vippass=$_POST['vippass'];
    //处理（判断、保存）（增删改查）
    //连接数据库服务器
    $conn=mysql_connect("localhost","root","root");
    if(!$conn){
        echo "连接数据库失败！";
    }else{
        //选择数据库
        mysql_select_db("mydata",$conn);

        //执行sql语句
        $sqlstr="select * from vip where vipid='$vipid' and vippass='$vippass'";
        $result=mysql_query($sqlstr,$conn);
        //关闭数据库
            mysql_close($conn);

        if(mysql_num_rows($result)==0){
            //响应
            echo "登录失败，请重新<a href='login.html'>登录</a>";;
            
        }else{
            echo "登录成功，请跳转至<a href='index.html'>index.html</a>";
        }
    }
?>