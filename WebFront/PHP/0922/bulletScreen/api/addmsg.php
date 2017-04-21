<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/22
 * Time: 10:44
 */
include_once "initial.Connection..php";
mysql_select_db("comment_database");

if(isset($_POST["content"])&&$_POST["content"]!=""){
    $content = $_POST["content"];
    mysql_query("INSERT INTO bulletScreen (content) VALUES (  '".$content."');");
    $row = mysql_affected_rows();
    if($row>0){
        $res["result"] = 1;
        $res["msg"] = "ok!";
        echo json_encode($res);

    }else{
        $res["result"] = -1;
        $res["msg"] = "sorry!";
        echo json_encode($res);
    }
}else{
    $res["result"] = 0;
    $res["msg"] = "error";
    echo json_encode($res);
}
mysql_close();

