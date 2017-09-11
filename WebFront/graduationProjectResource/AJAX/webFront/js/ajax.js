/**
 * Created by Lee on 2017/1/24.
 */

//获取当前服务的地址
function ServiceUrl() {
    var url = window.location.origin + '/graduationProject/AJAX/service/';
    return url;

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
            var type = arguments[3].type == undefined ?  'post':arguments[3].type;
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
                dataType:'json',
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
// ajaxBYJS.post('ajaxHandler.php', {user: 'lee', password: '1949'}, function (data) {
//     console.log(data);
// });
// ajaxBYJS.get('ajaxHandler.php',function (data) {
//     console.log(data);
// });
