tictacpro.controller("mainCtrl", ["$scope", "loginService", "$state", function($scope, loginService, $state) {

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