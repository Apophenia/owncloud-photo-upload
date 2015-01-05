angular.module("uploadApp")
.controller("settingsController", function ($window, $scope, $log, $q, webDAV, Auth) {

    $scope.checkConnection = function() {
        $scope.updateStatus = "Checking...";
    
        if (!$scope.credentials) {
            $scope.updateStatus = "Account information missing";
        }
        else {
            var url = $scope.credentials.location;
            var auth = {user: $scope.credentials.username, 
                       pass: $scope.credentials.password};

            webDAV.check(url, auth).then(function (response) {
                  $scope.updateStatus = "Success!";
              },
              function (error) {
                console.log(error);
                $scope.updateStatus = "Error";
            });
        }
    };
    
    $scope.save = function() {
        console.log($scope.credentials);
        Auth.store($scope.credentials).then(
            function(value) {
                console.log(value);
            }, function (error) {
                console.log(error);
            }
        );
    };
    
    Auth.retrieve().then(
        function(credentials) {
            console.log(credentials);
            $scope.credentials = credentials;
        }, function(error) {
            console.log(error);
            $log.error(error);
        }
    );
});
