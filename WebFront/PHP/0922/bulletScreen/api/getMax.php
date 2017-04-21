<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/22
 * Time: 10:44
 */
//dota_massege
include_once "initial.Connection..php";
mysql_select_db("comment_database");

$mid = mysql_query("select max(id) as mid from bulletScreen");

mysql_close();

$max = mysql_fetch_assoc($mid);

echo json_encode($max["mid"]);