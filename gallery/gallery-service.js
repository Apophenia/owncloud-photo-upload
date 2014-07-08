var galleryServices = angular.module('galleryServices', []);

galleryServices.factory('Gallery', function($q) {
    var factory = {};	

    factory.getDeviceMedia = function() {
	var deferred = $q.defer();	
	var photos = [];	
	var files = navigator.getDeviceStorage('pictures');
	var cursor = files.enumerate();

	cursor.onsuccess = function() {
	    if (this.done) {
		deferred.resolve(photos);
	    }
	    else {
		photos.push(this.result);
		this.continue();
	    }
	};

	cursor.onerror = function() {
	    deferred.reject("Error browsing the file system.");
	};

	return deferred.promise;
    };
    return factory;
});

