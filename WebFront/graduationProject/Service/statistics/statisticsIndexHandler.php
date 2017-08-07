<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2017/5/11
 * Time: 14:11
 */
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
        end as statusName,a.status  from quiz as a ,users as b where b.userID = a.createUserID and a.status != '4' ;";
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
        $result['quizList'] = [];
    }
    mysqli_close($conn);
    echo json_encode($result);
}

function getStatisticsData($param)
{
    $result = array();
    $con = initCon();
    $sql = "SELECT * FROM quiz WHERE status ='2'";
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    if ($resultSet = $con->query($sql)) {
        $result["statisticsList"] = array();
        while ($row = $resultSet->fetch_assoc()) {
            $sql = "SELECT a.*,b.elementType FROM dict_quiz_statistics AS a,quiz_ask_elements AS b  WHERE a.quizID ='" . $row['quizID'] . "' AND a.eleID = b.elementID;";
            $row['dataList'] = array();
            if ($dataSet = $con->query($sql)) {
                while ($dataRow = $dataSet->fetch_assoc()) {
                    $valueNameArr = explode('*,*', $dataRow['valueName']);
                    $codeArr = explode(',', $dataRow['code']);
                    $dataRow['valueName'] = $valueNameArr;
                    $dataRow['code'] = $codeArr;
                    $row['dataList'][] = $dataRow;
                }
            }
            $result["statisticsList"][] = $row;
        }
        $result['code'] = '829';
    } else {
        $result['code'] = '100';
        $result['error'] = $con->error;
    }
    echo json_encode($result);
    mysqli_close($con);
}

function getFilterResult($param)
{
    $filterData = $param['filter'];
    $result = array();
    $con = initCon();
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    $sql = "
SELECT * FROM (SELECT
	a.childQuizID,
	a.childID,
	a.quizID,
	CASE
WHEN a.updateDatetime IS NULL THEN
	'--'
ELSE
	a.updateDatetime
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
	a.quizID = '".$filterData['quizID']."' AND a.quizID = b.quizID  AND a.childID = c.childID) AS a
ORDER BY a.submitDatetime DESC;";
    if ($resultSet = $con->query($sql)) {
        $result['code'] = '829';
        $result["resultList"] = array();
        while ($row = $resultSet->fetch_assoc()) {
            $row['gradeName'] = getGrade((int)$row['gradeID']);
            $row['className'] = getClass((int)$row['classID']);
            $result["resultList"][] = $row;
        }
    } else {
        $result['code'] = '100';
        $result['error'] = $con->error;
        $result['sql'] = $sql;
    }
    if(count($result["resultList"]) > 0 && array_key_exists('conditions',$filterData)){
        for($index = 0;$index < count($result["resultList"]);$index++){
            $filteringFlag = true;
            for ($i = 0; $i < count($filterData['conditions']); $i++) {
                $sql = "SELECT a.* FROM (SELECT a.*,b.quizID FROM quiz_data AS a,child_quiz AS b WHERE a.childQuizID = '".$result["resultList"][$index]['childQuizID']."' AND a.childQuizID = b.childQuizID AND b.quizID = '" . $filterData['quizID'] . "') AS a,
quiz_ask_elements AS b where a.quizID = b.quizID AND a.askID = b.askID AND a.eleID = b.elementID AND b.statisticalFlag = '1'
AND ";
                $sql .= "(a.eleID = '" . $filterData['conditions'][$i]['statisticsCode'] . "' AND";
                switch ($filterData['conditions'][$i]['statisticsValue']) {
                    case '101':
                        $sql .= "(";
                        $valueArr = explode(',', $filterData['conditions'][$i]['statisticsAnswer']);
                        for ($j = 0; $j < count($valueArr); $j++) {
                            $sql .= "a.answerContent like '%" . $valueArr[$j] . "%' ";
                            $sql .= "OR ";
                        }
                        $sql = substr($sql, 0, -3);
                        $sql .= ")";
                        break;
                    case '102':
                        $sql .= "(";
                        $valueArr = explode(',', $filterData['conditions'][$i]['statisticsAnswer']);
                        for ($j = 0; $j < count($valueArr); $j++) {
                            $sql .= "a.answerContent not like '%" . $valueArr[$j] . "%' ";
                            $sql .= "AND ";
                        }
                        $sql = substr($sql, 0, -4);
                        $sql .= ")";
                        break;
                    case '103':
                        break;
                    case '104':
                        break;
                    case '105':
                        break;
                    case '106':
                        break;
                    case '107':
                        break;
                    case '108':
                        break;
                    case '109':
                        break;
                }
                $sql .= ");";
                if ($dataSet = $con->query($sql)) {
//                    while ($row = $resultSet->fetch_assoc()) {
//                    }
                    if($dataSet->num_rows == 0){
                        $filteringFlag = false;
                        break;
                    }
                } else {
                    $result['code'] = '100';
                    $result['error'] = $con->error;
                    $result['sql'] = $sql;
                }
            }
            if($filteringFlag == false){
                array_splice($result["resultList"],$index,1);
                $index--;
            }
        }
    }
    echo json_encode($result);
    mysqli_close($con);
}

?>