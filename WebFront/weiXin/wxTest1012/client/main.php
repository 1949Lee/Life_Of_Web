<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/10/12
 * Time: 17:17
 */
session_start();
if ((isset($_SESSION["userId"]))) {
    require_once "../admin/jssdk.php";
    $jssdk = new JSSDK("wxf8f68871deff74e5", "3e4a2e81266f2fa68d9f86d0514d9a0f");
    $sign = $jssdk->getSignPackage();
} else {
    $callback = "http://lee0811.applinzi.com/wxTest1012/admin/check.php";
    $callback = urlencode($callback);
    $url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8f68871deff74e5&redirect_uri=" . $callback . "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    header("Location:" . $url);
//    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <title>JS-SDK测试程序</title>
    <script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"></script>
    <script src="../jquery-3.1.0.js"></script>
    <script src="../jweixin-1.0.0.js"></script>
    <script src="../bootstrap/js/bootstrap.js"></script>
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/weui.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
<div class="page__bd" style="height: 100%;">
    <div class="weui-tab">
        <div class="weui-tab__panel shareImgPanel">
            <!--            <ol>-->
            <!--                <li id="shareImg">朕要晒图</li>-->
            <!--            </ol>-->
            <div class="weui-gallery" id="gallery">
                <span class="weui-gallery__img" id="galleryImg"></span>
                <div class="weui-gallery__opr">
                    <a href="javascript:" class="weui-gallery__del delImg">
                        <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                    </a>
                </div>
            </div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <div class="weui-uploader">
                            <div class="weui-uploader__hd">
                                <p class="weui-uploader__title">选择或拍摄照片</p>
                                <div class="weui-uploader__info uploadImagesCount">0/3</div>
                            </div>
                            <div class="weui-uploader__bd">
                                <ul class="weui-uploader__files" id="uploaderFiles">
                                    <!--                                    <li class="weui-uploader__file"-->
                                    <!--                                        style="background-image:url(./images/pic_160.png)"></li>-->
                                    <!--                                    <li class="weui-uploader__file weui-uploader__file_status"-->
                                    <!--                                        style="background-image:url(./images/pic_160.png)">-->
                                    <!--                                        <div class="weui-uploader__file-content">-->
                                    <!--                                            <i class="weui-icon-warn"></i>-->
                                    <!--                                        </div>-->
                                    <!--                                    </li>-->
                                    <!--                                    <li class="weui-uploader__file weui-uploader__file_status"-->
                                    <!--                                        style="background-image:url(./images/pic_160.png)">-->
                                    <!--                                        <div class="weui-uploader__file-content">50%</div>-->
                                    <!--                                    </li>-->
                                </ul>
                                <!--                                <div class="weui-uploader__input-box">-->
                                <!--                                    <input id="uploaderInput" class="weui-uploader__input" type="file"-->
                                <!--                                           accept="image/*" multiple/>-->
                                <!--                                </div>-->
                                <ol class="weui-uploader__input-box">
                                    <li id="shareImg" class="weui-uploader__input"></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_switch ">
                    <div class="locationInfo weui-cell__bd" style="color:#999999">公布位置</div>
                    <div class="weui-cell__ft">
                        <input class="locationSwitch weui-switch" type="checkbox"/>
                    </div>
                </div>
            </div>
            <!--上传进度提示 -->
            <div id="uploadToast" style="display:none;">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast">
                    <i class="toastIcon weui-loading weui-icon_toast"></i>
                    <p class="weui-toast__content uploadToastContent">晒图中 0/3</p>
                </div>
            </div>
            <!-- 上传进度提示的结尾 -->

            <div class="options">
                <a class="share weui-btn weui-btn_primary">晒图</a>
                <a class="cancel weui-btn weui-btn_default">取消</a>
            </div>
        </div>
        <div class="weui-tab__panel topImgPanel">
            <ul class="topImages media-list">
            </ul>
            <div id="noMoreToast" style="display:none;">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast">
                    <i class="toastIcon weui-icon-cancel weui-icon_toast"></i>
                    <p class="weui-toast__content uploadToastContent">没有更多了</p>
                </div>
            </div>
        </div>
        <div class="weui-tab__panel userInfoPanel">
            <ol>
                <li id="user">个人中心</li>
            </ol>
        </div>
        <div class="weui-tabbar">
            <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on shareImgTab">
                <img src="./images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                <p class="weui-tabbar__label scaleFont">朕要晒图</p>
            </a>
            <a href="javascript:;" class="weui-tabbar__item topImgTab">
                <img src="./images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                <p class="weui-tabbar__label scaleFont">热门图片</p>
            </a>
<!--            <a href="javascript:;" class="weui-tabbar__item userTab">-->
<!--                <img src=--><?php //echo $_SESSION["userImg"]; ?><!-- alt="" class="weui-tabbar__icon">-->
<!--                <p class="weui-tabbar__label scaleFont">我</p>-->
<!--            </a>-->
        </div>
    </div>
</div>
<!--<script src="WaterFall.js"></script>-->
<script type="text/javascript">
    $(function () {
        $('.weui-tab__panel').eq(0).show().siblings('.weui-tab__panel').hide();
        var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
            $gallery = $("#gallery"), $galleryImg = $("#galleryImg"),
            $uploaderFiles = $("#uploaderFiles");
        $galleryImg.on("click", function () {
            $gallery.fadeOut(100);
        });
    });
</script>
<script>
    wx.config({
        debug: false,
        appId: '<?php echo $sign["appId"];?>',
        timestamp: '<?php echo $sign["timestamp"];?>',
        nonceStr: '<?php echo $sign["nonceStr"];?>',
        signature: '<?php echo $sign["signature"];?>',
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'hideOptionMenu',
            'hideMenuItems',
            'chooseImage',//选择图片
            'uploadImage',//上传图片
            'previewImage',//预览图片
//            'downloadImage'// 下载图片
            'openLocation',
            'getLocation',
        ]
    });

    wx.ready(function () {
        var uploadImages = [];
        var totalCount = 0;
        var location = '';
        var topImages = [];
        var currentPage = 0;
        var $uploaderFiles = $("#uploaderFiles"),
            $gallery = $("#gallery"), $galleryImg = $("#galleryImg");
        $uploaderFiles.on("click", "li", function () {
            $galleryImg.attr("style", this.getAttribute("style"));
            $gallery.fadeIn(100);
        });
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: '这里没有代码，只有艺术!',
            link: 'http://lee0811.applinzi.com/wxTest1012/client/main.php',
            imgUrl: 'http://lee0811.applinzi.com/wxTest1012/admin/images/bg1.jpg',
            success: function () {
                alert("谢谢分享");
            },
            cancel: function () {

            }
        });

        //分享给好友
        wx.onMenuShareAppMessage({
            title: '这里没有代码，只有艺术!', // 分享标题
            desc: '艺术来源于生活，生活来源于自我。对，你就是艺术。',//分享描述
            link: 'http://lee0811.applinzi.com/wxTest1012/client/main.php',//分享链接
            imgUrl: 'http://lee0811.applinzi.com/wxTest1012/admin/images/bg1.jpg', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                alert("谢谢分享给好友");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });


        function currentTime() {
            var now = new Date();

            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日

            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var ss = now.getSeconds();          //分

            var clock = year + "-";

            if (month < 10)
                clock += "0";

            clock += month + "-";

            if (day < 10)
                clock += "0";

            clock += day + " ";

            if (hh < 10)
                clock += "0";

            clock += hh + ":";
            if (mm < 10) clock += '0';
            clock += mm + ":";
            if (ss < 10) clock += '0';
            clock += ss;
            return clock;
        }

        //删除已选中的图片
        function delImgFun() {
            //从上传图片数组中过滤掉要删除的图片的
            uploadImages = uploadImages.filter(function (id) {
                //获得要删除图片的ID
                var delID = $('#galleryImg').attr('style').split('(')[1].split(')')[0];
                return id != delID;
            });
            totalCount = uploadImages.length;
            $('.uploadImagesCount').html(uploadImages.length + '/3');
            var $uploaderFiles = $("#uploaderFiles");
            $uploaderFiles.html("");
            for (var i = 0; i < uploadImages.length; i++) {
                var tmpl = '<li class="weui-uploader__file" style="background-image:url(' + uploadImages[i] + ')"></li>';
                $uploaderFiles.append($(tmpl));
            }
            $gallery.fadeOut(100);
            if (uploadImages.length <= 3) {
                $("#shareImg").off('click');
                $("#shareImg").on('click', shareImgFun);
            }
        }

        $('.delImg').on('click', delImgFun);

        //打开地图查看位置
        $('.locationSwitch').on('click', function () {
            if ($(this).prop('checked')) {
                wx.getLocation({
                    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        geocoder = new qq.maps.Geocoder();
                        var latLng = new qq.maps.LatLng(res.latitude, res.longitude);
                        geocoder.getAddress(latLng);
                        geocoder.setComplete(function (result) {
                            $('.locationInfo').css({'color': 'black'});
                            if (result.detail.addressComponents.province == '天津市' ||
                                result.detail.addressComponents.province == '北京市' ||
                                result.detail.addressComponents.province == '重庆市' ||
                                result.detail.addressComponents.province == '上海市' ||
                                result.detail.addressComponents.province == '香港特别行政区' ||
                                result.detail.addressComponents.province == '澳门特别行政区') {
                                console.log(result.detail.addressComponents.province + '·' + result.detail.addressComponents.city + result.detail.addressComponents.district + result.detail.addressComponents.street);
//                                $('.locationInfo').css({'color': '#999999'});
                                $('.locationInfo').html(result.detail.addressComponents.province + '·' + result.detail.addressComponents.district + result.detail.addressComponents.street)
                            }
                            else {
                                $('.locationInfo').html(result.detail.addressComponents.province + '·' + result.detail.addressComponents.city + result.detail.addressComponents.district + result.detail.addressComponents.street)
                            }
                            location = $('.locationInfo').html();
//                            location = '天津市·西青区开源路';
                        });
                    }
                });
            }
            else {
                $('.locationInfo').html('公布位置');
                $('.locationInfo').css({'color': '#999999'});
                location = '未公开';
            }
        });

        //晒完图片后清空记录，方便再次发表
        function preNextShare() {
            uploadImages = [];
            totalCount = 0;
            location = '';
            $('#uploaderFiles').html("");
            $('.uploadImagesCount').html("0/3");
            $('.locationInfo').html('公布位置');
            $('.locationInfo').css({'color': '#999999'});
            var $uploadToast = $('#uploadToast');
            var inner = '<div class="weui-mask_transparent"></div>' +
                '<div class="weui-toast">' +
                '<i class="toastIcon weui-loading weui-icon_toast"></i>' +
                '<p class="weui-toast__content uploadToastContent">晒图中 0/3</p>' +
                '</div>';
            $uploadToast.html(inner);
            $uploadToast.css({'style': 'display:none'});
            $("#shareImg").on('click', shareImgFun);
            $('.locationSwitch').prop('checked', false);
        }

        //晒图时上传图片的处理函数
        function uploadImg(localIds, dateTime) {
            var id = localIds.pop();
            wx.uploadImage({
                localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 0, // 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    //把这张图添加到我们服务器里
                    var url = "http://lee0811.applinzi.com/wxTest1012/admin/uploadImages.php?sid=" + serverId + '&location=' + location + "&dateTime=" + dateTime;
                    var $uploadToast = $('#uploadToast');

                    $.get(url, null, function () {
                        $uploadToast.find('.uploadToastContent').html('晒图中  ' + parseInt(totalCount - localIds.length) + '/' + totalCount);
                        if (localIds.length > 0) {
                            uploadImg(localIds, dateTime);
                        }
                        else {
                            setTimeout(function () {
                                $uploadToast.find('.toastIcon').removeClass('weui-loading');
                                $uploadToast.find('.toastIcon').addClass('weui-icon-success-no-circle');
                                $uploadToast.find('.uploadToastContent').html('已成功晒图');
                            }, 1000);
                            setTimeout(function () {
                                $uploadToast.fadeOut(100);
                                preNextShare();
                                showTopImages();
                            }, 1500);
                        }
                    }, "text");
                }
            });
        }

        //确定晒图
        function confirmShare() {
            if (uploadImages.length > 0) {

                //显示上传提示
                var $uploadToast = $('#uploadToast');
                if ($uploadToast.css('display') != 'none') return;
                $uploadToast.fadeIn(100);
                //开始上传图片
                uploadImg(uploadImages, currentTime());
            }
        }

        $('.share').on('click', confirmShare);

        //晒图
        function shareImgFun() {
            wx.chooseImage({
                count: 3 - uploadImages.length, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    uploadImages = uploadImages.concat(localIds);
                    $('.uploadImagesCount').html(uploadImages.length + '/3');
                    totalCount = uploadImages.length;
                    var $uploaderFiles = $("#uploaderFiles");
                    $uploaderFiles.html("");
                    for (var i = 0; i < uploadImages.length; i++) {
                        var tmpl = '<li class="weui-uploader__file" style="background-image:url(' + uploadImages[i] + ')"></li>';
                        $uploaderFiles.append($(tmpl));
                    }
                    if (uploadImages.length == 3) {
                        $("#shareImg").off('click');
                    }
                }
            });
        }

        $("#shareImg").on('click', shareImgFun);

        //晒图完成后调用，自动切换到热门图片
        function showTopImages() {
            $('.weui-tab__panel').eq(1).show().siblings('.weui-tab__panel').hide();
            $('.weui-tabbar__item').eq(1).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
            initTopImage();
        }

        //底部导航栏切换
        $('.weui-tabbar__item').on('click', function () {
            $('.weui-tab__panel').eq($(this).index()).show().siblings('.weui-tab__panel').hide();
            $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
            if ($(this).index() == 1) {
                initTopImage();
            }
            else if ($(this).index() == 2) {

            }
        });
        $('.topImgTab').on('dblclick', function () {
            initTopImage();
        });
        $('.topImg').on('click', function () {
            initTopImage();
        });
        //加载热门图片并显示，当双击热门图片时也会调用该函数（即双击热门图片按钮会刷新）
        function initTopImage() {
            $.get("http://lee0811.applinzi.com/wxTest1012/admin/getImagesList.php?currentPage=" + currentPage + "&", null, function (data) {
                if(data.length==0){
                    $('.topImages').html("");
                    $('.topImages').append('<h2>暂时无人晒图<h2>');
                    return;
                }
                $('.topImages').html("");
                var head = 'http://wx.qlogo.cn/mmopen/yzU9EU5tkhw3grCZW0MrWFHqic0wSR7JGuoDMGpgmBZdP2693l33DqvjnhV5uVyxUnct2yw6aibF1ibMAN5Y0lTT0GiaSzdru5Zib/0';
                for (var i = 0; i < data.length; i++) {
                    var $li = $('<li class="media"><a class="media-left" href="#"><img class="head" src="'+data[i].userImg+'" alt=""></a></li>');
                    var $mediaBody = $('<div class="media-body"></div>');
                    var $mediaHeading = $('<h4 class="media-heading thumbImgMargin"></h4>');
                    $mediaHeading.append($('<span class="userName">' + data[i].userName + '</span>'));
                    $mediaHeading.append($('<span class="location">在' + data[i].location + '</span>'));
                    $mediaHeading.append($('<span class="createTime">发表于' + data[i].addTime + '</span>'));
//                    $mediaHeading.append($('<a class="upButton pull-right"><i class="glyphicon glyphicon-thumbs-up"></i></a>'));
                    $mediaBody.append($mediaHeading);

                    var $imgList = $('<ul class="imgList row thumbImgMargin" ></ul>');
                    for (var j = 0; j < data[i].serverid.length; j++) {
                        topImages.push('http://lee0811.applinzi.com/wxTest1012/admin/uploadFiles/images/' + data[i].serverid[j] + '.jpg');
                        $imgList.append($('<li class="topImg thumbnail col-xs-4 text-center"><img src="http://lee0811.applinzi.com/wxTest1012/admin/uploadFiles/images/' + data[i].serverid[j] + '.jpg" alt=""></li>'));
                    }
                    $mediaBody.append($imgList);
                    $li.append($mediaBody);
                    $('.topImages').append($li);
                }
            }, "json");
        }
        //浏览热门图片
//        document.querySelector("#previewImg").onclick = function () {
//            //1.调用getpiclist获取所有图片sid列表
//            var allpic;
//            $.get("http://lee0811.applinzi.com/wxTest1012/admin/getImagesList.php", null, function (data) {
//                allpic = data;
//                for (var i = 0; i < allpic.length; i++) {
//                    allpic[i] = "http://lee0811.applinzi.com/wxTest1012/admin/uploadFiles/images/" + allpic[i] + ".jpg";
//                }
//                alert(allpic.length);
//                wx.previewImage({
//                    current: allpic[0],
//                    urls: allpic
//                });
//            }, "json");
//        };
//        wx.hideMenuItems({
//            menuList: [
//                "menuItem:share:appMessage",
//                "menuItem:share:timeline",
//                "menuItem:exposeArticle",
//                "menuItem:setFont"
//            ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
//        });
    });

</script>
</body>
</html>
