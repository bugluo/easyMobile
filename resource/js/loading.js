require([
    'module/easyMobile/js/Ecombo_require'
], function(E) {
	var i = 1;
	var effects = ['bounce','rotateplane','stretch','orbit','roundBounce','win8','win8-linear','ios','facebook','rotation','timer','none'];
	E.loading({
		effect : effects[i],
		text : '我是一个loading，在等待爱情',
		bg : 'rgba(255,255,255,0.7)',
		color : '#000',
		sizeW : '60px',
		sizeH : '60px',
		container:'body'
	});
	setTimeout(function(){
		E.loading('hide');
	},1500);
	setInterval(function(){
		i<=effects.length?i++:i=0;
		E.loading({
			effect : effects[i],
			text : '我是一个loading，在等待爱情',
			bg : 'rgba(255,255,255,0.7)',
			color : '#000',
			container:'body'
		});
	},2000)
	
});
// (function() {
// 	var srcPath = 'resource/module/easyMobile/js/';
//     document.write('<script src="' + srcPath + 'Ecombo.js"><\/script>');

// 	window.onload = function(){
// 		var i = 0;
// 		var effects = ['bounce','rotateplane','stretch','orbit','roundBounce','win8','win8_linear','ios','facebook','rotation','timer','none'];
// 		E.loading('show');
// 		setTimeout(function(){
// 			E.loading('hide');
// 		},1500);
// 		setInterval(function(){
// 			i<=effects.length?i++:i=0;
// 			E.loading({
// 				effect : effects[i],
// 				text : '我是一个loading，在等待爱情',
// 				bg : 'rgba(255,255,255,0.7)',
// 				color : '#000',
// 				sizeW : '140',
// 				sizeH : '140',
// 				container:'body'
// 			});
// 		},2000)
// 	}
    
// }());

