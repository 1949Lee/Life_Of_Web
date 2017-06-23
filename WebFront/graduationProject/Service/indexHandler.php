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
 CASE a.writeStatus
WHEN 1 THEN
	'填写中'
WHEN 2 THEN
	'已提交'
WHEN 3 THEN
	'未填写'
ELSE
	'--'
END AS writeStatusName,
a.writeStatus,
 b.*
FROM
	child_quiz AS a,
	(
		SELECT
      c.childQuizID,
			a. NAME AS quizName,
			b. NAME AS author
		FROM
      child_quiz AS c,
			quiz AS a,
			users AS b
		WHERE
      c.childID = '".$child['childID']."' AND
			a. STATUS = '2'
		AND a.createUserID = b.userID
		AND a.quizID  = c.quizID
	) AS b
WHERE
	a.quizID IN (
		SELECT
			quizID
		FROM
			quiz
		WHERE
			status = '2'
	)
AND a.childID = '".$child['childID']."'
AND a.childQuizID = b.childQuizID;
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
	a.name AS quizName,
	a.name AS quizName,
	b.name AS author
FROM
	quiz AS a,
	users AS b
WHERE
	a.status = '2'
AND a.createUserID = b.userID
AND a.quizID NOT IN (SELECT quizID FROM child_quiz where childID = '".$child['childID']."');
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

function getQuizList($param)
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
	CASE
WHEN a.answerDatetime IS NULL THEN
	'--'
ELSE
	a.answerDatetime
END AS submitDatetime, 
a.writeStatus,
b.quizName,
b.author,
c.name AS childName,
c.schoolID,
c.schoolName,
c.gradeID AS gradeID,
c.classID AS classID
FROM
	child_quiz AS a,
	(
		SELECT
			a.name AS quizName,
			a.quizID AS quizID,
			b.name AS author
		FROM
			quiz AS a,
			users AS b
		WHERE
			a.status = '2'
		AND a.createUserID = b.userID
	) AS b,
children as c
WHERE
	a.quizID = b.quizID  AND a.childID = c.childID;
";
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    $resultSet = $con->query($sql);
//    $result['draw'] = (int)$dataCondition['draw'];
    $result['quizList'] = array();
    $num = 0;
    if ($resultSet->num_rows > 0) {
        while ($row = $resultSet->fetch_assoc()) {
            $row['gradeName'] = getGrade((int)$row['gradeID']);
            $row['className'] = getClass((int)$row['classID']);
            $result['quizList'][] = $row;
        }
        $result['code'] = '829';
        $result['recordsTotal'] = $resultSet->num_rows;
        $result['recordsFiltered'] = $resultSet->num_rows;
        $resultSet->close();
    }
    else{
        $result['code'] = '100';
        $result['recordsTotal'] = 0;
        $result['recordsFiltered'] = 0;
        $result['quizList'] = [];
        $result['error'] = $con->error;
    }
    $con->close();
    echo json_encode($result);
}
?>