angular.module('uploadApp', ['ngRoute', 'LocalForageModule'])
.config(['$routeProvider', '$httpProvider', '$compileProvider', '$localForageProvider', 
  function ($routeProvider, $httpProvider, $compileProvider, $localForageProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|app|blob):/);

    $routeProvider.
      when('/', {
        templateUrl: 'partials/gallery.html',
        controller: 'galleryController'
      }).
      when('/settings', {
        templateUrl: 'partials/settings.html',
	      controller: 'settingsController'
      }).
      when('/photos/:photoSrc*/:photoFilename/', {
        templateUrl: 'partials/single-photo.html',
        controller: 'singlePhotoController'
      }).
      otherwise({
        redirectTo: '/'
      });

    // $httpProvider.interceptors.push('authInterceptor');

    $localForageProvider
      .config({
        name : 'owncloud-photo-upload'
      });
  }
]);
