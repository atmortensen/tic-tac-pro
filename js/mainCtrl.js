tictacpro.controller("mainCtrl", ["$scope", "$firebaseAuth", "activeUsersService", "loginService", "$state", "$interval", "challengesService", function($scope, $firebaseAuth, activeUsersService, loginService, $state, $interval, challengesService) {

	// GET CURRENT USER
	$firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
	    $scope.currentUser = firebaseUser;
  	});

	$scope.myChallenges = [];
	$interval(function(){
		// CHECK ACTIVE USERS
		$scope.activeUsers = activeUsersService.checkUsers($scope.currentUser.uid, $scope.currentUser.displayName);

		var prevLength = $scope.myChallenges.length;
		// FIND MY CHALLENGES
		$scope.myChallenges = challengesService.findChallenges($scope.currentUser, $scope.activeUsers);
	    // SCROLL TO BOTTOM ON NEW ITEMS
	    var messageCenter = document.getElementById("messageCenter");
	    if(messageCenter && (prevLength!==$scope.myChallenges.length || prevLength===0)){
	    	setTimeout(function(){
	    		messageCenter.scrollTop = 500;
	    	}, 100)
	    }
	}, 1500);

	// MAKE NEW CHALLENGE
	$scope.newChallenge = function(currentUser, challengedUser){
		challengesService.makeChallenge(currentUser, challengedUser);
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

}]);