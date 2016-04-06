'use strict';

var app = angular.module('auther', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
	$urlRouterProvider.when('/auth/:provider', function () {
    	window.location.reload();
	});
});




app.run(function ($rootScope, $http, AuthFactory) {
	AuthFactory.getUser().then(function(res) {
		if(res.data === null) {
			$rootScope.currentUser = null;
			//$rootScope.isAdmin = false;
		}
		else {
			$rootScope.currentUser = res.data;
			//$rootScope.isAdmin = true;
			$rootScope.isAdmin = res.data.isAdmin;
			//app.value('loginUser', res.data)
			console.log('app run user:', res.data)
		}
	})
    // $rootScope.on('$stateChangeStart', function (event) {
    //     console.log('...changing state...');
    // });
});