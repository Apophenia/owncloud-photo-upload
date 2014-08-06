angular.module("uploadApp", ["ngRoute"])
  .config(function ($routeProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|app|blob):/);

    $routeProvider
      .when("/", {
        templateUrl: "partials/gallery.html",
        controller: "galleryController"
      })
      .when("/options", {
        templateUrl: "partials/options.html",
        controller: "loginController"
      });
  }
);
