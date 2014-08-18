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
 var E = typeof EExports !== 'undefined' ? EExports : {};
  E.dragend= function(option){
    return new dragend(option);
  };
    var win = window, 
    doc  = document,
    option = {
      container:$('.wrap'),
      item:$('.item'),
      direction:0,//0表示竖直方向，1表示横向
      dragStart:null,
      dragEnd:null,
      scrollTo:0,
      curpage :0,
      spoint:[],
      epoint:[]
    },
    isTouch = 'ontouchstart' in win,
    startEvent = isTouch ? 'touchstart' : 'mousedown',
    moveEvent  = isTouch ? 'touchmove':'mousemove',
    endEvent   = isTouch ? 'touchend' :'mouseup',
    winWidth   = $(win)[0].innerWidth,
    winHeight  = $(win)[0].innerHeight,
    transdistance = 0;
    increase   = 0;
        function dragend(options){
          this.option = $.extend(option,options);
          this.option.item.wrapAll('<div class="innerWrap"></div>');
          setStyles(this.option.container[0],{'width':winWidth,'height':winHeight,'margin':0,'padding':0});
          for(var i =0;i<this.option.item.length;i++){
            setStyles(this.option.item.eq(i)[0],{'width':winWidth,'height':winHeight,'overflow':'hidden','margin':0,'padding':0})
          }
          this._moveTo = proxy(this._moveTo,this);
          this._moveEnd= proxy(this._moveEnd,this);
          this._movestart();
        }
        dragend.prototype={
          _movestart:function(){
            var option = this.option;
            var self = this;
            option.container.on(startEvent,function(e){
              var events = parseEvent(e);
              option.spoint = [events.pageX,events.pageY];
             // option.epoint = [events.pageX,events.pageY];
              option.dragStart && option.dragStart.call(this,this.option.curpage);
              option.container.on(moveEvent,self._moveTo);
              option.container.on(endEvent,self._moveEnd);
            })
          },
          _moveTo:function(e){
            e.stopPropagation(e);
            e.preventDefault();
            var events = parseEvent(e);
            var scrolldistance= this._calulatePage(events);
            this._scrollWithAnimate();
            if((scrolldistance+transdistance>100 && this.option.curpage==0 )){
                 this._scrollWithPrint(100+transdistance+scrolldistance/10);
            } 
            else if(scrolldistance<-100 && this.option.curpage==this.option.item.length-1){

            }else{
                 this._scrollWithPrint(scrolldistance+transdistance);
            }

          },
          _moveEnd:function(e){
             e.stopPropagation(e);
            e.preventDefault();
            this.option.container.off(moveEvent,this._moveTo);
            this.option.container.off(endEvent,this._moveEnd);
            var events = parseEvent(e),option = this.option;
                 //如果移动距离不超过多少px就不翻到下一页，回到当前页，如果超过就翻到下一页
                var scrolldistance = this._calulatePage(events); 
              //  this.option.increase = 0;
              var page = this.option.curpage,that = this;
              if(Math.abs(scrolldistance)>50){
                if(scrolldistance>0){
                  page==0 ? page : page--; 
                }else if(scrolldistance<0 && increase+1 != page)
                page==this.option.item.length-1 ? page : page++;
              }
              this.option.curpage = page;
              this._scrollpage();
              setTimeout(function(){
                option.dragStart && option.dragStart.call(that,that.option.curpage);
              },6)
               // if(cption-opoint>0)
              },
          _scrollWithPrint:function(scrolldistance){
             var style = this.option.direction ? "translateX(" + scrolldistance + "px)" : "translateY(" + scrolldistance + "px)";
             setStyles(this.option.container[0], {
              "-webkit-transform": style,
              "-moz-transform": style,
              "-ms-transform": style,
              "-o-transform": style,
              "transform": style
             });
          },
          _scrollWithAnimate:function(flag){
           // console.log(flag);
            if(flag){
              var style = "all 0.5s ease-in";
            }else{
              var style = "all 0s ease-in";
            }
            setStyles(this.option.container[0], {
              "-webkit-transition": style,
              "-moz-transition": style,
              "-ms-transition": style,
              "-o-transition": style,
              "transition": style
             });
          },
          _calulatePage:function(events){
            var option = this.option;
            var opoint = option.direction ? option.spoint[0] :option.spoint[1];
            var edge   = option.direction ? winWidth:winHeight;
            var scrolldistance  = option.direction ? events.pageX-opoint : events.pageY-opoint;
            if(Math.abs(parseInt((scrolldistance+transdistance)/edge))!=Math.abs(increase)){
              increase = -parseInt((scrolldistance+transdistance)/edge);
              var k = increase > 0 ? 1 : -1;
              option.curpage = increase<0 ? (option.curpage+k<0 ? option.curpage : option.curpage+k):(option.curpage+k>option.item.length-1 ? option.curpage : option.curpage+k); 
            }
            return scrolldistance;
          },
          _scrollpage:function(){
            var page = this.option.direction ? winWidth : winHeight;
            var scrolldistance = -this.option.curpage*page;
          //  console.log(scrolldistance);
            transdistance = -this.option.curpage*page;
                this._scrollWithAnimate(true);
                this._scrollWithPrint(scrolldistance);
          }

        }
        function parseEvent(e){
          //var events = isTouch ? e.touches[0] : e;
          events = e.originalEvent || e;
          events  = events.touches[0] ? events.touches[0] : events.changedTouches[0];
          return events;
        }
        function proxy(fn,context){
          return function(){
            return fn.apply(context,Array.prototype.slice.call(arguments));
          }
        }
        function setStyles(elements,styles){
              var property,value;
              for(property in styles){
                if(styles.hasOwnProperty(property)){
                  value = styles[property];
                  switch ( property ) {
                    case "height":
                    case "width":
                    case "marginLeft":
                    case "marginTop":
                    value += "px";
                  }
                  elements.style[property] = value;
                }
              }
        }
        return E;
  })