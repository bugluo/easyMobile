require([
    'module/easyMobile/js/Ecombo_require'
], function(E) {
	var base64Image = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
	var $doc = $(document);
	var $win = $(window);
	var loadingFlag = false;
	$('img').each(function(i,dom){
		$(dom).attr('data-src',$(dom).attr('src'));
	})
	$doc.on('scroll',function(e){
		//演示isInviewPort用法
		E.isInViewport({
			func:function(dom,visible){
				//将不在Viewport的图片用最小的base64图片代替，降低内存占用。
				var $dom = $(dom);
				if(!visible && $dom.attr('src') != base64Image){
					$dom.attr('src',base64Image);
				}else if(visible && $dom.attr('data-src') != $dom.attr('src')){
					$dom.attr('src',$dom.attr('data-src'));
				}
			},
			elements:$('img')
		});
		//往下滑的时候添加新图片
		if($doc.scrollTop()+$win.height()+50>$doc.height() && !loadingFlag){
			loadingFlag = true;
			E.loading({
				bg : 'white',
				color : '#000',
				container:'.loading'
			});
			setTimeout(function(){
				var d = $('#waterFall').children().clone();
				$('#waterFall').append(d);
				loadingFlag = false;
				E.loading('hide');
			},1500);
		}
	})
});

//不使用reqirejs的demo
// (function() {
// 	var srcPath = 'resource/module/easyMobile/js/';
//     document.write('<script src="' + srcPath + 'Ecombo.js"><\/script>');

// 	window.onload = function(){
// 		var base64Image = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
// 		var $doc = $(document);
// 		var $win = $(window);
// 		var loadingFlag = false;
// 		$('img').each(function(i,dom){
// 			$(dom).attr('data-src',$(dom).attr('src'));
// 		})
// 		$doc.on('scroll',function(e){
// 			//演示isInviewPort用法
// 			E.isInViewport({
// 				func:function(dom,visible){
// 					//将不在Viewport的图片用最小的base64图片代替，降低内存占用。
// 					var $dom = $(dom);
// 					if(!visible && $dom.attr('src') != base64Image){
// 						$dom.attr('src',base64Image);
// 					}else if(visible && $dom.attr('data-src') != $dom.attr('src')){
// 						$dom.attr('src',$dom.attr('data-src'));
// 					}
// 				},
// 				elements:$('img')
// 			});
// 			//往下滑的时候添加新图片
// 			if($doc.scrollTop()+$win.height()+50>$doc.height() && !loadingFlag){
// 				loadingFlag = true;
// 				E.loading({
// 					bg : 'white',
// 					color : '#000',
// 					container:'.loading'
// 				});
// 				setTimeout(function(){
// 					var d = $('#waterFall').children().clone();
// 					$('#waterFall').append(d);
// 					loadingFlag = false;
// 					E.loading('hide');
// 				},1500);
// 			}
// 		})
// 	}
    
// }());

