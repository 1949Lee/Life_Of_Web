<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/12
 * Time: 19:34
 */
$userName = $_GET["userName"];
$password = $_GET["password"];
if($userName == "lijiaxuan"&&$password == "123"){
    echo("欢迎登录");
}
else{
    echo("对不起，用户名或密码错误！");
}