tictacpro.controller("mainCtrl", ["$scope", "$firebaseAuth", "activeUsersService", "loginService", "$state", "$interval", function($scope, $firebaseAuth, activeUsersService, loginService, $state, $interval) {

	// GET CURRENT USER
	$firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
	    $scope.user = firebaseUser;
	    $scope.activeUsers = activeUsersService.checkUsers($scope.user.uid, $scope.user.displayName);
  	});

	// CHECK ACTIVE USERS
	$interval(function(){
		$scope.activeUsers = activeUsersService.checkUsers($scope.user.uid, $scope.user.displayName);
	}, 1500);

	// LOGOUT
	$scope.logout = function(){
		loginService.logout().then(function(response){
			if(response){ $state.go('login'); }
		});
	};

}]);