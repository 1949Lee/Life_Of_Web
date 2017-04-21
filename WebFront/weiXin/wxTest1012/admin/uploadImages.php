<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/10/12
 * Time: 18:51
 */
require_once "initConnection.php";
session_start();
if ($db) {
    mysql_select_db(SAE_MYSQL_DB, $db);
    //插入一条数据
    $location = "保密位置";
    if($_GET["location"]!=""&&$_GET["location"]!="未公开"){
        $location = $_GET["location"];
    }
    $sql = "insert into uploadPic (serverid,addTime,location,upCount,userID) values ('" . $_GET["sid"] . "','".$_GET['dateTime']."','".$location ."',0,'".$_SESSION["userId"]."')";
    $res = mysql_query($sql);
    if ($res) {

        //从微信服务器下载到本地服务器
        $url = "http://lee0811.applinzi.com/wxTest1012/admin/moveToThirdServer.php?mid=" . $_GET["sid"];
        $res = httpGet($url);
        if ($res == "ok")
            echo "ok";
    }
}
mysql_close($db);
function httpGet($url)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    // 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
    // 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
    curl_setopt($curl, CURLOPT_URL, $url);

    $res = curl_exec($curl);
    curl_close($curl);

    return $res;
}

?>