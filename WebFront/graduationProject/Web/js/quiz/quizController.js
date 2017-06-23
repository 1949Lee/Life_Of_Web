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

                        //重置查看模板模态框
                        var resetTemplateModal = function () {
                            // console.log();
                            var $templateModal = $('#quizViewModal');
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
                                            quizIndex.quizBookmark.col = 1;
                                            var $newPage = $(newQuizPageForNormal(++quizIndex.quizBookmark.quiz));
                                            $('.quiz-body').append($newPage);
                                            $ask.detach();
                                            $col = $('.quiz' + quizIndex.quizBookmark.quiz + '-col' + 1);
                                            $col.append($ask);
                                        }
                                        if ($col.height() <= App.getViewPort().height * (4 / 3)) {

                                        }
                                        else {
                                            if (quizBookmark.col == 2) {
                                                quizIndex.quizBookmark.col = 1;
                                                var $newPage = $(newQuizPageForNormal(++quizIndex.quizBookmark.quiz));
                                                $('.quiz-body>div').append($newPage);
                                                $ask.detach();
                                                $col = $('.quiz' + quizIndex.quizBookmark.quiz + '-col' + 1);
                                                $col.append($ask);
                                            }
                                            else if (quizBookmark.col == 1) {
                                                $ask.detach();
                                                $col = $('.quiz' + quizBookmark.quiz + '-col' + 2);
                                                quizIndex.quizBookmark.col = 2;
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
                            quizIndex.quizBookmark = {
                                quiz: '1',
                                col: '1',
                            };
                            for (var i = 0; i < quizAllData.ask.askList.length; i++) {
                                appendNewAsk(quizIndex.quizBookmark, quizAllData.quiz.layoutStyle, quizAllData.ask.askList[i]);
                            }
                        };

                        //初始化查看模板模态框
                        var initTemplateModal = function (quizAllData) {
                            var $templateModal = $('#quizViewModal');
                            $templateModal.find('.close').off('click').on('click',function () {
                                $('#quizViewModal').modal('toggle');
                            });
                            $templateModal.find('.quiz-title').prepend(quizAllData.quiz.title);
                            $templateModal.find('.quiz-title .quiz-subtitle').html(quizAllData.quiz.subtitle);
                            // initTemplateContent(quizAllData);
                        };

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
                                    //重置查看模板模态框

                                    resetTemplateModal();

                                    //初始化查看模板模态框
                                    $('#quizViewModal').on('shown.bs.modal',function(){
                                        // 加载内容
                                        initTemplateContent(quizAllData);
                                        page.initFinish();
                                    });
                                    $('#quizViewModal').modal('toggle');
                                    $('#quizViewModal .backQuizList').off('click').on('click',function () {
                                        $('#quizViewModal').modal('toggle');
                                    });
                                    initTemplateModal(quizAllData);


                                }
                            )
                            console.log(row)
                        };

                        // 发布问卷按钮点击
                        var releaseQuiz = function (event) {
                            var row = event.data;
                            initReleaseQuiz();
                            $('#releaseQuizModal').modal('toggle');
                            console.log($(document).find('.bootstrap-datetimepicker-widget'));
                            $(document).find('.bootstrap-datetimepicker-widget').css({position:'relative','z-index':'11000'});
                            $('#releaseQuizModal .backQuizList,#releaseQuizModal .close').off('click').on('click',function () {
                                $('#releaseQuizModal').modal('toggle');
                            });
                            console.log(row);
                        };
                        var initReleaseQuiz = function(){
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
                            // $('#releaseDateTime').data("DateTimePicker").show();
                        }
                        // 删除问卷按钮点击
                        var deleteQuiz = function (event) {
                            var row = event.data;
                            bootbox.confirm({
                                message: "确定删除问卷?",
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
                                                    $('#quizListTable').DataTable().ajax.reload();
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
                        var newQuiz = function () {
                            console.log('跳转');
                            var param = {
                                openCode: 1,
                                quizAllData: {
                                    quiz: {
                                        quizID: Guid.newGuid().toString('g'),
                                        templateID: 'null',
                                        status: '0'
                                    },
                                    ask: {
                                        templateFlag: 0
                                    }
                                }
                            };
                            $state.go('newQuiz', {param: JSON.stringify(param)});
                        };
                        var table = $('#quizListTable');
                        var dataTable = table.DataTable({
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
                            dom: 'Bfrtip',
                            buttons: [
                                {
                                    text:'<i class="fa fa-refresh"></i>',
                                    className: 'btn btn-transparent green btn-outline btn-circle refreshTable'
                                },
                                {
                                    text:'新增问卷',
                                    className: 'btn btn-transparent green btn-outline btn-circle newQuiz'
                                },
                                {
                                    extend: 'print',
                                    text:'打印',
                                    title:'青少年近视干预项目|所有问卷',
                                    exportOptions:{
                                        columns:':not(:last-child)'
                                    },
                                    className: 'btn btn-transparent green-jungle btn-outline btn-circle'
                                },
                                {
                                    extend: 'excel',
                                    text:'Excel',
                                    filename:'所有问卷',
                                    exportOptions:{
                                        columns:':not(:last-child)'
                                    },
                                    className: 'btn btn-transparent green-jungle btn-outline btn-circle'
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
                                    width: '5%',
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
                                            '操作<i class="fa fa-angle-up"></i> ' +
                                            '</button> ' +
                                            '<ul class="button-dropdown-list is-above dropdown-menu pull-right" role="menu">' +
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
                                [5, 10, 15, 20, "全部"] // change per page values here
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
                        // var dataTable = $('#quizListTable').DataTable();
                        // console.log(dataTable.buttons().container());
                        dataTable.buttons().container()
                            .appendTo( $('.quiz-list-table-btn-group.btn-group') );
                        dataTable.on('init', function () {
                            // console.log(dataTable.data().length);
                            $('.refreshTable').on('click',function () {
                                dataTable.ajax.reload();
                            });
                            $('.newQuiz').on('click',function () {
                                newQuiz();
                            });
                        });

                        $('.confirmWord').on('click',function () {
                            // window.open('<p>sadadsasddas</p>','_blank');
                            // window.print();
                        });
                    };
                    initQuizList();
                }
            };

        }();
        quizIndex.init();
    });
}]);
