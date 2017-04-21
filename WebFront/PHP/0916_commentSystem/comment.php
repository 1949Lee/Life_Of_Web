<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/15
 * Time: 16:24
 */
$partsSeparator = "<|@#|>";
$CommentSeparator = "<|@PL#|>";
$menuItem = "Comment.txt";
$commentAreaStr = "";
include "header.php";
session_start();

/**
 * PHP生成JSON对象
 * $data['id'] = 1;
 * $dat['name'] = "mary";
 * $da['red']= array_merge($data,$dat);
 * $data1['id'] = 2;
 * $dat1['name'] = "燕子";
 * $da['blue']= array_merge($data1,$dat1);
 * print_r($da);///打印出来是一个二维数组（如下）
 *
 * /*
 * Array
 * (
 * [red] => Array
 * (
 * [id] => 1
 * [name] => mary
 * )
 * [blue] => Array
 * (
 * [id] => 2
 * [name] => 燕子
 * )
 * )echo json_encode($da);//输出的是一个转化成json格式的字符串，可以直接在js中用
 */

$response = array();//AJAX回应JSON对象
if (isset($_POST['init'])) {
    $response['navBar'] = putNavBar(array("首页", "商品", "购物车", $_SESSION["userName"]));
}
if (isset($_POST["content"])) {
    if ($_POST["content"] != "") {
        saveComment();
    }
}

function saveComment()
{
    $content = $_POST["content"];
    date_default_timezone_set("Asia/Shanghai");
    $date = date("Y-n-j H:i:s");
    $userName = $_SESSION["userName"];
    if ($userName != "" && $content != "") {
        $con = mysqli_connect("localhost","root",'19491001');
        mysqli_query($con,"set character set 'utf8'");
        mysqli_query($con,"set names 'utf8'");
        mysqli_select_db($con, "comment_database");
        $res = mysqli_query($con,
            "insert into comment (submitTime,commentContent,upCount,userID) values ('$date','$content',0,".(integer)$_SESSION['userID'].");");
        $GLOBALS['response']["content"] = $res;
    }

}

function refreshComment()
{
    date_default_timezone_set("Asia/Shanghai");
    $date = date("Y/n/j H:i:s");
    $userName = $_SESSION["userName"];
    $con = mysqli_connect("localhost","root","19491001");
    mysqli_query($con,"set character set 'utf8'");
    mysqli_query($con,"set names 'utf8'");
    mysqli_select_db($con,"comment_database");
    $res = mysqli_query($con,
        "select comment.ID,comment.userID,userInfo.userName,comment.submitTime,comment.commentContent,comment.upCount
from comment RIGHT JOIN userInfo on comment.userID = userInfo.ID
order by comment.submitTime");
    if(mysqli_num_rows($res)>0){
        $GLOBALS['response']['comments'] = array();
        while($data = mysqli_fetch_assoc($res)) {
            array_push($GLOBALS['response']['comments'],$data);
            }
    }
    else{
        $GLOBALS['response']['comments'] = null;
    }
}
if(isset($_POST["refresh"])){
    refreshComment();
}
echo json_encode($response);
?>


