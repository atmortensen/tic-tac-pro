// CONTROLLER
tictacpro.controller('loginCtrl', ['$scope', '$firebaseAuth', 'loginService', '$state', 
	function($scope, $firebaseAuth, loginService, $state){


	// MAKE SURE WE'RE NOT ALREADY LOGGED ON
	$firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
	    $scope.currentUser = firebaseUser;
  	});

	// GET LOGIN MESSAGE 
	$scope.getMessage = function(){
		$scope.loginMessage = loginService.getMessage();
	};

	// LOGIN
	$scope.login = function(email, password){
		loginService.login(email, password).then(function(response){
	  		$scope.getMessage();
	  		var user = $firebaseAuth().$getAuth();
	  		if(user.displayName && response){ $state.go('main'); }
	  		else if(response){ $state.go('setUserName'); }
	  	});
	};

	// GUEST LOGIN
	$scope.guestLogin = function(){
		loginService.guestLogin().then(function(response){
	  		$scope.getMessage();
	  		var user = $firebaseAuth().$getAuth();
	  		if(user.displayName && response){ $state.go('main'); }
	  		else if(response){ $state.go('setUserName'); }
	  	});
	};

	// CREATE USER
	$scope.createAccount = function(email, password){
		loginService.createAccount(email, password).then(function(response){
	  		$scope.getMessage();
	  		var user = $firebaseAuth().$getAuth();
	  		if(user.displayName && response){ $state.go('main'); }
	  		else if(response){ $state.go('setUserName'); }
	  	});
	};

	// FORGOT PASSWORD
	$scope.forgotPassword = function(email){
		loginService.forgotPassword(email).then(function(response){
	  		$scope.getMessage();
	  	});
	};

	// SET USERNAME 
	$scope.setUsername = function(user, name){
		loginService.setUsername(user, name).then(function(response){
	  		$scope.getMessage();
	  		var user = $firebaseAuth().$getAuth();
	  		if(user.displayName && response){ $state.go('main'); }
	  	});
	};


}]);