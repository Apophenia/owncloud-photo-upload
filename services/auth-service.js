angular.module('uploadApp')
    .factory('Auth', function($window, $q, $rootScope) {
	var db = null;

	function init() {
	    var deferred = $q.defer();
	    var request = $window.indexedDB.open("oCStore", 1.0);
	    
	    request.onerror = function(e) {
		console.log("Error opening IndexedDB");
		console.dir(e);
		deferred.reject(e.toString());
	    };

	    // The database did not previously exist, so create object stores and indexes.
	    
	    request.onupgradeneeded = function() {
		db = request.result;
		var store = db.createObjectStore("auth", {keyPath: "id"});
		console.log("successfully created objectStore");
	    };

	    request.onsuccess = function(event) {
		$rootScope.$apply(function() {
		    db = event.target.result;
		    console.log(db);
		    deferred.resolve(true);
		});
	    };
	    return deferred.promise;
	}
	
	function storeAuth(credentials) {
	    var deferred = $q.defer();
	    if(db === null){
		deferred.reject("IndexedDB is not currently open.");
	    }
	    var tx = db.transaction("auth", "readwrite");
	    var store = tx.objectStore("auth");
	    var request = store.put(credentials);
	    request.onsuccess = function(e) {
		deferred.resolve(true); {
		deferred.reject(request.error);
	    };
	    tx.onabort = function() {
		deferred.reject(tx.error);
	    };
	    return deferred.promise;
	}

	function retrieveAuth() {
	    var deferred = $q.defer();
	    var tx = db.transaction("auth", "readonly");
	    var store = tx.objectStore("auth");

	    var request = store.openCursor();
	    request.onsuccess = function() {
		var cursor = request.result;
		var authObjs = [];
		if (cursor) {
		    //Returns a full cursor result; we will want the "value"
		    authObjs.push(this.result);
		    deferred.resolve(authObjs);
		}
		else {
		    deferred.reject();
		}
	    };
	    return deferred.promise;
	}
    
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
