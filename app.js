var uploadApp = angular.module("uploadApp",
			       ["galleryControllers", "galleryServices",
				"webdavServices", "underscore"])
    .config(['$compileProvider',
	     function($compileProvider) {
		 $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
		 $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|app|blob):/);
	     }
	    ]);
