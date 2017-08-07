<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2017/5/8
 * Time: 14:41
 */
include_once '../initConnection.php';
include_once '../universalHandler.php';

function newQuiz($param)
{
    $quizAllData = $param['quizAllData'];
    $result = array();
    $result['param'] = $quizAllData;
    $test = 0;
    $con = initCon();
    if (!(array_key_exists("createDateTime", $quizAllData['quiz']))||$quizAllData['quiz']['createDateTime'] == 'null') {
        $dateTimeNow = currentDateTime(array("caller" => "service"))['result']['dateTime'];
    } else {
        $dateTimeNow = $quizAllData['quiz']['createDateTime'];
    }
    if(array_key_exists('askList',$quizAllData['ask'])){
        $sql = "INSERT INTO quiz (quizID, templateID, createUserID, name, title, subtitle, createDateTime, releaseDateTime, finishDateTime, status, layoutStyle, askCount, tabCount, tabName, dataCount) VALUES" .
            "('" . $quizAllData['quiz']['quizID'] . "', '" . $quizAllData['quiz']['templateID'] . "', '" . $quizAllData['quiz']['createUserID'] . "'," .
            " '" . $quizAllData['quiz']['name'] . "', '" . $quizAllData['quiz']['title'] . "', '" . $quizAllData['quiz']['subtitle'] . "', '" . $dateTimeNow . "', " .
            "'" . $quizAllData['quiz']['releaseDateTime'] . "', '" . $quizAllData['quiz']['finishDateTime'] . "', '" . $quizAllData['quiz']['status'] . "', '" . $quizAllData['quiz']['layoutStyle'] . "', " .
            "'" . count($quizAllData['ask']['askList']) . "', '" . $quizAllData['quiz']['tabCount'] . "', '" . $quizAllData['quiz']['tabName'] . "', '" . $quizAllData['quiz']['dataCount'] . "');";
    }
    else{
        $sql = "INSERT INTO quiz (quizID, templateID, createUserID, name, title, subtitle, createDateTime, releaseDateTime, finishDateTime, status, layoutStyle, askCount, tabCount, tabName, dataCount) VALUES" .
            "('" . $quizAllData['quiz']['quizID'] . "', '" . $quizAllData['quiz']['templateID'] . "', '" . $quizAllData['quiz']['createUserID'] . "'," .
            " '" . $quizAllData['quiz']['name'] . "', '" . $quizAllData['quiz']['title'] . "', '" . $quizAllData['quiz']['subtitle'] . "', '" . $dateTimeNow . "', " .
            "'" . $quizAllData['quiz']['releaseDateTime'] . "', '" . $quizAllData['quiz']['finishDateTime'] . "', '" . $quizAllData['quiz']['status'] . "', '" . $quizAllData['quiz']['layoutStyle'] . "', " .
            "'" . 0 . "', '" . $quizAllData['quiz']['tabCount'] . "', '" . $quizAllData['quiz']['tabName'] . "', '" . $quizAllData['quiz']['dataCount'] . "');";
    }

    switch ($quizAllData['quiz']['layoutStyle']) {
        case '001':
            if(array_key_exists('askList',$quizAllData['ask'])){
                $sql .= "INSERT INTO quiz_ask (askID, quizID, templateFlag, askType, pageCode, askIndex, askContent)
                 VALUES";
                for ($i = 0; $i < count($quizAllData['ask']['askList']); $i++) {
                    $sql .= "('" . $quizAllData['ask']['askList'][$i]['askID'] . "',
                        '" . $quizAllData['ask']['quizID'] . "',
                        '" . $quizAllData['ask']['templateFlag'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['askType'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['pageCode'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['askIndex'] . "',
                        '" . htmlentities($quizAllData['ask']['askList'][$i]['askContent']) . "')";
//                请使用html_entity_decode()把数据库中的题目内容字符串转化为HTML代码
                    $sql .= ',';
                }
                $sql = substr($sql, 0, -1);
                $sql .= ';';
                for ($i = 0; $i < count($quizAllData['ask']['askList']); $i++) {

                    $sql .= "INSERT INTO quiz_ask_elements (elementID, askID, quizID, elementType,elementLevel, statisticalFlag)
                                VALUES";
                    $tem = '';
                    for ($j = 0; $j < count($quizAllData['ask']['askList'][$i]['askEleList']); $j++) {
                        $sql .= "('" . $quizAllData['ask']['askList'][$i]['askEleList'][$j]['elementID'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['askID'] . "',
                        '" . $quizAllData['ask']['quizID'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['askEleList'][$j]['elementType'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['askEleList'][$j]['elementLevel'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['askEleList'][$j]['statisticalFlag'] . "')";
                        $tem .= $quizAllData['ask']['askList'][$i]['askEleList'][$j]['elementID'] ;
                        $sql .= ',';
                        $tem .= ',';
                        $test++;
                    }
                    $result['eleSql'] = $tem;
                    $sql = substr($sql, 0, -1);
                    $sql .= ';';
                }
            }
            if(array_key_exists('statisticsList',$quizAllData['statistics'])){
                $sql .= "INSERT INTO dict_quiz_statistics (statisticalID, eleID, quizID, statisticalType, name, nameAbbreviation, valueName,code)
                 VALUES";
                for ($i = 0; $i < count($quizAllData['statistics']['statisticsList']); $i++) {
                    $sql .= "('" . $quizAllData['statistics']['statisticsList'][$i]['statisticalID'] . "',
                        '" . $quizAllData['statistics']['statisticsList'][$i]['eleID'] . "',
                        '" . $quizAllData['statistics']['quizID'] . "',
                        '" . $quizAllData['statistics']['statisticsList'][$i]['statisticalType'] . "',
                        '" . $quizAllData['statistics']['statisticsList'][$i]['name'] . "',
                        '" . $quizAllData['statistics']['statisticsList'][$i]['nameAbbreviation'] . "',
                        '" . $quizAllData['statistics']['statisticsList'][$i]['valueName'] . "',
                        '" . $quizAllData['statistics']['statisticsList'][$i]['code'] . "')";
//                请使用html_entity_decode()把数据库中的题目内容字符串转化为HTML代码
                    $sql .= ',';
                }
                $sql = substr($sql, 0, -1);
                $sql .= ';';
            }
            break;
        case '002':
            $sql .= "INSERT INTO quiz_ask (askID, quizID, templateFlag, askType, tabCode, pageCode, askIndex, askContent) 
                 VALUES";
            for ($i = 0; $i < count($quizAllData['ask']['askList']); $i++) {
                $sql .= "('1', '1', '0', '1', '1', '1', '1')";
                $sql .= ',';
            }
            $sql = substr($sql, 0, -1);
            break;
    }
    $sql = str_replace('\'null\'', 'null', $sql);
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    $resultSet = mysqli_multi_query($con, $sql);
//    $resultSet = true;
    if ($resultSet === true) {
        if($quizAllData['quiz']['isTemplate'] == 'true'){
            $temResult = newTemplate($param);
            if($temResult['code'] == '829'){
                $result['code'] = '829';
                $result['result'] = '成功';
            }
            else{
                $result['code'] = '102';
                $result['result'] = $temResult;
            }
        }
        else{
            $result['code'] = '829';
            $result['result'] = '插入成功';
            $result['test'] = $test;
            $result['result'] = mysqli_error($con);
        }
    } else {
        $result['code'] = '101';
        $result['result'] = mysqli_error($con);
        $result['sql'] = $sql;
    }
    mysqli_close($con);
    if ($param['caller'] != 'service') {
        echo json_encode($result);
        return null;
    } else {
        return $result;
    }
}

