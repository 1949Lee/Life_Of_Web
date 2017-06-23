<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2017/5/31
 * Time: 10:47
 */
include_once '../initConnection.php';
include_once '../universalHandler.php';
function deleteTemplate($param){
    $templateID = $param['templateID'];
    $result = array();
    $con = initCon();
    $sql = "DELETE FROM quiz_templates WHERE templateID= '" .$templateID . "';";
    if ($con->query($sql)) {
        $result['code'] = '829';
        $result['result'] = '成功';
    } else {
        $result['code'] = '100';
        $result['result'] = $con->error;
    }
    echo json_encode($result);
    $con->close();
}

function getTemplateList($param){
    $dataCondition = $param;
    $result = array();
    $conn = initCon();
    $sql = "SELECT a.templateID,a.createUserID,a.name,b.name AS createUserName,a.createDateTime,
CASE a.layoutStyle
WHEN '001' THEN
	'普通'
WHEN '002' THEN
	'单页'
ELSE
	'--'
END AS layoutStyleName,
a.status,a.layoutStyle
FROM quiz_templates AS a,users AS b WHERE b.userID = a.createUserID;";
    $conn->query("set character set 'utf8'");
    $conn->query("set names 'utf8'");
//    $result['draw'] = (int)$dataCondition['draw'];
    $resultSet = $conn->query($sql);
    if ($resultSet->num_rows > 0) {
        $result['templateList'] = array();
        while ($row = $resultSet->fetch_assoc()) {
            $result['templateList'][] = $row;
        }
        $result['code'] = '829';
        $result['recordsTotal'] = $resultSet->num_rows;
        $result['recordsFiltered'] = $resultSet->num_rows;
    } else {
        $result['code'] = '102';//用户名不存在
        $result['recordsTotal'] = 0;
        $result['recordsFiltered'] = 0;
        $result['templateList'] = [];
    }
    mysqli_close($conn);
    echo json_encode($result);
}

function getTemplateInfo($param){
    $quiID = $param['quiz']['templateID'];
    $result = array();
    $conn = initCon();
    $sql = "CALL " . $_SESSION["databaseName"] . ".getTemplateInfo('" . $quiID . "');";
    $conn->query("set character set 'utf8'");
    $conn->query("set names 'utf8'");
    $conn->autocommit(FALSE);
//    $i = 0;
    if($conn->multi_query($sql)) {
        $firstResultSet = true;
        $askResultSet = true;
        $result['code'] = '829';
        do {
            if ($resultSet= $conn->store_result()) {
                if ($firstResultSet) {
                    $row = $resultSet->fetch_assoc();
                    $result['quiz'] = $row;
                    $firstResultSet = false;
                    $result['ask'] = array();
                    $result['ask']['quizID'] = $quiID;
                    $result['ask']['askList'] = array();
                }
                else {
                    if ($askResultSet) {
                        $row = $resultSet->fetch_assoc();
                        $result['ask']['templateFlag'] = $row['templateFlag'];
                        unset($row['templateFlag']);
                        unset($row['quizID']);
                        $row['askEleList'] = array();
                        $row['askContent'] =  html_entity_decode($row['askContent']);
                        $result['ask']['askList'][] = $row;
                        $askResultSet = false;
                    }
                    else {
                        $ask = array_pop($result['ask']['askList']);
                        while ($row = $resultSet->fetch_assoc()) {
                            unset($row['quizID']);
                            unset($row['askID']);
                            unset($row['elementLocation']);
                            unset($row['elementSelector']);
                            $ask['askEleList'][] = $row;
                        }
                        $result['ask']['askList'][] = $ask;
                        $askResultSet = true;
                    }
                }
                $resultSet->close();
//                $i++;
            }
        }while($conn->next_result());
//        $result['test'] = $i;
        $conn->commit();
    }
    else{
        $result['code'] = '100';
        $result['error'] = $conn->error;
    }
    echo json_encode($result);
    mysqli_close($conn);
}
?>