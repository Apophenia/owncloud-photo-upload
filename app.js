var uploadApp = angular.module("uploadApp",
			       ["ngRoute", "galleryControllers", "authServices", "galleryServices",
				"webdavServices", "underscore"])
    .config(['$compileProvider',
	     function($routeProvider, $compileProvider) {
		 $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
		 $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|app|blob):/);

		 $routeProvider
		     .when("/", {
			 templateURL: "gallery/gallery.html",
			 controller: "galleryController"
		     })
		     .when("/settings", {
			 templateURL: "login/login.html",
			 controller: "loginController"
		     });
	     }
	    ]);
