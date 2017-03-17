tictacpro.controller("mainCtrl", ["user", "$scope", "loginService", "$state", function(user, $scope, loginService, $state) {
  $scope.user = user;

  // GET LOGIN MESSAGE 
  $scope.getMessage = function(){
  	$scope.loginMessage = loginService.getMessage();
  };

  // LOGOUT
  $scope.logout = function(){
  	loginService.logout().then(function(){
  		$scope.getMessage();
  		$state.go('login');
  	});
  };

}]);