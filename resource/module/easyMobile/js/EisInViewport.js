/**
* @license in-viewport v0.4.1 | github.com/vvo/in-viewport#license
* @user bugluo 6185763@qq.com
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
    E.isInViewport = isInViewport;

    function isInViewport(options) {
      if(options.elements instanceof jQuery){
        options.elements.each(function(i,element){
          var isVisible = _inViewPort(element,options);
          if(options.func){
            options.func(element,isVisible);
          }
        })
      }else{
        $.each(options.elements,function(i,element){
          var isVisible = _inViewPort(element,options);
          if(options.func){
            options.func(element,isVisible);
          }
        })
      }
      function _inViewPort(element,options){
        var boundingRect = element.getBoundingClientRect();
        var top = boundingRect.top;
        var bottom = boundingRect.bottom;
        var left = boundingRect.left;
        var right = boundingRect.right;
        var settings = $.extend({
          'tolerance': 0,
          'viewport': window
        }, options);
        var isVisibleFlag = false;
        var $viewport = settings.viewport.get ? settings.viewport : $(settings.viewport);

        if (!$viewport.length) {
          console.warn('isInViewport: The viewport selector you have provided matches no element on page.');
          console.warn('isInViewport: Defaulting to viewport as window');
          $viewport = $(window);
        }

        var $viewportHeight = $viewport.height();
        var $viewportWidth = $viewport.width();
        var typeofViewport = $viewport.get(0).toString();

        //if the viewport is other than window recalculate the top,
        //bottom,left and right wrt the new viewport
        //the [object DOMWindow] check is for window object type in PhantomJS
        if (typeofViewport !== '[object Window]' && typeofViewport !== '[object DOMWindow]') {
          var $viewportOffset = $viewport.offset();

          //recalculate these relative to viewport
          top = top - $viewportOffset.top;
          bottom = bottom - $viewportOffset.top;
          left = left - $viewportOffset.left;
          right = left + $viewportWidth;

          //get the scrollbar width from cache or calculate it
          isInViewport.scrollBarWidth = isInViewport.scrollBarWidth || getScrollbarWidth($viewport);

          //remove the width of the scrollbar from the viewport width
          $viewportWidth -= isInViewport.scrollBarWidth;
        }

        //handle falsy, non-number and non-integer tolerance value
        //same as checking using isNaN and then setting to 0
        //bitwise operators deserve some love too you know
        settings.tolerance = ~~Math.round(parseFloat(settings.tolerance));

        if (settings.tolerance < 0)
          settings.tolerance = $viewportHeight + settings.tolerance; //viewport height - tol

        //the element is NOT in viewport iff it is completely out of 
        //viewport laterally or if it is completely out of the tolerance
        //region. Therefore, if it is partially in view then it is considered
        //to be in the viewport and hence true is returned

        //if the element is laterally outside the viewport
        if (Math.abs(left) >= $viewportWidth)
          return isVisibleFlag;

        //if the element is bound to some tolerance
        isVisibleFlag = settings.tolerance ? !! (top <= settings.tolerance && bottom >= settings.tolerance) : !! (bottom > 0 && top <= $viewportHeight);

        return isVisibleFlag;
      }
    }

    return E;
});