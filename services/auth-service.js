angular.module('uploadApp')
    .factory('Auth', function($window, $q) {
	
	function init() {
	    var deferred = $q.defer();

	    if(setUp) {
		deferred.resolve(true);
		return deferred.promise;
	    }
	    
	    var openRequest = $window.indexedDB.open("oCStore",1);
	    
	    openRequest.onerror = function(e) {
		console.log("Error opening IndexedDB");
		console.dir(e);
		deferred.reject(e.toString());
	    };

	    openRequest.onupgradeneeded = function(e) {
		var thisDb = e.target.result;
		var objectStore;
		
		if(!thisDb.objectStoreNames.contains("auth")) {
		    objectStore = thisDb.createObjectStore("auth", {foo: "bar"});
		}
	    };

	    openRequest.onsuccess = function(e) {
		db = e.target.result;
		db.onerror = function(event) {
		    deferred.reject("Database error: " + event.target.errorCode);
		};
		setUp=true;
		deferred.resolve(true);
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
