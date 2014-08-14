angular.module('uploadApp')
    .factory('Auth', function($window) {
    var username = "";
    var password = "";
	// do not add any trailing slashes to install location
    var location = "";
    
    function getBasic() {
	return ("Basic " + $window.btoa(username+":"+password));
    }
    
    function getLocation() {
	return location;
    }

    function setUsername(input) {
	username = input;
    }

    function setPassword(input) {
	password = input;
    }

    function setLocation(input) {
	location = input;
    }

    return {
	getBasic: getBasic,
	getLocation: getLocation,
	setUsername: setUsername,
	setPassword: setPassword,
	setLocation: setLocation,
    };
});
