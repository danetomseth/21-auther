app.controller('LoginCtrl', function ($scope, $http, $state, AuthFactory) {
	$scope.loginUser = AuthFactory.loginUser;
});