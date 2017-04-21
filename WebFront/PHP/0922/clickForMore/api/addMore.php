<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/22
 * Time: 9:23
 */
include_once "initial.Connection..php";

$nowpage = 1;
if(isset($_POST["nowpage"])){
    $nowpage=$_POST["nowpage"];
}
mysql_select_db("comment_database");
$menu = mysql_query("select * from simpleItem limit ".(($nowpage-1)*2).",2");
$data = array();
while ($row=mysql_fetch_assoc($menu)){
    $data[]=$row;
}
mysql_close();
echo json_encode($data);

