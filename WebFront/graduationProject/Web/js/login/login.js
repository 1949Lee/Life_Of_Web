var Login = function () {

    var handleLogin = function () {
        $('#verificationCodeImg').on('click', function () {
            $(this).attr('src', '../img/verificationCode.php?' + Math.random());
        });
        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            ignore: '',
            focusInvalid: true, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                verificationCode: {
                    required: true
                },
                remember: {
                    required: false
                }
            },

            messages: {
                username: {
                    required: "用户名不能为空"
                },
                password: {
                    required: "密码不能为空"
                },
                verificationCode: {
                    required: "验证码不能为空"
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit
                //$('.alert-danger', $('.login-form')).show();
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },

            submitHandler: function (form) {
                //console.log($(form));
                page.loading();
                ajaxByJQ.invokeServer('user/userHandler.php', {
                        method: 'login',
                        code: $(form).find('input[name=verificationCode]').val(),
                        loginID: $(form).find('.loginID').val(),
                        password: $(form).find('.password').val()
                    }, function (data) {
                        console.log(data);
                        if (data.code == '829') {//登陆成功
                            page.initFinish();
                            $('.alert-danger', $('.login-form')).hide();
                            console.log(JSON.stringify(data));
                            console.log(JSON.parse(JSON.stringify(data)));
                            setCookie('loginInfo', JSON.stringify(data.result));
                            page.redirect('html/main.html');

                        }
                        else if (data.code == '101') {//验证码错误
                            $('.alert-danger').html('验证码错误');
                            $('.alert-danger', $('.login-form')).show();
                            page.initFinish();
                        }
                        else if (data.code == '102') {//用户名不存在
                            $('.alert-danger').html('用户名不存在');
                            $('.alert-danger', $('.login-form')).show();
                            page.initFinish();
                        }
                        else if (data.code == '103') {//密码错误
                            $('.alert-danger').html('密码错误');
                            $('.alert-danger', $('.login-form')).show();
                            page.initFinish();
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
        });

        $('.login-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
    }
    var delAllCookies = function () {
        delCookie('loginInfo');
    }

    var handleForgetPassword = function () {
        $('.forget-form').validate({
            errorElement: 'span',
            errorClass: 'help-block',
            focusInvalid: true,
            ignore: "",
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },

            messages: {
                email: {
                    required: "邮箱不能为空",
                    email: '邮箱格式不对'
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit

            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function (error, element) {
                if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                }
                else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function (form) {
                page.loading();
                ajaxByJQ.invokeServer('user/userHandler.php', {
                        method: 'forgetPassword',
                        email: $(form).find('input[name=email]').val()
                    }, function (data) {
                        console.log(data);
                        if (data.code == '829') {//找回密码邮件发送成功
                            page.initFinish();
                            $('.alert-danger', $('.forget-form')).hide();
                            $('.login-form').show();
                            $('.forget-form').hide();
                        }
                        else if (data.code == '101') {//邮箱非绑定
                            $('.alert-danger', $('.forget-form')).html('请输入账户绑定的邮箱');
                            $('.alert-danger', $('.forget-form')).show();
                            page.initFinish();
                        }
                        else if (data.code == '102') {//邮件发送失败
                            $('.alert-danger', $('.forget-form')).html('邮件发送失败，请重试');
                            $('.alert-danger', $('.forget-form')).show();
                            page.initFinish();
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
        });

        $('.forget-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });

        jQuery('#forget-password').click(function () {
            jQuery('.login-form').hide();
            jQuery('.forget-form').show();
        });

        jQuery('#back-btn').click(function () {
            jQuery('.login-form').show();
            jQuery('.forget-form').hide();
        });

    }

    var handleRegister = function () {

        function format(state) {
            if (!state.id) {
                return state.text;
            }
            var $state = $(
                '<span><img src="../assets/global/img/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
            );

            return $state;
        }

        $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: true, // do not focus the last invalid input
            ignore: "",
            rules: {
                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                rePassword: {
                    equalTo: "#register_password"
                }
            },

            messages: {
                fullname: {
                    required: "姓名不能为空"
                },
                email: {
                    required: "邮箱不能为空"
                },
                password: {
                    required: "密码不能为空"
                },
                rePassword: {
                    equalTo: "两次输入密码不一致"
                },
                username: {
                    required: "登录名不能为空"
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit

            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function (error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });

        $('.register-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.register-form').validate().form()) {
                    $('.register-form').submit();
                }
                return false;
            }
        });

        jQuery('#register-btn').click(function () {
            jQuery('.login-form').hide();
            jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function () {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });
    }

    return {
        //main function to initiate the module
        init: function () {
            delAllCookies();
            handleLogin();
            handleForgetPassword();
            handleRegister();
            page.initFinish();
        }

    };

}();

jQuery(document).ready(function () {
    Login.init();
});