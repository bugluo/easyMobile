define([
	'module/easyMobile/js/Ebase',
	'module/easyMobile/js/Eloading',
	'module/easyMobile/js/EisInViewport',
	'module/easyMobile/js/Esidebar',
	'module/easyMobile/js/Edragend'
], function(base,loading,isInViewport,sidebar,dragend) {
	return {
		test:base.test,
		loading:loading.loading,
		isInViewport:isInViewport.isInViewport,
		Sidebar:sidebar.Sidebar,
		Dragend:dragend.dragend
	}
});