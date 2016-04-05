
app.controller('SignupCtrl', function($scope, $http, $state, AuthFactory) {
	$scope.signUp = AuthFactory.signUp;
});