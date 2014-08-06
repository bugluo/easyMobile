define([
	'module/easyMobile/js/Ebase',
	'module/easyMobile/js/Eloading'
], function(base,loading) {
	return {
		test:base.test,
		loading:loading.loading
	}
});