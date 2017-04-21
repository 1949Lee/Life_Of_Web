$(function () {

            initNav();
            initLunbo("#lunbo_nav > li", "#lunbo_img > a");
            initLunbo("#lunbo2_nav > li", "#lunbo2_img > a");

            function initNav() {
                $("#nav > li").each(function (i) {
                    $(this).hover(function () {
                        $(this).find("ul ,.nav_tips_bg").show();
                        $(this).find("a").addClass("current");
                    }, function () {
                        $(this).find("ul,.nav_tips_bg").hide();
                        $(this).find("a").removeClass("current");
                    });
                });
            }
        });

        //setInterval(function () { alert("a"); }, 3000);
        $(document).ready(function(){
            $(".news_nav a").mouseover(function (){
                var boxID = $(this).attr("id");
                var listBox = boxID.substring(0,(boxID.length-1));
                var moreURL = $(this).attr("moreURL");
                if(moreURL){
                    $("."+listBox+"_more").attr("href",moreURL).show();
                }else{
                    $("."+listBox+"_more").hide();
                }
                $("."+boxID).show().siblings("."+listBox).hide();
                $(this).addClass("on").closest("li").siblings("li").find("a").removeClass("on")
            })
            $(".video_mt2 div").eq(0).css({"margin-right":10})
        })
        function initLunbo(navs, imgs) {
            var lunboNav = $(navs);
            var lunboImg = $(imgs);
            var x = 0;
            var timer = null;
            lunboNav.each(function (i) {
                $(this).hover(function () {
                    x = i;
                    animatelb();
                }, function () { });
            });

            function animatelb() {
                lunboNav.removeClass("current");
                lunboNav.eq(x).addClass("current");
                lunboImg.hide().eq(x).show();
                x = x >= lunboImg.length - 1 ? 0 : x + 1;
            }

            timer = setInterval(animatelb, 3000);

            lunboImg.hover(function (i) {
                clearInterval(timer);
                timer = null;
            }, function () {
                timer = setInterval(animatelb, 3000);
            });

        }
        $(".video_btn").click(function () {
            lightbox.clockScreen("videopop");
            addVideoPlayer('videoplay', 880, 494, { playlist: 'http://media101.wanmei.com/media/dota2/201304/dota2_cg_chinese.flv', autoPlay: true });
        });
        $(".video_close").click(function () {
            removeSWF('videoplay');
            lightbox.openScreen("videopop");
        });
