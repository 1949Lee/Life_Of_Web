/**
 * Created by Lee on 2017/1/24.
 */
var isTop = this.parent == this;

/*
 系统默认值
 */
var cookiesExpireDays = 30;

//获取当前服务的地址
function ServiceUrl() {
    var origin = window.location.href;
    origin = origin.slice(0, origin.indexOf('Web/html'));
    var url = origin + 'Service/';
    return url;

}
//获取当前Web的地址
function WebUrl() {
    var origin = window.location.href;
    origin = origin.slice(0, origin.indexOf('Web/html'))
    var url = origin + 'Web/';
    return url;

}
//字符串判断是否可用
// @param{type=1}则判断是否为undefined；{type=2}则判断是否为空或undefined
function isValid(str, type) {
    switch (type) {
        case 1:
            return !(str === undefined);
            break;
        case 2:
            return !((str === undefined) || ( str === ''));
            break;
    }
}
// JS原生的AJAX版本
var ajaxBYJS = {
    get: function (url, fn) {
        var obj = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据
        obj.open('GET', ServiceUrl() + url, true);
        obj.onreadystatechange = function () {
            if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState==4说明请求已完成
                fn.call(this, obj.responseText);  //从服务器获得数据
            }
        };
        obj.send(null);
    },
    post: function (url, data, fn) {
        var postData = '';
        for (var value in data) {
            postData += value + "=" + data[value] + "&"
        }
        var obj = new XMLHttpRequest();
        obj.open("POST", ServiceUrl() + url, true);
        obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
        obj.onreadystatechange = function () {
            if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {  // 304未修改
                fn.call(this, obj.responseText);
            }
        };
        obj.send(postData);
    }
}

// JQ的AJAX版本
/*
 调用示例
 //        ajaxByJQ.invokeServer('universalHandler.php', {urlClass: 'verificationCode', method: 'createCode',weight:'150',height:'50'}, function (data) {
 //                     console.log(data);
 //                    $("#test").attr('src',data);
 //                },
 //                {
 //                    cache: false,
 //                    dataType: 'json',
 //                    //failedFun:function(){}
 //                    // type:get或post
 //                }
 //        );
 // ajaxBYJS.post('ajaxHandler.php', {user: 'lee', password: '1949'}, function (data) {
 //     console.log(data);
 // });
 // ajaxBYJS.get('ajaxHandler.php',function (data) {
 //     console.log(data);
 // });
 */
