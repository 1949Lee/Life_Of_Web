$(function(){
	function getQueryString(sURL, key){
		var value = "";
		if (sURL.indexOf("?") > 0){
			var arrayParams = sURL.split("?");    
			var arrayURLParams = arrayParams[1].split("&");
			for (var i = 0; i < arrayURLParams.length; i++){
				 var sParam = arrayURLParams[i].split("=");
				 if ((sParam[0] == key) && (sParam[1] != "")){
					 value = sParam[1];
					 break;
				 }
			}  
		}
		return value;
	}
	function stopDefault( e ) {
		if ( e && e.preventDefault )
			e.preventDefault();
		else
			window.event.returnValue = false;
		return false;
	}
	var searchValue, classNum, href = location.href;
	if(href.indexOf('news') != -1){
		classNum = 1;
	}else if(href.indexOf('gamevideo') != -1){
		classNum = 2;
	}else if(href.indexOf('raiders') != -1){
		classNum = 3;
	}else{
		classNum = 0;
	}
	
	function setHref(href){
		searchValue = 'http://search.dota2.com.cn/lore/dota2list.dhtml?keyword=' + encodeURI(href) + '&proid=' + classNum;
		$('#search_a').attr('href',searchValue);
	}
	$('#search_inp').change(function(){	
		setHref($('#search_inp').val());				
	}).blur(function(){
		setHref($('#search_inp').val());	
	});
	$('#search_inp').keydown(function(e){
		setHref($('#search_inp').val());	
	});
	$('#search_a').click(function(e){
		if(searchValue){
			var searchKey = getQueryString(searchValue, 'keyword');
		}
		if(!searchKey || !searchValue || searchKey == encodeURI('输入搜索内容')){
			alert('请输入搜索内容！');
			stopDefault(e);
		}
		setHref($('#search_inp').val());	
	});	
	//enter
	$(document).keydown(function(event) {	
		if(document.activeElement.id == 'search_inp'){	
			if (event.keyCode == 13) {
				if(searchValue){
					var searchKey = getQueryString(searchValue, 'keyword');
				}
				if(searchValue && searchKey && searchKey != '输入搜索内容'){
					/*var sub = $('#search_a').get(0);
					if (/msie/i.test(navigator.userAgent)){  
						sub.click();
					}else{  
						var e = document.createEvent('MouseEvent');  
						e.initEvent('click', false, false);  
						sub.dispatchEvent(e);  
					}*/
					window.open(searchValue);
				}	
			}	
		}		
	}); 
});