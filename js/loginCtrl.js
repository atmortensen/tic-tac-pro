// CONTROLLER
tictacpro.controller('loginCtrl', ['$scope', 'loginService', '$state', function($scope, loginService, $state){

	// GET LOGIN MESSAGE 
	$scope.getMessage = function(){
		$scope.loginMessage = loginService.getMessage();
	};

	// LOGIN
	$scope.login = function(email, password){
		loginService.login(email, password).then(function(response){
	  		$scope.getMessage();
	  		if(response){ $state.go('main'); }
	  	});
	};

	// GUEST LOGIN
	$scope.guestLogin = function(){
		loginService.guestLogin().then(function(response){
	  		$scope.getMessage();
	  		if(response){ $state.go('main'); }
	  	});
	};

	// CREATE USER
	$scope.createAccount = function(usename, password){
		loginService.createAccount(usename, password).then(function(response){
	  		$scope.getMessage();
	  		if(response){ $state.go('main'); }
	  	});
	};

	// FORGOT PASSWORD
	$scope.forgotPassword = function(email){
		loginService.forgotPassword(email).then(function(response){
	  		$scope.getMessage();
	  	});
	};


}]);