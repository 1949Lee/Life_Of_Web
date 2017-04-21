<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/13
 * Time: 13:52
 */
$score = "";
$result = "";
if(isset($_POST["score"])){
    $score = (integer)$_POST["score"];
    if($score >= 80){
        $result = "<label>你的分数为:".$score."<br>获得奖励钻戒一枚</label>";
    }
    else if($score >= 70){
        $result = "<label>你的分数为:".$score."<br>获得奖励别墅一栋</label>";
    }
    else if($score >= 60){
        $result = "<label>你的分数为:".$score."<br>获得奖励豪车一辆</label>";
    }
    else if($score < 60){
        $result = "<label>你的分数为:".$score."<br>获得奖励凤姐</label>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>分数判断</title>
</head>
<body>
<div style="width:500px;height: 300px;position:absolute;top:40%;left:40%">
    <form method="post">
        <input type="text" placeholder="请输入分数:如：100" name="score"value=<?php echo $score;?>><br><br>
        <input type="submit" value="获取奖励">
        <br><br><?php echo $result;?>
    </form>
</div>
</body>
</html>
