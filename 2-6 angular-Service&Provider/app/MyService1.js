var myServiceApp = angular.module("MyServiceApp", []);
myServiceApp.factory('userListService', ['$http',
    function($http) {
        var doRequest = function(username, path) {
            return $http({
                method: 'GET',
                url: 'users.json'
            });
        }
        return {
            userList: function(username) {
                return doRequest(username, 'userList');
            },
			index:[1,2,3]
        };
    }
]);

myServiceApp.controller('ServiceController', ['$scope', '$timeout', 'userListService',
    function($scope, $timeout, userListService) {
        var timeout;
        $scope.$watch('username', function(newUserName) {
            if (newUserName) {
                if (timeout) {
                    $timeout.cancel(timeout);
                }
                timeout = $timeout(function() {
                    userListService.userList(newUserName)
                        .success(function(data, status) {
                            $scope.users = data;
                        });
                }, 350);
				console.log(userListService.index)
            }
        });
    }
]);

//...