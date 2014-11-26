angular.module("uploadApp")
  .controller("settingsController", function ($window, $scope, $log, $q, Auth) {
      $scope.$log = $log;
      $scope.save = function() {
	  $scope.updateStatus = "Updating...";
	  Auth.store($scope.credentials).then(
	      function(value) {
		  $scope.updateStatus = "Updated";
	      }, function () {
		  $scope.updateStatus = "An error occured when updating account information."
	      });
      };
	  
	  $scope.populate = function() {
	  Auth.init().then(function() {
	      Auth.retrieve().then(
		  function(credentials) {
		      $scope.credentials = credentials;
		  }, function(error) {
		      $log.error(error);
		  });
	  });
      };
	  $scope.populate();
      });
