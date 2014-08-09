angular.module("uploadApp")
  .controller("galleryController", function ($scope, $log, Gallery, webDAV, Auth) {
    var serverURL = ""; // must be populated for testing or development
    var promise = Gallery.getDeviceMedia();
    promise.then(function (result) {
      $scope.photos = result;
      $scope.$log = $log;
    }, function (reason) {
      $scope.error('Failed: ' + reason);
    }, function (update) {
      $scope.info('Notification: ' + update);
    });
      
    $scope.markNewImages = function () {
      webDAV
        .get(serverURL)
        .then(function (response) {
          var serverArray = Gallery.getMediaList(response);
          _.map($scope.photos, function (elt) {
            if (_.contains(serverArray, elt.name)) {
              elt.onServer = true;
            }
          });
        });
    };
      $scope.upload = function () {
	  webDAV.put(Auth.getLocation() + "/helloworld.txt",
		    "hello world")
	      .then(console.log("uploaded"));
      }
      $scope.markNewImages();
  });
