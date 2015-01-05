angular.module('uploadApp')
.service('Auth', function($q, $localForage) {
    
    this.store = function(credentials) {
        var deferred = $q.defer();

        $localForage.setItem('credentials', credentials).then(function(value) {
            console.log(value);
            deferred.resolve(value);
        }, function(error) {
            console.log(error);
            deferred.reject(error);
        });

        return deferred.promise;
    };

    this.retrieve = function() {
        var deferred = $q.defer();

        $localForage.getItem('credentials').then(function(value) {
            console.log(value);
            deferred.resolve(value);
        }, function(error) {
            console.log(error);
            deferred.reject(error);
        });

        return deferred.promise;
    };
});
