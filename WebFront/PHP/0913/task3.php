<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/13
 * Time: 13:52
 */
$password = "";
$result = "";
if(isset($_POST["password"])){
    $password = $_POST["password"];
    $rightPassword = "1001";
    $count = 0;
    if(strlen($password)!=4){
        $result = "<label>密码长度必须为四位</label>";
    }
    else{
        $count = similar_text($password,$rightPassword);
        if($count <4){
            $result = "<label>你只对了".$count."个数字，加油哦</label>";
        }
        else{
            $result = "<label>恭喜你！</label><br><img src='images/overwacth.jpg'>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>密码判断</title>
</head>
<body>
<div style="text-align: center">
    <form method="post">
        <input type="password" placeholder="请输入四位数字密码:如：1001"  name="password"value=<?php echo $password;?>>
        <br><br>
        <input type="submit" value="确定">
        <br><?php echo $result;?>
    </form>
</div>

</body>
</html>
