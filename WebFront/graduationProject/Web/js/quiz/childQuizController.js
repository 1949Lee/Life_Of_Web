    /**
 * Created by Lee on 2017/5/16.
 */
angular.module('quizApp').controller('childQuizController', ['$rootScope', '$scope', '$state', 'settings', function ($rootScope, $scope, $state, $stateParams, settings) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        App.initAjax();
        // console.log($('.nav-item.active').find('.nav-link').data('page-bar-index'));
        page.changePageBar(getCookie('currentSideBar'));
        page.loading();
        // 初始化页面布局
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        if (!$('body').hasClass('page-sidebar-closed')) {
            $('body').find('.sidebar-toggler').click();
        }
        // 初始化布局结束

        var loginInfo = getLogin();
        if (loginInfo == null) {
            window.location.href = WebUrl() + 'html/login.html';
        }
        if(loginInfo.userStatus == '4') {
            page.reloadSidebar(['quiz', 'template', 'statistics']);

        }
        else{
            $('.quiz-action').addClass('hide');
        }
        var childQuizConfig = function () {
            return {
                childQuizInfoParam: null,
                childQuiz:null,
                askData:null,
                init: function () {
                    var childQuiz = this;
                    // 获取路由参数
                    if ($state.params.param != undefined) {
                        childQuiz.childQuizInfoParam = JSON.parse($state.params.param);
                        if(childQuiz.childQuizInfoParam.writeStatus == '2'){
                            $('.quiz-action').addClass('hide');
                        }
                    }
                    $('.page-title').html(childQuiz.childQuizInfoParam.quizName);

                    $('.page-breadcrumb').find('li').eq(0).find('a').html('填写问卷');
                    $('.page-breadcrumb').find('li').eq(0).find('i').removeClass().addClass('icon-note');
                    childQuiz.childQuiz = {};
                    childQuiz.childQuiz.childQuizID = childQuiz.childQuizInfoParam.childQuizID;
                    childQuiz.childQuiz.childID = childQuiz.childQuizInfoParam.childID;
                    childQuiz.childQuiz.quizID = childQuiz.childQuizInfoParam.quizID;
                    childQuiz.childQuiz.writeStatus = childQuiz.childQuizInfoParam.writeStatus;
                    childQuiz.childQuizInfoParam =null;
                    // 生成一页
                    var newQuizPageForNormal = function (index) {
                        var page =
                            '<div class="row quiz-page quiz-page' + index + '">' +
                            '<div class="col-sm-6 quiz-col quiz' + index + '-col1">' +
                            '</div>' +
                            '<div class="col-sm-6 quiz-col quiz' + index + '-col2"></div>' +
                            '</div>';
                        return page;
                    };

                    // 添加到页面
                    var appendNewAsk = function (quizBookmark, layoutStyle, askData) {
                        var $askHtml, askEleID;
                        askEleID = askData.askID;
                        $askHtml = askData.askContent;
                        var $ask = $($askHtml)
                        switch (layoutStyle) {
                            case '001':
                                // console.log($('.quiz1-col1').height());
                                var $col = $('.quiz' + quizBookmark.quiz + '-col' + quizBookmark.col)
                                $col.append($ask);
                                if ($col.find('>.quiz-input').length > 2) {
                                    if (quizBookmark.col == 2 && $col.height() > $('.quiz' + quizBookmark.quiz + '-col' + 1).height()) {
                                        childQuiz.quizBookmark.col = 1;
                                        var $newPage = $(newQuizPageForNormal(++childQuiz.quizBookmark.quiz));
                                        $('.quiz-body').append($newPage);
                                        $ask.detach();
                                        $col = $('.quiz' + childQuiz.quizBookmark.quiz + '-col' + 1);
                                        $col.append($ask);
                                    }
                                    if ($col.height() <= App.getViewPort().height * (4 / 3)) {

                                    }
                                    else {
                                        if (quizBookmark.col == 2) {
                                            childQuiz.quizBookmark.col = 1;
                                            var $newPage = $(newQuizPageForNormal(++childQuiz.quizBookmark.quiz));
                                            $('.quiz-body>div').append($newPage);
                                            $ask.detach();
                                            $col = $('.quiz' + childQuiz.quizBookmark.quiz + '-col' + 1);
                                            $col.append($ask);
                                        }
                                        else if (quizBookmark.col == 1) {
                                            $ask.detach();
                                            $col = $('.quiz' + quizBookmark.quiz + '-col' + 2);
                                            childQuiz.quizBookmark.col = 2;
                                            $col.append($ask);
                                        }
                                    }
                                }
                                break;
                        }
                    };

                    //
                    var loadChildQuizInfo = function ($ele,ask) {
                        for(var i = 0;i < ask.askEleList.length;i++){
                            if(isValid(ask.askEleList[i].answerContent,3)){
                                switch (ask.askEleList[i].elementType){
                                    case '001':
                                        $ele.find('[name='+ask.askEleList[i].elementID+'][value='+ask.askEleList[i].answerContent+']').prop('checked',true);
                                        break;
                                    case '002':
                                        var checkValue = (ask.askEleList[i].answerContent).toString().split(',');
                                        for(var j = 0;j < checkValue.length;j++){
                                            $ele.find('[name='+ask.askEleList[i].elementID+'][value='+checkValue[j]+']').prop('checked',true);
                                        }
                                        break;
                                    case '003':
                                        $('#'+ask.askEleList[i].elementID).val((ask.askEleList[i].answerContent).toString())
                                        break;
                                    case '004':
                                        $('#'+ask.askEleList[i].elementID).val((ask.askEleList[i].answerContent).toString())
                                        break;
                                }
                            }

                        }
                    };
                    
                    // 绘制问卷
                    var initChildQuiz = function (quizData) {
                        $('.quiz-body').html('').html(newQuizPageForNormal(1));
                        childQuiz.quizBookmark = {
                            quiz: '1',
                            col: '1',
                        };
                        for (var i = 0; i < quizData.ask.askList.length; i++) {
                            appendNewAsk(childQuiz.quizBookmark, quizData.quiz.layoutStyle, quizData.ask.askList[i]);
                            loadChildQuizInfo($('.quiz-input').eq(i),quizData.ask.askList[i]);
                        }
                    };

                    var checkAsk =  function(ask){
                        var result = true;
                       switch(ask.askType){
                           case '001':
                               if($('[name='+ask.askEleList[0].elementID+']:checked').length == 0){
                                   result = false;
                               }
                               break;
                           case '002':
                               break;
                       }
                        return result;
                    };

                    // 验证数据完整性
                    var checkData = function (data) {
                        var result = true;
                        $('.quiz-input').each(function (index) {
                            $(this).removeClass('error').find('>div>.quiz-error-tips').detach();
                            if(!checkAsk(data.ask.askList[index])){
                                $(this).addClass('error').find('>div').append('<p class="quiz-error-tips">必须填写</p>');
                                result = false;
                            }
                        });
                        return result;
                    };

                    // 保存数据
                    var saveQuiz = function (userQuizStatus) {
                        childQuiz.childQuiz.answerList = [];
                        $('.quiz-input').each(function (index) {
                            for(var i = 0;i < childQuiz.askData.askList[index].askEleList.length;i++){
                                var askELe = childQuiz.askData.askList[index].askEleList[i];
                                var answer = {
                                    askID:childQuiz.askData.askList[index].askID,
                                    recordID:Guid.newGuid().toString('g'),
                                    eleID : askELe.elementID
                                };
                                switch(askELe.elementType){
                                    case '001':
                                        if($(this).find('[name='+askELe.elementID+']:checked').length != 0){
                                            answer.answerContent = $(this).find('[name='+askELe.elementID+']:checked').val();
                                            answer.statisticalValue = $(this).find('[name='+askELe.elementID+']:checked').next().text();
                                        }
                                        else{
                                            continue;
                                        }
                                        break;
                                    case '002':
                                        if($(this).find('[name='+askELe.elementID+']:checked').length != 0){
                                            var answerContent = [];
                                            var statisticalValue = [];
                                            $(this).find('[name='+askELe.elementID+']:checked').each(function () {
                                                answerContent.push($(this).val());
                                                statisticalValue.push($(this).next().text());
                                            });
                                            answer.answerContent = answerContent.join(',');
                                            answer.statisticalValue = statisticalValue.join(',');
                                        }
                                        else{
                                            continue;
                                        }
                                        break;
                                    case '003':
                                        if($(this).find('[id='+askELe.elementID+']').val() != ''){
                                            answer.answerContent = $(this).find('[id='+askELe.elementID+']').val();
                                            answer.statisticalValue = $(this).find('[id='+askELe.elementID+']').val();
                                        }
                                        else{
                                            continue;
                                        }
                                        break;
                                    case '003':
                                        if($(this).find('[id='+askELe.elementID+']').val() != ''){
                                            answer.answerContent = $(this).find('[id='+askELe.elementID+']').val();
                                            answer.statisticalValue = $(this).find('[id='+askELe.elementID+']').val();
                                        }
                                        else{
                                            continue;
                                        }
                                        break;
                                }
                                childQuiz.childQuiz.answerList.push(answer);
                            }
                        });
                        console.log(childQuiz.childQuiz);
                        switch (userQuizStatus){
                            case '1':
                                childQuiz.childQuiz.writeStatus = '1';
                                if(childQuiz.childQuiz.answerList.length == 0){
                                    toastr.warning('','您没有填写任何内容');
                                }
                                else{
                                    page.loading();
                                    ajaxByJQ.invokeServer('quiz/childQuizHandler.php',
                                        {
                                            method:'updateChildQuiz',
                                            childQuiz:childQuiz.childQuiz
                                        },
                                        function (data) {
                                            page.initFinish();
                                            if(data['code'] == '829'){
                                                toastr.success('','保存成功');
                                            }
                                            else{
                                                console.log(data);
                                            }
                                        }
                                    );
                                }
                                break;
                            case '2':
                                childQuiz.childQuiz.writeStatus = '2';
                                page.loading();
                                ajaxByJQ.invokeServer('quiz/childQuizHandler.php',
                                    {
                                        method:'updateChildQuiz',
                                        caller:'web',
                                        childQuiz:childQuiz.childQuiz
                                    },
                                    function (data) {
                                        page.initFinish();
                                        console.log(data);
                                        toastr.success('','提交成功');
                                        $state.go('index');
                                    }
                                );
                                break;
                        }
                    };

                    // 初始化所有事件
                    var initEventForQuiz = function (data) {

                        $('#saveChildQuiz').on('click',function () {
                            $('.quiz-input').each(function () {
                                $(this).removeClass('error').find('>div>.quiz-error-tips').detach();
                            });
                            saveQuiz('1');
                        });

                        $('#submitChildQuiz').on('click',function () {
                            if(checkData(data)){
                                saveQuiz('2');
                            }
                            else{
                                toastr.warning('','请将问卷填写完整后提交');
                            }
                        });
                    };

                    ajaxByJQ.invokeServer('quiz/childQuizHandler.php',
                        {
                            method: 'getChildQuizInfo',
                            childQuiz: {
                                quizID: childQuiz.childQuiz.quizID,
                                childQuizID: childQuiz.childQuiz.childQuizID
                            }
                        },
                        function (data) {
                            console.log(data);
                            initChildQuiz(data);
                            childQuiz.askData = data.ask;
                            $('.quiz-title').html(data.quiz.title+'<span class="quiz-subtile">'+data.quiz.subtitle+'</span>');
                            switch (childQuiz.childQuiz.writeStatus) {
                                case '1'://填写中

                                    break;
                                case '2'://已提交

                                    break;
                                case '3'://未填写

                                    break;
                            }
                            initEventForQuiz(data);
                            page.initFinish();
                        }
                    )

                }
            }
        }();
        childQuizConfig.init();

    });
}]);
