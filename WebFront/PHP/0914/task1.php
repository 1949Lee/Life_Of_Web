<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/14
 * Time: 13:49
 */
include "tools.php";
$grade = array(98,99,100,93,96,95,92,97,94,91);
echo var_dump($grade);
echo "<br>";
$max = $grade[0];
$min = $grade[0];
$sum = 0;
foreach($grade as $value){
    if($max < $value){
        $max = $value;
    }
    if($min > $value){
        $min = $value;
    }
    $sum += $value;
}
echo "最高分:".$max.";最低分:".$min .";平均分:".$sum/10;
echo "<br>";
rsort($grade,1);
echo "降序(从大到小):";
echo var_dump($grade);
echo "<br>";
sort($grade,1);
echo "升序(从小到大):";
echo var_dump($grade);
echo "<br>";
$grade2 = array(
    array(98,99,100,93,96,95,92,97,94,91),
    array(88,89,90,83,86,85,82,87,84,81),
    array(78,79,70,73,76,75,72,77,74,71)
);
echo "一班:<br>";
echo var_dump($grade2[0]);
echo "<br>";
echo "二班:<br>";
echo var_dump($grade2[1]);
echo "<br>";
echo "三班:<br>";
echo var_dump($grade2[2]);
echo "<br>";
//function putNavBar(){
//    echo "<nav class=\"navbar navbar-default\" role=\"navigation\">
//  <div class=\"container-fluid\">
//    <!-- Brand and toggle get grouped for better mobile display -->
//    <div class=\"navbar-header\">
//      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse-1\">
//        <span class=\"sr-only\">Toggle navigation</span>
//        <span class=\"icon-bar\"></span>
//        <span class=\"icon-bar\"></span>
//        <span class=\"icon-bar\"></span>
//      </button>
//    </div>
//
//    <!-- Collect the nav links, forms, and other content for toggling -->
//    <div class=\"collapse navbar-collapse\" id=\"navbar-collapse-1\">
//      <ul class=\"nav navbar-nav\">
//        <li class=\"active\"><a href=\"#\">首页</a></li>
//        <li><a href=\"#\">商品</a></li>
//        <li><a href=\"#\">购物车</a></li>
//        <li><a href=\"#\">登录</a></li>
//      </ul>
//    </div><!-- /.navbar-collapse -->
//  </div><!-- /.container-fluid -->
//</nav>";
//}


//function putTable($row,$col){
//    $table = "<table>";
//    for ($i = 0;$i < $row;$i++){
//        $table =$table."<tr>";
//        for ($j = 0;$j < $col;$j++){
//            $table = $table."<td>"."$i,$j"."</td>";
//        }
//        $table =$table."</tr>";
//    }
//    $table =$table."</table>";
//    echo $table;
//}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <link rel="stylesheet" href="../0916_commentSystem/bootstrap/css/bootstrap.min.css">
    <script src="../0916_commentSystem/bootstrap/jquery-1.12.3.min.js"></script>
    <script src="../0916_commentSystem/bootstrap/js/bootstrap.js"></script>
    <style>
        table,td{
            border:1px solid #2aabd2;
            border-radius: 5px;
            box-shadow: 0px 0px 10px 1px #2aabd2 ;
        }
        td{
            width:6rem;
            height:6rem;
            text-align: center;
        }
    </style>
</head>
<body>
<?php
putNavBar(array("首页","商品","购物车","个人中心","论坛"));
putTable(5,5);
?>
<br>
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