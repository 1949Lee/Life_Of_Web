<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/10/12
 * Time: 19:02
 */
require_once "initConnection.php";
$response = array();
if ($db) {
    mysql_select_db(SAE_MYSQL_DB, $db);
    //从表中得到相应图片的ServerId
    $sql="SELECT distinct userID,upCount,location,addTime FROM `uploadPic` order by  addTime DESC   ";

    $res=mysql_query($sql);
    $allUserID=Array();
    $index = 0;

    while($nowRow=mysql_fetch_array($res)) {
        $response[$index] = array();
        $response[$index]["userID"] = $nowRow["userID"];
        $sql = "SELECT userImg,userName FROM `imgUser` where userID='".$nowRow["userID"]."'";
        $userImgRes = mysql_query($sql);
        $userImgRes = mysql_fetch_assoc($userImgRes);
        $response[$index]["userImg"] = $userImgRes['userImg'];
        $response[$index]["userName"] = $userImgRes['userName'];
        $response[$index]["upCount"] = $nowRow["upCount"];
        $response[$index]["location"] = $nowRow["location"];
        $response[$index]["serverid"] = array();
        $response[$index]["addTime"] = $nowRow["addTime"];
        $sql = "select serverid from uploadPic where userID='".$nowRow["userID"]."' and addTime='".$nowRow["addTime"]."';";
        $imgRes = mysql_query($sql);
        $j= 0;
        while($nowImg=mysql_fetch_assoc($imgRes)){
            $response[$index]["serverid"][$j] = $nowImg['serverid'];
            $j++;
        }
        $index++;
    }
    echo json_encode($response);
}
mysql_close($db);
?>