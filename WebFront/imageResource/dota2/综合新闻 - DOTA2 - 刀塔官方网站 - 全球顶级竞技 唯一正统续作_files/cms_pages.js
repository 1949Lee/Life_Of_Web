(function($){
	
	var opt;
	var $content;
	var $page;
	
	function loadPage(url){

		$.ajax({
			url: url,
			dataType: "text",
			success: function(text){
				var ret = text.match(/<body[^>]*>([\s\S.]*)<\/body>/i);
				ret = ret ? ret[0] : text
				var $body = $(ret);
				$content.html($body.find(opt.selector.content).html());
				$page.html($body.find(opt.selector.page).html());
				opt.callback && opt.callback(text);
			},
			error: function(){
				location.href = url;
			}
		});
	}
	
	$.ajaxCMSPage = function(options){
		
		opt = options || {};
		$content = $(opt.selector.content);
		$page = $(opt.selector.page);
		
		$page.delegate('a','click',function(){
			var url = $(this).attr("href");
			loadPage(url);
			return false;
		});
		
	}
	

})(jQuery);