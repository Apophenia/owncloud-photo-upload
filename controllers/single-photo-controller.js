angular.module("uploadApp")
.controller("singlePhotoController", 
  ['$scope', '$routeParams', '$window', '$q', 'webDAV', 'Gallery',
    function ($scope, $routeParams, $window, $q, webDAV, Gallery) {
    $scope.photoSrc = $routeParams.photoSrc;

    $scope.upload = function() {
        filename = $window.decodeURIComponent($routeParams.photoFilename);
        console.log('Uploading ' + filename);

        Gallery.getFile(filename).then(function(file) {
            uploaded = webDAV.put(filename, file)
                .then(function() {
                    console.log('Success');
                }, function(reason) {
                    console.log('Failed: ' + reason);
                });
            },
            function(error) {
                console.log(error);
            }
        );
    }
}]);
