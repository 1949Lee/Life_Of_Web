<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2017/4/9
 * Time: 11:06
 */
//error_reporting(E_ALL^E_NOTICE);
$method = $_POST['method'];
if (!empty($_POST['urlClass'])) {
    $class = $_POST['urlClass'];
    unset($_POST['urlClass']);
    unset($_POST['method']);
    include_once "$class.php";
    $obj = new $class;
    $ret = call_user_func_array(array($obj, $method), $_POST);
} else {
    unset($_POST['method']);
    call_user_func($method, $_POST);
}
function checkVerificationCode()
{
    session_start();
    $param = func_get_args();
    $code = uniDecode($param[0]['code'], 'utf-8');
    $ses = iconv('gbk', 'utf-8', $_SESSION["verificationCode"]);
    if ($code == $ses) {
        return true;
    } else {
        return false;
    }
}

//处理接收中文字符串
function uniDecode($str, $charcode)
{
    $fun = 'toUtf8';
    $text = preg_replace_callback("/%u[0-9A-Za-z]{4}/", $fun, $str);
    return mb_convert_encoding($text, $charcode, 'utf-8');
}

function toUtf8($ar)
{
    foreach ($ar as $val) {
        $c = '';
        $val = intval(substr($val, 2), 16);
        if ($val < 0x7F) { // 0000-007F
            $c .= chr($val);
        } elseif ($val < 0x800) { // 0080-0800
            $c .= chr(0xC0 | ($val / 64));
            $c .= chr(0x80 | ($val % 64));
        } else { // 0800-FFFF
            $c .= chr(0xE0 | (($val / 64) / 64));
            $c .= chr(0x80 | (($val / 64) % 64));
            $c .= chr(0x80 | ($val % 64));
        }
    }
    return $c;
}

//系统当前时间
function currentDateTime($param)
{
    $result = array();
    $dt = new DateTime();
    $result['code'] = '829';
    $result['resultLength'] = 3;
    $dateTime = array();
    $dateTime['dateTime'] = $dt -> format('Y-m-d H:i:s');
    $dateTime['date'] = $dt -> format('Y-m-d');
    $dateTime['time'] = $dt -> format('H:i:s');
    $result['result'] = $dateTime;
    if($param['caller'] != 'service'){
        echo json_encode($result);
        return null;
    }
    else{
        return $result;
    }
}

//数字转中文 1-》一
function numToWord($num)
{
    $chiNum = array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
    $chiUni = array('','十', '百', '千', '万', '亿', '十', '百', '千');

    $chiStr = '';

    $num_str = (string)$num;

    $count = strlen($num_str);
    $last_flag = true; //上一个 是否为0
    $zero_flag = true; //是否第一个
    $temp_num = null; //临时数字

    $chiStr = '';//拼接结果
    if ($count == 2) {//两位数
        $temp_num = $num_str[0];
        $chiStr = $temp_num == 1 ? $chiUni[1] : $chiNum[$temp_num].$chiUni[1];
        $temp_num = $num_str[1];
        $chiStr .= $temp_num == 0 ? '' : $chiNum[$temp_num];
    }else if($count > 2){
        $index = 0;
        for ($i=$count-1; $i >= 0 ; $i--) {
            $temp_num = $num_str[$i];
            if ($temp_num == 0) {
                if (!$zero_flag && !$last_flag ) {
                    $chiStr = $chiNum[$temp_num]. $chiStr;
                    $last_flag = true;
                }
            }else{
                $chiStr = $chiNum[$temp_num].$chiUni[$index%9] .$chiStr;

                $zero_flag = false;
                $last_flag = false;
            }
            $index ++;
        }
    }else{
        $chiStr = $chiNum[$num_str[0]];
    }
    return $chiStr;
}

function getGrade($gradeID){
    return numToWord((int)$gradeID).'年级';
}

function getClass($classID){
    return $classID."班";
}
?>