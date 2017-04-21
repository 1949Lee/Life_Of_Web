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
if (isset($_POST["userName"])) {
    if ($_POST["userName"] != "") {
        $_SESSION["userName"] = $_POST["userName"];
    }
}
if (isset($_POST["content"])) {
    if ($_POST["content"] != "") {
        saveComment();
        echo "<script>window.location.href = 'comment.php';</script>";
    }
}
refreshComment();
function saveComment()
{

    $content = $_POST["content"];
    date_default_timezone_set("Asia/Shanghai");
    $date = date("Y/n/j H:i:s");
    $userName = $_SESSION["userName"];
    if ($userName != "" && $content != "") {
        $commentLine = $date . $GLOBALS['partsSeparator'] . $userName . $GLOBALS['partsSeparator'] . $content . $GLOBALS['CommentSeparator'];
        echo $commentLine;

        $menuItemTxt = fopen($GLOBALS['menuItem'], "a");
        fwrite($menuItemTxt, $commentLine);
        clearstatcache();
        fclose($menuItemTxt);
    }
}

function refreshComment()
{
    date_default_timezone_set("Asia/Shanghai");
    $date = date("Y/n/j H:i:s");
    $userName = $_SESSION["userName"];
    $menuItemTxt = fopen($GLOBALS['menuItem'], "r");
    if (filesize($GLOBALS['menuItem']) != 0) {
        $comment = fread($menuItemTxt, filesize($GLOBALS['menuItem']));
        $comment = explode($GLOBALS['CommentSeparator'], $comment);
        $GLOBALS['commentAreaStr'] .= "<ul class=\"media-list\">";
        for ($i = 0; $i < count($comment) - 1; $i++) {
            $parts = explode($GLOBALS['partsSeparator'], $comment[$i]);
            $str = "<li class=\"media\">
    <a class=\"media-left\" href=\"#\">
      <span class=\"glyphicon glyphicon-user\">
      </span>
    </a>
    <div class=\"media-body\">
    <h3 class=\"media-heading\">$parts[1]<br><span>发表于$parts[0]</span>
    <div class='pull-right'>
    <a href='javascript:;'><span class='glyphicon glyphicon-thumbs-up'></span></a>
    <button class='btn btn-default btn-sm'>回复</button>
    </div>
    </h3>
    
      <div class=\"panel panel-default \">
            <!-- Default panel contents -->
            <div class=\"panel-body\">
            $parts[2]
            </div>
        </div>
    </div>
  </li>";
            $GLOBALS['commentAreaStr'] .= $str;
        }
        $GLOBALS['commentAreaStr'] .= "</ul>";
    }
    clearstatcache();
    fclose($menuItemTxt);
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <script src="bootstrap/jquery-1.12.3.min.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
    <style>
        .commentArea .media-list > li.media > a.media-left > span {
            font-size: 4rem;
        }
        .commentArea .media-list > li.media > .media-body > .media-heading > span{
            color:#0f0f0f;
            font-size: 1.5rem;
        }
        .commentArea .media-list > li.media > .media-body > .media-heading > div > a > span{
            color:#0f0f0f;
            font-size: 2rem;
        }
    </style>
</head>
<body>
<?php
saveMenuItem();
putNavBar(getMenuItem());
?>
<div class="row">
    <div class="col-sm-10 col-sm-offset-1">
        <div class="panel panel-default ">
            <!-- Default panel contents -->
            <div class="panel-heading">我要评论</div>
            <div class="panel-body">
                <form action="comment.php" method="post">
                    <div class="form-group">
                        <textarea name="content" id="" cols="30" rows="5" class="form-control"></textarea>
                    </div>
                    <div class="form-group pull-right">
                        <button type="submit" name="comment" class="btn btn-default">发表评论</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</div>
<div class="row">
    <div class="col-sm-offset-1 col-sm-10 commentArea">
        <?php echo $commentAreaStr; ?>
    </div>
</div>
<script>
    $(function () {
        $(".nav.navbar-nav>li").click(function () {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
        });
    })
</script>
</body>
</html>

