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

	function storeAuth(db) {
	    var deferred = $q.defer();
	    var tx = db.transaction("auth", "readwrite");
	    var store = tx.objectStore("auth");

	    store.put({baz: "bat"});
	    store.put({pippo: "pippo"});

	    tx.oncomplete(function () {
		deferred.resolve();
	    });

	    tx.onerror(function () {
		deferred.reject();
	    });
	    return deferred.promise;
	}

	function retrieveAuth(db) {
	    var deferred = $q.defer();
	    var tx = db.transaction("auth", "readonly");
	    var store = tx.objectStore("auth");

	    var request = index.openCursor();
	    request.onsuccess = function() {
		var cursor = request.result;
		var authObjs = [];
		if (cursor) {
		    // returns the first result it finds!
		    authObjs.push(this.result);
		    deferred.resolve(authObjs);
		}
		else {
		    deferred.reject();
		}
	    };
	    return deferred.promise;
	};

	var username = "";
	var password = "";
	var installLocation = "";
    
    function encodeBasic(auth) {
	return ("Basic " + $window.btoa(username+":"+password));
    }
    
    return {
	encodeBasic: encodeBasic,
	storeAuth: storeAuth,
	retrieveAuth: retrieveAuth,
	init: init
    };
});
