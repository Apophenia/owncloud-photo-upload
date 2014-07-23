var webdavServices = angular.module('webdavServices', []);

webdavServices.factory('webDAV', function($q) {
    var factory = {};

    factory.genAuth = function() {
    };

    var serializer = new XMLSerializer();

    // returns an XML body including the given properties
    factory.genPropRequestBody = function(properties) {
	var propBody = document.implementation.createDocument("DAV:", "propfind");
	var prop = propBody.createElementNS("DAV:", "prop");
	for (var i = 0; i < properties.length; ++i) {
	    prop.appendChild(propBody.createElementNS("DAV:", properties[i]));
	}
	propBody.documentElement.appendChild(prop);
	return(serializer.serializeToString(propBody));
    };

    factory.propfind = function(url, properties) {
	var deferred = $q.deferred();
	var credentials = this.genAuth();
	var xhr = new XMLHttpRequest({mozSystem: true});
	xhr.open("PROPFIND", url, true);
	xhr.setRequestHeader("Auth", credentials);
	xhr.setRequestHeader("Content-type", "application/xml; charset='utf-8'");
	if (!properties) {
	    xhr.send();
	    }
	else {
	    var body = genPropRequestBody(properties);
	    xhr.send(body);
	}
    };

    factory.get = function(url) {
	var deferred = $q.defer();
	var xhr = new XMLHttpRequest({mozSystem: true});
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Authorization","Basic dGVzdDp0ZXN0");
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
    return factory;
});
