<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/15
 * Time: 16:24
 */
include_once "initialConnection.php";

/**
 * PHP生成JSON对象
 * $data['id'] = 1;
 * $dat['name'] = "mary";
 * $da['red']= array_merge($data,$dat);
 * $data1['id'] = 2;
 * $dat1['name'] = "燕子";
 * $da['blue']= array_merge($data1,$dat1);
 * print_r($da);///打印出来是一个二维数组（如下）
 *
 * /*
 * Array
 * (
 * [red] => Array
 * (
 * [id] => 1
 * [name] => mary
 * )
 * [blue] => Array
 * (
 * [id] => 2
 * [name] => 燕子
 * )
 * )echo json_encode($da);//输出的是一个转化成json格式的字符串，可以直接在js中用
 */

$response = array();//AJAX回应JSON对象

if (isset($_POST['type'])) {
    $con = initCon();
    mysql_select_db("CVbitPUFVNaoxNelGGLx",$con);
    $AJAXType = $_POST['type'];
    date_default_timezone_set("Asia/Shanghai");
    $date = date("Y-n-j H:i:s");
    if ($AJAXType == "showHero") {
        if (isset($_POST['heroID'])) {
            $heroID = $_POST["heroID"];
            $hero = mysql_query("SELECT * FROM hero where ID='$heroID';");
            $response["res"] = mysql_num_rows($hero);
//            $response["res"] = $heroID;
            if (mysql_num_rows($hero) > 0) {
                $response["hero"] = array();
                $index = 0;
                while ($heroRow = mysql_fetch_assoc($hero)) {
                    array_push($response["hero"], array("heroInfo" => $heroRow));
                    $response["hero"][$index]["skills"] = array();
                    $skills = mysql_query("SELECT a.*,b.name as heroName FROM skills as a,hero as b where a.hID=b.ID;");
                    while ($skillsRow = mysql_fetch_assoc($skills)) {
                        array_push($response["hero"][$index]["skills"], $skillsRow);
                    }
                    $index++;
                }
            } else {
                $response["hero"] = null;
            }
        }
        else if (isset($_POST['heroName']) && isset($_POST['category'])) {
            $heroName = $_POST['heroName'];
            $category = $_POST['category'];
            if ($heroName == "" && $category == "all") {
                $hero = mysql_query("SELECT * FROM hero;");
                $response["res"] = mysql_num_rows($hero);
                if (mysql_num_rows($hero) > 0) {
                    $response["hero"] = array();
                    $index = 0;
                    while ($heroRow = mysql_fetch_assoc($hero)) {
                        array_push($response["hero"], array("heroInfo" => $heroRow));
                        $response["hero"][$index]["skills"] = array();
                        $skills = mysql_query("SELECT a.*,b.name as heroName FROM skills as a,hero as b where a.hID=b.ID and b.ID='" . $heroRow["ID"] . "';");
                        while ($skillsRow = mysql_fetch_assoc($skills)) {
                            array_push($response["hero"][$index]["skills"], $skillsRow);
                        }
                        $index++;
                    }
                }
            }
            else if($heroName == "" && $category != "all"){
                $hero = mysql_query("SELECT * FROM hero where $category='1';");
                $response["res"] = mysql_num_rows($hero);
                if (mysql_num_rows($hero) > 0) {
                    $response["hero"] = array();
                    $index = 0;
                    while ($heroRow = mysql_fetch_assoc($hero)) {
                        array_push($response["hero"], array("heroInfo" => $heroRow));
                        $response["hero"][$index]["skills"] = array();
                        $skills = mysql_query("SELECT a.*,b.name as heroName FROM skills as a,hero as b where a.hID=b.ID and b.ID='" . $heroRow["ID"] . "';");
                        while ($skillsRow = mysql_fetch_assoc($skills)) {
                            array_push($response["hero"][$index]["skills"], $skillsRow);
                        }
                        $index++;
                    }
                }
            }
            else if($heroName != "" && $category == "all"){
                $hero = mysql_query("SELECT * FROM hero where name like '%$heroName%';");
                $response["res"] = mysql_num_rows($hero);
                if (mysql_num_rows($hero) > 0) {
                    $response["hero"] = array();
                    $index = 0;
                    while ($heroRow = mysql_fetch_assoc($hero)) {
                        array_push($response["hero"], array("heroInfo" => $heroRow));
                        $response["hero"][$index]["skills"] = array();
                        $skills = mysql_query("SELECT a.*,b.name as heroName FROM skills as a,hero as b where a.hID=b.ID and b.ID='" . $heroRow["ID"] . "';");
                        while ($skillsRow = mysql_fetch_assoc($skills)) {
                            array_push($response["hero"][$index]["skills"], $skillsRow);
                        }
                        $index++;
                    }
                }
            }
            else {
                $hero = mysql_query("SELECT * FROM hero where name like '%$heroName%' and $category='1';");
                $response["res"] = mysql_num_rows($hero);
                if (mysql_num_rows($hero) > 0) {
                    $response["hero"] = array();
                    $index = 0;
                    while ($heroRow = mysql_fetch_assoc($hero)) {
                        array_push($response["hero"], array("heroInfo" => $heroRow));
                        $response["hero"][$index]["skills"] = array();
                        $skills = mysql_query("SELECT a.*,b.name as heroName FROM skills as a,hero as b where a.hID=b.ID and b.ID='" . $heroRow["ID"] . "';");
                        while ($skillsRow = mysql_fetch_assoc($skills)) {
                            array_push($response["hero"][$index]["skills"], $skillsRow);
                        }
                        $index++;
                    }
                }
            }
        }
        else {
            $hero = mysql_query("SELECT * FROM hero;");
            $response["res"] = mysql_num_rows($hero);
            if (mysql_num_rows($hero) > 0) {
                $response["hero"] = array();
                $index = 0;
                while ($heroRow = mysql_fetch_assoc($hero)) {
                    array_push($response["hero"], array("heroInfo" => $heroRow));
                    $response["hero"][$index]["skills"] = array();
                    $skills = mysql_query("SELECT a.*,b.name as heroName FROM skills as a,hero as b where a.hID=b.ID and b.ID='" . $heroRow["ID"] . "';");
                    while ($skillsRow = mysql_fetch_assoc($skills)) {
                        array_push($response["hero"][$index]["skills"], $skillsRow);
                    }
                    $index++;
                }
            } else {
                $response["hero"] = null;
            }
        }
        mysql_close($con);
    } else if ($AJAXType == "addHero") {
        if ($_FILES["heroPic"]["tmp_name"] == "") {
            msqli_close($con);
            $response["addResult"] = "noPIC";
            exit(json_encode($response));
        } else {
            $picName = time() . rand(100, 999) . substr($_FILES['heroPic']['name'], strrpos($_FILES['heroPic']['name'], '.'));
            //另外一种方式
//            $picFormat = explode(".",$_FILES["heroPic"]["name"]);
//            $picFormat = $picFormat[count($picFormat)-1];
//            $picName = date("YnjHis").rand(100,999).".".$picFormat;
            $picPath = $_SERVER["DOCUMENT_ROOT"]
                . "\\PHP\\0917_MSDEMO\\admin\\uploadFile\\images\\hero\\"
                . $picName;
            if (is_uploaded_file($_FILES["heroPic"]["tmp_name"])) {
                move_uploaded_file($_FILES["heroPic"]["tmp_name"],
                    $picPath);
            }
            $heroName = $_POST["heroName"];
            $attackRange = $_POST["attackRange"];
            $sql = "insert into hero (name,createTime,attackRange,picPath,carry,control,support,initial,jungle,longTime,boom,push,escape) values ('" . $heroName . "','$date','" . $attackRange . "','$picName',";
            $sql .= $_POST["heroPosition"];
            $sql .= ");";
            mysql_query($sql);

            //同时把技能插入到技能表中
            $skills = json_decode($_POST["skills"], true);
            $result = mysql_fetch_assoc(mysql_query("select ID from hero where name='$heroName' and createTime='$date' "));
            for ($i = 0; $i < count($skills["skillName"]) - 1; $i++) {
                $skillHID = $result["ID"];
                $skillName = $skills["skillName"][$i];
                $skillDamageType = $skills["damageType"][$i];
                $skillColdDown = $skills["coldDown"][$i];
                $skillNeedMana = $skills["needMana"][$i];
                $skillDescription = $skills["skillDescription"][$i];
                $sql = "insert into skills (hID,name,type,damageType,coldDown,needMana,skillDescription) values ('$skillHID','$skillName','基本技能','$skillDamageType','$skillColdDown','$skillNeedMana','$skillDescription');";
                mysql_query($sql);
            }
            $skillHID = $result["ID"];
            $skillName = $skills["skillName"][count($skills["skillName"]) - 1];
            $skillDamageType = $skills["damageType"][count($skills["skillName"]) - 1];
            $skillColdDown = $skills["coldDown"][count($skills["skillName"]) - 1];
            $skillNeedMana = $skills["needMana"][count($skills["skillName"]) - 1];
            $skillDescription = $skills["skillDescription"][count($skills["skillName"]) - 1];
            $sql = "insert into skills (hID,name,type,damageType,coldDown,needMana,skillDescription) values ('$skillHID','$skillName','终极技能','$skillDamageType','$skillColdDown','$skillNeedMana','$skillDescription');";
            mysql_query($sql);
            $response["addResult"] = "yes";


        }
    } else if ($AJAXType == "deleteHero") {
        $ID = $_POST["heroID"];
        mysql_query("delete from hero where ID='$ID'");
        mysql_query("delete from skills where hID='$ID'");
        $response["deleteHero"] = "yes";
    } else if ($AJAXType == "updateHero") {
//        $heroName = $_POST["heroName"];
//        $attackRange = $_POST["attackRange"];
        $heroID = $_POST["hID"];
        $position = explode(",", $_POST["heroPosition"]);
        $sql = "update  hero set carry=$position[0],control=$position[1],support=$position[2],initial=$position[3],jungle=$position[4],longTime=$position[5],boom=$position[6],push=$position[7],escape=$position[8] where ID='$heroID'";
        $response["updateHero"] = array();
        $skills = json_decode($_POST["skills"], true);
        $skillsRes = mysql_query("SELECT a.ID  FROM skills as a,hero as b where a.hID=b.ID;");
        for ($i = 0; $i < count($skills["skillName"]) - 1; $i++) {
            $skillID = mysql_fetch_assoc($skillsRes)["ID"];
            $skillHID = $heroID;
            $skillName = $skills["skillName"][$i];
            $skillDamageType = $skills["damageType"][$i];
            $skillColdDown = $skills["coldDown"][$i];
            $skillNeedMana = $skills["needMana"][$i];
            $skillDescription = $skills["skillDescription"][$i];
            $sql = "update skills set name='$skillName',damageType='$skillDamageType',coldDown='$skillColdDown',needMana='$skillNeedMana',skillDescription='$skillDescription' where hID='$skillHID' and ID='$skillID'";
            mysql_query($$sql);
            $response["updateHero"][] = $sql;
        }
        $skillID = mysql_fetch_assoc($skillsRes)["ID"];
        $skillName = $skills["skillName"][count($skills["skillName"]) - 1];
        $skillDamageType = $skills["damageType"][count($skills["skillName"]) - 1];
        $skillColdDown = $skills["coldDown"][count($skills["skillName"]) - 1];
        $skillNeedMana = $skills["needMana"][count($skills["skillName"]) - 1];
        $skillDescription = $skills["skillDescription"][count($skills["skillName"]) - 1];
        $sql = "update skills set name='$skillName',damageType='$skillDamageType',coldDown='$skillColdDown',needMana='$skillNeedMana',skillDescription='$skillDescription' where hID='$skillHID' and ID='$skillID'";
        mysql_query($sql);
    }
}

echo json_encode($response);
//$response["skills"] = json_decode($_POST["skills"],true);
?>


