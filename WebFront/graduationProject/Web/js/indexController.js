/**
 * Created by Lee on 2017/5/16.
 */
angular.module('quizApp').controller('indexController', ['$rootScope', '$scope', '$state', 'settings', function ($rootScope, $scope, $state, $stateParams, settings) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
        // console.log($('.nav-item.active').find('.nav-link').data('page-bar-index'));
        page.changePageBar(getCookie('currentSideBar'));
        page.loading();
        // 初始化页面布局
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        // 初始化布局结束

        var loginInfo = getLogin();
        if(loginInfo == null){
            window.location.href = WebUrl()+'html/login.html';
        }
        if(loginInfo.userStatus == '4'){
            page.reloadSidebar(['quiz','template','statistics']);
            $('.page-title').html('我的问卷');
            var childQuizIndex = function () {
                return {

                    //页面的一些变量


                    //页面初始化入口
                    init: function () {
                        var profileIndex = this;
                        if (!jQuery().dataTable) {
                            return;
                        }
                        var initChild = function () {
                            for(var i = 0;i < loginInfo.childList.length;i++){
                                var $options =$('<option></option>');
                                $options.attr({'value':loginInfo.childList[i].childID});
                                $options.text(maskStr(loginInfo.childList[i].name,1));
                                $('#child').append($options)
                            }
                            $('#child').parent().removeClass('hide');
                            $('#child').val(loginInfo.childList[0].childID).select2().toggle('change');
                        };
                        initChild();
                        //初始化表格
                        var initQuizList = function () {
                            var myFunc = this;
                            var serverSide = false;
                            var actionClass = function (row, btnType) {
                                var className = '';
                                switch (btnType) {
                                    case 'quizWrite':
                                        if (row.writeStatus == '1'||row.writeStatus == '3') {
                                            className = '';
                                        }
                                        else {
                                            className = 'disabled';
                                        }
                                        break;
                                    case 'quizView':
                                        if (row.writeStatus == '1'||row.writeStatus == '3') {
                                            className = 'disabled';
                                        }
                                        else {
                                            className = '';
                                        }
                                        break;
                                }
                                return className;
                            };

                            // 填写问卷按钮点击
                            var quizWrite = function (event) {
                                var row = event.data;
                                if(row.writeStatus == '3'){
                                    row.childQuizID = Guid.newGuid().toString('g');
                                }
                                $state.go('childQuiz', {param: JSON.stringify(row)});
                            };

                            // 查看问卷按钮点击
                            var quizView = function (event) {
                                var row = event.data;
                                // console.log(row)
                                $state.go('childQuiz', {param: JSON.stringify(row)});
                            };

                            var table = $('#childQuizListTable');
                            table.removeClass('hide');
                            var oTable = table.dataTable({
                                // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                                "language": dataTableLanguage({sEmptyTable:'当前没有可供填写的问卷'}),

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
                                    }
                                ],
                                columns: [
                                    {
                                        data: 'quizName',
                                        title: '问卷名称',
                                        width: '20%',
                                        responsivePriority: 1
                                    },
                                    {
                                        data: 'author',
                                        title: '发布者',
                                        width: '10%'
                                    },
                                    {
                                        data: 'updateDatetime',
                                        title: '最后填写时间',
                                        width: '15%',
                                    },
                                    {
                                        data: 'submitDatetime',
                                        title: '提交时间',
                                        width: '15%'
                                    },
                                    {
                                        data: 'writeStatusName',
                                        title: '问卷状态',
                                        width: '8%',
                                        responsivePriority: 3
                                    },
                                    {
                                        data: null,
                                        title: '操作',
                                        width: '6%',
                                        responsivePriority: 2,
                                        render: function (data, type, row, meta) {
                                            var actionHtml =
                                                '<div class="button-dropdown btn-group  btn-group-sm  btn-group-none">' +
                                                '<button type="button button-action" class="btn btn-fit-height green-jungle dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="true">' +
                                                '操作<i class="fa fa-angle-up"></i> ' +
                                                '</button> ' +
                                                '<ul class="button-dropdown-list is-above dropdown-menu pull-right" role="menu">' +
                                                '<li>' +
                                                '<a  id="quizWrite" class="btn black ' + actionClass(row, 'quizWrite') + '"><i class="fa fa-sticky-note"></i>填写</a>' +
                                                '</li>' +
                                                '<li>' +
                                                '<a  id="quizView" class="btn black ' + actionClass(row, 'quizView') + '"><i class="fa fa-eye"></i>查看</a>' +
                                                '</li>' +
                                                '</ul>' +
                                                '</div>';
                                            return actionHtml;
                                        }
                                    }
                                ],
                                "createdRow": function (row, data, dataIndex) {
                                    $(row).find('#quizWrite').off('click').on('click', data, quizWrite);
                                    $(row).find('#quizView').off('click').on('click', data, quizView);
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
                                    url: ServiceUrl() + 'indexHandler.php',
                                    type: 'post',
                                    // cache: false,
                                    // dataType: 'json',
                                    dataSrc: function (data) {
                                        console.log(data);
                                        return data.childQuizList;
                                    },
                                    data: function (d) {
                                        d.method = 'getQuizListForChild';
                                        d.childID = $('#child').val();
                                        console.log(d);
                                        // return JSON.stringify( d );
                                    }
                                },
                                // "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // 水平滚动
                            });
                            var dataTable = $('#childQuizListTable').DataTable();
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
            childQuizIndex.init();
        }
        else{
            var quizIndex = function () {

                return {

                    init: function () {
                        var quizIndex = this;
                        if (!jQuery().dataTable) {
                            return;
                        }

                        var initQuizList = function () {
                            var myFunc = this;
                            var serverSide = false;

                            // 查看问卷按钮点击
                            var quizView = function (event) {
                                var row = event.data;
                                // console.log(row)
                                $state.go('childQuiz', {param: JSON.stringify(row)});
                            };
                            $(document).off('click','tr.child #quizView').on('click','tr.child #quizView',function(){
                                var filterData = {};
                                delCookie('filterData');
                                filterData.page = $('#quizListTable').DataTable().page();
                                setCookie('filterData', JSON.stringify(filterData));
                                quizView({data:dataTable.data()[$(this).parent().parent().parent().attr('data-dt-row')]});
                            });
                            var table = $('#quizListTable');
                            table.removeClass('hide');
                            var oTable = table.dataTable({
                                // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                                "language": dataTableLanguage({sEmptyTable:'当前没有可供填写的问卷'}),

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
                                    }
                                ],
                                columns: [
                                    {
                                        data: 'quizName',
                                        title: '问卷名称',
                                        width: '20%',
                                        responsivePriority: 1
                                    },
                                    {
                                        data: 'author',
                                        title: '发布者',
                                        width: '10%'
                                    },
                                    {
                                        data: 'childName',
                                        title: '孩子姓名',
                                        width: '10%',
                                        responsivePriority: 2
                                    },
                                    {
                                        data: 'schoolName',
                                        title: '学校',
                                        width: '20%',
                                    },
                                    {
                                        data: 'gradeName',
                                        title: '年级',
                                        width: '9.5%',
                                    },
                                    {
                                        data: 'className',
                                        title: '班级',
                                        width: '9.5%',
                                    },
                                    {
                                        data: 'updateDatetime',
                                        title: '更新时间',
                                        width: '15%'
                                    },
                                    {
                                        data: null,
                                        title: '操作',
                                        width: '6%',
                                        responsivePriority: 2,
                                        render: function (data, type, row, meta) {
                                            // var actionHtml =
                                            //     '<div class="button-dropdown btn-group  btn-group-sm  btn-group-none">' +
                                            //     '<button type="button button-action" class="btn btn-fit-height green-jungle dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="true">' +
                                            //     '操作<i class="fa fa-angle-down"></i> ' +
                                            //     '</button> ' +
                                            //     '<ul class="button-dropdown-list is-above dropdown-menu pull-right" role="menu">' +
                                            //     '<li>' +
                                            //     '<a  id="quizView" class="btn black"><i class="fa fa-eye"></i>查看</a>' +
                                            //     '</li>' +
                                            //     '</ul>' +
                                            //     '</div>';
                                            var actionHtml =
                                                '<div class=" btn-group btn-group-sm  btn-group-none">'+
                                                '<button id="quizView" type="button" class="btn btn-sm green-jungle">' +
                                                '查看<i class="fa fa-eye"></i> ' +
                                                '</button>' +
                                                '</div>';
                                            return actionHtml;
                                        }
                                    }
                                ],
                                "createdRow": function (row, data, dataIndex) {
                                    $(row).on('click','#quizView',data,quizView);
                                    // $(row).find('#quizView').off('click').on('click', data, quizView);
                                    $(row).find('td').eq(2).text(maskStr($(row).find('td').eq(2).text(),1));
                                    $(row).find('td').eq(3).text(maskStr($(row).find('td').eq(3).text(),3));
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
                                    url: ServiceUrl() + 'indexHandler.php',
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
                                if(isValid(getCookie('filterData'),4)){
                                    var filterData = JSON.parse(getCookie('filterData'));
                                    dataTable.page(parseInt(filterData.page)).draw(false);
                                }
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
        }
        page.initFinish();
    });
}]);
