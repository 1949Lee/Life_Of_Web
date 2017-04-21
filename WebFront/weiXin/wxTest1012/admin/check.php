<meta charset="utf-8">
<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/10/14
 * Time: 10:42
 */
require_once "initConnection.php";
session_start();

//当用户授权以后微信服务器重定向到这个页面
//echo $_GET["code"];//得到微信服务器发送过来的code
//2.根据code 获取accessToken
$url="https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf8f68871deff74e5&secret=3e4a2e81266f2fa68d9f86d0514d9a0f&code=".$_GET["code"]."&grant_type=authorization_code";
$resinfo=httpGet($url);
//echo json_decode($resinfo)->access_token;
//echo $resinfo;
$tokeninfo=json_decode($resinfo)->access_token;
$openid=json_decode($resinfo)->openid;
////echo $tokeninfo;
////3。根据token获取头像和昵称
$url="https://api.weixin.qq.com/sns/userinfo?access_token=".$tokeninfo
    ."&openid=".$openid."&lang=zh_CN";
$res= httpGet($url);//得到了用户信息
//echo $res;
//实现登录逻辑
$user=json_decode($res);
$_SESSION["userId"]=$user->openid;
$_SESSION["userName"]=$user->nickname;
$_SESSION["userImg"]=$user->headimgurl;

//判断这个用户是否在数据库中
if ($db) {
    mysql_select_db(SAE_MYSQL_DB, $db);
    $sql = "select * from imgUser where userID='".$_SESSION["userId"]."';";
    $res=mysql_query($sql);
    if(!($user = mysql_fetch_assoc($res))){
        //插入一条数据
        $sql="insert into imgUser (userId,userName,userImg) values ('".$_SESSION["userId"]."','".$_SESSION["userName"]."','".$_SESSION["userImg"]."')";
        $res=mysql_query($sql);
//        echo $res;
    }
    else{
        echo 2;
    }
}
mysql_close($db);

header("Location:../client/main.php");


function httpGet($url) {
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