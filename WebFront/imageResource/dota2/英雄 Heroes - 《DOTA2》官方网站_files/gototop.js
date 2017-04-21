// JavaScript Document
/* 
	author:bianyuan
	time:2012.07.06
*/
(function(){
	var img = {imgW:50, imgH:50, right:5, bottom:5, imgSrc:'http://wulin2.wanmei.com/images/main1206/gototop.png'},
		body = document.body,
		html = document.documentElement;
	//获取滚动条高度
	function getPageScroll(){
		var yScroll; 
		if (html && html.scrollTop){ 
			yScroll = html.scrollTop; 
		} else if (body) { 
			yScroll = body.scrollTop; 
		} 
		return yScroll; 
	}
	//获取参数
	function getParameter(){
		var scripts = document.getElementsByTagName('script'),
			script = scripts[scripts.length - 1];
		return {
			gototop : script.getAttribute('gototop')
		}
	}
	var options = getParameter().gototop, 
		imgW, imgH, right, imgSrc, callbackScroll,callbackClick;
	if (options == null){
		imgW = img.imgW,
		imgH = img.imgH,
		right = img.right,
		bottom = img.bottom,
		imgSrc = img.imgSrc;
	}else{
		var imgO = eval('('+options+')');
		imgW = imgO.width || img.imgW,
		imgH = imgO.height || img.imgH,
		right = ((Math.max(html.clientWidth, html.scrollWidth) - imgO.at)/2 - imgW) || img.right,
		bottom = imgO.bottom || img.bottom,
		imgSrc = imgO.src || img.imgSrc,
		callbackScroll = imgO.callbackScroll || null,
		callbackClick = imgO.callbackClick || null;
	}
	//创建并初始化定位
	var	imgBox = document.createElement('div'),
		$imgBox = $(imgBox),
		posCss = 'position:fixed;width:'+imgW+'px;height:'+imgH+'px;bottom:'+bottom+'px;right:'+right+'px;background-image:url('+imgSrc+');cursor:pointer;_position:absolute;_background:none; _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+imgSrc+'", sizingMethod="scale");z-index:110';
	imgBox.style.cssText = posCss;
	$imgBox.css('opacity',0.5);
	body.appendChild(imgBox);
	$imgBox.hide();
	//方法
	function chechScrollTop(){
		if(html.scrollTop !=0 || body.scrollTop != 0){
			$imgBox.show();
		}else{
			$imgBox.hide();
		}
	}
	onscroll = function(){
		chechScrollTop();
		var isIE = !!window.ActiveXObject; 
		var isIE6 = isIE && !window.XMLHttpRequest; 
		if(isIE6){
			imgBox.style.top = (getPageScroll() + html.clientHeight - (imgH+bottom)) + 'px';
		}
		if(callbackScroll){
			callbackScroll();
		}
	}
	$imgBox.hover(function(){
			$(this).css('opacity',1);
		},function(){
			$(this).css('opacity',0.5);
	});
	$imgBox.click(function(){
		$(this).hide();
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
		if(callbackClick){
			callbackClick();
		}
	});
})();