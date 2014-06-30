var galleryServices = angular.module('galleryServices', []);


galleryServices.factory('Gallery', function galleryFactory() {
    var service = {};	

    service.getPhotos = function() {
	var photos = [];	
	var files = navigator.getDeviceStorage('pictures');
	var cursor = files.enumerate();

	cursor.onsuccess = function () {
	    var file = this.result;
	    photos.push(file);
	    if (!this.done) {
		this.continue();
	    }
	};

	cursor.onerror = function () {
	    console.warn("File not found: " + this.error);
	};
	
	return photos;	
    };
    return service;
});
