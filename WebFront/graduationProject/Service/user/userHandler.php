<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2017/4/14
 * Time: 20:49
 */
include_once '../initConnection.php';
include_once '../universalHandler.php';
function login($param)
{
    $result = array();
    if (!checkVerificationCode($_POST)) {
        $result['code'] = '101';
        $result['result'] = '验证码错误';
        $result['resultLength'] = 0;
        echo json_encode($result);
        return;
    };
    $con = initCon();
    $sql = "select * from users where loginID='" . $param['loginID'] . "';";
    $resultSet = $con->query("set character set 'utf8'");
    $resultSet = $con->query("set names 'utf8'");
    $resultSet = $con->query($sql);
    if ($resultSet->num_rows > 0) {
        $userInfo = array();
        while ($row = $resultSet->fetch_assoc()) {
            $userInfo[] = $row;
        }
        if ($userInfo[0]['userStatus'] == '4') {
            $sql = "select * from children where parentID='" . $userInfo[0]['userID'] . "';";
            $childList = $con->query($sql);
            $userInfo[0]['childList'] = array();
            while ($rowChild = $childList->fetch_assoc()) {
                $userInfo[0]['childList'][] = $rowChild;
            }
        }
//        print_r($userInfo);
        if ($userInfo[0]['password'] == $param['password']) {
            $result['code'] = '829';
            $result['resultLength'] = $resultSet->num_rows;
            $result['result'] = $userInfo;
        } else {
            $result['code'] = '103';//密码错误
            $result['resultLength'] = 0;
            $result['result'] = '密码错误';
        }
        unset($userInfo);
    } else {
        $result['code'] = '102';//用户名不存在
        $result['resultLength'] = 0;
        $result['result'] = '用户名不存在';
    }

    echo json_encode($result);
    mysqli_close($con);
}

?>