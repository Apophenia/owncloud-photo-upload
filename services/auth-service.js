angular.module('uploadApp')
.service('Auth', function($window, $q) {
    
    this.store = function(credentials) {
        var deferred = $q.defer();

        $window.localforage.setItem('credentials', credentials).then(function(value) {
            deferred.resolve(value);
            console.log(value);
        }, function(error) {
            deferred.reject(error);
            console.log(error);
        });

        return deferred.promise;
    };

    this.retrieve = function() {
        var deferred = $q.defer();

        $window.localforage.getItem('credentials').then(function(value) {
            deferred.resolve(value);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

});
