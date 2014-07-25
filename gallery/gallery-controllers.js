var galleryControllers = angular.module("galleryControllers", 
					['galleryServices','webdavServices']);

galleryControllers.controller('listController', ["$scope", '$log', 'Gallery','webDAV', 
						 function($scope, $log, Gallery, webDAV) {
  var promise = Gallery.getDeviceMedia();
  promise.then(function(result) {
    $scope.photos = result;
    $scope.$log = $log;
  }, function(reason) {
    $scope.error('Failed: ' + reason);
  }, function(update) {
    $scope.info('Notification: ' + update);
  });
}]);
