'use strict';

app.controller('UserListCtrl', function ($scope, $rootScope, users, User, AuthFactory) {
	console.log('login user:', $rootScope.currentUser)
	$scope.users = users;
	$scope.currentUser = $rootScope.currentUser
	$scope.isAdmin = $rootScope.isAdmin;
	// AuthFactory.getUser().then(function(res) {
	// 	if(res.data === null) {
	// 		$scope.currentUser = null;
	// 		$scope.isAdmin = false;
	// 	}
	// 	else {
	// 		$scope.currentUser = res.data;
	// 		$scope.isAdmin = res.data.isAdmin;
	// 	}
	// })
	$scope.addUser = function () {
		$scope.userAdd.save()
		.then(function (user) {
			$scope.userAdd = new User();
			$scope.users.unshift(user);
		});
	};
	
	$scope.userSearch = new User();

	$scope.userAdd = new User();
});