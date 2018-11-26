<?php
    header("Content-type:text/html;charset=utf-8");
    //接收前端数据
    $musicname=$_GET['musicName'];
    //连接服务器
    $conn=mysql_connect("localhost","root","root");
    if(!$conn){
        echo ("连接错误".mysql_error());
    }else{
        //选择数据库
        mysql_select_db("mydata",$conn);
        //执行sql语句
        $sqlstr="select musicname from music ";
        if($musicname!=null){
            $sqlstr=$sqlstr."where musicname like '%".$musicname."%'";
        }else{
            $sqlstr=$sqlstr."where 1=0";
        }
        $result=mysql_query($sqlstr,$conn);
        //关闭数据库
        mysql_close($conn);
        $str="[";
        //游标下移，拿出这行的值
        $row=mysql_fetch_array($result);
        while($row){
            $str=$str.'{"musicname":"'.$row[0].'"}';
            $row=mysql_fetch_array($result);
            if($row){
                $str=$str.",";
            }
        }
        $str=$str."]";
        echo $str;
    }
?>