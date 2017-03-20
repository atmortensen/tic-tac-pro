tictacpro.controller("mainCtrl", ["$scope", "$firebaseAuth", "activeUsersService", "loginService", "$state", "$interval", "challengesService", "gameService", function($scope, $firebaseAuth, activeUsersService, loginService, $state, $interval, challengesService, gameService) {

	// GET CURRENT USER
	$firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
	    $scope.currentUser = firebaseUser;
  	});

	// 1 SECOND UPDATER
	$scope.myChallenges = [];
	$interval(function(){
		var prevLength = $scope.myChallenges.length;
		// CHECK ACTIVE USERS
		$scope.activeUsers = activeUsersService.checkUsers($scope.currentUser.uid, $scope.currentUser.displayName);
		
		// FIND MY CHALLENGES
		$scope.myChallenges = challengesService.findChallenges($scope.currentUser, $scope.activeUsers);
	    
	    // SCROLL TO BOTTOM ON NEW ITEMS
	    var messageCenter = document.getElementById("messageCenter");
	    if(messageCenter && (prevLength!==$scope.myChallenges.length || prevLength===0)){
	    	setTimeout(function(){
	    		messageCenter.scrollTop = 10000000;
	    	}, 100)
	    }

	    // GET GAME IF OPONENT ACCEPTED
	    if(!gameService.freeze){
	    	$scope.currentGame = challengesService.getGame($scope.currentUser, $scope.currentGame);
	    }
	    
	    // CHECK IF I'M X OR O
	    if($scope.currentGame){
	    	if($scope.currentGame.playerX.uid===$scope.currentUser.uid){
	    		$scope.XorO = 'X';
	    		$scope.opponent = {
	    			userName: $scope.currentGame.playerO.userName,
	    			XorO: 'O'
	    		}
	    	} else {
	    		$scope.XorO = 'O';
	    		$scope.opponent = $scope.opponent = {
	    			userName: $scope.currentGame.playerX.userName,
	    			XorO: 'X'
	    		}
	    	}
	    }

	    // GET MOVE #
	    $scope.move = gameService.getMove($scope.currentGame);

	}, 1500);

	// MAKE NEW CHALLENGE
	$scope.newChallenge = function(currentUser, challengedUser){
		if($scope.currentGame){
			alert('You must finish the current game to challenge someone!');
		} else{
			challengesService.makeChallenge(currentUser, challengedUser);
		}
		
	}

	// LOGOUT
	$scope.logout = function(){
		loginService.logout().then(function(response){
			if(response){ 
				$state.go('login'); 
				location.reload();
			}
		});
	};

	// ACCEPT CHALLENGE
	$scope.acceptChallenge = function(challenge){
		$scope.currentGame = challengesService.acceptChallenge(challenge);
		$scope.move = 0;
	}

	// FORFEIT GAME
	$scope.forfeit = function(currentGame){
		challengesService.forfeit(currentGame, $scope.currentUser);
		$scope.currentGame = null;
	}

	// SQUARE CLICK 
	$scope.squareClick = function(square){
		if(!$scope.currentGame.wonBy){
			gameService.squareClick($scope.currentGame, square, $scope.XorO, $scope.currentUser);
		}
	}

	$scope.endGame = function(){
		gameService.freeze = false;
		challengesService.endGame($scope.currentGame, $scope.currentUser);
	}

}]);