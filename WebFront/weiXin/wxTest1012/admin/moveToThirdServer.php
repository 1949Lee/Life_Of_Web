<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/10/12
 * Time: 19:01
 */
if(!isset($_GET["mid"])){
    exit();
}
$mid=$_GET["mid"]; //获取mid
$ext="jpg"; //获取扩展名
$accessToken=getAccessToken(); //获取accesstoken
$url = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=".$accessToken."&media_id=".$mid;
$return_content = http_get_data($url);
$filename = 'uploadFiles/images/'.$mid.".".$ext;
// echo $return_content;
$fp= @fopen($filename,"a"); //将文件绑定到流 ??
fwrite($fp,$return_content); //写入文件
echo "ok";

function httpGet($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    // 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
    // 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
    curl_setopt($curl, CURLOPT_URL, $url);

    $res = curl_exec($curl);
    curl_close($curl);

    return $res;
}

function get_php_file($filename) {
    return trim(substr(file_get_contents($filename), 15));
}
function set_php_file($filename, $content) {
    $fp = fopen($filename, "w");
    fwrite($fp, "<?php exit();?>" . $content);
    fclose($fp);
}
function getAccessToken() {
    // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
    $data = json_decode(get_php_file("../client/access_token.php"));
    if ($data->expire_time < time()) {

        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf8f68871deff74e5&secret=3e4a2e81266f2fa68d9f86d0514d9a0f";
        $res = json_decode(httpGet($url));
        $access_token = $res->access_token;
        if ($access_token) {
            $data->expire_time = time() + 7000;
            $data->access_token = $access_token;
            set_php_file("access_token.php", json_encode($data));
        }
    } else {
        $access_token = $data->access_token;
    }
    return $access_token;
}
function http_get_data($url) {

    $ch = curl_init ();
    curl_setopt ( $ch, CURLOPT_CUSTOMREQUEST, 'GET' );
    curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, false );
    curl_setopt ( $ch, CURLOPT_URL, $url );
    ob_start ();
    curl_exec ( $ch );
    $return_content = ob_get_contents ();
    ob_end_clean ();

    $return_code = curl_getinfo ( $ch, CURLINFO_HTTP_CODE );
    return $return_content;
}
?>
?>