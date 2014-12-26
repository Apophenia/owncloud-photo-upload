angular.module("uploadApp")
  .controller("singlePhotoController", function ($scope, $routeParams, $window, $q, webDAV) {
    $scope.photoSrc = $routeParams.photoSrc;

    $scope.upload = function() {
        uploaded = webDAV.put("/photos", $scope.photoSrc)
            .then(function() {
                // markReceived(photo);
                console.log('Success');
            }, function(reason) {
                console.log('Failed: ' + reason);
            });
    }
});
