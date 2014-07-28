var galleryControllers = angular.module("galleryControllers",
					['galleryServices','webdavServices',
					 'underscore']);

galleryControllers.controller('listController',
			      ["$scope", '$log', 'Gallery','webDAV', '_',
	function($scope, $log, Gallery, webDAV, _, Auth) {
	    var serverURL = ""; // must be populated for testing or development
	    var promise = Gallery.getDeviceMedia();
	    promise.then(function(result) {
		$scope.photos = result;
		$scope.$log = $log;
	    }, function(reason) {
		$scope.error('Failed: ' + reason);
	    }, function(update) {
		$scope.info('Notification: ' + update);
	    });

	    $scope.markNewImages = function() {
		webDAV
		    .get(serverURL)
		    .then(function (response) {
			/* var photoNames = _.map($scope.photos,
			   function (elt) { return elt.name }); */
			var serverArray = Gallery.getMediaList(response);
			_.map($scope.photos, function (elt) {
			    if (_.contains(serverArray, elt.name)) {
				elt.onServer = true;
			    }
			});
		    });
	    };
	    $scope.markNewImages();
	}]);
