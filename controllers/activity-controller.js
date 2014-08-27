angular.module("uploadApp")
  .controller("activityController", function ($scope, $window, $q, Activity, webDAV, Auth) {

    var promise = Activity.getPhotoPath();

    $scope.photoPath = "";

    promise.then(function (result) {
      $scope.photoPath = result;
    }, function (reason) {
      $scope.error('Failed: ' + reason);
    }, function (update) {
      $scope.info('Notification: ' + update);
    });
         
    $scope.upload = function () {
  	  var deferred = $q.defer();
  	  var promise;

  	  function summarize() {
  	      $scope.message("Finished with upload attempts.");
  	      deferred.resolve();
  	  }

  	  var promise = push(webDAV.put(Auth.getLocation()
  				            + "/photos/"
  				            + photo.name,
  				          photo));

  	  $q.all(promises).then(summarize);
    }

});
