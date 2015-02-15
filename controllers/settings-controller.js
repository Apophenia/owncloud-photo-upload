angular.module("uploadApp")
.controller("settingsController", 
  function ($window, $scope, $log, $q, $location, webDAV, Auth) {

    $scope.checkConnection = function() {
        $scope.updateStatus = "Checking...";
    
        if (!$scope.credentials) {
            $scope.updateStatus = "Account information missing";
        }
        else {
            var url = $scope.credentials.address;
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
        Auth.store($scope.credentials).then(
            function(value) {
                // use routing 'resolve' to make code cleaner
                $location.path("#");
            }, function (error) {
                console.log(error);
            }
        );
    };
    
    Auth.retrieve().then(
        function(credentials) {
            $scope.credentials = credentials;
        }, function(error) {
            console.log(error);
            $log.error(error);
        }
    );
});
