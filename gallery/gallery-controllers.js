var galleryControllers = angular.module("galleryControllers", ['galleryServices']);

galleryControllers.controller('listController', 
			      ["$scope", 
			       'Gallery',
			       function($scope, Gallery) {
				   console.log("I know I'm not updating any bindings, but shouldn't this execute?");
				   console.log(Gallery);
				   // this is a rather contrived example copied from the Angular docs
				   // Names must be longer than two characters to be valid
				   var promise = Gallery.getPhotos();
				   promise.then(function(result) {
				       console.log(result);
				   }, function(reason) {
				       console.log('Failed: ' + reason);
				   }, function(update) {
				       console.log('Got notification: ' + update);
				   });
			       }]);







