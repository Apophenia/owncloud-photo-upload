var uploadApp = angular.module("uploadApp", ["galleryControllers", "galleryServices"])
    .config(['$compileProvider',
	     function($compileProvider) {
		 $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
		 $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|app|blob):/);
	     }
	    ]);
