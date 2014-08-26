angular.module("uploadApp")
  .controller("activityController", function ($scope, $log, $window, $q, Activity, webDAV, Auth) {

    promise.then(function (result) {
      $scope.photos = result;
      $scope.$log = $log;
    }, function (reason) {
      $scope.error('Failed: ' + reason);
    }, function (update) {
      $scope.info('Notification: ' + update);
    });

    $window.navigator.mozSetMessageHandler('activity', function(activityRequest) {
        var option = activityRequest.source;

        $scope.photo = option.name;    

        if (option.name === "share") {
             photoData = option.url;    
        }
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
