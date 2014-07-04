var galleryControllers = angular.module("galleryControllers", ['galleryServices']);

galleryControllers.controller('listController', 
			      ["$scope", 
			       'Gallery',
			       function($scope, Gallery) {
				   var promise = Gallery.getPhotos();
				   promise.then(function(result) {
				       console.log(result);
				   }, function(reason) {
				       console.log('Failed: ' + reason);
				   }, function(update) {
				       console.log('Got notification: ' + update);
				   });
			       }]);







