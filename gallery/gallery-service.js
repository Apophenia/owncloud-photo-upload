var galleryServices = angular.module('galleryServices', []);

galleryServices.factory('Gallery', function($q) {
    var service = {};	

    // This is example is copied from the angular docs
    service.getPhotos = function() {
	var deferred = $q.defer();
	
	var photos = [];	
	var files = navigator.getDeviceStorage('pictures');
	var cursor = files.enumerate();
	
	cursor.onsuccess = function() {
	    var file = this.result;
	    console.log("File found: " + this.result.name);

	    if (this.done && photos.length > 0) {
		deferred.resolve(photos);
		return deferred.promise;
	    }
	    else if (this.done) {
		console.log("done");
		deferred.reject("No photos found.");
		return deferred.promise;
	    }
	    else {
		this.continue();
	    }
	};

	cursor.onerror = function() {
	    deferred.reject("Error browsing the file system.");
	    return deferred.promise;
	};
    };
    return service;
});
