/**
 * Created by Administrator on 2016/8/17.
 */
$(function () {
    var page1 = false;
    var page2 = false;
    var page3 = false;
    var sound = false;
    $(".wrapper .load-bar-inner").css('animation-play-state', "paused");
    $(".wrapper .counter").css('animation-play-state', "paused");
    var paginationUrl = ["basicInfo.png", "skills.png", "expo.png", "skills.png"]
    var mySwiper = new Swiper(".swiper-container", {
        // autoplay:1000,
        direction: 'vertical',
        autoplayStopOnLast: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        // effect:'coverflow',
        onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
            // swiperAnimateCache(swiper); //隐藏动画元素
            var t1 = 1000;//名字<span></span>的持续时间
            var t2 = 500;//基本信息的li完成动画的持续时间
            var t2In = 300;//基本信息的li一个个出现，之间的间隔
            page1Animate(t1, t2, t2In);
            swiperAnimate(swiper); //初始化完成开始动画
        },
        paginationBulletRender: function (index, className) {
            return '<span class="' + className + '"></span>';
        },
        onSlideChangeStart: function (swiper) {
            switch (swiper.previousIndex) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
            }
        },
        onSlideChangeEnd: function (swiper) {

            switch (swiper.activeIndex) {
                case 0:
                    $("#basicInfo").find("*").css("visibility","visible")
                    break;
                case 1:
                    if(!sound) {
                        $("body").append($("<audio id='bgMusic'style='visibility:hidden;'" +
                            "controls='controls'autoplay='autoplay'" +
                            "loop='loop'preload='auto'>" +
                            "<source src='http://sc1.111ttt.com/2014/1/09/27/2271755179.mp3'" +
                            "type='audio/mpeg' /></audio>"));
                        sound = true;
                    }
                    var data = ["80", "90", "80", "70", "75"];
                    $(".wrapper").each(function () {
                        restartLevelBar($(this), data[$(this).parent().index()], page2);
                    });
                    page2 = true;
                    break;
                case 2:
                    swiperAnimate(swiper);
                    break;
                case 3:
                    swiperAnimate(swiper);
                    break;
            }
        }
    });
    $(".swiper-pagination-bullet").each(function () {
        // $(this).css("background", "url('../images/basicInfo.png')");
    });
    function page1Animate(t1, t2, t2In) {
        if (!page1) {
            $("#basicInfo .info>span").addClass("ani");
            $("#basicInfo .info>span").attr({
                "swiper-animate-effect": "rotateIn",
                "swiper-animate-duration": t1 + "ms",
                "swiper-animate-delay": "0s"
            });
            $(".info li").each(function () {
                $(this).addClass("ani");
                $(this).attr({
                    "swiper-animate-effect": "lightSpeedIn",
                    "swiper-animate-duration": t2 + "ms",
                    "swiper-animate-delay": t1 + t2In * $(this).index() + "ms"
                });
            });
            setTimeout(startFall, t1 + t2In * 6 + t2);
            $(".bottomBallon a").each(function () {
                $(this).addClass("ani");
                $(this).attr({
                    "swiper-animate-effect": "bounceInUp",
                    "swiper-animate-duration": t2 + "ms",
                    "swiper-animate-delay": t1 + t2In * 6 + t2 + Math.random() * 8 * 200 + "ms"
                });
                $(this).css({"display": "block"});
            });
            page1 = true;
        }
    }

    var width = $("#cool").width();
    var height = $("#cool").height();
    var letters = Array(50).join(1).split('');
    var draw = function () {
        $("#cool")[0].getContext('2d').fillStyle = 'rgba(0,0,0,0.1)';
        $("#cool")[0].getContext('2d').fillRect(0, 0, width, height);
        $("#cool")[0].getContext('2d').fillStyle = '#0F0';
        letters.map(function (x_pos, index) {
            var text = ["HTML5", "JavaScript", "JQuery", "Swiper", "Bootstrap", "AngularJS", "Canvas", "PHP"];
            y_pos = index * 10;
            $("#cool")[0].getContext('2d').fillText(text[parseInt(Math.random() * 8)], y_pos, x_pos);
            letters[index] = (x_pos > Math.random() * 1e4) ? 0 : x_pos + 10;
        });
    };
    var t1;

    function startFall() {
        t1 = setInterval(draw, 150);
    }

    function endFall(later) {
        setTimeout(function () {
            clearInterval(t1);
        }, later);

    }
    $(".sound").click( function() {
            if ($("#bgMusic")[0].paused) {
                $(".sound").attr("src","images/play.png");
                $("#bgMusic")[0].play();
                return;
            }
            else {
                $("#bgMusic")[0].pause();
                $(".sound").attr("src","images/paused.png");
                return;
            }
    });
    function restartLevelBar(obj,data,page2){
        if(!page2) {
            $(".wrapper .load-bar-inner").css('animation-play-state', "running");
            $(".wrapper .counter").css('animation-play-state', "running");
            var interval = setInterval(increment, 30);
            var current = 0;
            function increment() {
                current = parseInt((parseInt(obj.find(".load-bar-inner").width())/parseInt($(".wrapper .load-bar").width()))*100);
                obj.find(".counter").html(current + '%');
                alert
                if (current == data) {
                    clearInterval(interval);
                    obj.find(".load-bar-inner").css('animation-play-state', "paused");
                    obj.find(".counter").css('animation-play-state', "paused");
                    obj.parent().children("span").css({
                        "-webkit-animation": "neon1 1.5s ease-out infinite alternate",
                        "-moz-animation": "neon1 1.5s ease-out infinite alternate",
                        "animation": "neon1 1.5s ease-out infinite alternate"
                    });
                }
            }
        }
    }
});
