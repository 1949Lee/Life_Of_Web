<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/12
 * Time: 19:50
 */
$userName = $_POST["userName"];
$password = $_POST["password"];
if($userName = "lijiaxuan"&&$password == "123"){
    echo("欢迎登录");
}
else{
    echo("用户名或密码错误");
}