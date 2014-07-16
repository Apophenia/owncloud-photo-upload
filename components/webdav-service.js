var webdavServices = angular.module('webdavServices', []);

webdavServices.factory('webDAV', function($q) {
    var factory = {};

    factory.genAuth = function() {
    };

    factory.genPropRequestBody = function(properties) {
	var body = '<?xml version="1.0" encoding="utf-8" ?>
<D:propfind xmlns:D="DAV:"> 
<D:prop xmlns:R="http://ns.example.com/boxschema/">';
	for (var i = 0; i < properties.length; ++i) {
	    body += "R:" + properties[i] + "/>";
	}
	body += "</D:prop>
</D:propfind>";
	return body;
    }

    factory.propfind = function(url, properties) {
	var deferred = $q.deferred();
	var credentials = this.genAuth();
	var xhr = new XMLHttpRequest({mozSystem: true});
	xhr.open("PROPFIND", url);
	xhr.setRequestHeader("Auth", credentials);
	xhr.setRequestHeader("Content-type", "application/xml; charset='utf-8'");
	if (!properties) {
	    xhr.send();
	    }
	else {
	    var body = genPropRequestBody(properties);
	    xhr.send(body);
	}
	
    return factory;
});

