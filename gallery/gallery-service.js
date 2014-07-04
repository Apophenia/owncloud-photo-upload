var galleryServices = angular.module('galleryServices', []);

galleryServices.factory('Gallery', function galleryFactory($q) {
    var service = {};	

    // This is example is copied from the angular docs
    service.asyncGreet = function asyncGreet(name) {
	var deferred = $q.defer();
	
	setTimeout(function() {
	    deferred.notify('About to greet ' + name + '.');
	    
	    if (name.length > 2) {
		deferred.resolve('Hello, ' + name + '!');
	    } else {
		deferred.reject('Greeting ' + name + ' is not allowed.');
      }
    }, 1000);

    return deferred.promise;
    };
    
    /*
    service.getPhotos = function() {
	var deferred = $q.defer();
	var photos = [];	
	var files = navigator.getDeviceStorage('pictures');
	var cursor = files.enumerate();
	
	cursor.onsuccess = function () {
	    var file = this.result;
	    photos.push({name: file.name});
	    if (!this.done) {
		this.continue();
	    }
	    else {
		if (photos.length > 0) {
		    deferred.resolve(photos);	
		}
		else {
		    deferred.reject("Unable to retrieve files from storage.");
		}
		console.log("returning the promise...");
		return deferred.promise; 
	    }
	};
	
	cursor.onerror = function () {
	    console.warn("File not found: " + this.error);
	};
    }; */
    
    return service;
});
