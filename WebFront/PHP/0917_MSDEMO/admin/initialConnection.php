<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/19
 * Time: 16:05
 */
function initCon(){
    /*替换为你自己的数据库名*/
    $dbname = 'CVbitPUFVNaoxNelGGLx';
    /*填入数据库连接信息*/
    $host = 'sqld.duapp.com';
    $port = 4050;
    $user = '6b9246ee6b8349bd961cae567a0c5e24';//用户AK
    $pwd = '540b206f0f3548fb9e130135faf84b55';//用户SK
    /*以上信息都可以在数据库详情页查找到*/

    /*接着调用mysql_connect()连接服务器*/
    /*为了避免因MySQL数据库连接失败而导致程序异常中断，此处通过在mysql_connect()函数前添加@，来抑制错误信息，确保程序继续运行*/
    /*有关mysql_connect()函数的详细介绍，可参看http://php.net/manual/zh/function.mysql-connect.php*/
    $link = @mysql_connect("{$host}:{$port}",$user,$pwd,true);
    if(!$link) {
        die("Connect Server Failed: " . mysql_error());
    }
    return $link;
}
?>