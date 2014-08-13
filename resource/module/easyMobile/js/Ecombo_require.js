define([
	'module/easyMobile/js/Ebase',
	'module/easyMobile/js/Eloading',
	'module/easyMobile/js/EisInViewport'
], function(base,loading,isInViewport) {
	return {
		test:base.test,
		loading:loading.loading,
		isInViewport:isInViewport.isInViewport
	}
});