angular.module('uploadApp')
.factory('authInterceptor', function($q, Auth) {
    return {
      // optional method
      'request': function(config) {

        // Auth.retrieveLocation().then(function (location) {
        //   if (config.url.indexOf(location) == 0) {
        //     Auth.encodeBasic().then(function (credentials) {
        //       angular.extend(config.header, Auth.encodeBasic());
        //     });
        //     console.log(config);
        //   }
        // });
        return config;
      },

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