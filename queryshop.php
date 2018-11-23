<?php
    header("Content-type:text/html;charset:utf-8");
    //接收前端数据
    $queryContent=$_GET['txt'];

    //连接服务器
    $conn=mysql_connect("localhost","root","root");
    if(!$conn){
        die("连接数据库失败".mysql_error());
    }else{
        //选择数据库
        mysql_select_db("mydata",$conn);
        //执行SQL语句
        $sqlstr="select * from shop where shopname like '%$queryContent%'";
        $result=mysql_query($sqlstr,$conn);
        //关闭数据库
        $str="[";
        $query_row=mysql_fetch_array($result);//游标下移，拿出其中的某一行,返回值的拿到的行
        while($query_row){
            $str=$str.'{"shopid":"'.$query_row[0].'","shopname":"'.$query_row[1].'","shopaddress":"'.$query_row[2].'","shopphone":"'.$query_row[3].'"}';
            $query_row=mysql_fetch_array($result);
            if($query_row){
                $str=$str.",";
            }
        }
        $str=$str."]";
        echo $str;
    }
?>