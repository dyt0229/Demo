<?php
    header("Content-type:text/html;charset=utf-8");
    //接收前端数据
    $username=$_POST["username"];
    $usersex=$_POST["usersex"];
    $userpass=$_POST["userpass"];
   
    //连接服务器
    $conn=mysql_connect("localhost","root","root");
    if(!$conn){
        die("连接错误".mysql_error());
    }else{
        //选择数据库
        mysql_select_db("mydata",$conn);
 
        //查询名字是否存在
        $sqlstr="select * from user01 where username='$username'";
        $result=mysql_query($sqlstr,$conn);
        $rows=mysql_num_rows($result);
        
        if($rows<=0){  //如果不存在，插入
            $sqlstr1="insert into user01 (username,userpass,usersex)
                    values('$username','$userpass','$usersex')";
            $result1=mysql_query($sqlstr1,$conn);
            //关闭数据库
            // mysql_close($conn);
            if($result1==1){  //返回结果为1，表面插入成功
                echo "1";  //注册成功，跳转至登录页面
            }else{
                echo "0"; //注册失败
            }
        }else{
            echo "-1" ;//用户名已存在，重新注册
        }
    }
?>