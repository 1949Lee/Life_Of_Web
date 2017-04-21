var style = document.createElement('link');
style.setAttribute('type','text/css');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('href','http://www.dota2.com.cn/style/top_nav1505.css');
document.getElementsByTagName('head')[0].appendChild(style);	
$(function(){
	
	//创建内容
	$('#dota2_topnav').html('<div class="nav_col1">\
		<a class="top_nav1" href="http://www.dota2.com.cn/main.htm">官网首页</a>\
		<p>\
			<a href="http://www.dota2.com.cn/" target="_blank">品牌站</a>\
			<a href="http://www.dota2.com.cn/main.htm">官网首页</a>\
			<a href="http://www.dota2.com.cn/info/index.htm" target="_blank">资料站首页</a>\
			<a href="http://members.dota2.com.cn/login?url=/info" target="_blank">个人中心首页</a>\
			<a href="http://maps.dota2.com.cn/" target="_blank"><span style="color:#ed3f02">自定义地图</span></a>\
		</p>\
	</div>\
	<div class="nav_col2">\
		<a class="top_nav2" href="http://www.dota2.com.cn/news/index.htm">新闻中心</a>\
		<p>\
			<a href="http://www.dota2.com.cn/news/gamenews/index.htm" target="_blank">官方新闻</a>\
			<a href="http://www.dota2.com.cn/news/gamepost/news_update/index.htm" target="_blank">更新日志</a>\
			<a href="http://www.dota2.com.cn/news/competition/index.htm" target="_blank">赛事新闻</a>\
			<a href="http://www.dota2.com.cn/raiders/index.htm" target="_blank">游戏攻略</a>\
		</p>\
	</div>\
	<div class="nav_col3">\
		<a class="top_nav3" href="http://www.dota2.com.cn/videocenter/" target="_blank">视频中心</a>\
		<p>\
			<a href="http://www.dota2.com.cn/videocenter/index.htm#1" target="_blank">官方视频</a>\
			<a href="http://www.dota2.com.cn/videocenter/index.htm#2" target="_blank">比赛视频</a>\
			<a href="http://www.dota2.com.cn/videocenter/index.htm#3" target="_blank">教学视频</a>\
			<a href="http://www.dota2.com.cn/videocenter/index.htm#4" target="_blank">英雄视频</a>\
		</p>\
	</div>\
	<div class="nav_col4">\
		<a class="top_nav4" href="http://www.dota2.com.cn/activity/gamematch/index.htm" target="_blank">赛事活动</a>\
		<p>\
			<a href="http://act.dota2.com.cn/match" target="_blank">赛事中心</a>\
			<a href="http://www.dota2.com.cn/activity/gameevent/index.htm" target="_blank">活动中心</a>\
			<a href="http://www.dota2.com.cn/secretshop/" target="_blank">神秘商店</a>\
		</p>\
	</div>\
	<div class="nav_col5">\
		<a class="top_nav5" href="http://www.dota2.com.cn/download/" target="_blank">下载中心</a>\
		<p>\
			<a href="http://www.dota2.com.cn/download/" target="_blank">游戏下载</a>\
			<a href="http://app.dota2.com.cn/web.html" target="_blank">刀塔助手</a>\
			<a href="http://www.dota2.com.cn/enjoy/gamewall/index.htm" target="_blank">精美壁画</a>\
			<a href="http://www.dota2.com.cn/enjoy/4comics/index.htm" target="_blank">四格漫画</a>\
			<a href="http://www.dota2.com.cn/enjoy/gameart/index.htm" target="_blank">游戏原画</a>\
		</p>\
	</div>\
	<div class="nav_col6">\
		<a class="top_nav6" href="http://bbs.dota2.com.cn/forum.php" target="_blank">互动论坛</a>\
		<p>\
			<a href="http://bbs.dota2.com.cn/forum.php" target="_blank">官方论坛</a>\
			<a href="http://weibo.com/dota2comcn" target="_blank">新浪微博</a>\
			<a href="http://e.t.qq.com/dotacn2006" target="_blank">腾讯微博</a>\
		</p>\
	</div>\
	<a class="top_logo" href="http://www.dota2.com.cn" title="《《DOTA2》官方网站》" target="_blank">《《DOTA2》官方网站》</a>');
	/*
	$("#dota2_topnav .link_div").each(function (i) {
		$(this).hover(function () {
			$(this).find(".link_nav").addClass("link_hover");
			$(this).find(".link_pop").show();
		},function () {
			$(".link_nav").removeClass("link_hover");	
			$(".link_pop").hide();
		});
	});
	*/
	//cookie解决方案
	function getCookie(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)) return unescape(arr[2]);
		else return null;
	}

	$("a[href='http://passport.wanmei.com/dota/phonereg.jsp']").click(function(){
		var addUrl = getCookie('__mtxvt');
		if (addUrl) {
		var url = 'http://passport.wanmei.com/dota/phonereg.jsp?dida='+addUrl+'&r='+Math.random();
		$("a[href='http://passport.wanmei.com/dota/phonereg.jsp']").attr('href',url);
		};
	});

});