var ajaxByJQ = {
    //1.$.ajax带json数据的异步请求,
    // 可选参数
    // ajaxParam{
    // cache:false或true
    // dataType:json或……
    // failedFun:可选，失败函数
    // type:可选，post 或者 get； 默认post
    // }
    invokeServer: function (url, data, successFun) {
        if (arguments.length > 3) {
            var type = arguments[3].type == undefined ? 'post' : arguments[3].type;
            $.ajax({
                url: ServiceUrl() + url,
                data: data,
                type: type,
                cache: arguments[3].cache,
                dataType: arguments[3].dataType,
                success: function (data) {
                    successFun.call(this, data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // if (arguments[3].failedFun != undefined) {
                    //     arguments[3].failedFun.call(this);
                    // } else {
                    //     alert("服务器正在抢救中！！");
                    // }
                    console.log(XMLHttpRequest);
                    console.log(textStatus);
                    console.log(errorThrown);
                    //alert("服务器正在抢救中！！");
                }
            })
        }
        else {
            $.ajax({
                url: ServiceUrl() + url,
                data: data,
                type: 'post',
                cache: false,
                dataType: 'json',
                success: function (data) {
                    successFun.call(this, data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                    console.log(textStatus);
                    console.log(errorThrown);
                    //alert("服务器正在抢救中！！");
                }
            })
        }

    }

};
var page = {
    initFinish: function (isTop) {
        if (!isTop) {
            $('.loader', parent.document).addClass('hide');
        }
        else {
            $('.loader').addClass('hide');
        }
    },
    pageBar: {
        bar0: [
            {page: '首页',icon:'icon-home', route: 'index'},
            {page: '问卷管理',icon:'icon-docs', route: 'quiz'},
            {page: '模板管理',icon:'icon-folder', route: 'template'},
            {page: '数据统计',icon:'icon-bar-chart', route: 'statistics'},
            {page: '个人中心',icon:'icon-user', route: 'profile'},
            {page: '系统设置',icon:'icon-settings', route: 'sysConfig'}
        ]
    },
    pageTitle: {
        title0: ['最新填写问卷', '问卷管理', '模板管理', '数据统计', '个人中心', '系统设置']
    },
    loading: function () {
        if (!isTop) {
            $('.loader', parent.document).removeClass('hide');
        }
        else {
            $('.loader').removeClass('hide');
        }
    },
    redirect: function (url) {
        this.loading();
        console.log(window.top);
        window.top.location.href = WebUrl() + url;
    },
    changePageBar:function changeBar(indexStr) {
        var pageBarHtml = '';
        var pageTitle = '';
        var _page = this;
        indexStr = indexStr.toString();
        if (isValid(indexStr, 2)) {
            var index = indexStr.split(',');
            if (index.length > 0) {
                $(index).each(function (i, ele) {
                    if (i == index.length - 1) {
                        pageBarHtml += '<li>' +
                            '<i class="'+_page.pageBar['bar' + i][ele].icon+'"></i>' +
                            '<a href="javascript:;" ui-sref="' + _page.pageBar['bar' + i][ele].route + '">' +
                            _page.pageBar['bar' + i][ele].page +
                            '</a>' +
                            '</li>';
                        pageTitle = _page.pageTitle['title' + i][ele];
                    }
                    else {
                        pageBarHtml += '<li>' +
                            '<i class="'+_page.pageBar['bar' + i][ele].icon+'"></i>' +
                            '<a href="javascript:;" ui-sref="' + _page.pageBar['bar' + i][ele].route + '">' +
                            _page.pageBar['bar' + i][ele].page +
                            '</a>' +
                            '<i class="fa fa-angle-right"></i>' +
                            '</li>';
                    }
                });
                $('.page-breadcrumb').html(pageBarHtml);
                $('.page-title').html(pageTitle);
            }
        }

    },
    initPageBar: function (selector) {
        var _page = this;
        $(selector).on('click', function () {
            var indexStr = $(this).data('page-bar-index');
            _page.changePageBar(indexStr);
        });
    },
    init: function (obj) {
        this.initPageBar(obj.initPageBar);
    }
};
//写入cookies
function setCookie(c_name, value) {
    if (arguments.length > 2) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + arguments[2]);
        document.cookie = c_name + "=" + escape(value) + ((arguments[2] == null) ? "" : ";expires=" + exdate.toGMTString());
    }
    else {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + cookiesExpireDays);
        document.cookie = c_name + "=" + encodeURIComponent(value) + ((cookiesExpireDays == null) ? "" : ";expires=" + exdate.toGMTString());
    }

}
//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return decodeURIComponent(arr[2]);
    else
        return null;
}
//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//全局唯一标识符
function Guid(g) {

    var arr = new Array(); //存放32位数值的数组


    if (typeof(g) == "string") { //如果构造函数的参数为字符串

        initByString(arr, g);

    }

    else {

        initByOther(arr);

    }

    //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。

    this.equals = function (o) {

        if (o && o.IsGuid) {

            return this.ToString() == o.ToString();

        }

        else {

            return false;

        }

    }

    //Guid对象的标记

    this.isGuid = function () {
    }

    //返回 Guid 类的此实例值的 String 表示形式。

    this.toString = function (format) {

        if (typeof(format) == "string") {

            if (format == "N" || format == "D" || format == "B" || format == "P") {

                return toStringWithFormat(arr, format);

            }

            else {

                return toStringWithFormat(arr, "D");

            }

        }

        else {

            return toStringWithFormat(arr, "D");

        }

    }

    //由字符串加载

    function initByString(arr, g) {

        g = g.replace(/\{|\(|\)|\}|-/g, "");

        g = g.toLowerCase();

        if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1) {

            initByOther(arr);

        }

        else {

            for (var i = 0; i < g.length; i++) {

                arr.push(g[i]);

            }

        }

    }

    //由其他类型加载

    function initByOther(arr) {

        var i = 32;

        while (i--) {

            arr.push("0");

        }

    }

    /*

     根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。

     N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

     D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

     B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}

     P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)

     */

    function toStringWithFormat(arr, format) {

        switch (format) {

            case "N":

                return arr.toString().replace(/,/g, "");

            case "D":

                var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20, 32);

                str = str.replace(/,/g, "");

                return str;

            case "B":

                var str = toStringWithFormat(arr, "D");

                str = "{" + str + "}";

                return str;

            case "P":

                var str = toStringWithFormat(arr, "D");

                str = "(" + str + ")";

                return str;

            default:

                return new Guid();

        }

    }

}

//Guid 类的默认实例，其值保证均为零。

Guid.empty = new Guid();

//初始化 Guid 类的一个新实例。

Guid.newGuid = function () {

    var g = "";

    var i = 32;

    while (i--) {

        g += Math.floor(Math.random() * 16.0).toString(16);

    }

    return new Guid(g);

};
// console.log(Guid.newGuid().toString('g'));
