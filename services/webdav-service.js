angular.module('uploadApp')
    .factory('webDAV', function(Auth, $q) {
	return {
	    // returns an XML body including the given properties
	    genPropRequestBody: function(properties) {
		var serializer = new XMLSerializer();
		var propBody = document.implementation.createDocument("DAV:", 
								      "propfind");
		var prop = propBody.createElementNS("DAV:", "prop");
		for (var i = 0; i < properties.length; ++i) {
		    prop.appendChild(propBody.createElementNS("DAV:", 
							      properties[i]));
		}
		propBody.documentElement.appendChild(prop);
		return(serializer.serializeToString(propBody));
	    },

	    propfind: function(url, properties) {
		var deferred = $q.deferred();
		var xhr = new XMLHttpRequest({mozSystem: true});
		xhr.open("PROPFIND", url, true);
		xhr.setRequestHeader("Auth", this.genAuth());
		xhr.setRequestHeader("Content-type",
				     "application/xml; charset='utf-8'");
		xhr.onload = function (e) {
		    if (xhr.readyState === 4) {
			if (xhr.status === 200) {
			    deferred.resolve(xhr.responseText);
			} else {
			    deferred.reject(xhr.statusText);
			}
		    }
		};
		xhr.onerror = function (e) {
		    deferred.reject(xhr.statusText);
		};
		if (!properties) {
		    xhr.send();
		}
		else {
		    var body = genPropRequestBody(properties);
		    xhr.send(body);
		}
		return deferred.promise;
	    },

	    get: function(url) {
		var deferred = $q.defer();
		var xhr = new XMLHttpRequest({mozSystem: true});
		xhr.open("GET", url, true);
		xhr.setRequestHeader("Authorization", Auth.getBasic());
		xhr.onload = function (e) {
		    if (xhr.readyState === 4) {
			if (xhr.status === 200) {
			    deferred.resolve(xhr.responseText);
			} else {
			    deferred.reject(xhr.statusText);
			}
		    }
		};
		xhr.onerror = function (e) {
		    deferred.reject(xhr.statusText);
		};
		xhr.send(null);
		return deferred.promise;
	    },

	    put: function(url, img) {
		var deferred = $q.defer();
		var xhr = new XMLHttpRequest({mozSystem: true});
		xhr.open("PUT", url, true);
		xhr.setRequestHeader("Authorization", Auth.getBasic());
		xhr.onload = function (e) {
		    if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 204) {
			    deferred.resolve(xhr.responseText);
			} else {
			    deferred.reject(xhr.statusText);
			}
		    }
		};
		xhr.onerror = function () {
		    deferred.reject(xhr.statusText);
		};
		xhr.send(img);
		return deferred.promise;
	    },	
	};
    });
