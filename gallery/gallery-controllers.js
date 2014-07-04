var galleryControllers = angular.module("galleryControllers", []);

galleryControllers.controller('listController', 
			      ["$scope", 
			       'Gallery',
			       function($scope, Gallery) {
				   console.log("I know I'm not updating any bindings, but shouldn't this execute?");
				   // this is a rather contrived example copied from the Angular docs
				   // Names must be longer than two characters to be valid
				   var promise = Gallery.asyncGreet('R');
				   promise.then(function(greeting) {
				       console.log('Success: ' + greeting);
				   }, function(reason) {
				       console.log('Failed: ' + reason);
				   }, function(update) {
				       console.log('Got notification: ' + update);
				   });
			       }]);
			       
/*
			       function($scope, Gallery) {
				   var promise = Gallery.getPhotos();
				   console.log(promise);
				   promise.then(function(returnedPhotos) {
				       console.log("Success!");
				       console.log(returnedPhotos);
				   }, function(reason) {
				       console.log("Failed!");
				       console.log(reason);
				   }, function(update) {
				       console.log("Got notification!");
				       console.log(update);
				   });
			       }*/













