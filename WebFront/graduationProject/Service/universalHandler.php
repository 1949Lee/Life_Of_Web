<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2017/4/9
 * Time: 11:06
 */
$method = $_POST['method'];
if(!empty($_POST['urlClass'])){
    $class = $_POST['urlClass'];
    unset($_POST['urlClass']);
    unset($_POST['method']);
    include_once "$class.php";
    $obj = new $class;
    $ret = call_user_func_array(array($obj, $method), $_POST);
}
else{
    unset($_POST['method']);
    call_user_func($method,$_POST);
}
function checkVerificationCode(){
    session_start();
    $param = func_get_args();
    $code = uniDecode($param[0]['code'],'utf-8');
    $ses = iconv('gbk','utf-8',$_SESSION["verificationCode"]);
    if($code==$ses){
        return true;
    }
    else{
        return false;
    }
}
//处理接收中文字符串
function uniDecode($str, $charcode) {
    $fun='toUtf8';
    $text = preg_replace_callback("/%u[0-9A-Za-z]{4}/", $fun, $str);
    return mb_convert_encoding($text, $charcode, 'utf-8');
}
function toUtf8($ar) {
    foreach ($ar as $val) {
        $c='';
        $val = intval(substr($val, 2), 16);
        if ($val < 0x7F) { // 0000-007F
            $c .= chr($val);
        }
        elseif ($val < 0x800) { // 0080-0800
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

?>