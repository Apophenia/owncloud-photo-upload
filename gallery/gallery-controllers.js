var galleryControllers = angular.module("galleryControllers", []);

galleryControllers.controller('listController', 
			      ["$scope", 
			       function($scope) {
				   $scope.photos = [
				       // mock objects while I update
				       // the service
				       { name: "photo1.jpg" },
				       { name: "photo2.jpg" }
				   ];
			       }]);
			      
