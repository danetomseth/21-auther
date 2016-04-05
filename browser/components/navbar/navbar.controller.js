app.controller('NavCtrl', function($scope, AuthFactory) {
	$scope.logOut = AuthFactory.logOut;
})