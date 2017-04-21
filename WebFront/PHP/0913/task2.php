<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/13
 * Time: 13:49
 */
$result = "";
$birth = "";
if (isset($_POST["birth"])) {
    $birth = date_create_from_format("n.j", $_POST["birth"]);
    $mon = (integer)getdate(date_timestamp_get($birth))['mon'];
    $day = (integer)getdate(date_timestamp_get($birth))['mday'];
    switch ($mon) {
        case 1:
            if ($day >= 20) {
                $result = "<label>你是水瓶座</label><br><br><span><img src='images/水瓶.png'></span><br><br>";
            } else {
                $result = "<label>你是摩羯座</label><br><br><span><img src='images/摩羯.png'></span><br><br>";
            }
            break;
        case 2:
            if ($day >= 19) {
                $result = "<label>你是双鱼座</label><br><br><span><img src='images/双鱼.png'></span><br><br>";
            } else {
                $result = "<label>你是水瓶座</label><br><br><span><img src='images/水瓶.png'></span><br><br>";
            }
            break;
        case 3:
            if ($day >= 21) {
                $result = "<label>你是白羊座</label><br><br><span><img src='images/白羊.png'></span><br><br>";
            } else {
                $result = "<label>你是双鱼座</label><br><br><span><img src='images/双鱼.png'></span><br><br>";
            }
            break;
        case 4:
            if ($day >= 20) {
                $result = "<label>你是金牛座</label><br><br><span><img src='images/金牛.png'></span><br><br>";
            } else {
                $result = "<label>你是白羊座</label><br><br><span><img src='images/白羊.png'></span><br><br>";
            }
            break;
        case 5:
            if ($day >= 21) {
                $result = "<label>你是双子座</label><br><br><span><img src='images/双子.png'></span><br><br>";
            } else {
                $result = "<label>你是金牛座</label><br><br><span><img src='images/金牛.png'></span><br><br>";
            }
            break;
        case 6:
            if ($day >= 22) {
                $result = "<label>你是巨蟹座</label><br><br><span><img src='images/巨蟹.png'></span><br><br>";
            } else {
                $result = "<label>你是双子座</label><br><br><span><img src='images/双子.png'></span><br><br>";
            }
            break;
        case 7:
            if ($day >= 23) {
                $result = "<label>你是狮子座</label><br><br><span><img src='images/狮子.png'></span><br><br>";
            } else {
                $result = "<label>你是巨蟹座</label><br><br><span><img src='images/巨蟹.png'></span><br><br>";
            }
            break;
        case 8:
            if ($day >= 23) {
                $result = "<label>你是处女座</label><br><br><span><img src='images/处女.png'></span><br><br>";
            } else {
                $result = "<label>你是狮子座</label><br><br><span><img src='images/狮子.png'></span><br><br>";
            }
            break;
        case 9:
            if ($day >= 23) {
                $result = "<label>你是天秤座</label><br><br><span><img src='images/天秤.png'></span><br><br>";
            } else {
                $result = "<label>你是处女座</label><br><br><span><img src='images/处女.png'></span><br><br>";
            }
            break;
        case 10:
            if ($day >= 24) {
                $result = "<label>你是天蝎座</label><br><br><span><img src='images/天蝎.png'></span><br><br>";

            } else {
                $result = "<label>你是天秤座</label><br><br><span><img src='images/天秤.png'></span><br><br>";
            }
            break;
        case 11:
            if ($day >= 23) {
                $result = "<label>你是射手座</label><br><br><span><img src='images/射手.png'></span><br><br>";
            } else {
                $result = "<label>你是天蝎座</label><br><br><span><img src='images/天蝎.png'></span><br><br>";
            }
            break;
        case 12:
            if ($day >= 23) {
                $result = "<label>你是摩羯座</label><br><br><span><img src='images/摩羯.png'></span><br><br>";
            } else {
                $result = "<label>你是射手座</label><br><br><span><img src='images/射手.png'></span><br><br>";
            }
            break;
        default:
            $result = "<label>输入的生日不合法</label>";
    }
    $birth = $_POST["birth"];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>星座判断</title>
</head>
<body>
<div style="width:500px;height: 300px;position:absolute;top:40%;left:40%">
    <form method="post">
        <input type="text" placeholder="请输入生日:如：1.1(1月1日)" id="birth" name="birth"value=<?php echo $birth;?>><br><br>
        <input type="submit" value="显示我的星座">
        <br><br><?php echo $result;?>
    </form>
</div>
</body>
</html>
