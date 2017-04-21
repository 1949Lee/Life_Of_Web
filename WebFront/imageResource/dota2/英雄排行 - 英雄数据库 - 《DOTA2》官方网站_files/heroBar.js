// JavaScript Document
/* 
	author:bianyuan
	time:2012.08.19
*/
function prependChild(newNode,parentNode){ 
	parentNode.insertBefore(newNode,parentNode.firstChild); 
}
function addStyle(skin){
	var style = document.createElement('link');
	style.setAttribute('type','text/css');
	style.setAttribute('rel', 'stylesheet');
	style.setAttribute('href',skin);
	prependChild(style, document.getElementsByTagName('head')[0]);
}
function fixedBar(o){
	var bar = document.getElementById(o.id),
		width = bar.offsetWidth,
		height = bar.offsetHeight,
		dir = o.dir,
		at = o.at,
		left = o.left,
		right = o.right,
		top = o.top,
		bottom = o.bottom,
		body = document.body,
		html = document.documentElement;
	//css:left right top bottom
	var	posCss = 'position:fixed;_position:absolute;';
	if(at != 1){
		left = right = 	((Math.max(html.clientWidth, html.scrollWidth) - at)/2 - width);
	}
	if(dir=='lt'){
		posCss = posCss + 'left:'+left+'px;top:'+top+'px;';
	}else if(dir=='lb'){
		posCss = posCss + 'left:'+left+'px;bottom:'+bottom+'px;';
	}else if(dir=='rt'){
		posCss = posCss + 'right:'+right+'px;top:'+top+'px;';
	}else if(dir=='rb'){
		posCss = posCss + 'right:'+right+'px;bottom:'+bottom+'px;';
	}
	bar.style.cssText = posCss;
	//ie6
	var isIE = !!window.ActiveXObject; 
	var isIE6 = isIE && !window.XMLHttpRequest; 
	if(isIE6){
		//scrollTop	
		function getPageScroll(){
			var yScroll; 
			if (html && html.scrollTop){ 
				yScroll = html.scrollTop; 
			} else if (body) { 
				yScroll = body.scrollTop; 
			} 
			return yScroll; 
		}
		if(dir=='lt' || dir=='rt'){
			onscroll = function(){
				bar.style.top = (getPageScroll() + top) + 'px';
			}
		}else if(dir=='lb' || dir=='rb'){
			onscroll = function(){
				bar.style.top = (getPageScroll() + html.clientHeight - (height+bottom)) + 'px';
			}
		}
		
	}
}
var dfdf ='<div class=></div>';
var hero_bar_str = '<div id="bar_nav">\<div class="bar_link">\<a href="http://www.dota2.com.cn/download/" title="进入下载游戏页面" target="_blank">下载</a>\<a href="http://www.dota2.com.cn/heroes/index.htm" title="进入英雄列表页面">英雄</a>\<a href="http://www.dota2.com.cn/items/index.htm" title="进入物品列表页面">物品</a>\</div>\<div class="bar_shaixuan">\<div class="shaixuan_box" id="s_liliang">\<div class="bar_shai_pop bar_shai_pop1">\<div class="bar_shai_pop_t">力量型英雄推荐</div>\<ul class="bar_pop_ul clearfix">\<li><a href="http://www.dota2.com.cn/hero/sven/"><img src="http://www.dota2.com.cn/images/heroes/sven_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/sven/">斯温</a></li>\<li><a href="http://www.dota2.com.cn/hero/centaur_warrunner/"><img src="http://www.dota2.com.cn/images/heroes/centaur_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/centaur_warrunner/">半人马战行者</a></li>\<li><a href="http://www.dota2.com.cn/hero/treant_protector/"><img src="http://www.dota2.com.cn/images/heroes/treant_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/treant_protector/">树精卫士</a></li>\<li><a href="http://www.dota2.com.cn/hero/sand_king/"><img src="http://www.dota2.com.cn/images/heroes/sand_king_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/sand_king/">沙王</a></li>\<li><a href="http://www.dota2.com.cn/hero/slardar/"><img src="http://www.dota2.com.cn/images/heroes/slardar_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/slardar/">斯拉达</a></li>\<li><a href="http://www.dota2.com.cn/hero/tidehunter/"><img src="http://www.dota2.com.cn/images/heroes/tidehunter_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/tidehunter/">潮汐猎人</a></li>\<li><a href="http://www.dota2.com.cn/hero/wraith_king/"><img src="http://www.dota2.com.cn/images/heroes/wraith_king_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/wraith_king/">冥魂大帝</a></li>\<li><a href="http://www.dota2.com.cn/hero/night_stalker/"><img src="http://www.dota2.com.cn/images/heroes/night_stalker_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/night_stalker/">暗夜魔王</a></li>\</ul>\</div>\</div>\<div class="shaixuan_box" id="s_minjie">\<div class="bar_shai_pop bar_shai_pop2">\<div class="bar_shai_pop_t">敏捷型英雄推荐</div>\<ul class="bar_pop_ul clearfix">\<li><a href="http://www.dota2.com.cn/hero/juggernaut/"><img src="http://www.dota2.com.cn/images/heroes/juggernaut_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/juggernaut/">主宰</a></li>\<li><a href="http://www.dota2.com.cn/hero/vengeful_spirit/"><img src="http://www.dota2.com.cn/images/heroes/vengefulspirit_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/vengeful_spirit/">复仇之魂</a></li>\<li><a href="http://www.dota2.com.cn/hero/drow_ranger/"><img src="http://www.dota2.com.cn/images/heroes/drow_ranger_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/drow_ranger/">卓尔游侠</a></li>\<li><a href="http://www.dota2.com.cn/hero/phantom_assassin/"><img src="http://www.dota2.com.cn/images/heroes/phantom_assassin_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/phantom_assassin/">幻影刺客</a></li>\<li><a href="http://www.dota2.com.cn/hero/razor/"><img src="http://www.dota2.com.cn/images/heroes/razor_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/razor/">剃刀</a></li>\<li><a href="http://www.dota2.com.cn/hero/venomancer/"><img src="http://www.dota2.com.cn/images/heroes/venomancer_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/venomancer/">剧毒术士</a></li>\<li><a href="http://www.dota2.com.cn/hero/viper/"><img src="http://www.dota2.com.cn/images/heroes/viper_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/viper/">冥界亚龙</a></li>\<li><a href="http://www.dota2.com.cn/hero/spectre/"><img src="http://www.dota2.com.cn/images/heroes/spectre_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/spectre/">幽鬼</a></li>\</ul>\</div>\</div>\<div class="shaixuan_box" id="s_zhili">\<div class="bar_shai_pop bar_shai_pop3">\<div class="bar_shai_pop_t">智力型英雄推荐</div>\<ul class="bar_pop_ul clearfix">\<li><a href="http://www.dota2.com.cn/hero/crystal_maiden/"><img src="http://www.dota2.com.cn/images/heroes/crystal_maiden_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/crystal_maiden/">水晶室女</a></li>\<li><a href="http://www.dota2.com.cn/hero/windrunner/"><img src="http://www.dota2.com.cn/images/heroes/windrunner_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/windrunner/">风行者</a></li>\<li><a href="http://www.dota2.com.cn/hero/zeus/"><img src="http://www.dota2.com.cn/images/heroes/zuus_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/zeus/">宙斯</a></li>\<li><a href="http://www.dota2.com.cn/hero/lina/"><img src="http://www.dota2.com.cn/images/heroes/lina_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/lina/">莉娜</a></li>\<li><a href="http://www.dota2.com.cn/hero/lich/"><img src="http://www.dota2.com.cn/images/heroes/lich_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/lich/">巫妖</a></li>\<li><a href="http://www.dota2.com.cn/hero/death_prophet/"><img src="http://www.dota2.com.cn/images/heroes/death_prophet_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/death_prophet/">死亡先知</a></li>\<li><a href="http://www.dota2.com.cn/hero/enchantress/"><img src="http://www.dota2.com.cn/images/heroes/enchantress_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/enchantress/">魅惑魔女</a></li>\<li><a href="http://www.dota2.com.cn/hero/jakiro/"><img src="http://www.dota2.com.cn/images/heroes/jakiro_hphover.png"/></a><a href="http://www.dota2.com.cn/hero/jakiro/">杰奇洛</a></li>\</ul>\</div>\</div>\</div>\</div>';
$(function(){
	//addStyle('http://www.dota2.com.cn/event/201401/herodata/style/hero_bar.css');
	$('body').append(hero_bar_str);
	fixedBar({'id':'bar_nav','dir':'rt','at':1,'top':116,'right':0});
	$('.shaixuan_box').each(function(){
		$(this).hover(function(){
			$(this).addClass('on');
			$(this).find('.bar_shai_pop').show();
		},function(){
			$(this).removeClass('on');
			$(this).find('.bar_shai_pop').hide();
		});
	});
});