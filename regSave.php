<?php
    header("content-type:text/html;charset=utf-8");
    //接收前端数据库
    $vipid=$_POST['vipid'];
    $vipname=$_POST['vipname'];
    $vipsex=$_POST['vipsex'];
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
        $sqlstr="select * from vip where vipid='$vipid'";
        $rows=mysql_num_rows($sqlstr,$conn);
        if($rows==0){
            $sqlstr="insert into vip(vipid,vipname,vipsex,vippass) 
                values('$vipid','$vipname','$vipsex','$vippass')";
            $result=mysql_query($sqlstr,$conn);
            //关闭数据库
            mysql_close($conn);
            if($result==1){
                echo "注册成功，请<a href='login.html'>登录</a>";
            }else{
                echo "注册失败，请重新<a href='reg.html'>注册</a>";
            }
        }else{
            echo "用户名已存在，请<a href='login.html'>登录</a>";
        }
    }
?>