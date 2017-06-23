<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2017/5/13
 * Time: 15:45
 */
include_once 'initConnection.php';
$conn = initCon();
$sql = "drop procedure if exists getQuizInfo;
create PROCEDURE getQuizInfo(in _quizID VARCHAR(36))
BEGIN
DECLARE _askID VARCHAR(50);
DECLARE i INT DEFAULT 1;
DECLARE _askCount INT;
SELECT askCount INTO _askCount FROM quiz WHERE quizID = _quizID; 
SELECT * FROM quiz WHERE quizID = _quizID;
while i < _askCount do
SELECT askID INTO _askID FROM (SELECT (@rowNum:=@rowNum+1) AS rowIndex, a.* FROM quiz_ask AS a, (Select (@rowNum :=0) ) AS b
where quizID = _quizID ORDER BY askIndex)as askNew where askNew.rowIndex = i;
SELECT * FROM quiz_ask where quizID = _quizID AND askID = _askID;
SELECT * FROM quiz_ask_elements where quizID = _quizID AND askID = _askID;
set i=i+1;
end while;
END";
$resultSet = $conn->query($sql);
mysqli_close($conn);
$conn = initCon();
//$resultSet->close();
$quiID = $_GET['quizID'];
$result = array();
$sql = "CALL " . $_SESSION["databaseName"] . ".getQuizInfo('" . $quiID . "');";

$sql = str_replace('\'null\'', 'null', $sql);
$conn->autocommit(FALSE);
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
                    $result['ask'][] = $row;
                    $askResultSet = false;
                }
                else {
                    while ($row = $resultSet->fetch_assoc()) {
                        unset($row['quizID']);
                        unset($row['askID']);
                        end($result['ask'])['askEleList'][] = $row;
                    }
                    $askResultSet = true;
                }
            }
            $resultSet->close();
        }

    }while($conn->next_result());
    $conn->commit();
}
else{
    $result['code'] = '100';
    $result['error'] = $conn->error;
}
echo var_dump($result);
mysqli_close($conn);

function newChildQuiz($param){
    $childQuiz = $param;
    $result = array();
    $con = initCon();
    $sql = "";
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    if($resultSet = $con->query($sql)){

    }
    else{
        $result['code'] = '100';
        $result['error'] = $con->error;
    }
    $con->close();
    echo json_encode($result);
}

?>