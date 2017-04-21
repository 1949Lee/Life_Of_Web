/*
document.write('<link rel="stylesheet" type="text/css" href="http://www.dota2.com.cn/style/wm_dota.css?1312" />');

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
});
	
*/
