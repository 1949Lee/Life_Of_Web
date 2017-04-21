<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/28
 * Time: 13:48
 */
header('Access-Control-Allow-Origin:*');


$con = mysql_connect("localhost","root","19491001");
mysql_select_db("angularjs_db");
mysql_query("set character set 'utf8'");
mysql_query("set names 'utf8'");
$res = mysql_query("select distinct language.id,language.language,language.time, type.name as type from language,type where language.typeID = type.id order by type.id");
$response = array();
$response["language"] = array();
while ($lan = mysql_fetch_assoc($res)){
    $response["language"][] = $lan;
}
$response["type"] = array();
$res = mysql_query("select distinct type.id,type.name,type.name as value from language,type where language.typeID = type.id order by type.id");
while ($type = mysql_fetch_assoc($res)){
    $response["type"][] = $type;
}
echo json_encode($response);

?>



