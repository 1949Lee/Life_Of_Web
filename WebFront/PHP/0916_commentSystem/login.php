<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/15
 * Time: 16:19
 */
session_start();
if (isset($_POST["userName"]) && isset($_POST["password"])) {
    if ($_POST["userName"] != "" && $_POST["password"] != "") {
        $_SESSION["userName"] = $_POST['userName'];
        $_SESSION["password"] = $_POST['password'];
        $con = mysqli_connect("localhost", "root", "19491001");
        mysqli_query($con, "set character set 'utf8'");
        mysqli_query($con, "set names 'utf8'");
        mysqli_select_db($con, "comment_database");
        $res = mysqli_query($con,
            "select * from userInfo where userName='$_SESSION[userName]' and password='$_SESSION[password]';");
        if (mysqli_num_rows($res)) {
            $userID = mysqli_fetch_assoc($res);
            $_SESSION['userID'] = $userID['ID'];
            header('Location:comment.html');
//        echo "<script>window.location.href = 'systemIndex.html';</script>";
        } else {
            echo "错误";
        }

    }
}
?>
