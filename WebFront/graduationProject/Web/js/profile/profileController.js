/**
 * Created by Lee on 2017/6/1.
 */
angular.module('quizApp').controller('profileController', ['$rootScope', '$scope', '$state', 'settings', function ($rootScope, $scope, $state, $stateParams, settings) {
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

        // 初始化布局结束

        var loginInfo = getLogin();
        if (loginInfo == null) {
            window.location.href = WebUrl() + 'html/login.html';
        }
        function reSetChangePassword(eleString) {
            if (eleString == 'all') {
                $('input[name=oldPassword],input[name=newPassword],input[name=confirmPassword]').val('');
                var changePasswordForm = $('#changePasswordForm');
                changePasswordForm.find('input[name=oldPassword],input[name=newPassword],input[name=confirmPassword]').parent().parent().removeClass().addClass('form-group form-md-line-input').find('.help-block').remove();
                return;
            }
            var eleSelector = eleString.split(',');
            for (var i = 0; i < eleSelector.length; i++) {
                $('input[name=' + eleSelector[i] + ']').val('');
                var changePasswordForm = $('#changePasswordForm');
                changePasswordForm.find('input[name=' + eleSelector[i] + ']').parent().parent().removeClass().addClass('form-group form-md-line-input').find('.help-block').remove();
            }
        }

        function ChangePasswordFocus(selector){
            $('input[name='+selector+']').focus();
        }

        function changePassword() {
            page.loading();
            if ($('#oldPassword').val() != loginInfo.password) {//旧密码错误
                page.initFinish();
                toastr.error('', '旧密码错误，请重新输入！');
                reSetChangePassword('oldPassword');
                ChangePasswordFocus('oldPassword');
                return;
            }
            ajaxByJQ.invokeServer('user/userHandler.php', {
                    method: 'changePassword',
                    userID: loginInfo.userID,
                    newPassword: $('#newPassword').val()
                }, function (data) {
                console.log(data);
                    if (data.code == '829') {//修改成功
                        page.initFinish();
                        toastr.success('', '修改成功');
                        setCookie('loginInfo', JSON.stringify(data.result));
                        loginInfo = getLogin();
                        $('.showChangeBtn').click();
                    }
                    else {
                        console.log(data);
                        page.initFinish();
                        toastr.error('', '修改失败，请重试！');
                    }
                },
                {
                    cache: false,
                    dataType: 'json',
                    //failedFun:function(){}
                    // type:get或post
                }
            );
        }

        function initChangePasswordForm() {
            var changePasswordForm = $('#changePasswordForm');
            var error = $('.alert-danger', changePasswordForm);
            var success = $('.alert-success', changePasswordForm);
            changePasswordForm.validate({
                doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    //创建问卷
                    oldPassword: {
                        required: true
                    },
                    newPassword: {
                        required: true
                    },
                    confirmPassword: {
                        equalTo: '#newPassword',
                        required: true
                    }
                },

                messages: {
                    oldPassword: {
                        required: '旧密码必须填写'
                    },
                    newPassword: {
                        required: '新密码必须填写'
                    },
                    confirmPassword: {
                        equalTo: '两次输入密码不一致',
                        required: '请确认密码'
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    error.insertAfter(element); // for other inputs, just perform default behavior
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
                    label
                        .addClass('valid') // mark the current input as valid and display OK icon
                        .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                },

                submitHandler: function (form) {
                    changePassword();
                }

            });
        }

        function commonHandle() {
            $('.showChangeBtn').off('click').on('click', function () {
                if ($('.changePasswordRow').hasClass('hide')) {
                    $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
                    $('.changePasswordRow').removeClass('hide');
                }
                else {
                    $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
                    $('.changePasswordRow').addClass('hide');
                    reSetChangePassword('all');
                }
            });
            initChangePasswordForm();
        }

        commonHandle();
        if (loginInfo.userStatus == '4') {
            page.reloadSidebar(['quiz', 'template', 'statistics']);
            var serverSide = false;
            var profileIndex = function () {
                return {

                    //页面的一些变量


                    //页面初始化入口
                    init: function () {
                        $('.childList').show();
                        $('.nameCol').hide();
                        $('.emailLabel').html('手机号');
                        $('input[name=email]').val(maskStr(loginInfo.name,2)).attr('disabled', 'disabled').parent().parent().addClass('has-success');
                        var table = $('#childListTable');
                        table.removeClass('hide');
                        var oTable = table.dataTable({
                            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                            "language": dataTableLanguage({sEmptyTable: '当前没有可供填写的问卷'}),

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
                                    data: 'name',
                                    title: '问卷名称',
                                    width: '25%',
                                    responsivePriority: 1
                                },
                                {
                                    data: 'schoolName',
                                    title: '学校',
                                    width: '15%',
                                    responsivePriority: 2
                                },
                                {
                                    data: 'grade',
                                    title: '年级',
                                    width: '25%'
                                },
                                {
                                    data: 'class',
                                    title: '班级',
                                    width: '25%'
                                }
                            ],
                            "createdRow": function (row, data, dataIndex) {
                                $(row).find('td').eq(0).text(maskStr($(row).find('td').eq(0).text(),1));
                                $(row).find('td').eq(1).text(maskStr($(row).find('td').eq(1).text(),3));
                                // $(row).find('#quizWrite').off('click').on('click', data, quizWrite);
                                // $(row).find('#quizView').off('click').on('click', data, quizView);
                            },
                            "lengthMenu": [
                                [-1],
                                ["全部"] // change per page values here
                            ],
                            // set the initial value
                            "pageLength": -1,
                            colReorder: true,
                            processing: true,
                            serverSide: serverSide,
                            ajax: {
                                url: ServiceUrl() + 'user/userHandler.php',
                                type: 'post',
                                // cache: false,
                                // dataType: 'json',
                                dataSrc: function (data) {
                                    console.log(data);
                                    page.initFinish();
                                    return data.childList;
                                },
                                data: function (d) {
                                    d.method = 'getChildren';
                                    d.userID = loginInfo.userID;
                                    console.log(d);
                                    // return JSON.stringify( d );
                                }
                            },
                            // "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // 水平滚动
                        });
                        var dataTable = $('#childListTable').DataTable();
                        dataTable.on('init', function () {
                            // console.log(dataTable.data().length);
                        });
                        $('#refreshTable').on('click', function () {
                            dataTable.ajax.reload();
                        });
                    }
                };

            }();
            profileIndex.init();
        }
        else {
            var profileIndex = function () {

                return {

                    init: function () {
                        $('.childList').hide();
                        $('input[name=email]').val(loginInfo.email).attr('disabled','disabled').parent().parent().addClass('has-success');
                        $('input[name=name]').val(loginInfo.name).attr('disabled','disabled').parent().parent().addClass('has-success');
                        page.initFinish();
                    }
                };
            }();
            profileIndex.init();
        }
    });
}]);