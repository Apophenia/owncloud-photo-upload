angular.module('uploadApp')
.factory('authInterceptor', function($q, Auth) {
    return {
      // optional method
        'request': function(config) {

            Auth.retrieve().then(function(credentials) {
                var location = credentials.location;
                console.log(location);
                console.log(config.url);
                if (config.url.indexOf(location) == 0) {
                    console.log("here");
                    var header = "Basic " + 
                        $window.btoa(credentials.username+":"+credentials.password);
                    angular.extend(config.header, header);
                    console.log(config);
                }
            }, function (error) {
                console.log(error);
            });

        return config;
        }

     // optional method
     // 'requestError': function(rejection) {
     //    // do something on error
     //    if (canRecover(rejection)) {
     //      return responseOrNewPromise
     //    }
     //    return $q.reject(rejection);
     //  },

      // optional method
    //   'response': function(response) {
    //     // do something on success
    //     return response;
    //   },

    //   // optional method
    //  'responseError': function(rejection) {
    //     // do something on error
    //     if (canRecover(rejection)) {
    //       return responseOrNewPromise
    //     }
    //     return $q.reject(rejection);
    //   }
    };
});