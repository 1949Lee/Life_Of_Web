<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/19
 * Time: 16:00
 */

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <script src="../bootstrap/jquery-3.1.0.min.js"></script>
    <script src="../bootstrap/js/bootstrap.js"></script>
    <style>
        .skills input,.skills textarea,.skills label{
            margin-top: 2rem;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
            <div class="panel panel-warning ">
                <!-- Default panel contents -->
                <div class="panel-heading">填写英雄信息</div>
                <div class="panel-body">
                    <form id="heroForm"class="heroForm form-horizontal" role="form" enctype="multipart/form-data"name="heroForm">
                        <div class="form-group">
                            <label for="heroName" class="col-md-2 control-label">英雄名称</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" id="heroName" placeholder="请输入英雄名"name="heroName">
                            </div>
                            <label for="attackRange" class="col-md-2 control-label">攻击距离</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" id="attackRange" placeholder="攻击距离"name="attackRange">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="heroPosition" class="col-sm-2 control-label">英雄定位</label>
                            <div class="col-sm-10" style="padding-top:7px;" >
                                <input class="heroPosition"  type="checkbox" style="padding:7px;" id="carry" name="heroPosition" value="carry"><label for="carry">核心</label>&nbsp;&nbsp;
                                <input class="heroPosition"  type="checkbox" style="padding:7px;" id="control" name="heroPosition" value="control"><label for="control">控制</label>&nbsp;&nbsp;
                                <input class="heroPosition"  type="checkbox" style="padding:7px;" id="support" name="heroPosition" value="support"><label for="support">辅助</label>&nbsp;&nbsp;
                                <input class="heroPosition"  type="checkbox" style="padding:7px;" id="initial" name="heroPosition" value="initial"><label for="initial">先手</label>&nbsp;&nbsp;
                                <input class="heroPosition"  type="checkbox" style="padding:7px;" id="jungle" name="heroPosition" value="jungle"><label for="jungle">打野</label><br>
                                <input class="heroPosition"  type="checkbox" style="padding:7px;" id="longTime" name="heroPosition" value="longTime"><label for="longTime">耐久</label>&nbsp;&nbsp;
                                <input class="heroPosition"  type="checkbox" style="padding:7px;" id="boom" name="heroPosition" value="boom"><label for="boom">爆发</label>&nbsp;&nbsp;
                                <input class="heroPosition"  type="checkbox" style="padding:7px;" id="push" name="heroPosition" value="push"><label for="push">推进</label>&nbsp;&nbsp;
                                <input class="heroPosition"  type="checkbox" style="padding:7px;" id="escape" name="heroPosition" value="escape"><label for="escape">逃生</label>
                            </div>
                        </div>
                        <div class="form-group" style="padding: 2rem;">
                            <div class="panel panel-info ">
                                <div class="panel-heading">英雄技能</div>
                                <div class="panel-body">
                                    <div class="skills panel-group">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <a class="panel-title"data-toggle="collapse" href="javascript:;" data-target="#skill1">
                                                    基本技能一
                                                </a>
                                            </div>
                                            <div id="skill1" class="panel-collapse collapse in">
                                                <div class="panel-body">
                                                    <div class="form-group">
                                                        <label for="skillName" class="col-sm-2 control-label">技能名称</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="skillName">
                                                        </div>
                                                        <label for="damageType" class="col-sm-2 control-label">伤害类型</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="damageType">
                                                        </div>
                                                        <label for="coldDown" class="col-sm-2 control-label">冷却时间</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="coldDown">
                                                        </div>
                                                        <label for="needMana" class="col-sm-2 control-label">消耗蓝量</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="needMana">
                                                        </div>
                                                        <label for="skillDescription" class="col-sm-2 control-label">技能描述</label>
                                                        <div class="col-sm-8">
                                                        <textarea name="skillDescription" id="" cols="50" rows="5"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <a class="panel-title"data-toggle="collapse" href="javascript:;" data-target="#skill2">
                                                    基本技能二
                                                </a>
                                            </div>
                                            <div id="skill2" class="panel-collapse collapse ">
                                                <div class="panel-body">
                                                    <div class="form-group">
                                                        <label for="skillName" class="col-sm-2 control-label">技能名称</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="skillName">
                                                        </div>
                                                        <label for="damageType" class="col-sm-2 control-label">伤害类型</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="damageType">
                                                        </div>
                                                        <label for="coldDown" class="col-sm-2 control-label">冷却时间</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="coldDown">
                                                        </div>
                                                        <label for="needMana" class="col-sm-2 control-label">消耗蓝量</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="needMana">
                                                        </div>
                                                        <label for="skillDescription" class="col-sm-2 control-label">技能描述</label>
                                                        <div class="col-sm-8">
                                                            <textarea name="skillDescription" id="" cols="50" rows="5"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <a class="panel-title"data-toggle="collapse" href="javascript:;" data-target="#skill3">
                                                    基本技能三
                                                </a>
                                            </div>
                                            <div id="skill3" class="panel-collapse collapse ">
                                                <div class="panel-body">
                                                    <div class="form-group">
                                                        <label for="skillName" class="col-sm-2 control-label">技能名称</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="skillName">
                                                        </div>
                                                        <label for="damageType" class="col-sm-2 control-label">伤害类型</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="damageType">
                                                        </div>
                                                        <label for="coldDown" class="col-sm-2 control-label">冷却时间</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="coldDown">
                                                        </div>
                                                        <label for="needMana" class="col-sm-2 control-label">消耗蓝量</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="needMana">
                                                        </div>
                                                        <label for="skillDescription" class="col-sm-2 control-label">技能描述</label>
                                                        <div class="col-sm-8">
                                                            <textarea name="skillDescription" id="" cols="50" rows="5"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <a class="panel-title"data-toggle="collapse" href="javascript:;" data-target="#megaSkill">
                                                    终极技能
                                                </a>
                                            </div>
                                            <div id="megaSkill" class="panel-collapse collapse ">
                                                <div class="panel-body">
                                                    <div class="form-group">
                                                        <label for="skillName" class="col-sm-2 control-label">技能名称</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="skillName">
                                                        </div>
                                                        <label for="damageType" class="col-sm-2 control-label">伤害类型</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="damageType">
                                                        </div>
                                                        <label for="coldDown" class="col-sm-2 control-label">冷却时间</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="coldDown">
                                                        </div>
                                                        <label for="needMana" class="col-sm-2 control-label">消耗蓝量</label>
                                                        <div class="col-sm-4">
                                                            <input type="text" class="form-control" placeholder="" name="needMana">
                                                        </div>
                                                        <label for="skillDescription" class="col-sm-2 control-label">技能描述</label>
                                                        <div class="col-sm-8">
                                                            <textarea name="skillDescription" id="" cols="50" rows="5"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="form-group">
                            <label for="heroPic" class="col-sm-2 control-label">英雄图片</label>
                            <div class="col-sm-4"style="padding-top:7px;" >
                                <input  type="file" id="heroPic" name="heroPic">
                            </div>
                        </div>
                        <div class="form-group pull-right">
                            <input type="button" id="confirmBtn" name="confirm" class="btn btn-default" value="添加英雄">
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</div>
<script>
    $(function () {
        $('#confirmBtn').click(function () {
            $(this).bind('blur', function () {
                return true;
            });
            var element = this;//保存下当前的按钮，为以后失去焦点做准备
            var filePic = new FormData($("#heroForm")[0]);
            filePic.append("heroPic",$("#heroPic")[0].files[0]);
            filePic.append("type","addHero");
            var heroPositionArray = [];
            $(".heroPosition").each(function(){
               if($(this).prop("checked")==true){
                   heroPositionArray.push("1");
               }else{
                   heroPositionArray.push("0");
               }
            });
            var skills = {};
            skills["skillName"] = new Array();
            skills["damageType"] = new Array();
            skills["coldDown"] = new Array();
            skills["needMana"] = new Array();
            skills["skillDescription"] = new Array();
            $(".skills input,.skills textarea").each(function () {
                switch($(this).attr("name")){
                    case "skillName":
                        skills["skillName"].push($(this).val());
                        break;
                    case "damageType":
                        skills["damageType"].push($(this).val());
                        break;
                    case "coldDown":
                        skills["coldDown"].push($(this).val());
                        break;
                    case "needMana":
                        skills["needMana"].push($(this).val());
                        break;
                    case "skillDescription":
                        skills["skillDescription"].push($(this).val());
                        break;
                }
            });
            filePic.append("skills",JSON.stringify(skills));
            filePic.append("heroPosition",heroPositionArray.join(","));
            $.ajax({
                url: "./comment.php",
                type: "post",
                cache: false,
                contentType: false,
                processData: false,
                data:filePic,
                dataType: 'JSON',
                success: function (response) {
                    console.log(response.addResult);
//                    refreshPager(response.comments,"pageBtn");
//                    refreshCommentArea(CommentPage[0]);
                    $(element).blur();
                },
                error: function () {
                    alert("异常！");
                }
            })
        });
    })
</script>
</body>
</html>
