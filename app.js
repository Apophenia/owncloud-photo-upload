angular.module("uploadApp", ["ngRoute"])
  .config(function ($routeProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|app|blob):/);

    $routeProvider
      .when("/", {
        templateUrl: "partials/gallery.html",
        controller: "galleryController"
      })
      .when("/settings", {
        templateUrl: "partials/login.html",
        controller: "loginController"
      });
  }
);
