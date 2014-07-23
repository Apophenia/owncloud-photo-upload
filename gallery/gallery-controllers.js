var galleryControllers = angular.module("galleryControllers", ['galleryServices','webdavServices']);

galleryControllers.controller('listController',
			      ["$scope", 
			       'Gallery',
			       'webDAV',
			       function($scope, Gallery, webDAV) {
			           var promise = Gallery.getDeviceMedia();
                                   promise.then(function(result) {
                                       $scope.photos = result;
			           }, function(reason) {
                                       console.log('Failed: ' + reason);
                                   }, function(update) {
                                       console.log('Got notification: ' + update);
	                           });
			       }]);