function updateQuiz($param)
{
    $quizAllData = $param['quizAllData'];
    $param['caller'] = 'service';
    $result = array();
    $con = initCon();
    $sql = "DELETE FROM quiz WHERE quizID = '" . $quizAllData['quiz']['quizID'] . "';DELETE FROM quiz_ask WHERE quizID = '" . $quizAllData['quiz']['quizID'] . "';DELETE FROM quiz_ask_elements WHERE quizID = '" . $quizAllData['quiz']['quizID'] . "';DELETE FROM dict_quiz_statistics WHERE quizID = '" . $quizAllData['quiz']['quizID'] . "';";
    if ($con->multi_query($sql)) {
        $resultNew = newQuiz($param);
        if ($resultNew['code'] == '829') {
            $result['code'] = '829';
            $result['result'] = '成功';
            $result['param'] = $resultNew;
        }
    } else {
        $result['code'] = '100';
        $result['result'] = $con->error;
    }
    echo json_encode($result);
    $con->close();
}

function deleteQuiz($param)
{
    $quizID = $param['quizID'];
    $result = array();
    $con = initCon();
//    $sql = "DELETE FROM quiz WHERE quizID = '" . $quizID . "';DELETE FROM quiz_ask WHERE quizID = '" . $quizID . "';DELETE FROM quiz_ask_elements WHERE quizID = '" . $quizID . "';DELETE FROM dict_quiz_statistics WHERE quizID = '" . $quizID . "';";
    $sql = "UPDATE quiz SET status='4' WHERE quizID= '" .$quizID . "';";
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

function newTemplate($param){
    $quizAllData = $param['quizAllData'];
    $result = array();
    $con = initCon();
    if (!(array_key_exists("createDateTime", $quizAllData['quiz']))) {
        $dateTimeNow = currentDateTime(array("caller" => "service"))['result']['dateTime'];
    } else {
        $dateTimeNow = $quizAllData['quiz']['createDateTime'];
    }
    $sql = "DELETE FROM quiz_templates WHERE templateID = '" . $quizAllData['template']['templateID'] . "';DELETE FROM quiz_ask WHERE quizID = '" . $quizAllData['template']['templateID'] . "';DELETE FROM quiz_ask_elements WHERE quizID = '" . $quizAllData['template']['templateID'] . "';DELETE FROM dict_quiz_statistics WHERE quizID = '" . $quizAllData['template']['templateID'] . "';";
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    $con->query($sql);
    $sql = "INSERT INTO quiz_templates (templateID, createUserID, name, createDateTime, status, layoutStyle, askCount, tabCount, tabName, dataCount) VALUES" .
        "('" . $quizAllData['template']['templateID'] . "', '" . $quizAllData['quiz']['createUserID'] . "', '" . $quizAllData['quiz']['name'] . "', '" . $dateTimeNow . "', " .
        "'1', '" . $quizAllData['quiz']['layoutStyle'] . "', " .
        "'" . count($quizAllData['ask']['askList']) . "', '" . $quizAllData['quiz']['tabCount'] . "', '" . $quizAllData['quiz']['tabName'] . "', '" . $quizAllData['quiz']['dataCount'] . "');";
    switch ($quizAllData['quiz']['layoutStyle']) {
        case '001':
            $sql .= "INSERT INTO quiz_ask (askID, quizID, templateFlag, askType, pageCode, askIndex, askContent)
                 VALUES";
            for ($i = 0; $i < count($quizAllData['ask']['askList']); $i++) {
                $askContent = '';
                for ($j = 0; $j < count($quizAllData['ask']['askList'][$i]['askEleList']); $j++) {
                    $askContent = str_replace($quizAllData['template']['ask']['askList'][$i]['askEleList'][$j]['oGUID'],
                        $quizAllData['template']['ask']['askList'][$i]['askEleList'][$j]['nGUID'],
                        $quizAllData['ask']['askList'][$i]['askContent']);
                }
                $sql .= "('" . $quizAllData['template']['ask']['askList'][$i]['askID'] . "',
                        '" . $quizAllData['template']['ask']['quizID'] . "',
                        '" . $quizAllData['template']['ask']['templateFlag'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['askType'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['pageCode'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['askIndex'] . "',
                        '" . htmlentities($askContent) . "')";
//                请使用html_entity_decode()把数据库中的题目内容字符串转化为HTML代码
                $sql .= ',';
            }
            $sql = substr($sql, 0, -1);
            $sql .= ';';
            for ($i = 0; $i < count($quizAllData['ask']['askList']); $i++) {
                $sql .= "INSERT INTO quiz_ask_elements (elementID, askID, quizID, elementType,elementLevel, statisticalFlag)
                                VALUES";
                for ($j = 0; $j < count($quizAllData['ask']['askList'][$i]['askEleList']); $j++) {
                    $sql .= "('" . $quizAllData['template']['ask']['askList'][$i]['askEleList'][$j]['elementID'] . "',
                        '" . $quizAllData['template']['ask']['askList'][$i]['askID'] . "',
                        '" . $quizAllData['template']['ask']['quizID'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['askEleList'][$j]['elementType'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['askEleList'][$j]['elementLevel'] . "',
                        '" . $quizAllData['ask']['askList'][$i]['askEleList'][$j]['statisticalFlag'] . "')";
                    $sql .= ',';
                }
                $sql = substr($sql, 0, -1);
                $sql .= ';';
            }
            break;
        case '002':
            $sql .= "INSERT INTO quiz_ask (askID, quizID, templateFlag, askType, tabCode, pageCode, askIndex, askContent)
                 VALUES";
            for ($i = 0; $i < count($quizAllData['ask']['askList']); $i++) {
                $sql .= "('1', '1', '0', '1', '1', '1', '1')";
                $sql .= ',';
            }
            $sql = substr($sql, 0, -1);
            break;
    }
    $sql = str_replace('\'null\'', 'null', $sql);
    $resultSet = mysqli_multi_query($con, $sql);
//    $resultSet = true;
    if ($resultSet === true) {
        $result['code'] = '829';
        $result['result'] = '插入成功';
    } else {
        $result['code'] = '101';
        $result['result'] = mysqli_error($con);
        $result['sql'] = $sql;
    }
    mysqli_close($con);
    if ($param['caller'] != 'service') {
        echo json_encode($result);
        return null;
    } else {
        return $result;
    }
}

?>