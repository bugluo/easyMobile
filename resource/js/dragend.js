require([
    'module/easyMobile/js/Ecombo_require'
], function(E) {
	E.dragend({
		container:$('.wrap'),
		item:$('.item'),
      direction:0,//0表示竖直方向，1表示横向
  });
});
