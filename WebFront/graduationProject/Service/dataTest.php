<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2017/6/22
 * Time: 16:35
 */
include_once 'initConnection.php';
function createGUID() {
    $charid = strtoupper(md5(uniqid(mt_rand(), true)));
    $hyphen = chr(45);// "-"
    $uuid = substr($charid, 0, 8).$hyphen
        .substr($charid, 8, 4).$hyphen
        .substr($charid,12, 4).$hyphen
        .substr($charid,16, 4).$hyphen
        .substr($charid,20,12);
    return $uuid;
}

function child(){
    $con = initCon();
    $arr = array(

    );
    $sql = "INSERT INTO children (childID, parentID, name, schoolID, schoolName, gradeID, classID) VALUES";
    $sql1 = "INSERT INTO users (userID, userStatus, loginID, password, name, corporation, email, onlineFlag) VALUES";
    $schoolID = createGUID();
    for($i = 0;$i < count($arr);$i++){
        $childID = createGUID();
        $parentID = createGUID();
        $phone = createPhone().substr($arr[$i][3], -8);
        $sql .=  "('".$childID."', '".$parentID."', '".$arr[$i][0]."', '".$schoolID."', '戬浜学校', ".$arr[$i][1].",  ".$arr[$i][2].")";
        $sql .=  ",";
        $sql1 .="('".$parentID."', '4', '".$phone."', '".substr($arr[$i][3], -6)."', '".$phone."',NULL,NULL, NULL)";
        $sql1 .=  ",";
    }
    $sql = substr($sql, 0, -1);
    $sql1 = substr($sql1, 0, -1);
    $sql .= ";";
    $sql1 .= ";";
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    if($resultSet = $con->query($sql)&&$resultSet1 = $con->query($sql1)){
        echo '829';
    }
    else{
        echo '100';
        echo $con->error;
    }
//    echo $sql1;
//    echo '<br>';
//    echo $sql;
    $con->close();
}

function createPhone(){
    $arr = array(
        130,131,132,133,134,135,136,137,138,139,
        144,147,
        150,151,152,153,155,156,157,158,159,
        176,177,178,
        180,181,182,183,184,185,186,187,188,189,
    );
    return $arr[array_rand($arr)];
}

function quiz(){
    $con = initCon();
    $quizID = '00ce5773-1f4f-3007-6d2b-170e90a2df46';
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    $sql = "SELECT childID FROM children WHERE name !='涂钰雯'";
    $childrenSet = $con->query($sql);
    $children = array();
    while($row = $childrenSet ->fetch_assoc()){
        $children[] = $row;
    }
    $sql = "SELECT a.askID,b.elementID FROM quiz_ask AS a,quiz_ask_elements AS b WHERE a.quizID = '00ce5773-1f4f-3007-6d2b-170e90a2df46' AND a.quizID = b.quizID AND a.askID = b.askID ORDER BY a.askIndex;";
    $quizDataInfoSet = $con->query($sql);
    $quizDataInfo = array();
    while($row = $quizDataInfoSet ->fetch_assoc()){
        $quizDataInfo[] = $row;
    }
    for($i = 0;$i < count($children);$i++) {
        $childQuizID = createGUID();
        $sql .= "INSERT INTO child_quiz (childQuizID, childID, quizID, updateDatetime, answerDatetime, writeStatus) VALUES
('" . $childQuizID . "', '" . $children[$i]['childID'] . "', '" . $quizID . "', '" . rand_time('2017-06-05 00:00:00', '2017-07-03 00:00:00') . "', NULL, '2');";
//        $sql="";
//        $con->query($sql);
        for ($j = 0; $j < count($quizDataInfo); $j++) {
            $value = getValue($j);
            $sql .= "INSERT INTO `quiz_data` (`recordID`, `childQuizID`, `askID`, `eleID`, `answerContent`, `statisticalValue`) VALUES
('" . createGUID() . "', '" . $childQuizID . "', '" . $quizDataInfo[$j]['askID'] . "', '" . $quizDataInfo[$j]['elementID'] . "', '" . $value[0] . "', '" . $value[1] . "');";
//            echo $sql . "<br>";
        }
    }

//
//    $sql = "s";
    if($resultSet = $con->multi_query($sql)){
        echo '829<br>';
    }
//    else{
//        echo '100';
//        echo $con->error;
//    }
//    echo $sql1;
//    echo '<br>';
    $con->close();
}

function getValue($i){
    $arr = array(
        [
            ['0.5小时以内','0.5-1小时','1-1.5小时','1.5-2小时','超过2小时','从不休息'],
            ['0.5小时以内','0.5-1小时','1-1.5小时','1.5-2小时','超过2小时','从不休息'],
            ['0.5小时以内','0.5-1小时','1-1.5小时','1.5-2小时','超过2小时','从不休息'],
            ['远眺休息眼睛','轻微活动休息眼睛','交替望远望近休息眼睛','做眼保健操休息眼睛','闭目休息眼睛','户外活动休息眼睛','看绿色植物休息眼睛'],
            ['少于10厘米','11-20厘米','21-30厘米','超过30厘米'],
            ['少于1米','1-2米','2-3米','超过3米'],
            ['少于15厘米','15-30厘米','31-50厘米','超过50厘米'],
            ['从不','偶尔','经常','总是'],
            ['从不','偶尔','经常','总是'],
            ['从不','偶尔','经常','总是'],
            ['从不','偶尔','经常','总是'],
            ['是','否','不清楚'],
        ],
        [
            ['0','1','2','3','4','5'],
            ['0','1','2','3','4','5'],
            ['0','1','2','3','4','5'],
            ['0','1','2','3','4','5','8'],
            ['0','1','2','3'],
            ['0','1','2','3'],
            ['0','1','2','3'],
            ['0','1','2','3'],
            ['0','1','2','3'],
            ['0','1','2','3'],
            ['0','1','2','3'],
            ['0','1','2'],
        ]
    );
    if($i == 3){
        $sum = rand(1,5);
        $r = array_rand($arr[1][$i],$sum);
        $value = array();
        $text = array();
        if(count($r) > 1){
            for($j = 0;$j < count($r);$j++){
                $value[] = $arr[1][$i][$r[$j]];
                $text[] = $arr[0][$i][$r[$j]];
            }
        }
        else{
            $value[] = $arr[1][$i][$r];
            $text[] = $arr[0][$i][$r];
        }
        return array(implode(',',$value),implode(',',$text));
    }
    else{
        $r = array_rand($arr[1][$i]);
        return array($arr[1][$i][$r],$arr[0][$i][$r]);
    }
}

function rand_time($start_time,$end_time){
    $start_time = strtotime($start_time);
    $end_time = strtotime($end_time);
    return date('Y-m-d H:i:s', mt_rand($start_time,$end_time));
}

quiz();