<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2017/5/19
 * Time: 10:27
 */
include_once '../initConnection.php';
include_once '../universalHandler.php';

function newChildQuiz($param){
    $childQuiz = $param['childQuiz'];
    $result = array();
    $con = initCon();
    $updateDatetime = currentDateTime(array("caller" => "service"))['result']['dateTime'];
    if($childQuiz['writeStatus'] == '2'){
        if (!(array_key_exists("submitDatetime", $childQuiz))) {
            $submitDatetime = currentDateTime(array("caller" => "service"))['result']['dateTime'];
        } else {
            $submitDatetime = $childQuiz['submitDatetime'];
        }
    }
    else if($childQuiz['writeStatus'] == '1'){
        $submitDatetime = 'null';
    }
    $sql = "
INSERT INTO child_quiz (childQuizID, childID, quizID, updateDatetime, answerDatetime, writeStatus) 
VALUES ('".$childQuiz['childQuizID']."', '".$childQuiz['childID']."', '".$childQuiz['quizID']."', '$updateDatetime', '$submitDatetime', '".$childQuiz['writeStatus']."');
";
    $sql .= "INSERT INTO quiz_data (recordID, childQuizID, askID, eleID, answerContent, statisticalValue)
                 VALUES";
    for ($i = 0; $i < count($childQuiz['answerList']); $i++) {
        $sql .= "('" . $childQuiz['answerList'][$i]['recordID'] . "',
                        '".$childQuiz['childQuizID']."',
                        '" .$childQuiz['answerList'][$i]['askID']."',
                        '" .$childQuiz['answerList'][$i]['eleID']."',
                        '" .$childQuiz['answerList'][$i]['answerContent']."',
                        '" .$childQuiz['answerList'][$i]['statisticalValue']."')";
        $sql .= ',';
    }
    $sql = substr($sql, 0, -1);
    $sql .= ';';

    $sql = str_replace('\'null\'', 'null', $sql);
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    if($resultSet = $con->multi_query($sql)){
        $result['code'] = '829';
        $result['result'] = '成功';
    }
    else{
        $result['code'] = '100';
        $result['error'] = $con->error;
    }
    $con->close();
    if ($param['caller'] != 'service') {
        echo json_encode($result);
        return null;
    } else {
        return $result;
    }
}

function updateChildQuiz($param){
    $childQuiz = $param['childQuiz'];
    $param['caller'] = 'service';
    $result = array();
    $con = initCon();
    if (!(array_key_exists("updateDatetime", $childQuiz))) {
        $dateTimeNow = currentDateTime(array("caller" => "service"))['result']['dateTime'];
    } else {
        $dateTimeNow = $childQuiz['updateDatetime'];
    }
    $sql = "DELETE FROM child_quiz WHERE childQuizID = '".$childQuiz['childQuizID']."'; DELETE FROM quiz_data WHERE childQuizID = '".$childQuiz['childQuizID']."';";
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    if($resultSet = $con->multi_query($sql)){
        $insert = newChildQuiz($param);
        if ($insert['code'] == '829') {
            $result['code'] = '829';
            $result['result'] = '保存成功';
        }
        else{
            $result['code'] = '100';
            $result['error'] = $insert['error'];
        }
    }
    else{
        $result['code'] = '100';
        $result['error'] = $con->error;
    }
    $con->close();
    echo json_encode($result);
}

function getChildQuizInfo($param){
    $quizID = $param['childQuiz']['quizID'];
    $childQuizID = $param['childQuiz']['childQuizID'];
    $result = array();
    $conn = initCon();
    $sql = "CALL " . $_SESSION["databaseName"] . ".getChildQuizInfo('" . $quizID . "','".$childQuizID."');";
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
                    $result['ask']['quizID'] = $quizID;
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