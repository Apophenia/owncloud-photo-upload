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
		var store = db.createObjectStore("books", {keyPath: "isbn"});
		console.log("successfully created objectStore");
		var titleIndex = store.createIndex("by_title", "title", {unique: true});
		var authorIndex = store.createIndex("by_author", "author");
		
		// Populate with initial data.
		store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
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
	
	function storeAuth() {
	    var deferred = $q.defer();
	    if(db === null){
		deferred.reject("IndexedDB is not currently open.");
	    }
	    var tx = db.transaction("books", "readwrite");
	    var store = tx.objectStore("books");
	    var request = store.put({title: "Water Buffaloes", author: "Slate", isbn: 987654});
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
	}

	function retrieveAuth() {
	    var deferred = $q.defer();
	    var tx = db.transaction("books", "readonly");
	    var store = tx.objectStore("books");

	    var request = store.openCursor();
	    request.onsuccess = function() {
		var cursor = request.result;
		var authObjs = [];
		if (cursor) {
		    // this seems to return the entire cursor when it resolves.
		    // I'm not really sure why
		    authObjs.push(this.result);
		    deferred.resolve(authObjs);
		}
		else {
		    deferred.reject();
		}
	    };
	    return deferred.promise;
	}

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
