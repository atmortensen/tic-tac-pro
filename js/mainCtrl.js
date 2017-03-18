tictacpro.controller("mainCtrl", ["$scope", "$firebaseAuth", "loginService", "user", "$state", 
	function($scope, $firebaseAuth, loginService, user, $state) {

	$firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
	    $scope.user = firebaseUser;
  	});

	// GET LOGIN MESSAGE 
	$scope.getMessage = function(){
		$scope.loginMessage = loginService.getMessage();
	};

	// LOGOUT
	$scope.logout = function(){
		loginService.logout().then(function(response){
			$scope.getMessage();
			if(response){ $state.go('login'); }
		});
	};

}]);