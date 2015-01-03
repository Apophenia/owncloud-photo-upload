angular.module('uploadApp')
.service('Gallery', function($window, $q) {

	this.getDeviceMedia = function() {
	    var deferred = $q.defer();	
	    var photos = [];	
	    var files = $window.navigator.getDeviceStorage('pictures');

	    //for testing purpose, use gaia folder as a storage folder
	    var cursor = files.enumerate('gaia');

		cursor.onsuccess = function() {
		    if (this.done) {
				deferred.resolve(photos);
		    }
		    else {
				photos.push({src: $window.URL.createObjectURL(this.result), 
					filename: $window.encodeURIComponent($window.encodeURIComponent(this.result.name))});
				this.continue();
		    }
		};

		cursor.onerror = function() {
		    deferred.reject("Error browsing the file system.");
		};

		return deferred.promise;
	};

	this.getFile = function(filename) {
		var deferred = $q.defer();	
		var storage = $window.navigator.getDeviceStorage('pictures');
		var request = storage.get(filename);

		request.onsuccess = function () {
			console.log("Get the file: " + filename);
			deferred.resolve(this.result);
		}

		request.onerror = function () {
			console.warn("Unable to get the file: " + this.error);
			deferred.reject("Unable to get the file: " + this.error);	
		}

		return deferred.promise;
	}

    // this needs a refactor! perhaps with Underscore?
	this.getMediaList = function(xml) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(xml, "text/html");
		var result = [];
		var strippedArray = [];
		var links = doc.links;
		var imagePattern = new RegExp(".*(png|gif|jpg|jpeg|bmp)");
		for (var i=0; i<links.length; i++) {
		    match = links[i].getAttribute("href").match(imagePattern);
		    // strip to filename before pushing to array
		    if (match) { // probably unsafe
			result.push(decodeURIComponent(match[0].replace(/^.*(\\|\/|\:)/, '')));
		    }
		}
		strippedArray = result.filter(function(elem, pos) {
		    return result.indexOf(elem) == pos;
		});
		return strippedArray;
    };

	this.findNewElements = function (newArray, oldArray) {
		return newArray.filter(function(x) {
		    return (oldArray.indexOf(x) < 0);
		});
    };
});
