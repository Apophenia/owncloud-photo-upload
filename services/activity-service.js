angular.module('uploadApp')
    .service('Activity', function($window, $q) {
    
    this.getPhotoPath = function() {

        var deferred = $q.defer();
        
        $window.navigator.mozSetMessageHandler('activity', function(activityRequest) {
            var option = activityRequest.source;

            if (option.name === "share") {
                filePath = option.data.filepaths[0];
                deferred.resolve(filePath);
            }
        });

        return deferred.promise;
    };

});
