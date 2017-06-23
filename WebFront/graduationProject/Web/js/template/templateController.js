/**
 * Created by Lee on 2017/5/31.
 */
angular.module('quizApp').controller('templateController', ['$rootScope', '$scope', '$state', 'settings', function ($rootScope, $scope, $state, settings) {
    $scope.$on('$viewContentLoaded', function () {
        // 初始化
        App.initAjax();
        page.changePageBar(getCookie('currentSideBar'));
        // 初始化页面布局 开始
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        if (!$('body').hasClass('page-sidebar-closed')) {
            $('body').find('.sidebar-toggler').click();
        }
        // 初始化页面布局 结束

        // 获得账户信息
        var loginInfo = getLogin();
        if (loginInfo == null) {
            page.loading();
            window.location.href = WebUrl() + 'html/login.html';
        }

        // 获取路由参数
        var param = null;
        if ($state.params.param != undefined) {
            param = JSON.parse($state.params.param);
        }
        var templateIndex = function () {
            return {

                //页面的一些变量


                //页面初始化入口
                init: function () {
                    var template = this;
                    if (!jQuery().dataTable) {
                        return;
                    }

                    //重置查看模板模态框
                    var resetTemplateModal = function () {
                        // console.log();
                        var $templateModal = $('#templateViewModal');
                        $templateModal.find('.modal-title').html('');
                        $templateModal.find('.quiz-title').html('<span class="quiz-subtitle"></span>');
                        $templateModal.find('.quiz-body').html('<div class="col-sm-12"></div>');
                    };

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
                                // console.log($col.height());
                                if ($col.find('>.quiz-input').length > 2) {
                                    if (quizBookmark.col == 2 && $col.height() > $('.quiz' + quizBookmark.quiz + '-col' + 1).height()) {
                                        template.quizBookmark.col = 1;
                                        var $newPage = $(newQuizPageForNormal(++template.quizBookmark.quiz));
                                        $('.quiz-body').append($newPage);
                                        $ask.detach();
                                        $col = $('.quiz' + template.quizBookmark.quiz + '-col' + 1);
                                        $col.append($ask);
                                    }
                                    if ($col.height() <= App.getViewPort().height * (4 / 3)) {

                                    }
                                    else {
                                        if (quizBookmark.col == 2) {
                                            template.quizBookmark.col = 1;
                                            var $newPage = $(newQuizPageForNormal(++template.quizBookmark.quiz));
                                            $('.quiz-body>div').append($newPage);
                                            $ask.detach();
                                            $col = $('.quiz' + template.quizBookmark.quiz + '-col' + 1);
                                            $col.append($ask);
                                        }
                                        else if (quizBookmark.col == 1) {
                                            $ask.detach();
                                            $col = $('.quiz' + quizBookmark.quiz + '-col' + 2);
                                            template.quizBookmark.col = 2;
                                            $col.append($ask);
                                        }
                                    }
                                }
                                break;
                        }
                    };

                    // 加载模板内容
                    var initTemplateContent = function(quizAllData){
                        console.log($('.quiz-body'));
                        $('.quiz-body').html('').html(newQuizPageForNormal(1));
                        template.quizBookmark = {
                            quiz: '1',
                            col: '1',
                        };
                        for (var i = 0; i < quizAllData.ask.askList.length; i++) {
                            appendNewAsk(template.quizBookmark, quizAllData.quiz.layoutStyle, quizAllData.ask.askList[i]);
                        }
                    };

                    //初始化查看模板模态框
                    var initTemplateModal = function (quizAllData) {
                        var $templateModal = $('#templateViewModal');
                        $templateModal.find('.close').off('click').on('click',function () {
                            $('#templateViewModal').modal('toggle');
                        });
                        $templateModal.find('.quiz-title').prepend(quizAllData.quiz.name+'模板');
                        // initTemplateContent(quizAllData);
                    };

                    //应用模板时对数据的处理
                    var getNewQuizData  = function (data) {
                        data.quiz.status = '0';
                        // data.quiz.templateID
                        data.quiz.quizID = Guid.newGuid().toString('g');
                        data.quiz.createDateTime = 'null';
                        data.ask.quizID = data.quiz.quizID;
                        for(var i = 0;i < data.ask.askList.length; i++){
                            data.ask.askList[i].askID = Guid.newGuid().toString('g');
                            for(var j = 0;j < data.ask.askList[i].askEleList.length;j++){
                                var oldID = data.ask.askList[i].askEleList[j].elementID;
                                var oGUID = oldID.slice(-36);
                                var nGUID = Guid.newGuid().toString('g');
                                var content = data.ask.askList[i].askContent.toString();
                                var e=new RegExp(oGUID,"g");
                                data.ask.askList[i].askContent = content.replace(e,nGUID);
                                data.ask.askList[i].askEleList[j].elementID = oldID.slice(0,-36) + nGUID;
                            }
                        }
                        data.ask.templateFlag = '0';
                    };

                    //初始化表格
                    var initQuizList = function () {
                        var myFunc = this;
                        var serverSide = false;
                        var actionClass = function (row, btnType) {
                            var className = '';
                            var authorFlag = (loginInfo.userID != row.createUserID) ? false : true;
                            switch (btnType) {
                                case 'applyTemplate':
                                    if (authorFlag && row.status == '1') {
                                        className = '';
                                    }
                                    else {
                                        className = 'disabled';
                                    }
                                    break;
                                case 'preView':
                                    className = '';
                                    break;
                                case 'deleteTemplate':
                                    if (authorFlag && row.status != 2) {
                                        className = '';
                                    }
                                    else {
                                        className = 'disabled';
                                    }
                                    break;
                            }
                            return className;
                        };

                        // 应用模板问卷按钮点击
                        var applyTemplate = function (event) {
                            var row = event.data;
                            page.loading();
                            ajaxByJQ.invokeServer('template/templateIndexHandler.php',
                                {
                                    method: 'getTemplateInfo',
                                    quiz: {
                                        templateID: row.templateID
                                    }
                                },
                                function (quizAllData) {
                                    console.log(quizAllData);
                                    getNewQuizData(quizAllData);
                                    var param = {
                                        openCode: 3,
                                        quizAllData: {
                                            quiz: quizAllData.quiz,
                                            ask: quizAllData.ask
                                        }
                                    };
                                    console.log(param);
                                    $state.go('newQuiz', {param: JSON.stringify(param)});

                                }
                            )
                        };

                        // 查看模板按钮点击
                        var preView = function (event) {
                            var row = event.data;
                            // console.log(row);
                            page.loading();
                            ajaxByJQ.invokeServer('template/templateIndexHandler.php',
                                {
                                    method: 'getTemplateInfo',
                                    quiz: {
                                        templateID: row.templateID
                                    }
                                },
                                function (quizAllData) {
                                    console.log(quizAllData);
                                    var param = {
                                        openCode: 2,
                                        quizAllData: {
                                            quiz: quizAllData.quiz,
                                            ask: quizAllData.ask
                                        }
                                    };
                                    //重置查看模板模态框

                                    resetTemplateModal();

                                    //初始化查看模板模态框
                                    $('#templateViewModal').on('shown.bs.modal',function(){
                                        // 加载内容
                                        initTemplateContent(quizAllData);
                                        page.initFinish();
                                    });
                                    $('#templateViewModal').modal('toggle');
                                    initTemplateModal(quizAllData);


                                }
                            )
                        };

                        // 删除模板按钮点击
                        var deleteTemplate = function (event) {
                            var row = event.data;
                            bootbox.confirm({
                                message: "确定删除模板?",
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
                                        page.loading();
                                        ajaxByJQ.invokeServer('template/templateIndexHandler.php', {
                                                method: 'deleteTemplate',
                                                caller: 'web',
                                                templateID: row.templateID,
                                            }, function (data) {
                                                if (data.code == '829') {//添加成功
                                                    page.initFinish();
                                                    toastr.success('', '删除成功');
                                                    $('#templateListTable').DataTable().ajax.reload();
                                                }
                                            },
                                            {
                                                cache: false,
                                                dataType: 'json',
                                                //failedFun:function(){}
                                                // type:get或post
                                            }
                                        );
                                        $(this).on('hidden.bs.modal', function () {
                                            $('#newQuizAsk').modal('toggle');
                                        });
                                    }
                                    else {

                                    }
                                }
                            }).init(function () {
                                // $('.bootbox').parent().height(App.getViewPort().height);
                            });
                        };

                        var table = $('#templateListTable');
                        var oTable = table.dataTable({
                            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                            "language": dataTableLanguage(),

                            // Or you can use remote translation file
                            //"language": {
                            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
                            //},
                            "order": [
                                [0, 'asc']
                            ],
                            // scrollX:true,\
                            autoWidth: false,
                            columnDefs: [
                                {
                                    className: "quiz-text-center no-wrap",
                                    targets: ['_all']
                                },
                                {
                                    responsivePriority: 1,
                                    targets: 0
                                }

                            ],
                            columns: [
                                {
                                    data: 'name',
                                    title: '模板名称',
                                    width: '30%',
                                    responsivePriority: 1
                                },
                                {
                                    data: 'createUserName',
                                    title: '创建人',
                                    width: '20%',
                                    responsivePriority: 3
                                },
                                {
                                    data: 'createDateTime',
                                    title: '创建时间',
                                    width: '25%'
                                },
                                {
                                    data: 'layoutStyleName',
                                    title: '布局方式',
                                    width: '25%'
                                },
                                {
                                    data: null,
                                    title: '操作',
                                    width: '6%',
                                    responsivePriority: 2,
                                    render: function (data, type, row, meta) {
                                        var actionHtml =
                                            '<div class=" btn-group btn-group-sm  btn-group-none">' +
                                            '<button type="button" class="btn btn-fit-height green-jungle dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="true">' +
                                            '操作<i class="fa fa-angle-up"></i> ' +
                                            '</button> ' +
                                            '<ul class="button-dropdown-list is-above dropdown-menu pull-right" role="menu">' +
                                            '<li>' +
                                            '<a  id="applyTemplate" class="btn black ' + actionClass(row, 'applyTemplate') + '"><i class="fa fa-cog"></i>应用</a>' +
                                            '</li>' +
                                            '<li>' +
                                            '<a  id="preView" class="btn black ' + actionClass(row, 'preView') + '"><i class="fa fa-eye"></i>查看</a>' +
                                            '</li>' +
                                            '<li>' +
                                            '<a  id="deleteTemplate" class="btn black ' + actionClass(row, 'deleteTemplate') + '"><i class="fa fa-trash"></i>删除</a>' +
                                            '</li>' +
                                            '</ul>' +
                                            '</div>';
                                        return actionHtml;
                                    }
                                }
                            ],
                            "createdRow": function (row, data, dataIndex) {
                                $(row).find('#applyTemplate').off('click').on('click', data, applyTemplate);
                                $(row).find('#preView').off('click').on('click', data, preView);
                                $(row).find('#deleteTemplate').off('click').on('click', data, deleteTemplate);
                            },
                            "lengthMenu": [
                                [5, -1],
                                [5, "全部"] // change per page values here
                            ],
                            // set the initial value
                            "pageLength": 5,
                            colReorder: true,
                            processing: true,
                            serverSide: serverSide,
                            ajax: {
                                url: ServiceUrl() + 'template/templateIndexHandler.php',
                                type: 'post',
                                // cache: false,
                                // dataType: 'json',
                                dataSrc: function (data) {
                                    console.log(data);
                                    return data.templateList;
                                },
                                data: function (d) {
                                    d.method = 'getTemplateList';
                                    console.log(d);
                                    // return JSON.stringify( d );
                                }
                            },
                            // "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // 水平滚动
                        });
                        var dataTable = $('#templateListTable').DataTable();
                        dataTable.on('init', function () {
                            // console.log(dataTable.data().length);
                        });
                        $('#refreshTable').on('click', function () {
                            dataTable.ajax.reload();
                        });
                        $('.backTemplateList').on('click',function () {
                            $('#templateViewModal').modal('toggle');
                        })
                    };
                    initQuizList();
                }
            };

        }();
        templateIndex.init();
    });
}]);