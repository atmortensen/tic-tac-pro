tictacpro.controller("mainCtrl", ["$scope", "$firebaseAuth", "activeUsersService", "loginService", "$state", "$interval", function($scope, $firebaseAuth, activeUsersService, loginService, $state, $interval) {

	// GET CURRENT USER
	$firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
	    $scope.currentUser = firebaseUser;
  	});

	// CHECK ACTIVE USERS
	$interval(function(){
		$scope.activeUsers = activeUsersService.checkUsers($scope.currentUser.uid, $scope.currentUser.displayName);
	}, 1500);

	// LOGOUT
	$scope.logout = function(){
		loginService.logout().then(function(response){
			if(response){ $state.go('login'); }
		});
	};

}]);