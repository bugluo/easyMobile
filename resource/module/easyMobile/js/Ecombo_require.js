define([
	'module/easyMobile/js/Ebase',
	'module/easyMobile/js/Eloading',
	'module/easyMobile/js/EisInViewport',
	'module/easyMobile/js/Edragend'
], function(base,loading,isInViewport,dragend) {
	return {
		test:base.test,
		loading:loading.loading,
		isInViewport:isInViewport.isInViewport,
		dragend:dragend
	}
});