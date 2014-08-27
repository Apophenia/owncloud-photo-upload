angular.module('uploadApp')
    .service('Activity', function($window, $q) {
    
    this.getPhotoPath = function() {

        var deferred = $q.defer();
        
        $window.navigator.mozSetMessageHandler('activity', function(activityRequest) {
            var option = activityRequest.source;

            if (option.name === "share") {
                filePath = option.data.filepaths[0];

                var storage = $window.navigator.getDeviceStorage('pictures');
                var getRequest = storage.get(filePath);

                //not sure about this, maybe two promises need to be piped
                getRequest.onsuccess = function() {
                    deferred.resolve($window.URL.createObjectURL(getRequest.result));
                };

                getRequest.onerror = function() {
                    deferred.resolve("errorrr");
                };

                // TODO: handle error part
                // getRequest.onerror = function() {
                // }
            }
        });

        return deferred.promise;
    };

});
