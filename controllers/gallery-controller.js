angular.module("uploadApp")
  .controller("galleryController", function ($scope, $log, $q, Gallery, webDAV, Auth) {
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
	  var deferred = $q.defer();
	  var promises = [];

	  function summarize() {
	      $scope.message("Finished with upload attempts.");
	      defer.resolve();
	  }

	  angular.forEach($scope.photos, function(photo) {
	      promises.push(webDAV.put(Auth.getLocation()
				       + "/photos/"
				       + photo.name,
				       photo));
	  });

	  $q.all(promises).then(summarize);
      }
      $scope.markNewImages();
  });
