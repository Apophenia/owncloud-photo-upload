angular.module('uploadApp')
.service('Auth', function($window, $q, $rootScope) {

	// TODO: switch to localforage at some point
	//	
	// this.fore = function(credentials) {
	// 	return $window.localforage.setItem('credentials', JSON.stringify(config));
	// }

	// this.get = function() {
	// 	return $window.localforage.getItem('credentials');
	// }

	var db = null;

	this.init = function() {
	    var deferred = $q.defer();
	    var request = $window.indexedDB.open("oCStore", 1.0);
	    
	    request.onerror = function(e) {
			console.log("Error opening IndexedDB");
			console.dir(e);
			deferred.reject(e.toString());
	    };

	    // The database did not previously exist, so create object stores and indexes
	    request.onupgradeneeded = function() {
			db = request.result;
			var store = db.createObjectStore("auth", {keyPath: "id"});
			console.log("successfully created objectStore");
	    };

	    request.onsuccess = function(event) {
			$rootScope.$apply(function() {
			    db = event.target.result;
			    deferred.resolve(true);
			});
	    };

	    return deferred.promise;
	};
	
	this.store = function(credentials) {
	    var deferred = $q.defer();

	    if(db === null){
			deferred.reject("IndexedDB is not currently open.");
	    }

	    credentials.id = 0;
	    var tx = db.transaction("auth", "readwrite");
	    var objectStore = tx.objectStore("auth");
	    var request = objectStore.put(credentials);
	    
	    request.onsuccess = function(e) {
			deferred.resolve(true);
	    };

	    request.onerror = function() {
			deferred.reject(request.error);
	    };
	    
	    tx.onabort = function() {
			deferred.reject(tx.error);
	    };

	    return deferred.promise;
	};

	this.retrieve = function() {
	    var deferred = $q.defer();
	    
	    if(db === null){
			deferred.reject("IndexedDB is not currently open.");
		}
		else {
		    var tx = db.transaction("auth", "readonly");
		    var store = tx.objectStore("auth");
		    var request = store.openCursor();

		    console.log("mmm");
		    request.onsuccess = function() {
				var cursor = request.result;
				var authObjs = [];
				if (cursor) {
				    // This returns a cursor result; we will want the "value"
				    authObjs.push(this.result.value);
				    $rootScope.$apply(function () {
						deferred.resolve(authObjs[0]);
				    });
				}
				else {
				    deferred.reject();
				}
		    };

			request.onerror = function() {
				deferred.reject(request.error);
		    };
		}

	    return deferred.promise;
	};

	this.retrieveLocation = function() {
		var deferred = $q.defer();
	    
    	this.retrieve().then(function (credentials) {
			deferred.resolve(credentials.location);
	    }, function(error) {
			deferred.reject(error);
	    });

	    return deferred.promise;
	}

	this.encodeBasic = function () {
	    var deferred = $q.defer();
	    
        this.retrieve().then(function (credentials) {
			deferred.resolve("Basic " + 
				$window.btoa(credentials.username+":"+credentials.password));
	    }, function(error) {
			deferred.reject(error);
	    });
	
	    return deferred.promise;
	};

});
