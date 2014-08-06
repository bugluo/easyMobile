/*
Eloading - 1.02 [10.06.14]
Author: vadimsva
Github: https://github.com/vadimsva/Eloading
user:bugLuo 6185763@qq.com
*/
!function(factory) {
    //factory是一个函数，下面的EExports就是他的参数
    // Support three module loading scenarios
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // [1] CommonJS/Node.js
        // [1] 支持在module.exports.abc,或者直接exports.abc
        var target = module['exports'] || exports; // module.exports is for Node.js
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        // [2] AMD anonymous module
        // [2] AMD 规范 
        //define(['exports'],function(exports){
           //    exports.abc = function(){}
        //});
        define(['exports'], factory);
    } else {
        // [3] No module loader (plain <script> tag) - put directly in global namespace
	    window['E']?factory(window['E']):factory(window['E']={});
    }
}(function(EExports){

    //E的全局定义 koExports是undefined 对应着上面的[3] 这种情况
    var E = typeof EExports !== 'undefined' ? EExports : {};

    //定义一个E的方法
    E.loading = function(method){
	    var elem,
		elemClass = 'Eloading',
		Eloading_text,
		effectObj,
		effectElemCount,
		createSubElem = false,
		specificAttr = 'background-color',
		addStyle = '',
		effectElemHTML = '',
		EloadingObj,
		containerSize,
		elemSize,
		_options;

		var methods = {
			init : function() {
				var _defaults = {
					effect: 'bounce',
					text: '',
					bg: 'rgba(255,255,255,0.7)',
					color: '#000',
					sizeW: '',
					sizeH: ''
				};
				_options = $.extend(_defaults, method);
				
				_init();
				function _init() {
					if($('.'+elemClass).length>0){
						methods.hide();
					}
					if(method.container){
						elem = $(method.container);
					}else{
						elem = $(document.body);
					}
					EloadingObj = $('<div class="' + elemClass + '"></div>');
					switch (_options.effect) {
						case 'none':
							effectElemCount = 0;
						break;
						case 'bounce':
							effectElemCount = 3;
							containerSize = '';
							elemSize = 'width:' + _options.sizeW + ';height:' + _options.sizeH;
						break;
						case 'rotateplane':
							effectElemCount = 1;
							containerSize = '';
							elemSize = 'width:' + _options.sizeW + ';height:' + _options.sizeH;
						break;
						case 'stretch':
							effectElemCount = 5;
							containerSize = '';
							elemSize = 'width:' + _options.sizeW + ';height:' + _options.sizeH;
						break;
						case 'orbit':
							effectElemCount = 2;
							containerSize = 'width:' + _options.sizeW + ';height:' + _options.sizeH;
							elemSize = '';
						break;
						case 'roundBounce':
							effectElemCount = 12;
							containerSize = 'width:' + _options.sizeW + ';height:' + _options.sizeH;
							elemSize = '';
						break;
						case 'win8':
							effectElemCount = 5;
							createSubElem = true;
							containerSize = 'width:' + _options.sizeW + ';height:' + _options.sizeH;
							elemSize = 'width:' + _options.sizeW + ';height:' + _options.sizeH;
						break;
						case 'win8_linear':
							effectElemCount = 5;
							createSubElem = true;
							containerSize = 'width:' + _options.sizeW + ';height:' + _options.sizeH;
							elemSize = '';
						break;
						case 'ios':
							effectElemCount = 12;
							containerSize = 'width:' + _options.sizeW + ';height:' + _options.sizeH;
							elemSize = '';
						break;
						case 'facebook':
							effectElemCount = 3;
							containerSize = '';
							elemSize = 'width:' + _options.sizeW + ';height:' + _options.sizeH;
						break;
						case 'rotation':
							effectElemCount = 1;
							specificAttr = 'border-color';
							containerSize = '';
							elemSize = 'width:' + _options.sizeW + ';height:' + _options.sizeH;
						break;
						case 'timer':
							effectElemCount = 2;
							addStyle = 'border-color:' + _options.color;
							containerSize = 'width:' + _options.sizeW + ';height:' + _options.sizeH;
							elemSize = '';
						break;
					}
					
					if (_options.sizeW == '' && _options.sizeH == '') {
						elemSize = '';
						containerSize = '';
					}
					if (containerSize != '' && addStyle != '') {
						addStyle = ';' + addStyle;
					}
					
					if (effectElemCount > 0) {
						effectObj = $('<div class="' + elemClass + '-progress ' + _options.effect + '"></div>');
						for (var i = 1; i <= effectElemCount; ++i) {
							if (createSubElem) {
								effectElemHTML += '<div class="' + elemClass + '-progress_elem' + i + '" style="' + elemSize + '"><div style="' + specificAttr +':' + _options.color +'"></div></div>';
							} else {
								effectElemHTML += '<div class="' + elemClass + '-progress_elem' + i + '" style="' + specificAttr + ':' + _options.color +';' + elemSize + '"></div>';
							}
						}
						effectObj = $('<div class="' + elemClass + '-progress ' + _options.effect + '" style="' + containerSize + addStyle + '">' + effectElemHTML + '</div>');
					}
					
					if (_options.text) {
						Eloading_text = $('<div class="' + elemClass + '-text" style="color:' + _options.color + '">' + _options.text + '</div>');
					}
					
					if (elem.find('> .' + elemClass)) {
						elem.find('> .' + elemClass).remove();
					}
					EloadingDivObj = $('<div class="' + elemClass + '-content"></div>');
					EloadingDivObj.append(effectObj, Eloading_text);
					EloadingObj.append(EloadingDivObj);
					if (elem[0].tagName == 'HTML') {
						elem = $('body');
					}
					elem.addClass(elemClass + '-container').append(EloadingObj);
					elem.find('> .' + elemClass).css({background: _options.bg});
					elem.find('.' + elemClass + '-content').css({marginTop: - elem.find('.' + elemClass + '-content').outerHeight() / 2 + 'px'});

				}
				
			},
			show : function() {
				methods.init();
			},
			hide : function() {
				EloadingClose();
			}
		};
		
		function EloadingClose() {
			elem.removeClass(elemClass + '-container');
			elem.find('.' + elemClass).remove();
		}


        if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 0));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
    }
    return E;
});