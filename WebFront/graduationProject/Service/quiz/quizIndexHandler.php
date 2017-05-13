<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2017/5/11
 * Time: 14:11
 */
$method = $_POST['method'];
include_once '../initConnection.php';
include_once '../universalHandler.php';
function getQuizList($param)
{
    $dataCondition = $param;
    $result = array();
    $conn = initCon();
    $sql = "select a.quizID,a.templateID,a.createUserID,a.name,a.title,b.name as createUserName,a.createDateTime,
        case when a.releaseDateTime is null then '--' else a.releaseDateTime end as releaseDateTime,
        case when a.finishDateTime is null then '--' else a.finishDateTime end as finishDateTime,
        case a.status 
        when 1 then '未发布'
        when 2 then '发布中'
        when 3 then '已结束'
        else '--'
        end as statusName,a.status  from quiz as a ,admin_users as b where b.userID = a.createUserID;";
    $conn->query("set character set 'utf8'");
    $conn->query("set names 'utf8'");
//    $result['draw'] = (int)$dataCondition['draw'];
    $resultSet = $conn->query($sql);
    if ($resultSet->num_rows > 0) {
        $result['quizList'] = array();
        while ($row = $resultSet->fetch_assoc()) {
            $result['quizList'][] = $row;
        }
        $result['code'] = '829';
        $result['recordsTotal'] = $resultSet->num_rows;
        $result['recordsFiltered'] = $resultSet->num_rows;
    } else {
        $result['code'] = '102';//用户名不存在
        $result['recordsTotal'] = 0;
        $result['recordsFiltered'] = 0;
        $result['quizList']  = [];
    }
    echo json_encode($result);
    mysqli_close($conn);
}
function getQuizInfo($param){
    $quiID = $param['quiz']['quizID'];
    $sql = "";
}
?>