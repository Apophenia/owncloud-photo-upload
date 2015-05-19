angular.module('uploadApp')
.service('webDAV', ['$q', 'Auth', function($q, Auth) {
    
	// returns an XML body including the given properties
    this.genPropRequestBody = function(properties) {
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
	};

    this.propfind = function(url, auth, properties) {
		var deferred = $q.defer();
		var xhr = new XMLHttpRequest({mozSystem: true});
		xhr.open("PROPFIND", url, true);
		// xhr.setRequestHeader("Auth", Auth.encodeBasic());
		xhr.setRequestHeader("Authorization", "Basic " + btoa(auth.user + ":" + auth.pass));
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
	};

    this.get = function(url, auth) {
		var deferred = $q.defer();
		var xhr = new XMLHttpRequest({mozSystem: true});
		xhr.open("GET", url, true);
		//xhr.setRequestHeader("Authorization", Auth.getBasic());
		// xhr.setRequestHeader("Authorization", "Basic " + btoa(auth.user + ":" + auth.pass));
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
    };

    this.check = function(url, auth) {
		var deferred = $q.defer();
		var xhr = new XMLHttpRequest({mozSystem: true});
		xhr.open("GET", url, true);
		xhr.setRequestHeader("Authorization", "Basic " + btoa(auth.user + ":" + auth.pass));
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
    };

	this.put = function(url, file) {
		var deferred = $q.defer();
		var xhr = new XMLHttpRequest({mozSystem: true});
		console.log(file);
		Auth.retrieve().then(function(credentials) {
			xhr.open("PUT", credentials.address + "photos/" + url, true);
			console.log(credentials.address + "photos/" + url);
			xhr.setRequestHeader("Authorization", "Basic " + 
				btoa(credentials.username + ":" + credentials.password));
			
			xhr.timeout = 120000;
			xhr.ontimeout = function() {
				deferred.reject("Connection timed out");
			};

			xhr.onload = function (e) {
				if (xhr.readyState === 4) {
				    if (xhr.status === 200 || xhr.status === 204 || 
				    	xhr.status === 201) {
						deferred.resolve(xhr.responseText);
				    } else {
				    	console.log(xhr.statusText);
						deferred.reject(xhr.statusText);
				    }
				}		
			};

			xhr.onerror = function () {
				deferred.reject("Connection failed");
			};

			xhr.send(file);
		}, function(error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};
  }
]);
