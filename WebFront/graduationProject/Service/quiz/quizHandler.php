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
    $con = initCon();
    $quizAllData['quiz']['status'] = 1;
    $dateTimeNow = currentDateTime(array("caller"=>"service"));
    $sql = "INSERT INTO quiz (quizID, templateID, createUserID, name, title, subtitle, createDateTime, releaseDateTime, finishDateTime, status, layoutStyle, askCount, tabCount, tabName, dataCount) VALUES".
                             "('".$quizAllData['quiz']['quizID']."', '".$quizAllData['quiz']['templateID']."', '".$quizAllData['quiz']['createUserID']."',".
                             " '".$quizAllData['quiz']['name']."', '".$quizAllData['quiz']['title']."', '".$quizAllData['quiz']['subtitle']."', '".$dateTimeNow['result']['dateTime']."', ".
                             "'".$quizAllData['quiz']['releaseDateTime']."', '".$quizAllData['quiz']['finishDateTime']."', '".$quizAllData['quiz']['status']."', '".$quizAllData['quiz']['layoutStyle']."', ".
                             "'".count($quizAllData['ask']['askList'])."', '".$quizAllData['quiz']['tabCount']."', '".$quizAllData['quiz']['tabName']."', '".$quizAllData['quiz']['dataCount']."');";
    switch($quizAllData['quiz']['layoutStyle']){
        case '001':
            $sql .= "INSERT INTO quiz_ask (askID, quizID, templateFlag, askType, pageCode, askIndex, askContent)
                 VALUES";
            for($i = 0;$i < count($quizAllData['ask']['askList']);$i++){
                $sql .= "('".$quizAllData['ask']['askList'][$i]['askID']."',
                        '".$quizAllData['ask']['quizID']."',
                        '".$quizAllData['ask']['templateFlag']."',
                        '".$quizAllData['ask']['askList'][$i]['askType']."',
                        '".$quizAllData['ask']['askList'][$i]['pageCode']."',
                        '".$quizAllData['ask']['askList'][$i]['askIndex']."',
                        '".htmlentities($quizAllData['ask']['askList'][$i]['askContent'])."')";
//                请使用html_entity_decode()把数据库中的题目内容字符串转化为HTML代码
                $sql .= ',';
            }
            $sql = substr($sql,0,-1);
            $sql .= ';';
            for ($i = 0;$i < count($quizAllData['ask']['askList']);$i++){
                $sql .= "INSERT INTO quiz_ask_elements (elementID, askID, quizID, elementType,elementLevel, statisticalFlag)
                                VALUES";
                for ($j = 0;$j < count($quizAllData['ask']['askList'][$i]['askEleList']);$j++){
                    $sql .= "('".$quizAllData['ask']['askList'][$i]['askEleList'][$j]['elementID']."',
                        '".$quizAllData['ask']['askList'][$i]['askID']."',
                        '".$quizAllData['ask']['quizID']."',
                        '".$quizAllData['ask']['askList'][$i]['askEleList'][$j]['elementType']."',
                        '".$quizAllData['ask']['askList'][$i]['askEleList'][$j]['elementlevel']."',
                        '".$quizAllData['ask']['askList'][$i]['askEleList'][$j]['statisticalFlag']."')";
                    $sql .= ',';
                }
                $sql = substr($sql,0,-1);
                $sql .= ';';
            }
            break;
        case '002':
            $sql .= "INSERT INTO quiz_ask (askID, quizID, templateFlag, askType, tabCode, pageCode, askIndex, askContent) 
                 VALUES";
            for($i = 0;$i < count($quizAllData['ask']['askList']);$i++){
                $sql .= "('1', '1', '0', '1', '1', '1', '1')";
                $sql .= ',';
            }
            $sql = substr($sql,0,-1);
            break;
    }
    $sql = str_replace('\'null\'','null',$sql);
    $con->query("set character set 'utf8'");
    $con->query("set names 'utf8'");
    $resultSet = mysqli_multi_query($con,$sql);
//    $resultSet = true;
    if ($resultSet === true) {
        $result['code'] = '829';
        $result['result'] = '插入成功';
    }
    else{
        $result['code'] = '101';
        $result['result'] = mysqli_error($con);
        $result['sql'] = $sql;
    }
    echo json_encode($result);
    mysqli_close($con);
}
function updateQuiz($param){
    
}

?>