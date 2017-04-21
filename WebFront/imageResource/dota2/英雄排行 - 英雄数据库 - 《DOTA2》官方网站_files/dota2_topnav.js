/*
	var style = document.createElement('link');
	style.setAttribute('type','text/css');
	style.setAttribute('rel', 'stylesheet');
	style.setAttribute('href','http://www.dota2.com.cn/style/topnav131026.css?t=1107');
	document.getElementsByTagName('head')[0].appendChild(style);
*/
document.write('<link rel="stylesheet" type="text/css" href="http://www.dota2.com.cn/public/style/topnav0521.css" />');
	
$(function(){
	
	//创建内容
	$('#dota2_topnav').html('<div class="nav_main clearfix">\
		<a href="http://www.dota2.com.cn/" title="《DOTA2》官方网站" class="nav_logo">《DOTA2》官方网站</a>\
		<div class="dota2nav" id="dota2nav">\
			<div class="link_div"><a href="http://www.dota2.com.cn/main.htm" id="link_nav1" class="link_nav">首页</a></div>\
			<div class="link_div">\
				<a href="http://www.dota2.com.cn/news/index.htm" id="link_nav2" class="link_nav">新闻</a>\
				<div class="link_pop">\
					<a href="http://www.dota2.com.cn/news/gamenews/index.htm">官方新闻</a>\
					<a href="http://www.dota2.com.cn/news/competition/index.htm">赛事新闻</a>\
					<a href="http://www.dota2.com.cn/news/gamepost/index.htm">更新/公告</a>\
					<a href="http://www.dota2.com.cn/MediaInfo/OriginalRaiders/list.htm">媒体推荐</a>\
				</div>\
			</div>\
			<div class="link_div"><a href="http://www.dota2.com.cn/info/index.htm" id="link_nav3" class="link_nav">资料</a>\
				<div class="link_pop">\
					<a href="http://www.dota2.com.cn/heroes/index.htm" target="_blank">英雄资料</a>\
					<a href="http://db.dota2.com.cn/compares" target="_blank">英雄对比</a>\
					<a href="http://www.dota2.com.cn/items/index.htm" target="_blank">物品资料</a>\
					<a href="http://www.dota2.com.cn/quiz/" target="_blank">物品测试</a>\
					<a href="http://www.dota2.com.cn/event/201405/newer/">游戏指引</a>\
				</div>\
			</div>\
			<div class="link_div"><a href="http://members.dota2.com.cn/login" id="link_nav4" class="link_nav">账号</a>\
				<div class="link_pop">\
					<a href="http://pay.dota2.com.cn/" target="_blank">账户充值</a>\
					<a href="http://members.dota2.com.cn/info" target="_blank">个人中心</a>\
					<a href="http://members.dota2.com.cn/findPwAccount" target="_blank">帐号查询</a>\
					<a href="http://members.dota2.com.cn/userConsumeItemRecord" target="_blank">消费记录</a>\
				</div>\
			</div>\
			<div class="link_div"><a href="http://www.dota2.com.cn/activity/gamematch/index.htm" id="link_nav5" class="link_nav">赛事</a>\
				<div class="link_pop">\
					<a href="http://www.dota2.com.cn/activity/gamematch/index.htm">赛事中心</a>\
					<a href="http://www.dota2.com.cn/international/" target="_blank">国际邀请</a>\
					<a href="http://dac.dota2.com.cn/overview/" target="_blank">亚洲邀请</a>\
					<a href="http://www.dota2.com.cn/event/201309/academy/index.htm" target="_blank">刀塔学院</a>\
				</div>\
			</div>\
			<div class="link_div">\
				<a href="http://www.dota2.com.cn/videocenter/" id="link_nav6" class="link_nav">视频</a>\
				<div class="link_pop">\
					<a href="http://www.dota2.com.cn/videocenter/index.htm#1" target="_blank">官方视频</a>\
					<a href="http://www.dota2.com.cn/videocenter/index.htm#2" target="_blank">比赛视频</a>\
					<a href="http://www.dota2.com.cn/videocenter/index.htm#3" target="_blank">教学视频</a>\
					<a href="http://www.dota2.com.cn/videocenter/index.htm#4" target="_blank">英雄视频</a>\
				</div>\
			</div>\
			<div class="link_div"><a href="http://www.dota2.com.cn/raiders/index.htm" id="link_nav7" class="link_nav">攻略</a>\
				<div class="link_pop">\
					<a href="http://www.dota2.com.cn/raiders/newer/index.htm">新手攻略</a>\
					<a href="http://www.dota2.com.cn/raiders/step/index.htm">进阶攻略</a>\
					<a href="http://www.dota2.com.cn/raiders/skill/index.htm">技巧攻略</a>\
				</div>\
			</div>\
			<div class="link_div"><a href="http://www.dota2.com.cn/download/" id="link_nav8" class="link_nav">下载</a>\
				<div class="link_pop">\
					<a href="http://www.dota2.com.cn/download/" target="_blank">游戏下载</a>\
					<a href="http://app.dota2.com.cn/" target="_blank">完美刀塔</a>\
					<a href="http://www.dota2.com.cn/enjoy/gameart/index.htm" target="_blank">原画欣赏</a>\
          <a href="http://www.dota2.com.cn/enjoy/gamewall/index.htm" target="_blank">精美壁纸</a>\
					<a href="http://www.dota2.com.cn/enjoy/4comics/index.htm" target="_blank">四格漫画</a>\
				</div>\
			</div>\
			<div class="link_div"><a href="http://bbs.dota2.com.cn/" target="_blank" id="link_nav9" class="link_nav">互动</a>\
				<div class="link_pop">\
					<a href="http://bbs.dota2.com.cn/" target="_blank">官方论坛</a>\
					<a href="http://e.weibo.com/dota2comcn" target="_blank">新浪微博</a>\
					<a href="http://e.t.qq.com/dotacn2006" target="_blank">腾讯微博</a>\
					<a href="http://www.dota2.com.cn/activity/gameevent/index.htm">活动专区</a>\
				</div>\
			</div>\
			<div class="link_div"><a href="http://bbs.dota2.com.cn/forumdisplay.php?fid=34" target="_blank" id="link_nav10" class="link_nav">客服</a>\
				<div class="link_pop">\
					<a href="http://www.dota2.com.cn/event/201307/faq/index.htm">常见问题</a>\
					<a href="http://bbs.dota2.com.cn/forum.php?mod=forumdisplay&fid=34" target="_blank">客服论坛</a>\
					<a href="http://passport.wanmei.com/dota/password.html" target="_blank">找回密码</a>\
				</div>\
			</div>\
			<div class="link_div"><a href="http://app.dota2.com.cn" target="_blank" id="link_nav11" class="link_nav">APP</a></div>\
		</div>\
	</div><div id="navBarShadow"></div>');
	
	$("#dota2_topnav .link_div").each(function (i) {
		$(this).hover(function () {
			$(this).find(".link_nav").addClass("link_hover");
			$(this).find(".link_pop").show();
		},function () {
			$(".link_nav").removeClass("link_hover");	
			$(".link_pop").hide();
		});
	});

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

/*document.write('<link rel="stylesheet" type="text/css" href="http://www.dota2.com.cn/public/style/wm_dota.css?1312" />');

$(function(){
	
var sb="<div class=\"wanmei_top\" id=\"wanmei_top\">";
 sb=sb+"  <div class=\"wanmei_top\" style=\"position: absolute; top: 0; left: 0;\"></div>";
 sb=sb+"  <div class=\"wanmei_nav\" id=\"wanmei_nav\">";
 sb=sb+"    <h1 class=\"wanmei_logo\"><a href=\"http://www.wanmei.com/\" hidefocus=\"true\" class=\"wanmei_logo_link\" target=\"_blank\">完美世界</a></h1>";
 sb=sb+"    <div class=\"wanmei_msg\"> <a href=\"http://passport.wanmei.com/dota/phonereg.jsp\" hidefocus=\"true\" target=\"_blank\" class=\"wanmei_msg_link01\">注册</a> <span class=\"wanmei_msg_xian\">|</span> <a href=\"http://pay.dota2.com.cn/\" hidefocus=\"true\" target=\"_blank\" class=\"wanmei_msg_link01\">充值</a> <span class=\"wanmei_msg_xian\">|</span> <a href=\"http://members.dota2.com.cn/info\" hidefocus=\"true\" target=\"_blank\" class=\"wanmei_msg_link02\">账号管理</a> <a href=\"javascript:void(0);\" hidefocus=\"true\" class=\"wanmei_msg_game\" id=\"wanmei_msg_game\">游戏娱乐</a> </div>";
 sb=sb+"    <div class=\"wanmei_games wanmei_clearfix\" id=\"wanmei_games\" style=\"display:none\">";
 sb=sb+"      <div class=\"wanmei_games_l\">";
 sb=sb+"        <div class=\"wanmei_games_hot\">";
 sb=sb+"          <p class=\"wanmei_games_hot_li01\">热门游戏</p>";
 sb=sb+"          <ul class=\"wanmei_games_hot_list wanmei_clearfix\">";
 sb=sb+"            <li> <a href=\"http://sw.wanmei.com/\" target=\"_blank\" hidefocus=\"true\" title=\"圣王\"> <img src=\"http://www.wanmei.com/public/images/top/top201305/game_sw.jpg\" alt=\"圣王\"></a> <span>圣王</span> </li>";
 sb=sb+"            <li> <a href=\"http://zhuxian2.wanmei.com/\" target=\"_blank\" hidefocus=\"true\" title=\"诛仙3\"> <img src=\"http://www.wanmei.com/public/images/top/top201305/game_zhuxian.jpg\" alt=\"诛仙3\"></a> <span>诛仙3</span> </li>";
 sb=sb+"            <li> <a href=\"http://seiya.wanmei.com/\" target=\"_blank\" hidefocus=\"true\" title=\"圣斗士星矢\"> <img src=\"http://www.wanmei.com/public/images/top/top201305/game_seiya.jpg\" alt=\"圣斗士星矢\"></a> <span>圣斗士星矢</span> </li>";
 sb=sb+"            <li> <a href=\"http://xa.wanmei.com/\" target=\"_blank\" hidefocus=\"true\" title=\"笑傲江湖OL\"> <img src=\"http://www.wanmei.com/public/images/top/top201305/game_xa.jpg\" alt=\"笑傲江湖OL\"></a> <span>笑傲江湖OL</span> </li>";
 sb=sb+"            <li> <a href=\"http://t.173.com/\" target=\"_blank\" hidefocus=\"true\" title=\"TOUCH\"> <img src=\"http://www.wanmei.com/public/images/top/top201305/game_touch.jpg\" alt=\"TOUCH\"></a> <span>TOUCH</span> </li>";
 sb=sb+"            <li> <a href=\"http://www.dota2.com.cn/\" target=\"_blank\" hidefocus=\"true\" title=\"DOTA2\"> <img src=\"http://www.wanmei.com/public/images/top/top201305/game_dota2.jpg\" alt=\"DOTA2\"></a> <span>DOTA2</span> </li>";
 sb=sb+"          </ul>";
 sb=sb+"        </div>";
 sb=sb+"        <div class=\"wanmei_game_box wanmei_clearfix\">";
 sb=sb+"          <div class=\"wanmei_game_item wanmei_game_khd\">";
 sb=sb+"            <div class=\"wanmei_game_box_head\">客户端游戏</div>";
 sb=sb+"            <div class=\"wanmei_clearfix\">";
 sb=sb+"              <ul class=\"wanmei_game_box_list wanmei_game_box_list02\">";
 sb=sb+"                <li><a href=\"http://zhuxian.wanmei.com/\" hidefocus=\"true\" target=\"_blank\" class=\"wanmei_hot\">诛仙3</a></li>";
 sb=sb+"                <li><a href=\"http://shenmo.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">神魔大陆</a></li>";
 sb=sb+"                <li><a href=\"http://sgcq.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">神鬼传奇</a></li>";
 sb=sb+"                <li><a href=\"http://xlzj.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">降龙之剑</a></li>";
 sb=sb+"                <li><a href=\"http://rwpd.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">热舞派对Ⅱ</a></li>";
 sb=sb+"                <li><a href=\"http://mhzx2.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">梦幻诛仙2</a></li>";
 sb=sb+"                <li class=\"wanmei_noborderbottom\"><a href=\"http://wulin2.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">武林外传</a></li>";
 sb=sb+"              </ul>";
 sb=sb+"              <ul class=\"wanmei_game_box_list wanmei_game_box_list02\">";
 sb=sb+"                <li><a href=\"http://w2i.wanmei.com/\" hidefocus=\"true\" target=\"_blank\" class=\"wanmei_hot\">完美国际</a></li>";
 sb=sb+"                <li><a href=\"http://sgsj.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">神鬼世界</a></li>";
 sb=sb+"                <li><a href=\"http://xljz.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">修罗刹</a></li>";
 sb=sb+"                <li><a href=\"http://yt.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">倚天屠龙记</a></li>";
 sb=sb+"                <li><a href=\"http://kdxy.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">口袋西游</a></li>";
 sb=sb+"                <li><a href=\"http://sg.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">赤壁</a></li>";
 sb=sb+"                <li class=\"wanmei_noborderbottom\"><a href=\"http://world2.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">完美世界</a></li>";
 sb=sb+"              </ul>";
 sb=sb+"              <ul class=\"wanmei_game_box_list wanmei_game_box_list03\">";
 sb=sb+"                <li><a href=\"http://sw.wanmei.com/\" hidefocus=\"true\" target=\"_blank\" class=\"wanmei_new\">圣王</a></li>";
 sb=sb+"                <li><a href=\"http://sd.wanmei.com/\" hidefocus=\"true\" target=\"_blank\" class=\"wanmei_new\">射雕英雄传</a></li>";
 sb=sb+"                <li><a href=\"http://xa.wanmei.com/\" hidefocus=\"true\" target=\"_blank\" class=\"wanmei_new\">笑傲江湖OL</a></li>";
 sb=sb+"                <li><a href=\"http://seiya.wanmei.com/\" hidefocus=\"true\" target=\"_blank\" class=\"wanmei_new\">圣斗士星矢OL</a></li>";
 sb=sb+"                <li><a href=\"http://nw.wanmei.com/\" hidefocus=\"true\" target=\"_blank\" class=\"wanmei_new\">无冬Online</a></li>";
 sb=sb+"                <li><a href=\"http://sdxl.wanmei.com/\" hidefocus=\"true\" target=\"_blank\" class=\"wanmei_new\">神雕侠侣</a></li>";
 sb=sb+"              </ul>";
 sb=sb+"            </div>";
 sb=sb+"          </div>";
 sb=sb+"          <div class=\"wanmei_game_item wanmei_game_wy\">";
 sb=sb+"            <div class=\"wanmei_game_box_head\">网页游戏</div>";
 sb=sb+"            <ul class=\"wanmei_game_box_list\">";
 sb=sb+"              <li><a href=\"http://yt.173.com/\" hidefocus=\"true\" target=\"_blank\">倚天屠龙记</a></li>";
 sb=sb+"              <li><a href=\"http://t.173.com/\" hidefocus=\"true\" target=\"_blank\">TOUCH</a></li>";
 sb=sb+"              <li><a href=\"http://chuhan.173.com/\" hidefocus=\"true\" target=\"_blank\">楚汉传奇</a></li>";
 sb=sb+"              <li><a href=\"http://zsg.173.com/\" hidefocus=\"true\" target=\"_blank\">战·三国</a></li>";
 sb=sb+"              <li><a href=\"http://ms.173.com/\" hidefocus=\"true\" target=\"_blank\">美食猎人</a></li>";
 sb=sb+"            </ul>";
 sb=sb+"          </div>";
 sb=sb+"          <div class=\"wanmei_game_item wanmei_game_dj\">";
 sb=sb+"            <div class=\"wanmei_game_box_head\">完美电竞</div>";
 sb=sb+"            <ul class=\"wanmei_game_box_list\">";
 sb = sb + "              <li><a href=\"http://www.dota2.com.cn/\" hidefocus=\"true\" target=\"_blank\" class=\"wanmei_hot\">DOTA2</a></li>";
 sb=sb+"              <li class=\"wanmei_game_box_li_none\"></li>";
 sb=sb+"            </ul>";
 sb=sb+"            <div class=\"wanmei_game_box_head\">完美娱乐</div>";
 sb=sb+"            <ul class=\"wanmei_game_box_list\">";
 sb=sb+"              <li><a href=\"http://radio.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">完美音乐在线</a></li>";
 sb=sb+"              <li><a href=\"http://shop.wanmei.com/\" hidefocus=\"true\" target=\"_blank\">完美商城</a></li>";
 sb=sb+"            </ul>";
 sb=sb+"          </div>";
 sb=sb+"        </div>";
 sb=sb+"      </div>";
 sb=sb+"    </div>";
 sb=sb+"  </div>";
 sb=sb+"</div>";
		
	$('body').prepend(sb);	
	
	var isshow = false;
  var tip = document.getElementById('wanmei_msg_game');
  var tipbox = document.getElementById('wanmei_games');
	tip.onmouseover = function () { isshow = true; tipbox.style.display = 'block'; }
	tip.onmouseout = function () { isshow = false; setTimeout(function () { if (!isshow) { tipbox.style.display = 'none'; } }, 500); }
	tipbox.onmouseover = function () { isshow = true; }
	tipbox.onmouseout = function () { isshow = false; setTimeout(function () { if (!isshow) { tipbox.style.display = 'none'; } }, 500); }
});*/