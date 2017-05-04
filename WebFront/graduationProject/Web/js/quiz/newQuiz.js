var quizFormWizard = function () {


    return {
        //main function to initiate the module
        quizAllData: {},
        askTem: {},
        askTypeChangeFlag: true,
        leeWysihtml5: null,
        editor: null,
        quizBookmark: null,
        askActionHtml: '<div class="actions quiz-input-action hide"><div class="btn-group"> <a class="btn btn-circle btn-default " href="javascript:;" data-toggle="dropdown"><i class="fa fa-"></i> 操作 <i class="fa fa-angle-down"></i> </a> <ul class="dropdown-menu pull-right"> <li> <a href="javascript:;"> <i class="fa fa-pencil"></i>修改</a> </li> <li> <a href="javascript:;"> <i class="fa fa-trash-o"></i>删除</a> </li> </ul> </div></div>',
        init: function (obj) {
            var newQuiz = this;
            newQuiz.quizAllData = obj.quizAllData;
            if (newQuiz.quizAllData.quiz.status == 1) {
                newQuiz.askOrder = newQuiz.quizAllData.ask.askList.length;
                newQuiz.askIndex = newQuiz.quizAllData.ask.askList.length;
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
                    $('#newQuizForm').find('.button-submit').show();
                    displayConfirm();
                } else {
                    $('#newQuizForm').find('.button-next').show();
                    $('#newQuizForm').find('.button-submit').hide();
                }
                // App.scrollTo($('.page-title'));
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
            // 根据不同布局方式设置'配置问卷'界面的标签
            var prepareForQuizConfig = function () {
                // 设置标题和副标题
                console.log();
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
                // $quizBody.find('>div').html(quizBodyLayoutHtml);

                //处理问卷数据
                switch (newQuiz.quizAllData.quiz.status) {
                    case 0:
                        //新生成的问卷还没有存导数据库的问卷需要初始化newQuiz.quizAllData.ask
                        newQuiz.quizAllData.ask = {
                            quizID: newQuiz.quizAllData.quiz.quizID,
                            templateFlag: newQuiz.quizAllData.ask.templateFlag,
                            askList: []
                        };
                        if (newQuiz.quizAllData.askOrderIndex == undefined) {
                            newQuiz.quizAllData.askOrderIndex = 0;
                        }
                        break;
                    case 1:
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
                    if ($('#previewArea').find('>div').eq(i).html() == $('#previewArea').find('>div').eq(i).text()) {
                        if (i == 0) {
                            continue;
                        }
                        var $p = $('<p></p>');
                        $p.append(editorHtmlArr[i]);
                        $askList.append($p);
                    } else {
                        if (i == 0) {
                            return false;
                        }
                        else {
                            switch ($(editorHtmlArr[i]).data('input-type')) {
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

                                    break;

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
                            var statisticalAttr;
                            if (!isValid($('#askEleType').find('option:selected').data('elementID'), 1)) {
                                eleID = Guid.newGuid().toString('g');
                                $('#askEleType').find('option:selected').data('elementID', eleID);
                                eleIndex = 0;
                                statisticalAttr = ($('#isStatistical').prop('checked') == false) ? '' : 'statistical';
                                $('#askEleType').find('option:selected').data('statisticalAttr', statisticalAttr);
                            }
                            else {
                                eleID = $('#askEleType').find('option:selected').data('elementID');
                                statisticalAttr = $('#askEleType').find('option:selected').data('statisticalAttr');
                                if ($(newQuiz.editor.composer.element).find('[name=rad' + eleID + ']').length <= 0) {
                                    eleIndex = 0;
                                }
                                else {
                                    eleIndex = parseInt($(newQuiz.editor.composer.element).find('[name=rad' + eleID + ']').last().val()) + 1;
                                }
                            }
                            askELeHtml = '<input type="radio" id="rad' + (newQuiz.askIndex + 1) + '-' + eleID + '-' + eleIndex + '"data-input-type="' + AskEleType + '"data-ele-level="' + 1 + '" data-statistical="' + statisticalAttr + '" name="rad' + eleID + '" value="' + eleIndex + '" class="md-radiobtn">';
                            break;
                        case '002':
                            var eleID = '';
                            var eleIndex;
                            var statisticalAttr;
                            if (!isValid($('#askEleType').find('option:selected').data('elementID'), 1)) {
                                eleID = Guid.newGuid().toString('g');
                                $('#askEleType').find('option:selected').data('elementID', eleID);
                                eleIndex = 0;
                                $('#askEleType').find('option:selected').data('elementIndex', 0);
                                statisticalAttr = ($('#isStatistical').prop('checked') == false) ? '' : 'statistical';
                                $('#askEleType').find('option:selected').data('statisticalAttr', statisticalAttr);
                            }
                            else {
                                eleID = $('#askEleType').find('option:selected').data('elementID');
                                statisticalAttr = $('#askEleType').find('option:selected').data('statisticalAttr');
                                eleIndex = parseInt($('#askEleType').find('option:selected').data('elementIndex')) + 1;
                                $('#askEleType').find('option:selected').data('elementIndex', eleIndex);
                            }
                            askELeHtml = '<input type="checkbox" id="rad' + (newQuiz.askIndex + 1) + '-' + eleID + '-' + eleIndex + '"data-input-type="' + AskEleType + '"data-ele-level="' + 1 + '" data-statistical="' + statisticalAttr + '" name="rad' + eleID + '" value="' + eleIndex + '" class="md-check">';
                            break;
                        case '003':
                            break;
                    }
                    return askELeHtml;
                }
                else {
                    return false;
                }
            };

            // 添加数据项到编辑框
            var addEleBtnClick = function () {
                newQuiz.editor.currentView.element.focus();
                var testHtml = getAskELeHtml();
                if (typeof(testHtml) == 'string' && testHtml != '') {
                    var caretBookmark;
                    if (caretBookmark) {
                        editor.composer.selection.setBookmark(caretBookmark);
                    }
                    newQuiz.editor.composer.commands.exec("insertHTML", testHtml);
                    // console.log($(newQuiz.editor.composer.element).find(':not(div,br):not([contenteditable])'));
                    // $(newQuiz.editor.composer.element).find(':not(div,br):not([contenteditable])').attr('contenteditable', 'false');
                }
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
                        if ($(this).val() == '') {
                            $('.lee-tab-pane').removeClass('active');
                        }
                        else {
                            $($(this).data('target')).addClass('active');
                            $($(this).data('target')).siblings().removeClass('active');
                        }
                    })
                })
            };


            // 多标签页时获得题目所在标签
            var getCurrentQuizTab = function () {

            };
            //点击添加按钮时要做的工作
            var askModalOpenClick = function () {
                newQuiz.askTem = {};
                newQuiz.askTem.askID = Guid.newGuid().toString('g');
                if (!isValid(newQuiz.askOrder, 1)) {
                    newQuiz.askOrder = 0;
                }
                newQuiz.askTem.askOrder = newQuiz.askOrder + 1;
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
                $('#askType,#askEleType').find('option:selected').removeData();
                $('#askType,#askEleType').val(null).trigger('change');
                newQuiz.askTypeChangeFlag = true;
                $('#isStatistical').prop('checked', false);
                $('#addEleBtn').parent().addClass('hide');
                $('.ask-ele-type-tips').addClass('display-none');
                $('#previewArea').html('').addClass('hide');

                // 数据
            };

            // 关闭添加题目模态框事件
            var askModalCloseClick = function () {
                bootbox.confirm({
                    message: "返回会删除当前题目配置信息，确定返回?",
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
            };

            // 改变题目类型时初始化编辑框中的内容
            var initAskEditorHtml = function (AskEleType) {
                // editor.currentView.element
                switch (AskEleType) {
                    case '001':
                        break;
                    case '002':
                        break;
                }
            };

            // 改变题目类型时重新加载数据项类型
            var reloadAskEleType = function () {
                var AskEleType = $('#askType').find('option:selected').val();
                switch (AskEleType) {
                    case '001':
                        $('#askEleType').find('option:last-child').attr('disabled', 'disabled');
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
                        $('#askEleType').find('option:last-child').removeAttr('disabled');
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
                    if($area.find('[data-input-type=' + $(this).val() + ']').length != 0){
                        var $askEle = $area.find('[data-input-type=' + $(this).val() + ']').eq(0);
                        var askEle = {};
                        switch (askType) {
                            case '001':
                                switch ($(this).val()) {
                                    case '001':
                                        askEle.elementID = $askEle.attr('name');
                                        askEle.elementType = '001';
                                        askEle.elementlevel = $askEle.data('ele-level');
                                        askEle.statisticalFlag = $askEle.data('statistical') == 'statistical' ? 1 : 0;
                                        askEleList.push(askEle);
                                        break;
                                    case '002':
                                        askEle.elementID = $askEle.attr('name');
                                        askEle.elementType = '001';
                                        askEle.elementlevel = $askEle.data('ele-level');
                                        askEle.statisticalFlag = $askEle.data('statistical') == 'statistical' ? 1 : 0;
                                        askEleList.push(askEle);
                                        break;
                                }
                                break;
                            case '002':
                                switch ($(this).val()) {
                                    case '001':

                                        break;
                                    case '002':

                                        break;
                                }
                                break;
                        }
                    }

                });
                return;
            };

            // 添加到页面时获取数据项数组
            var getAskELeList = function () {
                var askEleList = [];
                getAskEle(newQuiz.askTem.askType, askEleList);
                return askEleList;
            };

            // 添加到页面
            var appendNewAsk = function (quizBookmark, layoutStyle) {
                console.log(App.getViewPort());
                var $askHtml = $('#previewArea').html();
                newQuiz.askTem.askType = $('#askType').val();
                newQuiz.askTem.askContent = $askHtml;
                console.log(newQuiz.askTem);
                newQuiz.askTem.askEleList = getAskELeList();
                console.log(newQuiz.askTem);
                console.log(newQuiz.quizAllData.ask);
                newQuiz.quizAllData.ask.askList.push(newQuiz.askTem);
                console.log(newQuiz.quizAllData.ask);
                newQuiz.askTem = {};
                var $ask = $('#previewArea').find('>div').detach();
                $ask.prepend($(newQuiz.askActionHtml));
                $(document).on('mouseover', '.quiz-input,.quiz-input *', function () {
                    $('.quiz-input-action').removeClass('hide');
                }).on('mouseleave', '.quiz-input', function () {
                    setTimeout(function () {
                        $('.quiz-input-action').addClass('hide')
                    }, 800);
                });
                page.loading();
                switch (layoutStyle) {
                    case '001':
                        console.log($('.quiz1-col1').height());
                        var $col = $('.quiz' + quizBookmark.quiz + '-col' + quizBookmark.col)
                        $col.append($ask);
                        if ($col.find('>.quiz-input').length > 1) {
                            if (quizBookmark.col == 2 && $col.height() > $('.quiz' + quizBookmark.quiz + '-col' + 1).height()) {
                                newQuiz.quizBookmark.col = 1;
                                var $newPage = $(newQuizPageForNormal(++newQuiz.quizBookmark.quiz));
                                $('.quiz-body>div').append($newPage);
                                $ask.detach();
                                $col = $('.quiz' + newQuiz.quizBookmark.quiz + '-col' + 1);
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
                                    $col.append($ask);
                                }
                                else if (quizBookmark.col == 1) {
                                    $ask.detach();
                                    $col = $('.quiz' + quizBookmark.quiz + '-col' + 2);
                                    newQuiz.quizBookmark.col = 2;
                                    $col.append($ask);
                                }
                            }
                        }
                        break;
                }
                newQuiz.askIndex++;
                newQuiz.askOrder++;
                page.initFinish();
            };

            //确认题目
            var confirmAskClick = function () {
                if (!$('#previewArea').hasClass('hide')) {
                    if (newQuiz.quizBookmark != undefined) {
                        // appendNewAsk({quiz:1,col:1},'001');
                        appendNewAsk(newQuiz.quizBookmark, '001');
                    }
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
                $('#askType').off('click').on('change', reloadAskEleType);
                $('#askType').off('click').on('select2:select', warningBeforeAskEleTypeClickForChange);
                $('#askEleType').off('click').on('change', askEleTypeChangeClick);
                $('#changeAskType').off('click').on('click', function () {
                    newQuiz.askTypeChangeFlag = true;
                    $('#askAlert').modal('toggle');
                });
                $('#isStatistical').on('click', function () {
                    if ($(this).prop('checked')) {
                        $('#askEleType').find('option:selected').data('statisticalAttr', 'statistical');
                    }
                    else {
                        $('#askEleType').find('option:selected').data('statisticalAttr', '');
                    }
                });
            };

            // 初始化配置界面关闭时处理过程
            var initAskModalClose = function () {
                //还原编辑框
            };
            // 初始化配置界面
            var initAskModal = function () {
                initAskModalTab();
                initAskModalFire();
                initAskModalClose();
            };

            // //改变问卷状态
            // var changeQuizStatus = function () {
            //
            // };
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

                    handleTitle(tab, navigation, clickedIndex);
                },
                onNext: function (tab, navigation, index) {
                    success.hide();
                    error.hide();
                    // if (form.valid() == false) {
                    //     return false;
                    // }
                    //不同步骤对应不同的处理函数
                    switch (index) {
                        case 1:
                            handleBasicInfo();
                            break;
                        case 2:
                            break;
                        case 3:
                            break;
                        case 4:
                            break;
                    }
                    App.scrollTo($('.tab-pane').eq(index));
                    handleTitle(tab, navigation, index);

                },
                onPrevious: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    handleTitle(tab, navigation, index);
                },
                onTabShow: function (tab, navigation, index) {
                    var total = navigation.find('li').length;
                    var current = index + 1;
                    var $percent = (current / total) * 100;
                    $('#newQuizForm').find('.progress-bar').css({
                        width: $percent + '%'
                    });
                }
            });

            $('#newQuizForm').find('.button-previous').hide();
            $('#newQuizForm .button-submit').click(function () {
                alert('Finished! Hope you like it :)');
            }).hide();
            //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.new-quiz-input.select2', form).change(function () {
                form.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
        }

    };

}();

// jQuery(document).ready(function() {
//     FormWizard.init();
// });