var galleryControllers = angular.module("galleryControllers", []);

galleryControllers.controller('listController', 
			      ["$scope", 
			       'Gallery',
			       function($scope, Gallery) {
				   // ng-repeat won't iterate through 
				   // file objects - working on this.
				   $scope.photos = Gallery.getPhotos();
			       }
			      ]);

