angular.module("uploadApp")
  .controller("singlePhotoController", function ($scope, $routeParams, $window, $q) {
    $scope.photoSrc = $routeParams.photoSrc;
});
