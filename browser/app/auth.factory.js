app.factory('AuthFactory', function($http, $state) {
    return {
        signUp: function(user) {
            //var user = $scope.signUpData;
            console.log('user', user);
            $http.post('/api/users', user).then(function(resp) {
                console.log(resp);
                $state.go('stories')
            })

        },

        loginUser: function(data) {
        	console.log(data);
            console.log('form data', data);
            $http.post('/login', data).then(function() {
                $state.go('stories');
            })
            this.getUser();
        },

        logOut: function() {
        	$http.post('/logout').then(function() {
        		$state.go('home')
        	})
        }, 
        getUser: function() {
        	$http.get('/currentuser').then(function(data) {
        		console.log('currentUser is *&&&&', data);
        	})
        }
    }
});