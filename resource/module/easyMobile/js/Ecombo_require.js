define([
	'module/easyMobile/js/Ebase',
	'module/easyMobile/js/Eloading',
	'module/easyMobile/js/EisInViewport',
	'module/easyMobile/js/Esidebar'
], function(base,loading,isInViewport,sidebar) {
	return {
		test:base.test,
		loading:loading.loading,
		isInViewport:isInViewport.isInViewport,
		Sidebar:sidebar.Sidebar
	}
});