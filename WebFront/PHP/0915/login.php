<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/15
 * Time: 16:19
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <script src="bootstrap/jquery-1.12.3.min.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
</head>
<body>
<div class="container">
    <div class="row">

        <form class="form-horizontal" role="form" action="comment.php" method="post">
            <div class="form-group has-feedback">
                <label for="userName" class="col-sm-offset-3 col-sm-2 control-label">用户名</label>
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="userName" placeholder="请输入用户名"name="userName">
                    <span class="glyphicon  form-control-feedback"></span>
                </div>
            </div>
            <div class="form-group has-feedback">
                <label for="password" class="col-sm-offset-3 col-sm-2 control-label">密码</label>
                <div class="col-sm-2">
                    <input type="password" class="form-control" id="password" name="password" placeholder="请输入密码">
                    <span class="glyphicon  form-control-feedback"></span>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-5 col-sm-2">
                    <button type="submit" class="btn btn-default">登录</button>
                </div>
            </div>
        </form>
    </div>
</div>
<script>
    $(function () {
        $("#userName").blur(function(){
            if($(this).val() != ""){
                $(this).parent().parent().removeClass("has-error");
                $(this).parent().parent().addClass("has-success");
                $(this).parent().find("span").removeClass("glyphicon-remove");
                $(this).parent().find("span").addClass("glyphicon-ok");
            }
            else{
                $(this).parent().parent().removeClass("has-success");
                $(this).parent().parent().addClass("has-error");
                $(this).parent().find("span").removeClass("glyphicon-ok");
                $(this).parent().find("span").addClass("glyphicon-remove");
            }
        });
        $("#password").blur(function(){
            if($(this).val() != ""){
                $(this).parent().parent().removeClass("has-error");
                $(this).parent().parent().addClass("has-success");
                $(this).parent().find("span").removeClass("glyphicon-remove");
                $(this).parent().find("span").addClass("glyphicon-ok");
            }
            else{
                $(this).parent().parent().removeClass("has-success");
                $(this).parent().parent().addClass("has-error");
                $(this).parent().find("span").removeClass("glyphicon-ok");
                $(this).parent().find("span").addClass("glyphicon-remove");
            }
        });
    })
</script>
</body>
</html>