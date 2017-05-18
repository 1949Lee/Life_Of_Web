/**
 * Created by Lee on 2017/4/26.
 */
angular.module('quizApp').controller('quizController', ['$rootScope', '$scope', '$state', 'settings', function ($rootScope, $scope, $state, settings) {
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
        if(loginInfo == null){
            page.loading();
            window.location.href = WebUrl()+'html/login.html';
        }

        // 获取路由参数
        var param = null;
        if ($state.params.param != undefined) {
            param = JSON.parse($state.params.param);
        }
        var quizIndex = function () {
            return {

                //页面的一些变量


                //页面初始化入口
                init: function () {
                    var quizIndex = this;
                    if (!jQuery().dataTable) {
                        return;
                    }

                    //初始化表格
                    var initQuizList = function () {
                        var myFunc = this;
                        var serverSide = false;
                        var actionClass = function (row, btnType) {
                            var className = '';
                            var authorFlag = (loginInfo.userID != row.createUserID) ? false : true;
                            switch (btnType) {
                                case 'quizConfig':
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
                                case 'releaseQuiz':
                                    if (authorFlag && row.status == 1) {
                                        className = '';
                                    }
                                    else {
                                        className = 'disabled';
                                    }
                                    break;
                                case 'deleteQuiz':
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

                        // 配置问卷按钮点击
                        var quizConfig = function (event) {
                            var row = event.data;
                            page.loading();
                            ajaxByJQ.invokeServer('quiz/quizIndexHandler.php',
                                {
                                    method: 'getQuizInfo',
                                    quiz: {
                                        quizID: row.quizID
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
                                    $state.go('newQuiz', {param: JSON.stringify(param)});

                                }
                            )
                        };

                        // 预览问卷按钮点击
                        var preView = function (event) {
                            var row = event.data;
                            console.log(row)
                        };

                        // 发布问卷按钮点击
                        var releaseQuiz = function (event) {
                            var row = event.data;
                            console.log(row);
                        };

                        // 删除问卷按钮点击
                        var deleteQuiz = function (event) {
                            var row = event.data;
                            bootbox.confirm({
                                message: "确定删除出问卷?",
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
                                        ajaxByJQ.invokeServer('quiz/quizHandler.php', {
                                                method: 'deleteQuiz',
                                                caller: 'web',
                                                quizID: row.quizID,
                                            }, function (data) {
                                                if (data.code == '829') {//添加成功
                                                    toastr.success('', '删除成功');
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

                        var table = $('#quizListTable');
                        var oTable = table.dataTable({
                            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                            "language": dataTableLanguage,

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
                                    title: '问卷名称',
                                    width: '20%',
                                    responsivePriority: 1
                                },
                                {
                                    data: 'title',
                                    title: '问卷标题',
                                    width: '20%'
                                },
                                {
                                    data: 'createUserName',
                                    title: '创建人',
                                    width: '10%',
                                    responsivePriority: 3
                                },
                                {
                                    data: 'createDateTime',
                                    title: '创建时间',
                                    width: '15%'
                                },
                                {
                                    data: 'releaseDateTime',
                                    title: '发布时间',
                                    width: '15%'
                                },
                                {
                                    data: 'finishDateTime',
                                    title: '结束时间',
                                    width: '15%'
                                },
                                {
                                    data: 'statusName',
                                    title: '问卷状态',
                                    width: '8%',
                                    responsivePriority: 4
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
                                            '操作<i class="fa fa-angle-down"></i> ' +
                                            '</button> ' +
                                            '<ul class="dropdown-menu pull-right" role="menu">' +
                                            '<li>' +
                                            '<a  id="quizConfig" class="btn black ' + actionClass(row, 'quizConfig') + '"><i class="fa fa-cog"></i>配置</a>' +
                                            '</li>' +
                                            '<li>' +
                                            '<a  id="preView" class="btn black ' + actionClass(row, 'preView') + '"><i class="fa fa-eye"></i>预览</a>' +
                                            '</li>' +
                                            '<li>' +
                                            '<a  id="releaseQuiz" class="btn black ' + actionClass(row, 'releaseQuiz') + '"><i class="fa fa-paper-plane-o"></i>发布</a>' +
                                            '</li>' +
                                            '<li>' +
                                            '<a  id="deleteQuiz" class="btn black ' + actionClass(row, 'deleteQuiz') + '"><i class="fa fa-trash"></i>删除</a>' +
                                            '</li>' +
                                            '</ul>' +
                                            '</div>';
                                        return actionHtml;
                                    }
                                }
                            ],
                            "createdRow": function (row, data, dataIndex) {
                                $(row).find('#quizConfig').off('click').on('click', data, quizConfig);
                                $(row).find('#preView').off('click').on('click', data, preView);
                                $(row).find('#releaseQuiz').off('click').on('click', data, releaseQuiz);
                                $(row).find('#deleteQuiz').off('click').on('click', data, deleteQuiz);
                            },
                            "lengthMenu": [
                                [5, 10, 15, 20, -1],
                                [5, 10, 15, 20, "All"] // change per page values here
                            ],
                            // set the initial value
                            "pageLength": 20,
                            colReorder: true,
                            processing: true,
                            serverSide: serverSide,
                            ajax: {
                                url: ServiceUrl() + 'quiz/quizIndexHandler.php',
                                type: 'post',
                                // cache: false,
                                // dataType: 'json',
                                dataSrc: function (data) {
                                    console.log(data);
                                    return data.quizList;
                                },
                                data: function (d) {
                                    d.method = 'getQuizList';
                                    console.log(d);
                                    // return JSON.stringify( d );
                                }
                            },
                            // "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // 水平滚动
                        });
                        var dataTable = $('#quizListTable').DataTable();
                        dataTable.on('init', function () {
                            // console.log(dataTable.data().length);
                        });
                        $('#refreshTable').on('click',function () {
                            dataTable.ajax.reload();
                        });
                    };
                    initQuizList();
                }
            };

        }();
        quizIndex.init();
    });
    $scope.newQuiz = function () {
        console.log('跳转');
        var param = {
            openCode: 1,
            quizAllData: {
                quiz: {
                    quizID: Guid.newGuid().toString('g'),
                    templateID: Guid.newGuid().toString('g'),
                    status: '0'
                },
                ask: {
                    templateFlag: 0
                }
            }
        };
        $state.go('newQuiz', {param: JSON.stringify(param)});
    };
}]);
