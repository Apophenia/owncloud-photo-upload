angular.module("uploadApp")
  .controller("singlePhotoController", function ($scope, $routeParams, $window, $q, webDAV, Gallery) {
    $scope.photoSrc = $routeParams.photoSrc;

    $scope.upload = function() {
        filename = $window.decodeURIComponent($routeParams.photoFilename);
        console.log('Uploading ' + filename);

        Gallery.getFile(filename)
            .then(function(file) {
                console.log('Uploading now!!' + file);
                uploaded = webDAV.put(filename, file)
                    .then(function() {
                        // markReceived(photo);
                        console.log('Success');
                    }, function(reason) {
                        console.log('Failed: ' + reason);
                    });
            });
    }
});
