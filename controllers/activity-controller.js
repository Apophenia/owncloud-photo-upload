angular.module("uploadApp")
  .controller("activityController", 
    ['$scope', '$window', '$q', 'Activity', 'webDAV', 'Auth',
    function ($scope, $window, $q, Activity, webDAV, Auth) {

    var promise = Activity.getPhotoPath();

    promise.then(function (result) {
      $scope.photo = result;
      $scope.photo.src = $window.URL.createObjectURL(result);
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

  	  var promise = webDAV.put(Auth.getLocation()
  				            + "/photos/"
  				            + $scope.photo.name,
  				          $scope.photo);

      promise.then(summarize);
    }
}]);
