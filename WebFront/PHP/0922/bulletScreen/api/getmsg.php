<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/22
 * Time: 10:44
 */
include_once "initial.Connection..php";


if(isset($_POST["mid"])){
    mysql_select_db("comment_database");
    $nowid =$_POST["mid"];
    $msg = mysql_query("select * from bulletScreen WHERE id>".$nowid);
    $data= array();
    while ($row = mysql_fetch_assoc($msg)){
        $data[] = $row;
    }
    mysql_close();
    echo json_encode($data);

}else{
    $res["msg"] = "error";
    echo json_encode($res);
}
