<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/13
 * Time: 19:11
 */
$count = "";
$result = "";
if (isset($_POST["count"])) {
    $count = $_POST["count"];
    $i = 1;
    while($i <= $count){
        $result = $result."<br>";
        $j = 0;
        while($j < ($i*2-1)){
            $result = $result."*";
            $j++;
        }
        $i++;
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
        <input type="text" placeholder="请输入图形层数:如：1" name="count" value=<?php echo $count; ?>>
        <br><br>
        <input type="submit" value="确定">
        <br><?php echo $result; ?>
    </form>
</div>

</body>
</html>
