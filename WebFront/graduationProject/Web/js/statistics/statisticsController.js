/**
 * Created by Lee on 2017/6/13.
 */

angular.module('quizApp').controller('statisticsController', ['$rootScope', '$scope', '$state', 'settings', function ($rootScope, $scope, $state, settings) {
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
            var statisticsIndex = function () {
                return {

                    //页面的一些变量


                    //页面初始化入口
                    init: function () {
                        var quizIndex = this;
                        if (!jQuery().dataTable) {
                            return;
                        }

                        var getFilterTableObj = function (dataList, tableObj) {
                            var obj = $.extend(true, {}, tableObj);
                            if (dataList.length == 0) {
                                obj.language = dataTableLanguage({sEmptyTable: '本次问卷没有统计项'});
                                obj.data = [];
                                $('#newCondition').addClass('hide');
                                return obj;
                            }
                            else {
                                $('#newCondition').removeClass('hide');
                                return obj;
                            }
                        };

                        var getSelect2Data = function (type, statisticsData) {
                            switch (type) {
                                case 1:
                                    var result = [];
                                    for (var i = 0; i < statisticsData.length; i++) {
                                        result.push({id: statisticsData[i].quizID, text: statisticsData[i].name});
                                    }
                                    return result;
                                    break;
                                case 2:
                                    var result = [];
                                    for (var i = 0; i < statisticsData.length; i++) {
                                        result.push({
                                            id: statisticsData[i].eleID,
                                            text: statisticsData[i].name
                                        });
                                    }
                                    return result;
                                    break;
                                case 3:
                                    break;
                                case 4:
                                    var result = [];
                                    for (var i = 0; i < statisticsData.code.length; i++) {
                                        result.push({
                                            id: statisticsData.code[i],
                                            text: statisticsData.valueName[i]
                                        });
                                    }
                                    return result;
                                    break;
                            }
                        };

                        var setDisabledRule = function ($slt, data) {
                            $slt.find('option').removeAttr('disabled', 'disabled');
                            switch (data.elementType) {
                                case '001':
                                case '002':
                                    $slt.find('option:not([value=101],[value=102])')
                                        .attr('disabled', 'disabled');
                                    break;
                                case '003':
                                    $slt.find('option:not(:not([value=101],[value=102]))')
                                        .attr('disabled', 'disabled');
                                    break;
                                case '004':
                                    break;
                            }
                        };

                        var checkBeforeFilter = function () {
                            var table = $('#filterTable');
                            var result = true;
                            table.find('tbody>tr[role=row]').each(function () {
                                // $(this).find('td').not(':last-child,:nth-last-child(2)')
                                //     .each(function () {
                                //
                                //     });
                                if (result) {
                                    result = isValid($(this).find('.statisticsName').val(), 3) && isValid($(this).find('.statisticsRule').val(), 3) && isValid($(this).find('.statisticsValue').val(), 3);
                                }
                            });
                            return result;
                        };

                        var doFilter = function () {
                            var table = $('#filterTable');
                            if (checkBeforeFilter()) {
                                var filterData = {
                                    quizID: $('#quizSlt').val(),
                                    conditions: []
                                };
                                table.find('tbody>tr[role=row]').each(function () {
                                    var obj = {};
                                    obj.statisticsCode = $(this).find('.statisticsName').val();
                                    obj.statisticsName = $(this).find('.statisticsName>option:selected').text();
                                    obj.statisticsValue = $(this).find('.statisticsRule').val();
                                    obj.statisticsAnswer = ($(this).find('.statisticsValue').val()).join(',');
                                    filterData.conditions.push(obj);
                                });
                                console.log(filterData);
                                page.loading();
                                initStatisticalResult(filterData);
                                // ajaxByJQ.invokeServer('statistics/statisticsIndexHandler.php',
                                //     {
                                //         method: 'getFilterResult',
                                //         filter: filterData
                                //     },
                                //     function (statisticsData) {
                                //         console.log(statisticsData);
                                //         if (statisticsData['code'] == '829') {
                                //             page.initFinish();
                                //         }
                                //         else {
                                //             page.initFinish();
                                //         }
                                //     }
                                // );
                            }
                            else {
                                toastr.warning('', '请确认条件配置完整');
                            }
                        };

                        var quizView = function (event) {
                            var row = event.data;
                            // console.log(row)
                            $state.go('childQuiz', {param: JSON.stringify(row)});
                        };

                        //显示同结果列表
                        var initStatisticalResult = function (filterData) {
                            var serverSide = false;
                            var table = $('#resultTable');
                            var dataTable = table.DataTable({
                                // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                                "language": dataTableLanguage({sEmptyTable: '该条件下没有统计结果',sInfoEmpty:'当前没有统计结果'}),

                                // Or you can use remote translation file
                                //"language": {
                                //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
                                //},
                                "order": [
                                    [0, 'asc']
                                ],
                                destroy:true,
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
                                dom: 'Blfriptip',
                                buttons: [
                                    {
                                        text: '<i class="fa fa-refresh"></i>',
                                        className: 'btn btn-transparent green btn-outline btn-circle refreshTable'
                                    },
                                    {
                                        extend: 'print',
                                        text: '打印',
                                        title: '青少年近视干预项目|数据统计',
                                        exportOptions: {
                                            columns: ':not(:last-child)'
                                        },
                                        className: 'btn btn-transparent green-jungle btn-outline btn-circle'
                                    },
                                    {
                                        extend: 'excel',
                                        text: 'Excel',
                                        filename: '数据统计',
                                        exportOptions: {
                                            columns: ':not(:last-child)'
                                        },
                                        className: 'btn btn-transparent green-jungle btn-outline btn-circle'
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
                                        data: 'submitDatetime',
                                        title: '提交时间',
                                        width: '15%'
                                    },
                                    {
                                        data: null,
                                        title: '操作',
                                        width: '6%',
                                        responsivePriority: 3,
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
                                                '<div class=" btn-group btn-group-sm  btn-group-none">' +
                                                '<button id="quizView" type="button" class="btn btn-sm green-jungle">' +
                                                '查看<i class="fa fa-eye"></i> ' +
                                                '</button>' +
                                                '</div>';
                                            return actionHtml;
                                        }
                                    }
                                ],
                                "createdRow": function (row, data, dataIndex) {
                                    $(row).find('#quizView').off('click').on('click', data, quizView);
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
                                    url: ServiceUrl() + 'statistics/statisticsIndexHandler.php',
                                    type: 'post',
                                    // cache: false,
                                    // dataType: 'json',
                                    dataSrc: function (data) {
                                        page.initFinish();
                                        console.log(data);
                                        return data.resultList;
                                    },
                                    data: function (d) {
                                        d.method = 'getFilterResult';
                                        d.filter = filterData;
                                        // console.log(d);
                                        // return JSON.stringify( d );
                                    }
                                },
                                // "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // 水平滚动
                            });
                            // var dataTable = $('#resultTable').DataTable();
                            // console.log(dataTable.buttons().container());
                            dataTable.buttons().container()
                                .appendTo($('.quiz-list-table-btn-group.btn-group'));
                            dataTable.on('init', function () {
                                // console.log(dataTable.data().length);
                                $('.refreshTable').on('click', function () {
                                    dataTable.ajax.reload();
                                });
                                $('.newQuiz').on('click', function () {
                                    newQuiz();
                                });
                            });
                        };

                        //初始配置化表格
                        var initQuizList = function (statisticsData) {
                            var myFunc = this;
                            var serverSide = false;
                            var table = $('#filterTable');
                            var dataTable;
                            $('#quizSlt').select2({
                                data: getSelect2Data(1, statisticsData)
                            });
                            $('#quizSlt').on('change', function (evt) {
                                var index = $('#quizSlt').find('option:selected').index();
                                // $('#filterTable').DataTable().destroy();
                                var tableObj = getFilterTableObj(statisticsData[index].dataList, dataTableOptionObj);
                                // console.log(dataTableOptionObj);
                                // console.log(tableObj);
                                dataTable = $('#filterTable').DataTable(tableObj);
                                $('.statisticsName').select2({
                                    data: getSelect2Data(2, statisticsData[index].dataList)
                                });
                            });
                            $(document).on('change', '.statisticsName', function () {
                                var index = $('#quizSlt').find('option:selected').index();
                            });
                            $('#newCondition').on('click', function () {
                                $('#filterTable').DataTable().row.add(1).draw();
                                var index = $('#quizSlt').find('option:selected').index();
                                $('.statisticsName').select2({
                                    data: getSelect2Data(2, statisticsData[index].dataList)
                                });
                            });
                            var dataTableOptionObj = {
                                "destroy": true,
                                "language": dataTableLanguage({sEmptyTable: '请配置统计条件'}),
                                "ordering": false,
                                // scrollX:true,
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
                                dom: 'rt',
                                responsive: {
                                    details: {
                                        renderer: function (api, rowIdx, columns) {
                                            var data = $.map(columns, function (col, i) {
                                                var $show
                                                if (col.hidden) {
                                                    var $div = $('#filterTable').find('tbody>tr[role=row]').eq(col.rowIndex).find('>td').eq(col.columnIndex).find('div').clone(true);
                                                    $show = $('<li data-dtr-index="' + col.columnIndex + '" data-dt-row="' + rowIdx + '" data-dt-column="' + col.columnIndex + '">' +
                                                        '<span class="dtr-title">' + col.title + '</span>' +
                                                        '<span class="dtr-data"></span></li>');
                                                    $show.find('.dtr-data').append($div);
                                                    // $show.find('.dtr-data>div>:not(select)').detach();
                                                    // $show.find('.dtr-data>div>select').select2();
                                                    var index = $('#quizSlt').find('option:selected').index();
                                                }
                                                // var jIndex = parseInt($(this).find('option:selected').index()) - 1;
                                                // var $row = $('#filterTable').find('tbody>tr[role=row]').eq(col.rowIndex);
                                                // $row.find('.statisticsRule,.statisticsValue').parent().removeClass('hide');
                                                // setDisabledRule($row.find('.statisticsRule'), statisticsData[index].dataList[jIndex]);
                                                // $row.find('.statisticsRule').select2();
                                                // $row.find('.statisticsValue').empty().append('<option value=""></option>').select2({
                                                //     data: getSelect2Data(4, statisticsData[index].dataList[jIndex])
                                                // });
                                                return col.hidden ?
                                                    $show.prop("outerHTML") :
                                                    '';
                                            }).join('');

                                            return data ?
                                                $('<ul data-dtr-index="' + rowIdx[0] + '" class="dtr-details"></ul>').append(data) :
                                                false;
                                        }
                                    }
                                },
                                columns: [
                                    {
                                        data: null,
                                        title: '数据项名称',
                                        width: '18%',
                                        responsivePriority: 1,
                                        render: function (data, type, row, meta) {
                                            var actionHtml = '<div class=""><select class="select2 form-control statisticsName" name="" data-placeholder="请选择"><option value=""></option></select></div>';
                                            return actionHtml;
                                        }
                                    },
                                    {
                                        data: null,
                                        title: '规则',
                                        width: '18%',
                                        responsivePriority: 4,
                                        render: function (data, type, row, meta) {
                                            var actionHtml = '<div class="hide"><select class="select2 form-control statisticsRule" name="" data-placeholder=""><option value=""></option>' +
                                                '<option value="101">属于</option>' +
                                                '<option value="102">不属于</option>' +
                                                '<option value="103">等于</option>' +
                                                '<option value="104">不等于</option>' +
                                                '<option value="105">大于</option>' +
                                                '<option value="106">大于等于</option>' +
                                                '<option value="107">小于</option>' +
                                                '<option value="108">小于等于</option>' +
                                                '<option value="109">在……之间</option>' +
                                                '</select></div>';
                                            return actionHtml;
                                        }
                                    },
                                    {
                                        data: null,
                                        title: '值',
                                        width: '14%',
                                        render: function (data, type, row, meta) {
                                            var actionHtml = '<div class="hide"><select class="select2 form-control statisticsValue" name="" data-placeholder="" multiple><option value=""></option></select></div>';
                                            return actionHtml;
                                        }
                                    },
                                    {
                                        data: null,
                                        title: '关系',
                                        width: '10%',
                                        responsivePriority: 3,
                                        render: function (data, type, row, meta) {
                                            // var actionHtml = '<div class="hide"><select class="select2 form-control statisticsRelationship" name="" data-placeholder=""><option value=""></option></select></div>';
                                            var actionHtml = '<div class="hide">与</div>';
                                            return actionHtml;
                                        }
                                    },
                                    {
                                        data: null,
                                        title: null,
                                        width: '5%',
                                        responsivePriority: 2,
                                        render: function (data, type, row, meta) {
                                            var actionHtml = '<button id="" type="button" class="btn red delete"><i class="fa fa-minus-circle"></i>&nbsp;删除</button>';
                                            return actionHtml;
                                        }
                                    },
                                ],
                                createdRow: function (row, data, dataIndex) {
                                    if (dataIndex + 1 > 1) {
                                        table.find('tbody>tr[role=row]').each(function () {
                                            $(this).find('td').eq(-2).find('>div').removeClass('hide');
                                        });
                                    }
                                    $(row).find('.delete').on('click', function () {
                                        $('#filterTable').DataTable().row($(row)).remove().draw();
                                        table.find('tbody>tr[role=row]:last-child')
                                            .find('td').eq(-2).find('>div').addClass('hide');
                                    });
                                    $(row).find('.statisticsName').on('change', function () {
                                        var index = $('#quizSlt').find('option:selected').index();
                                        var jIndex = parseInt($(this).find('option:selected').index()) - 1;
                                        $(row).find('.statisticsRule,.statisticsValue').parent().removeClass('hide');
                                        setDisabledRule($(row).find('.statisticsRule'), statisticsData[index].dataList[jIndex]);
                                        $(row).find('.statisticsRule').select2();
                                        $(row).find('.statisticsValue').empty().append('<option value=""></option>').select2({
                                            data: getSelect2Data(4, statisticsData[index].dataList[jIndex])
                                        });
                                    });
                                },
                                colReorder: true,
                                processing: true,
                                serverSide: serverSide,
                                data: [[1]]
                            };
                            // var dataTable = table.DataTable(dataTableOptionObj);
                            $('#quizSlt').trigger('change');
                            $('#doFilter').off('click').on('click', function () {
                                doFilter();
                            });
                            page.initFinish();
                            // dataTable.row.add(1).draw();
                            // $('#filterTable').DataTable().destroy();
                            // dataTable = table.DataTable(dataTableOptionObj);
                        };


                        var initStatisticsData = function () {
                            page.loading();
                            ajaxByJQ.invokeServer('statistics/statisticsIndexHandler.php',
                                {
                                    method: 'getStatisticsData'
                                },
                                function (statisticsData) {
                                    console.log(statisticsData);
                                    if (statisticsData['code'] == '829') {
                                        initQuizList(statisticsData.statisticsList);
                                    }
                                    else {
                                        page.initFinish();
                                    }
                                }
                            );

                        };
                        initStatisticsData();
                    }
                };

            }
            ();
            statisticsIndex.init();
        }
    );
}]);
