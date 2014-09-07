// TODO: Figure out how to tie an object property to CSS with angular
// Is ng-hide the only way? NOOOOOOO you can use ng-class or ng-style

angular.module("uploadApp")
    .controller("galleryController", function ($scope, $log, $q, Gallery, webDAV, Auth) {
	// Number of photos currently uploading
	// Seems dangerous -- what if a bug results in a negative value?
	$scope.pending = 0;

	markReceived = function(photo) {
	    console.log("Uploaded " + photo.name);
	    photo.onServer = true;
	    $scope.pending -= 1;
	    console.log("still pending: "+ $scope.pending);
	    };

	Gallery.getDeviceMedia().then(function (result) {
	    $scope.photos = result;
	    $scope.$log = $log;
	}, function (reason) {
	    $scope.error('Failed: ' + reason);
	}, function (update) {
	    $scope.info('Notification: ' + update);
	});
	
	$scope.markNewImages = function () {
	    webDAV
		.get(serverURL)
		.then(function (response) {
		    var serverArray = Gallery.getMediaList(response);
		    _.map($scope.photos, function (elt) {
			if (_.contains(serverArray, elt.name)) {
			    elt.onServer = true;
			}
		    });
		});
	};
	
	$scope.uploadSelected = function() {
	     Auth.retrieve().then(function (credentials) {
		 var directory = credentials.location + "/remote.php/webdav/photos/";
		 _.map($scope.photos, function(photo) {
		     if (photo.selected) {
			 $scope.pending++;
			 photo.pending = true;
			 console.log(directory + photo.name);
			 photo.uploaded = webDAV.put(directory + photo.name, photo)
			     .then(function() {
				 markReceived(photo);
			     }, function(reason) {
				 console.log('Failed: ' + reason);
				 scope.pending--;
			     }, function(update) {
				 console.log('Got notification: ' + update);
			     });
		     }
		 });
	     });
	};
    });
