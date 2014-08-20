angular.module('uploadApp')
    .factory('Auth', function($window, $q) {
	
	function init() {
	    var deferred = $q.defer();
	    
	    var request = $window.indexedDB.open("oCStore", 1.0);
	    
	    request.onerror = function(e) {
		console.log("Error opening IndexedDB");
		console.dir(e);
		deferred.reject(e.toString());
	    };

	    request.onupgradeneeded = function() {
		// this code will execute if the db did not previously exist
		var db = request.result;
		if(!db.objectStoreNames.contains("auth")) {
		    objectStore = thisDb.createObjectStore("auth", {foo: "bar"});
		}
	    };

	    request.onsuccess = function() {
		db = request.result;
		deferred.resolve(db);
	    };
		
	    return deferred.promise;
	}

	var username = "";
	var password = "";
	var installLocation = "";
    
    function getBasic() {
	return ("Basic " + $window.btoa(username+":"+password));
    }
    
    function getLocation() {
	return installLocation;
    }

    function setUsername(input) {
	username = input;
    }

    function setPassword(input) {
	password = input;
    }

    function setLocation(input) {
	installLocation = input;
    }

    return {
	getBasic: getBasic,
	getLocation: getLocation,
	setUsername: setUsername,
	setPassword: setPassword,
	setLocation: setLocation,
	init: init
    };
});
