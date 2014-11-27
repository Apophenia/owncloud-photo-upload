angular.module("uploadApp")
.controller("settingsController", function ($window, $scope, $log, $q, webDAV, Auth) {
    $scope.$log = $log;
    
    $scope.save = function() {
        $scope.updateStatus = "Updating...";
        Auth.store($scope.credentials).then(
            function(value) {
                $scope.updateStatus = "Updated";
            }, function () {
                $scope.updateStatus = "An error occured when updating account information."
            }
        );
    };

    $scope.populate = function() {
        Auth.init().then(function() {
            Auth.retrieve().then(
                function(credentials) {
                    $scope.credentials = credentials;
                }, function(error) {
                    $log.error(error);
                }
            );
        });
    };

    $scope.checkConnection = function() {
        $scope.updateStatus = "Checking...";
    
        var url = $scope.credentials.location;
        var auth = {user: $scope.credentials.username, 
                    pass: $scope.credentials.password};
        console.log(auth)
        webDAV.propfind(url, auth).then(function (response) {
                $scope.updateStatus = response;
            },
            function (error) {
                $scope.updateStatus = error;
            }
        );
    };

    // $scope.populate();
});
