<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2017/4/14
 * Time: 20:49
 */
include_once '../initConnection.php';
include_once '../universalHandler.php';
//include_once '../lib/sendMail/smtp.php';

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

function forgetPassword($param){
    $email = $param['email'];
    $result = array();
    $con = initCon();
    $sql = "SELECT * FROM users WHERE email = '".$email."'";
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    if($resultSet = $con->query($sql)){
        if($resultSet->num_rows > 0){
            $userInfo = $resultSet->fetch_assoc();
            $mailResult = sendEmail($userInfo);
            if ($mailResult)
            {
                $result['code'] = '829';
                $result['error'] = '邮件已发送';
            }
            else{
                $result['code'] = '102';
                $result['error'] = '邮件发送失败';
            }
        }
        else{
            $result['code'] = '101';
            $result['error'] = '邮箱不是绑定邮箱';
        }
    }
    else{
        $result['code'] = '101';
        $result['error'] = $con->error;
    }
    $con->close();
    echo json_encode($result);
}

function sendEmail($userInfo){
    $from = 'lijiaxuan0829@sina.com';
    $to = $userInfo['email'];
    $password = '19491001jiaxuan';
    $mailConfig=array(
        "host"=>"smtp.sina.com",
        "port"=>25,
        "auth"=>true,
        "username"=>$from,
        "password"=>$password,
        "from"=>$from,
    );
    $headers = array(
        'From'=>$from,
        'To' => $to, //收信地址
        'Subject'=>'青少年近视干预项目——找回密码',
        'Content-Type'=>'text/html; charset=utf-8\r\n'
    );
    include_once '../lib/sendMail/smtp.php';
    $SMTP = new smtp($mailConfig['host'],25,true,$mailConfig['username'],$mailConfig['password']);
    $SMTP->debug = false;
    $mailBody = "您好，".$userInfo['name'].":\r\n您的密码为<h1>".$userInfo['password']."</h1>";
    $mailType = "HTML";
    $mailResult = $SMTP->sendmail($headers['To'],$headers['From'],$headers['Subject'],$mailBody,$mailType);
    return $mailResult;
}

function getChildren($param){
    $userID = $param['userID'];
    $result = array();
    $con = initCon();
    $sql = "SELECT * FROM children  WHERE parentID = '".$userID."' order by CONVERT(name USING gbk); ";
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    if($resultSet = $con->query($sql)){
        $result['childList'] = array();
        while($row = $resultSet->fetch_assoc()){
            $row['grade'] = getGrade($row['gradeID']);
            $row['class'] = getClass($row['classID']);
            $result['childList'][] = $row;
        }
        $result['code'] = '829';
        $result['recordsTotal'] = $resultSet->num_rows;
        $result['recordsFiltered'] = $resultSet->num_rows;
    }
    else{
        $result['code'] = '100';
        $result['error'] = $con->error;
    }
    $con->close();
    echo json_encode($result);
}

function changePassword($param){
    $userID = $param['userID'];
    $newPassword = $param['newPassword'];
    $result = array();
    $con = initCon();
    $sql = " UPDATE users SET password='".$newPassword."' WHERE userID='".$userID."';";
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    if($resultSet = $con->query($sql)){
        $sql = "SELECT * FROM users where userID = '".$userID."';";
        if($resultSet = $con->query($sql)){
            $row = $resultSet->fetch_assoc();
            $result['code'] = '829';
            $result['result'] = array();
            $result['result'][] = $row;
        }
        else{
            $result['code'] = '101';
            $result['error'] = $con->error;
        }
    }
    else{
        $result['code'] = '100';
        $result['error'] = $con->error;
    }
    $con->close();
    echo json_encode($result);
}
?>