require([
     'module/fastclick/fastclick'
], function(FastClick) {
     console.log('亲，快乐做前端哟~');
     $(function() {
          var ua = navigator.userAgent.toLowerCase();
          var res = ua.match(/\bandroid[\/\- ]?([0-9.x]+)?/);
          if(res) { //Android 3.0 以上
               if(parseFloat(res[1]) >= 3.0) {
                    //发现奇怪的 click 行为就注释掉这一行再测！
                    FastClick.attach(document.body);
               }
          } else if(ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1 || /\biphone\b|\biph(\d)/.test(ua)) { //ios
               FastClick.attach(document.body);
          }
     });
});