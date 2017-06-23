/**
 * Created by Lee on 2017/4/26.
 */
angular.module('quizApp').controller('newQuizController', ['$rootScope', '$scope', '$state', 'settings', function ($rootScope, $scope, $state, $stateParams, settings) {
    $scope.$on('$viewContentLoaded', function () {
        // 初始化
        App.initAjax();
        // 初始化页面布局 开始
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        //关闭侧边栏
        $rootScope.settings.layout.pageSidebarClosed = true;
        // 初始化页面布局 结束

        // console.log($('.nav-item.active').find('.nav-link').data('page-bar-index'));
        //改变位置
        page.changePageBar(getCookie('currentSideBar'));

        var loginInfo = getLogin();
        if (loginInfo == null) {
            window.location.href = WebUrl() + 'html/login.html';
        }
        console.log('成功进入newQuizController')
        //初始化步骤
        var param = JSON.parse($state.params.param);
        var newQuizFormWizard = function () {


            return {

                //页面的一些变量
                openCode: null,
                quizAllData: {},
                askTem: {},
                askTypeChangeFlag: true,
                editAskFlag: null,
                leeWysihtml5: null,
                editor: null,
                quizBookmark: null,
                askOldIndex: null,
                askActionHtml: '<div class="actions quiz-input-action hide"><div class="btn-group"> <a class="btn btn-circle btn-default " href="javascript:;" data-toggle="dropdown"><i class="fa fa-"></i> 操作 <i class="fa fa-angle-down"></i> </a> <ul class="dropdown-menu pull-right"> <li> <a class="editAsk" href="javascript:;"> <i class="fa fa-pencil"></i>修改</a> </li> <li> <a class="deleteAsk" href="javascript:;"> <i class="fa fa-trash-o"></i>删除</a> </li> </ul> </div></div>',

                // 打开未发布的问卷继续配置时要做的处理
                initQuizConfigForStatus1: function () {
                    var newQuiz = this;
                    $('[name=quizName]').val(newQuiz.quizAllData.quiz.name).parent().parent().addClass('has-success');
                    if (isValid(newQuiz.quizAllData.quiz.title, 2)) {
                        $('[name=quizTitle]').val(newQuiz.quizAllData.quiz.title).parent().parent().addClass('has-success');
                    }
                    if (isValid(newQuiz.quizAllData.quiz.subtitle, 2)) {
                        $('[name=quizSubtitle]').val(newQuiz.quizAllData.quiz.subtitle);
                    }
                    $('[name=layoutStyle]').val(newQuiz.quizAllData.quiz.layoutStyle).select2().toggle('change');
                    $('[name=layoutStyle]').val(newQuiz.quizAllData.quiz.layoutStyle).parent().parent().addClass('has-success');
                    page.initFinish();
                },
                //页面初始化入口
                init: function (obj) {
                    var newQuiz = this;
                    newQuiz.quizAllData = obj.quizAllData;
                    newQuiz.openCode = obj.openCode;
                    //打开未发布的问卷继续配置时要做的处理
                    if ((newQuiz.quizAllData.quiz.status == '1' && newQuiz.openCode == '2') || newQuiz.openCode == '3') {
                        // newQuiz.askOrder = newQuiz.quizAllData.ask.askList.length;
                        newQuiz.askIndex = newQuiz.quizAllData.ask.askList.length;
                        newQuiz.initQuizConfigForStatus1();
                    }
                    if (!jQuery().bootstrapWizard) {
                        return;
                    }

                    function format(state) {
                        if (!state.id) return state.text; // optgroup
                        return "<img class='flag' src='../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
                    }

                    $(".select2").select2({
                        allowClear: false,
                        formatResult: format,
                        width: 'auto',
                        formatSelection: format,
                        escapeMarkup: function (m) {
                            return m;
                        }
                    });

                    // 时间控件设置
                    // 初始时间
                    var nowDateTime = moment((moment().format('YYYY-MM-DD'))).add(1, 'days');
                    // console.log(nowDateTime.format('YYYY-MM-DD HH:mm'));
                    $('#releaseDateTime,#finishDateTime').datetimepicker({
                        format: "YYYY-MM-DD HH:mm",
                        dayViewHeaderFormat: 'YYYY MMMM',
                        locale: 'zh-CN',
                        defaultDate: nowDateTime.format('YYYY-MM-DD HH:mm'),
                        minDate: (moment().format('YYYY-MM-DD HH:mm')).slice(0, -2) + '00',
                        stepping: 10,
                        useCurrent: false
                    });
                    $('#releaseDateTime,#finishDateTime').val('');
                    $("#releaseDateTime").on("dp.change", function (e) {
                        $('#finishDateTime').data("DateTimePicker").minDate(e.date);
                    });
                    $("#finishDateTime").on("dp.change", function (e) {
                        $('#releaseDateTime').data("DateTimePicker").maxDate(e.date);
                    });
                    // 时间控件设置 结束

                    var form = $('#submitForm');
                    var error = $('.alert-danger', form);
                    var success = $('.alert-success', form);

                    form.validate({
                        doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                        errorElement: 'span', //default input error message container
                        errorClass: 'help-block help-block-error', // default input error message class
                        focusInvalid: false, // do not focus the last invalid input
                        rules: {
                            //创建问卷
                            quizName: {
                                minlength: 5,
                                required: true
                            },
                            quizTitle: {
                                minlength: 4,
                                required: true
                            },
                            layoutStyle: {
                                required: true
                            }
                        },

                        messages: {
                            // 创建问卷
                            quizName: {
                                minlength: '问卷名称不少于5个字',
                                required: '问卷名称必须填写'
                            },
                            quizTitle: {
                                minlength: '问卷名称不少于4个字',
                                required: '问卷标题必须填写'
                            },
                            layoutStyle: {
                                required: '问卷布局方式必须填写'
                            }
                        },

                        errorPlacement: function (error, element) { // render error placement for each input type
                            if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
                                error.insertAfter("#form_gender_error");
                            } else if (element.attr("name") == "payment[]") { // for uniform checkboxes, insert the after the given container
                                error.insertAfter("#form_payment_error");
                            } else {
                                error.insertAfter(element); // for other inputs, just perform default behavior
                            }
                        },

                        invalidHandler: function (event, validator) { //display error alert on form submit
                            success.hide();
                            error.show();
                            App.scrollTo(error, -200);
                        },

                        highlight: function (element) { // hightlight error inputs
                            $(element)
                                .closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
                        },

                        unhighlight: function (element) { // revert the change done by hightlight
                            $(element)
                                .closest('.form-group').removeClass('has-error'); // set error class to the control group
                        },

                        success: function (label) {
                            if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
                                label
                                    .closest('.form-group').removeClass('has-error').addClass('has-success');
                                label.remove(); // remove error label here
                            } else { // display success icon for other inputs
                                label
                                    .addClass('valid') // mark the current input as valid and display OK icon
                                    .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                            }
                        },

                        submitHandler: function (form) {
                            success.show();
                            error.hide();
                            form[0].submit();
                            //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                        }

                    });

                    var displayConfirm = function () {
                        $('#tab4 .form-control-static', form).each(function () {
                            var input = $('[name="' + $(this).attr("data-display") + '"]', form);
                            if (input.is(":radio")) {
                                input = $('[name="' + $(this).attr("data-display") + '"]:checked', form);
                            }
                            if (input.is(":text") || input.is("textarea")) {
                                $(this).html(input.val());
                            } else if (input.is("select")) {
                                $(this).html(input.find('option:selected').text());
                            } else if (input.is(":radio") && input.is(":checked")) {
                                $(this).html(input.attr("data-title"));
                            } else if ($(this).attr("data-display") == 'payment[]') {
                                var payment = [];
                                $('[name="payment[]"]:checked', form).each(function () {
                                    payment.push($(this).attr('data-title'));
                                });
                                $(this).html(payment.join("<br>"));
                            }
                        });
                    }

                    var handleTitle = function (tab, navigation, index) {
                        var total = navigation.find('li').length;
                        var current = index + 1;
                        // set wizard title
                        $('.step-title', $('#newQuizForm')).text('Step ' + (index + 1) + ' of ' + total);
                        // set done steps
                        jQuery('li', $('#newQuizForm')).removeClass("done");
                        var li_list = navigation.find('li');
                        for (var i = 0; i < index; i++) {
                            jQuery(li_list[i]).addClass("done");
                        }

                        if (current == 1) {
                            $('#newQuizForm').find('.button-previous').hide();
                        } else {
                            $('#newQuizForm').find('.button-previous').show();
                        }

                        if (current >= total) {
                            $('#newQuizForm').find('.button-next').hide();
                            $('#newQuizForm').find('#saveQuizConfig').show();
                            $('#newQuizForm').find('#release').show();
                            displayConfirm();
                        } else {
                            $('#newQuizForm').find('.button-next').show();
                            $('#newQuizForm').find('#saveQuizConfig').hide();
                            $('#newQuizForm').find('#release').hide();
                        }
                        // App.scrollTo($('.page-title'));
                        return true;
                    };

                    //普通模式下的新的一页，返回html字符串
                    var newQuizPageForNormal = function (index) {
                        var page =
                            '<div class="row quiz-page quiz-page' + index + '">' +
                            '<div class="col-sm-6 quiz-col quiz' + index + '-col1">' +
                            '</div>' +
                            '<div class="col-sm-6 quiz-col quiz' + index + '-col2"></div>' +
                            '</div>';
                        return page;
                    };

                    //打开未发布的问卷继续配置时要做的处理
                    var initAskListForStatus1 = function () {
                        page.loading();
                        $('.quiz-body').html('').html(newQuizPageForNormal(1));
                        newQuiz.quizBookmark = {
                            quiz: '1',
                            col: '1',
                        }
                        console.log(newQuiz.quizAllData);
                        for (var i = 0; i < newQuiz.quizAllData.ask.askList.length; i++) {
                            appendNewAsk(newQuiz.quizBookmark, newQuiz.quizAllData.quiz.layoutStyle, newQuiz.quizAllData.ask.askList[i]);
                        }
                        $('.quiz-body').find('[type=radio],[type=checkbox]').prop('checked', false);
                        page.initFinish();
                    };

                    // 根据不同布局方式设置'配置问卷'界面的标签
                    var prepareForQuizConfig = function () {
                        // 设置标题和副标题
                        if ($('.quiz-title').text() == newQuiz.quizAllData.quiz.title) {
                            if (isValid(newQuiz.quizAllData.quiz.subtitle, 1)) {
                                if (newQuiz.quizAllData.quiz.subtitle != $('.quiz-subtitle').text()) {
                                    $('.quiz-subtitle').text('-' + newQuiz.quizAllData.quiz.subtitle);
                                }
                            }
                            else {
                                $('.quiz-subtitle').text('');
                            }
                        }
                        else {
                            var $subtitle = '';
                            if (isValid(newQuiz.quizAllData.quiz.subtitle, 1)) {
                                if (newQuiz.quizAllData.quiz.subtitle != $('.quiz-subtitle').text('')) {
                                    $subtitle = $('.quiz-subtitle').text('-' + newQuiz.quizAllData.quiz.subtitle).remove();
                                }
                            }
                            else {
                                $subtitle = $('.quiz-subtitle').text('').remove();

                            }
                            $('.quiz-title').text(newQuiz.quizAllData.quiz.title).append($subtitle);
                        }

                        // 根据不同布局方式设置bootstrap的row和col
                        var quizBodyLayoutHtml = '';
                        var $quizBody = $('.quiz-body');
                        switch (newQuiz.quizAllData.quiz.layoutStyle) {
                            case '001':
                                quizBodyLayoutHtml = newQuizPageForNormal(1);
                                newQuiz.quizBookmark = {
                                    quiz: 1,
                                    col: 1
                                };
                                break;
                            case
                            '002'
                            :
                                break;
                            case
                            '010'
                            :
                                break;
                        }
                        $quizBody.find('>div').html(quizBodyLayoutHtml);

                        //处理问卷数据
                        switch (newQuiz.quizAllData.quiz.status) {
                            case '0':
                                //新生成的问卷还没有存导数据库的问卷需要初始化newQuiz.quizAllData.ask
                                if (newQuiz.openCode != '3') {
                                    newQuiz.quizAllData.ask = {
                                        quizID: newQuiz.quizAllData.quiz.quizID,
                                        templateFlag: newQuiz.quizAllData.ask.templateFlag,
                                        askList: []
                                    };
                                }
                                // if (newQuiz.quizAllData.askOrderIndex == undefined) {
                                //     newQuiz.quizAllData.askOrderIndex = 0;
                                // }
                                break;
                            case '1':
                                //未发布的问卷需要显示已经配好的题目内容以便修改
                                break;
                        }

                    };

                    // 渲染编辑框内容为题目
                    var previewBtnClick = function () {
                        $('#previewArea').html('').addClass('hide');
                        var editorHtml = $(newQuiz.editor.currentView.element).html();
                        var editorHtmlArr = ($(newQuiz.editor.currentView.element).html()).split('<br>');
                        var $ask = $('<div class="form-group form-md-line-input form-md-radios quiz-input"></div>');
                        var $askList = $('<div class="md-radio-list"></div>');
                        var $p1 = $('<p></p>');
                        var $p1Index = $('<span class="quiz-ask-index">' + (newQuiz.askIndex + 1) + '.</span>');
                        $p1.append($p1Index);
                        $p1.append(editorHtmlArr[0]);
                        $askList.append($p1);
                        // var $pContent = '';
                        for (var i = 0; i < editorHtmlArr.length; i++) {
                            var $arrItem = $('<div>' + editorHtmlArr[i] + '</div>');
                            $('#previewArea').append($arrItem);
                            console.log($('#previewArea').find('>div').eq(i).html());
                            console.log($('#previewArea').find('>div').eq(i).text());
                            if (editorHtmlArr[i] != '') {
                                if ($('#previewArea').find('>div').eq(i).html() == $('#previewArea').find('>div').eq(i).text()) {
                                    if (i == 0) {
                                        continue;
                                    }
                                    var $p = $('<p></p>');
                                    $p.append(editorHtmlArr[i]);
                                    $askList.append($p);
                                }
                                else {
                                    if (i == 0) {
                                        return false;
                                    }
                                    else {
                                        switch ($('<div>' + editorHtmlArr[i] + '</div>').find('[data-input-type]').data('input-type')) {
                                            case '001':
                                                var $div = $('<div class="md-radio"></div>');
                                                $div.append($(editorHtmlArr[i]));
                                                var $label = $('<label for="' + $(editorHtmlArr[i]).attr('id') + '"></label>');
                                                $label.append('<span class="inc"></span>');
                                                $label.append('<span class="check"></span>');
                                                $label.append('<span class="box"></span>');
                                                $label.append($('#previewArea').find('>div').eq(i).text());
                                                $div.append($label);
                                                $askList.append($div);
                                                break;
                                            case '002':
                                                var $div = $('<div class="md-checkbox"></div>');
                                                $div.append($(editorHtmlArr[i]));
                                                var $label = $('<label for="' + $(editorHtmlArr[i]).attr('id') + '"></label>');
                                                $label.append('<span class="inc"></span>');
                                                $label.append('<span class="check"></span>');
                                                $label.append('<span class="box"></span>');
                                                $label.append($('#previewArea').find('>div').eq(i).text());
                                                $div.append($label);
                                                $askList.append($div);
                                                break;
                                            case '003':
                                                var eleStr = editorHtmlArr[i].toString();
                                                eleStr = eleStr.replace('<input', '<*ELE*><input');
                                                var $div = $('<div class="md-radio">' + eleStr + '</div>');
                                                var textArr = $div.text().split('<*ELE*>');
                                                eleStr = eleStr.replace('<*ELE*>', '').replace(textArr[0], '').replace(textArr[1], '');
                                                $div = $('<div class="md-radio"></div>');
                                                //input前面有字
                                                if (textArr[0] != "") {
                                                    var $label = $('<label class="control-label quiz-input-label"></label>');
                                                    $label.append(textArr[0]);
                                                    $div.append($label);
                                                }
                                                $div.append($('<div class="quiz-inline-input">' + eleStr + '</div>'));
                                                //input后面有字
                                                if (textArr[1] != "") {
                                                    var $label = $('<label class="control-label quiz-input-label"></label>');
                                                    $label.append(textArr[1]);
                                                    $div.append($label);
                                                }
                                                $askList.append($div);
                                                break;
                                            case '004':

                                                break;
                                        }
                                    }
                                }
                            }
                        }
                        $ask.append($askList);
                        $('#previewArea').html('').append($ask).removeClass('hide');
                        $('#previewArea').find('>div').data('editor-html', '').data('editor-html', editorHtml);
                    };

                    // 生成数据项的HTML
                    var getAskELeHtml = function () {
                        var AskEleType = $('#askEleType').val();
                        var askELeHtml = '';
                        if (isValid(AskEleType, 2)) {
                            switch (AskEleType) {
                                case '001':
                                    var eleID = '';
                                    var eleIndex;
                                    var statisticalAttr, statisticalNameAttr;
                                    if (!isValid($('#askEleType').find('option:selected').data('elementID'), 1)) {
                                        eleID = Guid.newGuid().toString('g');
                                        $('#askEleType').find('option:selected').data('elementID', eleID);
                                        eleIndex = 0;
                                        statisticalAttr = ($('#isStatistical').prop('checked') == false) ? '' : 'statistical';
                                        $('#askEleType').find('option:selected').data('statisticalAttr', statisticalAttr);
                                        if (statisticalAttr == 'statistical') {
                                            statisticalNameAttr = $('#statisticalName').val();
                                        }
                                        else {
                                            statisticalNameAttr = '';
                                        }
                                        $('#askEleType').find('option:selected').data('statisticalNameAttr', statisticalNameAttr);
                                    }
                                    else {
                                        eleID = $('#askEleType').find('option:selected').data('elementID');
                                        statisticalAttr = $('#askEleType').find('option:selected').data('statisticalAttr');
                                        statisticalNameAttr = $('#askEleType').find('option:selected').data('statisticalNameAttr');
                                        if ($(newQuiz.editor.composer.element).find('[name=rad' + eleID + ']').length <= 0) {
                                            eleIndex = 0;
                                        }
                                        else {
                                            eleIndex = parseInt($(newQuiz.editor.composer.element).find('[name=rad' + eleID + ']').last().val()) + 1;
                                        }
                                    }
                                    askELeHtml = '<input type="radio" id="rad' + (newQuiz.askIndex + 1) + '-' + eleID + '-' + eleIndex + '"data-input-type="' + AskEleType + '"data-ele-level="' + 1 + '" data-statistical="' + statisticalAttr + '" data-statistical-name="' + statisticalNameAttr + '" name="rad' + eleID + '" value="' + eleIndex + '" class="md-radiobtn">';
                                    break;
                                case '002':
                                    var eleID = '';
                                    var eleIndex;
                                    var statisticalAttr, statisticalNameAttr;
                                    if (!isValid($('#askEleType').find('option:selected').data('elementID'), 1)) {
                                        eleID = Guid.newGuid().toString('g');
                                        $('#askEleType').find('option:selected').data('elementID', eleID);
                                        eleIndex = 0;
                                        $('#askEleType').find('option:selected').data('elementIndex', 0);
                                        statisticalAttr = ($('#isStatistical').prop('checked') == false) ? '' : 'statistical';
                                        $('#askEleType').find('option:selected').data('statisticalAttr', statisticalAttr);
                                        if (statisticalAttr == 'statistical') {
                                            statisticalNameAttr = $('#statisticalName').val();
                                            console.log(statisticalNameAttr)
                                        }
                                        else {
                                            statisticalNameAttr = '';
                                        }
                                        $('#askEleType').find('option:selected').data('statisticalNameAttr', statisticalNameAttr);
                                    }
                                    else {
                                        eleID = $('#askEleType').find('option:selected').data('elementID');
                                        statisticalAttr = $('#askEleType').find('option:selected').data('statisticalAttr');
                                        statisticalNameAttr = $('#askEleType').find('option:selected').data('statisticalNameAttr');
                                        eleIndex = parseInt($('#askEleType').find('option:selected').data('elementIndex')) + 1;
                                        $('#askEleType').find('option:selected').data('elementIndex', eleIndex);
                                    }
                                    askELeHtml = '<input type="checkbox" id="rad' + (newQuiz.askIndex + 1) + '-' + eleID + '-' + eleIndex + '"data-input-type="' + AskEleType + '"data-ele-level="' + 1 + '" data-statistical="' + statisticalAttr + '"data-statistical-name="' + statisticalNameAttr + '"  name="rad' + eleID + '" value="' + eleIndex + '" class="md-check">';
                                    break;
                                case '003':
                                    var eleID = '';
                                    var eleIndex;
                                    var statisticalAttr, statisticalNameAttr;
                                    if (!isValid($('#askEleType').find('option:selected').data('elementID'), 1)) {
                                        eleID = Guid.newGuid().toString('g');
                                        $('#askEleType').find('option:selected').data('elementID', eleID);
                                        eleIndex = 0;
                                        $('#askEleType').find('option:selected').data('elementIndex', 0);
                                        statisticalAttr = ($('#isStatistical').prop('checked') == false) ? '' : 'statistical';
                                        $('#askEleType').find('option:selected').data('statisticalAttr', statisticalAttr);
                                        if (statisticalAttr == 'statistical') {
                                            statisticalNameAttr = $('#statisticalName').val();
                                        }
                                        else {
                                            statisticalNameAttr = '';
                                        }
                                        $('#askEleType').find('option:selected').data('statisticalNameAttr', statisticalNameAttr);
                                    }
                                    else {
                                        eleID = $('#askEleType').find('option:selected').data('elementID');
                                        statisticalAttr = $('#askEleType').find('option:selected').data('statisticalAttr');
                                        statisticalNameAttr = $('#askEleType').find('option:selected').data('statisticalNameAttr');
                                        eleIndex = parseInt($('#askEleType').find('option:selected').data('elementIndex')) + 1;
                                        $('#askEleType').find('option:selected').data('elementIndex', eleIndex);
                                    }
                                    askELeHtml = '<input type="text" id="txt' + (newQuiz.askIndex + 1) + '-' + eleID + '-' + eleIndex + '"data-input-type="' + AskEleType + '"data-ele-level="' + 1 + '" data-statistical="' + statisticalAttr + '" data-statistical-name="' + statisticalNameAttr + '" class="form-control">';
                                    break;
                                case '004':
                                    var eleID = '';
                                    var eleIndex;
                                    var statisticalAttr, statisticalNameAttr;
                                    if (!isValid($('#askEleType').find('option:selected').data('elementID'), 1)) {
                                        eleID = Guid.newGuid().toString('g');
                                        $('#askEleType').find('option:selected').data('elementID', eleID);
                                        eleIndex = 0;
                                        $('#askEleType').find('option:selected').data('elementIndex', 0);
                                        statisticalAttr = ($('#isStatistical').prop('checked') == false) ? '' : 'statistical';
                                        $('#askEleType').find('option:selected').data('statisticalAttr', statisticalAttr);
                                        if (statisticalAttr == 'statistical') {
                                            statisticalNameAttr = $('#statisticalName').val();
                                        }
                                        else {
                                            statisticalNameAttr = '';
                                        }
                                        $('#askEleType').find('option:selected').data('statisticalNameAttr', statisticalNameAttr);
                                    }
                                    else {
                                        eleID = $('#askEleType').find('option:selected').data('elementID');
                                        statisticalAttr = $('#askEleType').find('option:selected').data('statisticalAttr');
                                        statisticalNameAttr = $('#askEleType').find('option:selected').data('statisticalNameAttr');
                                        eleIndex = parseInt($('#askEleType').find('option:selected').data('elementIndex')) + 1;
                                        $('#askEleType').find('option:selected').data('elementIndex', eleIndex);
                                    }
                                    askELeHtml = '<input type="text" id="dttxt' + (newQuiz.askIndex + 1) + '-' + eleID + '-' + eleIndex + '"data-input-type="' + AskEleType + '"data-ele-level="' + 1 + '" data-statistical="' + statisticalAttr + '" data-statistical-name="' + statisticalNameAttr + '" class="form-control">';
                                    break;
                            }
                            return askELeHtml;
                        }
                        else {
                            return false;
                        }
                    };

                    // 显示相关统计信息
                    var getStatisticalInfo = function ($askEle) {
                        // console.log($askEle);
                        if ($askEle.attr('data-statistical') == 'statistical') {
                            $('#askEleType').val($askEle.attr('data-input-type')).select2().toggle('change');
                            $('#isStatistical').prop('checked', true);
                            $('#statisticalName').val($askEle.attr('data-statistical-name'));
                            $('#statisticalName').attr('data-input-type', $askEle.attr('data-input-type'));
                            if ($askEle.attr('data-input-type') == '001' || $askEle.attr('data-input-type') == '002') {
                                $('#statisticalName').attr('data-statistical-id', $askEle.attr('name'));
                            }
                            else {
                                $('#statisticalName').attr('data-statistical-id', $askEle.attr('id'));
                            }
                        }
                        else {
                            return;
                        }
                    };
                    var setStatistical = function () {
                        if ($('#isStatistical').prop('checked') == true) {
                            if ($('#statisticalName').attr('data-statistical-id') == '001' || $('#statisticalName').attr('data-statistical-id') == '002') {
                                if (isValid($('#statisticalName').attr('data-statistical-id'), 4)) {
                                    var $askELe = $(newQuiz.editor.composer.element)
                                        .find('#' + $('#statisticalName').attr('data-statistical-id'));
                                    $askELe.attr('data-statistical-name', $('#statisticalName').val());
                                }
                            }
                            else {
                                if (isValid($('#statisticalName').attr('data-statistical-id'), 4)) {
                                    var $askELe = $(newQuiz.editor.composer.element)
                                        .find('[name="' + $('#statisticalName').attr('data-statistical-id') + '"]');
                                    $askELe.attr('data-statistical-name', $('#statisticalName').val());
                                }
                            }
                        }
                        return;
                    };

                    // 添加数据项到编辑框
                    var addEleBtnClick = function () {
                        newQuiz.editor.currentView.element.focus();
                        var testHtml = getAskELeHtml();
                        if (typeof(testHtml) == 'string' && testHtml != '') {
                            var caretBookmark;
                            if (caretBookmark) {
                                newQuiz.editor.composer.selection.setBookmark(caretBookmark);
                            }
                            newQuiz.editor.composer.commands.exec("insertHTML", testHtml);
                            // console.log($(newQuiz.editor.composer.element).find(':not(div,br):not([contenteditable])'));
                            // $(newQuiz.editor.composer.element).find(':not(div,br):not([contenteditable])').attr('contenteditable', 'false');
                        }
                        // console.log($(newQuiz.editor.composer.element).find('[data-input-type]'));
                        $(newQuiz.editor.composer.element).find('[data-input-type]').off('click').on('click', function () {
                            getStatisticalInfo($(this));
                        });
                    };

                    //初始化编辑框
                    var handleWysihtml5 = function () {
                        if (!jQuery().wysihtml5) {
                            return;
                        }

                        if ($('.wysihtml5').size() > 0) {
                            $('.wysihtml5').wysihtml5({
                                "stylesheets": ["../assets/global/plugins/bootstrap-wysihtml5/wysiwyg-color.css"]
                            });
                            newQuiz.leeWysihtml5 = $('.wysihtml5').data('wysihtml5');
                            newQuiz.editor = newQuiz.leeWysihtml5.editor;
                            //渲染编辑框内容为题目
                            $('#previewBtn').off('click').on('click', previewBtnClick);
                            //添加数据项到编辑框
                            $('#addEleBtn').off('click').on('click', addEleBtnClick);
                        }
                    };

                    var leeTabChange = function ($ele) {
                        if ($ele == '' || $ele.val() == '') {
                            $('.lee-tab-pane').removeClass('active');
                        }
                        else {
                            $($ele.data('target')).addClass('active');
                            $($ele.data('target')).siblings().removeClass('active');
                        }
                    }
                    // 初始化标签页
                    var initAskModalTab = function () {
                        //如果是下拉框的话就除了点击以外还需要需要在change时间里绑定
                        if ($('.lee-tab').hasClass('select2') || $('.lee-tab').tagName == 'SELECT') {
                            $('.lee-tab').on('change', (function () {
                                $(this).find('option:selected').each(function () {
                                    if ($(this).val() == '') {
                                        $('.lee-tab-pane').removeClass('active');
                                    }
                                    else {
                                        $($(this).data('target')).addClass('active');
                                        $($(this).data('target')).siblings().removeClass('active');
                                    }
                                })
                            }));
                        }
                        $('.lee-tab').find('[leetab]').each(function () {
                            $(this).click(function () {
                                leeTabChange($(this));
                            })
                        });
                    };


                    // 多标签页时获得题目所在标签
                    var getCurrentQuizTab = function () {

                    };
                    //点击添加按钮时要做的工作
                    var askModalOpenClick = function () {
                        newQuiz.editAskFlag = false;
                        newQuiz.askTem = {};
                        newQuiz.askTem.askID = Guid.newGuid().toString('g');
                        // if (!isValid(newQuiz.askOrder, 1)) {
                        //     newQuiz.askOrder = 0;
                        // }
                        // newQuiz.askTem.askOrder = newQuiz.askOrder + 1;
                        if (newQuiz.quizAllData.quiz.layoutStyle == '010') {
                            newQuiz.askTem.tabCode = getCurrentQuizTab();
                        }
                        else {
                            newQuiz.askTem.tabCode = null;
                        }
                        if (!isValid(newQuiz.askIndex, 1)) {
                            newQuiz.askIndex = 0;
                        }
                        newQuiz.askTem.askIndex = newQuiz.askIndex + 1;
                        newQuiz.askTem.askEleList = [];
                        handleWysihtml5();
                    };

                    // 还原编辑框
                    var resetAskEditor = function () {
                        var $parent = $('#askEditor').parent();
                        var $remain = $('#askEditor').remove();
                        $parent.empty();
                        $remain.css('display', 'block').val('');
                        $parent.append($remain);
                        console.log('还原了');
                    };
                    //关闭添加题目模态框要做的处理
                    var resetAskModal = function () {
                        // 编辑框
                        resetAskEditor();

                        // 控件
                        $('#askType,#askEleType').find('option').removeData();
                        $('#askType,#askEleType').val(null).select2().toggle('change');
                        newQuiz.askTypeChangeFlag = true;
                        $('#isStatistical').prop('checked', false);
                        $('#statisticalName').val('');
                        $('#statisticalName').removeAttr('data-input-type').removeAttr('data-statistical-id');
                        $('#addEleBtn').parent().addClass('hide');
                        $('.ask-ele-type-tips').addClass('display-none');
                        $('#previewArea').html('').addClass('hide');
                        leeTabChange('');
                        // 数据
                    };

                    // 关闭添加题目模态框事件
                    var askModalCloseClick = function () {
                        if (!newQuiz.editAskFlag) {
                            bootbox.confirm({
                                message: "返回会清空当前题目配置信息，确定返回?",
                                buttons: {
                                    confirm: {
                                        label: '确定',
                                        className: 'green'
                                    },
                                    cancel: {
                                        label: '取消',
                                        className: 'btn-outline dark'
                                    }
                                },
                                callback: function (result) {
                                    // console.log(result);
                                    if (result) {
                                        resetAskModal();
                                        $(this).on('hidden.bs.modal', function () {
                                            $('#newQuizAsk').modal('toggle');
                                        });
                                    }
                                    else {

                                    }
                                }
                            });
                        }
                        else {
                            resetAskModal();
                            $('#newQuizAsk').modal('toggle');
                            newQuiz.askIndex = newQuiz.askOldIndex;
                        }
                    };

                    // 改变题目类型时初始化编辑框中的内容
                    var initAskEditorHtml = function (AskEleType) {
                        // editor.currentView.element
                        switch (AskEleType) {
                            case '001':
                                if(!newQuiz.editAskFlag){
                                    $(newQuiz.editor.currentView.element).html('');
                                }
                                break;
                            case '002':
                                if(!newQuiz.editAskFlag){
                                    $(newQuiz.editor.currentView.element).html('');
                                }
                                break;
                        }
                    };

                    // 改变题目类型时重新加载数据项类型
                    var reloadAskEleType = function () {
                        var AskEleType = $('#askType').find('option:selected').val();
                        switch (AskEleType) {
                            case '001':
                                $('#askEleType').find('option:not([value="001"],[value="002"])').attr('disabled', 'disabled');
                                $('#askEleType').select2({
                                    allowClear: false,
                                    formatResult: format,
                                    width: 'auto',
                                    formatSelection: format,
                                    escapeMarkup: function (m) {
                                        return m;
                                    }
                                });
                                break;
                            case '002':
                                $('#askEleType').find('option:not([value="001"],[value="002"])').removeAttr('disabled');
                                $('#askEleType').select2({
                                    allowClear: false,
                                    formatResult: format,
                                    width: 'auto',
                                    formatSelection: format,
                                    escapeMarkup: function (m) {
                                        return m;
                                    }
                                });
                                break;
                        }
                        initAskEditorHtml(AskEleType);
                    };

                    var warningBeforeAskEleTypeClickForChange = function () {
                        if ($('#askType').val() == '' || newQuiz.askTypeChangeFlag == true) {
                            newQuiz.askTypeChangeFlag = false;
                            return true;
                        }
                        else {
                            $('#askAlert').modal('toggle');
                            return false;
                        }

                    };

                    // 改变数据项类型下拉框所做的处理
                    var askEleTypeChangeClick = function () {

                        if ($('#askEleType').find('option:selected').length == 1) {
                            //首先对添加按钮进行显示
                            $('#addEleBtn').parent().removeClass('hide');
                            $('.ask-ele-type-tips').removeClass('display-none');
                            if ($('#askEleType').find('option:selected').data('statisticalAttr') == '') {
                                $('#isStatistical').prop('checked', false);
                            }
                            else if ($('#askEleType').find('option:selected').data('statisticalAttr') == 'statistical') {
                                $('#isStatistical').prop('checked', true);
                            }
                            else if ($('#askEleType').find('option:selected').data('statisticalAttr') == undefined) {
                                $('#isStatistical').prop('checked', false);
                                $('#askEleType').find('option:selected').data('statisticalAttr', '');
                            }
                            if(!newQuiz.editAskFlag){
                                $(newQuiz.editor.currentView.element).html('');
                            }

                        }
                        else {
                            $('#addEleBtn').parent().addClass('hide');
                            $('.ask-ele-type-tips').addClass('display-none');
                        }
                    };

                    // 单个数据项
                    var getAskEle = function (askType, askEleList) {
                        var $area = $('#previewArea');
                        $('#askEleType').find('>option:not(:first)').each(function () {
                            if ($area.find('[data-input-type=' + $(this).val() + ']').length != 0) {
                                var $askEle = $area.find('[data-input-type=' + $(this).val() + ']').eq(0);
                                var askEle = {};
                                switch (askType) {
                                    case '001':
                                        switch ($(this).val()) {
                                            case '001':
                                                askEle.elementID = $askEle.attr('name');
                                                askEle.elementType = '001';
                                                askEle.elementLevel = $askEle.data('ele-level');
                                                askEle.statisticalFlag = $askEle.data('statistical') == 'statistical' ? 1 : 0;
                                                askEleList.push(askEle);
                                                break;
                                            case '002':
                                                askEle.elementID = $askEle.attr('name');
                                                askEle.elementType = '002';
                                                askEle.elementLevel = $askEle.data('ele-level');
                                                askEle.statisticalFlag = $askEle.data('statistical') == 'statistical' ? 1 : 0;
                                                askEleList.push(askEle);
                                                break;
                                        }
                                        break;
                                    case '002':
                                        switch ($(this).val()) {
                                            case '001':
                                                askEle.elementID = $askEle.attr('name');
                                                askEle.elementType = '001';
                                                askEle.elementLevel = $askEle.data('ele-level');
                                                askEle.statisticalFlag = $askEle.data('statistical') == 'statistical' ? 1 : 0;
                                                askEleList.push(askEle);
                                                break;
                                            case '002':
                                                askEle.elementID = $askEle.attr('name');
                                                askEle.elementType = '002';
                                                askEle.elementLevel = $askEle.data('ele-level');
                                                askEle.statisticalFlag = $askEle.data('statistical') == 'statistical' ? 1 : 0;
                                                askEleList.push(askEle);
                                                break;
                                            case '003':
                                                $askEle = $area.find('[data-input-type=' + $(this).val() + ']')
                                                for (var i = 0; i < $askEle.length; i++) {
                                                    askEle = {};
                                                    askEle.elementID = $askEle.eq(i).attr('id');
                                                    askEle.elementType = '003';
                                                    askEle.elementLevel = $askEle.eq(i).data('ele-level');
                                                    askEle.statisticalFlag = $askEle.eq(i).data('statistical') == 'statistical' ? 1 : 0;
                                                    askEleList.push(askEle);
                                                }
                                                break;
                                            case '004':
                                                $askEle = $area.find('[data-input-type=' + $(this).val() + ']')
                                                for (var i = 0; i < $askEle.length; i++) {
                                                    askEle.elementID = $askEle.eq(i).attr('id');
                                                    askEle.elementType = '004';
                                                    askEle.elementLevel = $askEle.eq(i).data('ele-level');
                                                    askEle.statisticalFlag = $askEle.eq(i).data('statistical') == 'statistical' ? 1 : 0;
                                                    askEleList.push(askEle);
                                                }
                                                break;
                                        }
                                        break;
                                }
                            }

                        });
                        return;
                    };

                    // 添加到页面时获取数据项数组
                    var getAskELeList = function (askType) {
                        var askEleList = [];
                        if (askType == undefined) {
                            getAskEle(newQuiz.askTem.askType, askEleList);
                        }
                        else {
                            getAskEle(askType, askEleList)
                        }
                        return askEleList;
                    };

                    // 根据题目获取预览前HTML
                    var getAskEditorHtml = function (askData) {
                        var askEditorHtmlArr = [];
                        // console.log(askData.askContent);
                        var $ask = $(askData.askContent);
                        var $eleArr = $ask.find('.md-radio-list').children();
                        for (var i = 0; i < $eleArr.length; i++) {
                            if ($eleArr.html() != '') {
                                if ($eleArr.eq(i)[0].tagName == 'P') {
                                    askEditorHtmlArr.push($eleArr.eq(i).text()
                                        .replace($eleArr.eq(i).find('.quiz-ask-index').text(), ''));
                                }
                                else if ($eleArr.eq(i)[0].tagName == 'DIV') {
                                    switch ($eleArr.eq(i).find('[data-input-type]').data('input-type')) {
                                        case '001':
                                            askEditorHtmlArr.push($eleArr.eq(i).find('input').prop("outerHTML") + $eleArr.eq(i).text());
                                            break;
                                        case '002':
                                            askEditorHtmlArr.push($eleArr.eq(i).find('input').prop("outerHTML") + $eleArr.eq(i).text());
                                            break;
                                        case '003':
                                            askEditorHtmlArr.push($eleArr.eq(i).find('.control-label:first-child').text() + $eleArr.eq(i).find('input').prop("outerHTML") + $eleArr.eq(i).find('.control-label:last-child').text());
                                            break;
                                        case '004':
                                            askEditorHtmlArr.push($eleArr.eq(i).find('.control-label:first-child').text() + $eleArr.eq(i).find('input').prop("outerHTML") + $eleArr.eq(i).find('.control-label:last-child').text());
                                            break;
                                    }
                                }
                            }
                        }
                        return askEditorHtmlArr.join('<br>');
                    };

                    // 删除题目
                    var deleteAskOpenClick = function (askData) {
                        // page.loading();
                        newQuiz.quizAllData.ask.askList.splice(askData.askIndex - 1, 1);
                        for (var i = 0; i < newQuiz.quizAllData.ask.askList.length; i++) {
                            newQuiz.quizAllData.ask.askList[i].askIndex = i + 1;
                            var $tem = $('<div></div>').append(newQuiz.quizAllData.ask.askList[i].askContent);
                            $tem.find('.quiz-ask-index').html(newQuiz.quizAllData.ask.askList[i].askIndex + '.');
                            newQuiz.quizAllData.ask.askList[i].askContent = $tem.html();
                        }
                        newQuiz.askIndex--;
                        initAskListForStatus1();
                        // page.initFinish();
                    };

                    //编辑题目
                    var editAskOpenClick = function (askData) {
                        handleWysihtml5();
                        newQuiz.askOldIndex = parseInt(newQuiz.askIndex);
                        console.log(askData.askIndex);
                        newQuiz.askIndex = parseInt(askData.askIndex - 1);
                        $('#newQuizAsk').on('shown.bs.modal', function () {
                            if (newQuiz.editAskFlag) {
                                $('#askType').val(askData.askType).select2().toggle('change');
                                reloadAskEleType();
                                leeTabChange($('#askType').find('option:selected'));
                                for (var i = 0; i < askData.askEleList.length; i++) {
                                    var elementID = '';
                                    switch (askData.askEleList[i].elementType) {
                                        case '001':
                                            elementID = askData.askEleList[i].elementID.slice(-36);
                                            break;
                                        case '002':
                                            elementID = askData.askEleList[i].elementID.slice(-36);
                                            break;
                                        case '003':
                                            elementID = askData.askEleList[i].elementID.slice(-36);
                                            break;
                                        case '004':
                                            elementID = askData.askEleList[i].elementID.slice(-36);
                                            break;
                                    }
                                    $('#askEleType').val(askData.askEleList[i].elementType).find('option:selected').data('elementID', elementID);
                                    var statisticalAttr = (askData.askEleList[i].statisticalFlag == 1) ? 'statistical' : '';
                                    $('#askEleType').find('option:selected').data('statisticalAttr', statisticalAttr);
                                }
                                $('#askEleType').val('');
                                newQuiz.editor.currentView.element.focus();
                                var askEditorHtml = getAskEditorHtml(askData);
                                console.log(askEditorHtml);
                                var caretBookmark;
                                if (caretBookmark) {
                                    newQuiz.editor.composer.selection.setBookmark(caretBookmark);
                                }
                                newQuiz.editor.composer.commands.exec('insertHtml', askEditorHtml);
                                $(newQuiz.editor.composer.element).find('[data-input-type]').off('click').on('click', function () {
                                    getStatisticalInfo($(this));
                                });
                                previewBtnClick();
                            }
                        });
                    };

                    // 添加到页面
                    var appendNewAsk = function (quizBookmark, layoutStyle, askData) {
                        console.log(App.getViewPort());
                        var $askHtml, askEleID, $ask;
                        if (newQuiz.quizAllData.quiz.status == '0' && newQuiz.openCode != '3') {
                            $askHtml = $('#previewArea').html();
                            newQuiz.askTem.askType = $('#askType').val();
                            newQuiz.askTem.askContent = $askHtml;
                            newQuiz.askTem.askTitle = 'null';
                            // console.log(newQuiz.askTem);
                            newQuiz.askTem.askEleList = getAskELeList(newQuiz.askTem.askType);
                            askEleID = newQuiz.askTem.askID;
                            $ask = $('#previewArea').find('>div').detach();
                            $ask.prepend($(newQuiz.askActionHtml));
                        }
                        if ((newQuiz.quizAllData.quiz.status == '1' && newQuiz.openCode == '2') || newQuiz.openCode == '3') {
                            if (askData == undefined) {
                                $askHtml = $('#previewArea').html();
                                newQuiz.askTem.askType = $('#askType').val();
                                newQuiz.askTem.askContent = $askHtml;
                                newQuiz.askTem.askTitle = 'null';
                                // console.log(newQuiz.askTem);
                                newQuiz.askTem.askEleList = getAskELeList(newQuiz.askTem.askType);
                                askEleID = newQuiz.askTem.askID;
                                $ask = $('#previewArea').find('>div').detach();
                                $ask.prepend($(newQuiz.askActionHtml));
                            }
                            else {
                                askEleID = askData.askID;
                                $askHtml = askData.askContent;
                                $ask = $($askHtml).prepend($(newQuiz.askActionHtml));
                            }
                        }
                        $(document).on('mouseover', '.quiz-input,.quiz-input *', function () {
                            $('.quiz-input-action').removeClass('hide');
                        }).on('mouseleave', '.quiz-input', function () {
                            setTimeout(function () {
                                $('.quiz-input-action').addClass('hide')
                            }, 800);
                        });
                        if (newQuiz.quizAllData.quiz.status == '0' || askData == undefined) {
                            page.loading();
                        }
                        switch (layoutStyle) {
                            case '001':
                                // console.log($('.quiz1-col1').height());
                                var $col = $('.quiz' + quizBookmark.quiz + '-col' + quizBookmark.col)
                                newQuiz.askTem.pageCode = newQuiz.quizBookmark.quiz + ',' + newQuiz.quizBookmark.col;
                                $col.append($ask);
                                if ($col.find('>.quiz-input').length > 2) {
                                    if (quizBookmark.col == 2 && $col.height() > $('.quiz' + quizBookmark.quiz + '-col' + 1).height()) {
                                        newQuiz.quizBookmark.col = 1;
                                        var $newPage = $(newQuizPageForNormal(++newQuiz.quizBookmark.quiz));
                                        $('.quiz-body').append($newPage);
                                        $ask.detach();
                                        $col = $('.quiz' + newQuiz.quizBookmark.quiz + '-col' + 1);
                                        newQuiz.askTem.pageCode = newQuiz.quizBookmark.quiz + ',' + 1;
                                        $col.append($ask);
                                    }
                                    if ($col.height() <= App.getViewPort().height * (4 / 3)) {

                                    }
                                    else {
                                        if (quizBookmark.col == 2) {
                                            newQuiz.quizBookmark.col = 1;
                                            var $newPage = $(newQuizPageForNormal(++newQuiz.quizBookmark.quiz));
                                            $('.quiz-body>div').append($newPage);
                                            $ask.detach();
                                            $col = $('.quiz' + newQuiz.quizBookmark.quiz + '-col' + 1);
                                            newQuiz.askTem.pageCode = newQuiz.quizBookmark.quiz + ',' + 1;
                                            $col.append($ask);
                                        }
                                        else if (quizBookmark.col == 1) {
                                            $ask.detach();
                                            $col = $('.quiz' + quizBookmark.quiz + '-col' + 2);
                                            newQuiz.quizBookmark.col = 2;
                                            newQuiz.askTem.pageCode = newQuiz.quizBookmark.quiz + ',' + 2;
                                            $col.append($ask);
                                        }
                                    }
                                }
                                break;
                        }
                        // console.log(newQuiz.askTem);
                        // console.log(newQuiz.quizAllData.ask);
                        var _askTem = new Object(newQuiz.askTem);
                        $ask.find('.editAsk').on('click', function () {
                            newQuiz.editAskFlag = true;
                            $('#newQuizAsk').modal('toggle');
                            if (askData == undefined) {

                                editAskOpenClick(_askTem);
                            }
                            else {
                                // newQuiz.askTem;
                                editAskOpenClick(askData);
                            }
                        });
                        $ask.find('.deleteAsk').on('click', function () {
                            bootbox.confirm({
                                message: "删除后题目相关内容无法找回，确定删除?",
                                buttons: {
                                    confirm: {
                                        label: '确定',
                                        className: 'green'
                                    },
                                    cancel: {
                                        label: '取消',
                                        className: 'btn-outline dark'
                                    }
                                },
                                callback: function (result) {
                                    // console.log(result);
                                    if (result) {
                                        if (askData == undefined) {
                                            var _askTem = new Object(newQuiz.askTem);
                                            deleteAskOpenClick(_askTem);
                                        }
                                        else {
                                            // newQuiz.askTem;
                                            var _askTem = new Object(newQuiz.askTem);
                                            deleteAskOpenClick(askData);
                                        }
                                    }
                                    else {

                                    }
                                }
                            })
                        });
                        if (askData == undefined) {
                            newQuiz.quizAllData.ask.askList.push(newQuiz.askTem);
                            // console.log(newQuiz.quizAllData.ask);
                            newQuiz.askTem = {};
                            newQuiz.askIndex++;
                            page.initFinish();
                        }
                        // newQuiz.askOrder++;
                    };

                    //确认题目
                    var confirmAskClick = function () {
                        if (!$('#previewArea').hasClass('hide')) {
                            if (!newQuiz.editAskFlag) {
                                if (newQuiz.quizBookmark != undefined) {
                                    // appendNewAsk({quiz:1,col:1},'001');
                                    appendNewAsk(newQuiz.quizBookmark, newQuiz.quizAllData.quiz.layoutStyle);
                                }
                            }
                            else {
                                // 改变文档题目并重新计算位置
                                // 改变列表
                                newQuiz.quizAllData.ask.askList[newQuiz.askIndex].askType = $('#askType').val();
                                newQuiz.quizAllData.ask.askList[newQuiz.askIndex].askEleList = getAskELeList($('#askType').val());
                                newQuiz.quizAllData.ask.askList[newQuiz.askIndex].askContent = $('#previewArea').html();
                                if (newQuiz.editAskFlag) {
                                    newQuiz.askIndex = newQuiz.askOldIndex;
                                }
                                initAskListForStatus1();
                            }
                            console.log();
                            resetAskModal();
                            $('#newQuizAsk').modal('toggle');
                        }
                        else {
                            $('#previewArea').removeClass('hide');
                            $('#previewArea').append('请先预览并确认无误');
                        }
                    };

                    //弹出配置界面时要做的准备
                    var initAskModalFire = function () {
                        $('.new-quiz-ask-btn').off('click').on('click', askModalOpenClick);
                        $('.backQuizConfigPage').off('click').on('click', askModalCloseClick);
                        $('.askPageCloseIcon').off('click').on('click', askModalCloseClick);
                        $('.confirmAsk').off('click').on('click', confirmAskClick);
                        $('#statisticalName').off('blur').on('blur', setStatistical);
                        $('#askType').off('click').on('change', reloadAskEleType);
                        // $('#askType').off('click').on('select2:select', warningBeforeAskEleTypeClickForChange);
                        $('#askEleType').off('click').on('change', askEleTypeChangeClick);
                        $('#changeAskType').off('click').on('click', function () {
                            newQuiz.askTypeChangeFlag = true;
                            $('#askAlert').modal('toggle');
                        });
                        $('#is').on('click', function () {
                            if ($(this).prop('checked')) {
                                $('#askEleType').find('option:selected').data('statisticalAttr', 'statistical');
                                var statisticalAttr = $('#askEleType').find('option:selected').data('statisticalAttr');
                                $(newQuiz.editor.composer.element).find('[data-input-type=' + $('#askEleType').find('option:selected').val() + ']').attr('data-statistical', statisticalAttr);
                            }
                            else {
                                $('#askEleType').find('option:selected').data('statisticalAttr', '');
                                $(newQuiz.editor.composer.element).find('[data-input-type=' + $('#askEleType').find('option:selected').val() + ']').attr('data-statistical', '');
                            }
                            $(newQuiz.editor.composer.element)
                        });
                    };

                    // 初始化配置界面关闭时处理过程
                    var initAskModalClose = function () {
                        //还原编辑框
                    };
                    // 初始化配置界面
                    var initAskModal = function () {
                        newQuiz.askTypeChangeFlag = true;
                        initAskModalTab();
                        initAskModalFire();
                        initAskModalClose();
                    };

                    // //改变问卷状态
                    // var changeQuizStatus = function () {
                    //
                    // };

                    var preViewTab = function (type) {
                        if (type) {
                            $('.quiz-action').addClass('hidden');
                            $('.quiz-input-action').addClass('hidden');
                        }
                        else {
                            $('.quiz-action').removeClass('hidden');
                            $('.quiz-input-action').removeClass('hidden');
                        }
                    }

                    // 新问卷基本信息通过后
                    var handleBasicInfo = function () {
                        // 保存数据 开始
                        newQuiz.quizAllData.quiz.name = $('[name=quizName]').val();
                        newQuiz.quizAllData.quiz.title = $('[name=quizTitle]').val();
                        newQuiz.quizAllData.quiz.subtitle = $('[name=quizSubtitle]').val();
                        newQuiz.quizAllData.quiz.layoutStyle = $('[name=layoutStyle]').val();
                        // changeQuizStatus()
                        console.log(newQuiz.quizAllData);
                        // 保存数据 成功

                        // 根据不同布局方式设置'配置问卷'界面的标签
                        prepareForQuizConfig();
                        initAskModal();
                    };
                    var handleQuizConfig = function () {
                        console.log(newQuiz.quizAllData);
                        page.loading();
                        preViewTab(true);
                        page.initFinish();
                    };

                    var handleQuizConfirm = function () {
                        console.log(newQuiz.quizAllData);
                        // page.loading();
                        // ajaxByJQ.invokeServer('universalHandler.php', {
                        //         method: 'currentDateTime',
                        //     }, function (data) {
                        //         if (data.code == '829') {//登陆成功
                        //             console.log(data);
                        //         }
                        //     },
                        //     {
                        //         cache: false,
                        //         dataType: 'json',
                        //         //failedFun:function(){}
                        //         // type:get或post
                        //     }
                        // );
                        // page.initFinish();
                    };
                    // default form wizard
                    $('#newQuizForm').bootstrapWizard({
                        'nextSelector': '.button-next',
                        'previousSelector': '.button-previous',
                        onTabClick: function (tab, navigation, index, clickedIndex) {
                            // return false;
                            success.hide();
                            error.hide();
                            if (form.valid() == false) {
                                return false;
                            }

                            return handleTitle(tab, navigation, clickedIndex);
                        },
                        //index从0开始，表示点击下一步之后的页数
                        onNext: function (tab, navigation, index) {
                            success.hide();
                            error.hide();
                            if (form.valid() == false) {
                                return false;
                            }
                            //不同步骤对应不同的处理函数
                            switch (index) {
                                case 1:
                                    handleBasicInfo();
                                    break;
                                case 2:
                                    handleQuizConfig();
                                    break;
                                case 3:
                                    handleQuizConfirm();
                                    break;
                            }
                            App.scrollTo($('.tab-pane').eq(index));
                            handleTitle(tab, navigation, index);

                        },
                        //index从0开始，表示点击上一步之后的页数
                        onPrevious: function (tab, navigation, index) {
                            success.hide();
                            error.hide();
                            //不同步骤对应不同的处理函数
                            switch (index) {
                                case 0:
                                    break;
                                case 1:
                                    preViewTab(false);
                                    break;
                                case 2:
                                    break;
                            }
                            App.scrollTo($('.tab-pane').eq(index));
                            handleTitle(tab, navigation, index);
                        },
                        onTabShow: function (tab, navigation, index) {
                            var total = navigation.find('li').length;
                            var current = index + 1;
                            var $percent = (current / total) * 100;
                            $('#newQuizForm').find('.progress-bar').css({
                                width: $percent + '%'
                            });
                            switch (index) {
                                case 0:
                                    break;
                                case 1:
                                    initAskListForStatus1();
                                    break;
                                case 2:
                                    break;
                                case 3:
                                    break;
                            }
                        }
                    });

                    $('#newQuizForm').find('.button-previous').hide();

                    var getStatistics = function () {
                        var statistics = {};
                        statistics.quizID = newQuiz.quizAllData.quiz.quizID;
                        statistics.statisticsList = [];
                        for (var i = 0; i < newQuiz.quizAllData.ask.askList.length; i++) {
                            for (var j = 0; j < newQuiz.quizAllData.ask.askList[i].askEleList.length; j++) {
                                var $askELe,obj={};
                                if(newQuiz.quizAllData.ask.askList[i].askEleList[j].statisticalFlag == '1'){
                                    switch (newQuiz.quizAllData.ask.askList[i].askEleList[j].elementType) {
                                        case '001':
                                        case '002':
                                            $askELe = $('[name="'+newQuiz.quizAllData.ask.askList[i].askEleList[j].elementID+'"]');
                                            obj.statisticalType = '001';
                                            obj.valueName = [];
                                            $askELe.each(function () {
                                                obj.valueName.push($(this).next().text());
                                            });
                                            obj.valueName = obj.valueName.join('*,*');
                                            obj.code = [];
                                            $askELe.each(function () {
                                                obj.code.push($(this).val());
                                            });
                                            obj.code = obj.code.join(',');
                                            break;
                                        case '003':
                                        case '004':
                                            $askELe = $('#'+newQuiz.quizAllData.ask.askList[i].askEleList[j].elementID);
                                            obj.statisticalType = '002';
                                            obj.valueName = 'null';
                                            obj.code = 'null';
                                            break;
                                    }
                                    obj.statisticalID = Guid.newGuid().toString('g');
                                    obj.eleID = newQuiz.quizAllData.ask.askList[i].askEleList[j].elementID;
                                    obj.name = $askELe.eq(0).attr('data-statistical-name');
                                    obj.nameAbbreviation = 'null';
                                    statistics.statisticsList.push(obj);
                                }

                            }
                        }
                        return statistics;
                    }

                    var saveQuiz = function (status) {
                        page.loading();
                        newQuiz.quizAllData.quiz.createUserID = loginInfo.userID;
                        newQuiz.quizAllData.quiz.dataCount = 0;
                        for (var i = 0; i < newQuiz.quizAllData.ask.askList.length; i++) {
                            newQuiz.quizAllData.quiz.dataCount += newQuiz.quizAllData.ask.askList[i].askEleList.length;
                        }
                        newQuiz.quizAllData.quiz.releaseDateTime = $('#releaseDateTime').val() + ':00';
                        newQuiz.quizAllData.quiz.finishDateTime = $('#finishDateTime').val() + ':00';
                        newQuiz.quizAllData.quiz.isTemplate = $('#isTemplate').prop('checked');
                        newQuiz.quizAllData.statistics = getStatistics();
                        // console.log(newQuiz.quizAllData.statistics);
                        switch (newQuiz.quizAllData.quiz.status) {
                            case '0':
                                if (status == '1') {
                                    newQuiz.quizAllData.quiz.releaseDateTime = newQuiz.quizAllData.quiz.finishDateTime = 'null'

                                }
                                newQuiz.quizAllData.quiz.status = status;
                                newQuiz.quizAllData.quiz.tabCount = newQuiz.quizAllData.quiz.tabName = 'null';
                                console.log(newQuiz.quizAllData);
                                ajaxByJQ.invokeServer('quiz/quizHandler.php', {
                                        method: 'newQuiz',
                                        caller: 'web',
                                        quizAllData: newQuiz.quizAllData,
                                    }, function (data) {
                                        if (data.code == '829') {//添加成功
                                            // console.log(data);
                                            if (status == '1') {
                                                page.initFinish();
                                                toastr.success('', '保存成功');
                                                $state.go('quiz');
                                            }
                                            else {
                                                page.initFinish();
                                                toastr.success('', '发布成功');
                                                $state.go('quiz');
                                            }
                                        }
                                        else {
                                            if (status == '1') {
                                                page.initFinish();
                                                toastr.error('', '保存失败');
                                            }
                                            else {
                                                page.initFinish();
                                                toastr.error('', '发布失败');
                                            }
                                        }
                                    },
                                    {
                                        cache: false,
                                        dataType: 'json',
                                        //failedFun:function(){}
                                        // type:get或post
                                    }
                                );
                                break;
                            case '1':
                                if (status == '1') {
                                    newQuiz.quizAllData.quiz.releaseDateTime = newQuiz.quizAllData.quiz.finishDateTime = 'null'

                                }
                                newQuiz.quizAllData.quiz.status = status;
                                newQuiz.quizAllData.quiz.tabCount = newQuiz.quizAllData.quiz.tabName = 'null';
                                if (status == '2') {
                                    if (newQuiz.quizAllData.quiz.isTemplate) {
                                        newQuiz.quizAllData.template = {};
                                        newQuiz.quizAllData.template.templateID = Guid.newGuid().toString('g');
                                        newQuiz.quizAllData.template.ask = {
                                            askList: [],
                                            templateFlag: '1',
                                            quizID: newQuiz.quizAllData.template.templateID
                                        };
                                        for (var i = 0; i < newQuiz.quizAllData.ask.askList.length; i++) {
                                            var temAsk = {};
                                            temAsk.askID = Guid.newGuid().toString('g');
                                            temAsk.askEleList = [];
                                            for (var j = 0; j < newQuiz.quizAllData.ask.askList[i].askEleList.length; j++) {
                                                var temAskEle = {};
                                                var oldID = newQuiz.quizAllData.ask.askList[i].askEleList[j].elementID.toString();
                                                temAskEle.nGUID = Guid.newGuid().toString('g');
                                                temAskEle.elementID = oldID.slice(0, -36) + temAskEle.nGUID;
                                                temAskEle.oGUID = oldID.slice(-36);
                                                temAsk.askEleList.push(temAskEle);
                                            }
                                            newQuiz.quizAllData.template.ask.askList.push(temAsk);
                                        }
                                    }
                                }
                                console.log(newQuiz.quizAllData);
                                ajaxByJQ.invokeServer('quiz/quizHandler.php', {
                                        method: 'updateQuiz',
                                        caller: 'web',
                                        quizAllData: newQuiz.quizAllData,
                                    }, function (data) {
                                        if (data.code == '829') {//添加成功
                                            console.log(data);
                                            if (status == '1') {
                                                page.initFinish();
                                                toastr.success('', '保存成功');
                                                $state.go('quiz');
                                            }
                                            else {
                                                page.initFinish();
                                                toastr.success('', '发布成功');
                                                $state.go('quiz');
                                            }
                                        }
                                        else {
                                            if (status == '1') {
                                                page.initFinish();
                                                toastr.error('', '保存失败');
                                            }
                                            else {
                                                page.initFinish();
                                                toastr.error('', '发布失败');
                                            }
                                        }
                                    },
                                    {
                                        cache: false,
                                        dataType: 'json',
                                        //failedFun:function(){}
                                        // type:get或post
                                    }
                                );
                                break;
                        }
                    };


                    $('#newQuizForm #release').click(function () {
                        // console.log(newQuiz.quizAllData);
                        //发布时间（默认当天）和结束时间（默认14天）的验证
                        if ($('#releaseDateTime').val() == '') {
                            toastr.error('', '发布时间必须填写');
                            return;
                        }
                        if ($('#finishDateTime').val() == '') {
                            toastr.error('', '结束时间必须填写');
                            return;
                        }
                        var finishDateTime = new Date($('#finishDateTime').val());
                        var releaseDateTime = new Date($('#releaseDateTime').val());
                        if (parseInt(finishDateTime.getTime() - releaseDateTime.getTime()) < exeDate) {
                            toastr.error('', '结束时间必须为发布时间两周之后');
                            return;
                        }
                        saveQuiz('2');
                    }).hide();

                    $('#newQuizForm #saveQuizConfig').click(function () {
                        // console.log(newQuiz.quizAllData);
                        if ($('#releaseDateTime').val() != '' || $('#finishDateTime').val() != '') {
                            toastr.error('', '直接保存时，发布时间和结束时间必须为空');
                            return;
                        }
                        if ($('#isTemplate').prop('checked') != false) {
                            toastr.error('', '发布时才能保存为模板，请勿勾选保存为模板');
                            return;
                        }
                        saveQuiz('1');
                    }).hide();

                    $('.new-quiz-input.select2', form).change(function () {
                        form.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
                    });
                }

            };

        }();
        newQuizFormWizard.init({quizAllData: param.quizAllData, openCode: param.openCode});
        //渲染特殊控件的响应式
        // window.onresize = resizeSpecialEle;
    });
    console.log(JSON.parse($state.params.param));
}]);