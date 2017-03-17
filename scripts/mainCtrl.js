tictacpro.controller("mainCtrl", ["$scope", "loginService", "user", "$state", 
	function($scope, loginService, user, $state) {

	$scope.user = user;

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