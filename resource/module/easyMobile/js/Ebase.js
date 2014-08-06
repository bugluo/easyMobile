!function(factory) {
    //factory是一个函数，下面的koExports就是他的参数
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
    E.test = function(s){
        alert('这是一个模板页，用于展示目录结构，基础html，css reset，easyMobile组织结构');
    }
    return E;
});