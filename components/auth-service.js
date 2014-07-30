var authServices = angular.module('authServices', []);

authServices.factory('Auth', ['$window', function($window) {
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
    };
}]);
