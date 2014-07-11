var webdavServices = angular.module('webdavServices', []);

webdavServices.factory('webDAV', function($q) {
    var factory = {};	

    factory.propfind = function() {
    };

    return factory;
});

