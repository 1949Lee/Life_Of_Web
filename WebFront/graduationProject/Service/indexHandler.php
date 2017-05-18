<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2017/5/16
 * Time: 21:43
 */
$method = $_POST['method'];
include_once 'initConnection.php';
include_once 'universalHandler.php';

function getQuizListForChild($param)
{
    $child = $param;
    $result = array();
    $con = initCon();
//    for($i = 0;$i < count($child['childList']);$i++){
        $sql = "
SELECT
	a.childQuizID,
	a.childID,
	a.quizID,
	a.updateDatetime,
	CASE
WHEN a.answerDatetime IS NULL THEN
	'--'
ELSE
	a.answerDatetime
END AS submitDatetime,
 CASE a.userQuizStatus
WHEN 1 THEN
	'填写中'
WHEN 2 THEN
	'已提交'
WHEN 3 THEN
	'未填写'
ELSE
	'--'
END AS writeStatusName,
a.userQuizStatus,
 b.*
FROM
	childquiz AS a,
	(
		SELECT
			a. NAME AS quizName,
			b. NAME AS author
		FROM
			quiz AS a,
			users AS b
		WHERE
			a. STATUS = '2'
		AND a.createUserID = b.userID
	) AS b
WHERE
	a.quizID IN (
		SELECT
			quizID
		FROM
			quiz
		WHERE
			STATUS = '2'
	)
AND a.childID = '".$child['childID']."';
";
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    $resultSet = $con->query($sql);
    $sql="
SELECT
	NULL AS childQuizID,
	'".$child['childID']."' AS childID,
	'--' AS updateDatetime,
	'--' AS submitDatetime,
	'未填写' AS writeStatusName,
	'3' AS writeStatus,
	a.quizID AS quizID,
	a. NAME AS quizName,
	b. NAME AS author
FROM
	quiz AS a,
	users AS b
WHERE
	a.status = '1'
AND a.createUserID = b.userID;
";
    $_resultSet = $con->query($sql);
//    $result['draw'] = (int)$dataCondition['draw'];
    $result['childQuizList'] = array();
    $num = 0;
    $_num = 0;
    if ($resultSet->num_rows > 0) {
        while ($row = $resultSet->fetch_assoc()) {
            $result['childQuizList'][] = $row;
        }
        $num = $resultSet->num_rows;
        $resultSet->close();
    }
    if($_resultSet->num_rows > 0){
        while ($row = $_resultSet->fetch_assoc()) {
            $result['childQuizList'][] = $row;
        }
        $_num = $_resultSet->num_rows;
        $_resultSet->close();
    }
    if(count($result['childQuizList']) == 0){
        $result['code'] = '102';
        $result['recordsTotal'] = 0;
        $result['recordsFiltered'] = 0;
        $result['childQuizList'] = [];
        $result['error'] = $con->error;
    }else {
        $result['code'] = '829';
        $result['recordsTotal'] = $num + $_num;
        $result['recordsFiltered'] = $num + $_num;
    }
    $con->close();
    echo json_encode($result);
}
?>