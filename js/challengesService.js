tictacpro.service('challengesService', ['$firebaseArray', 
	function($firebaseArray){

	var challengesRef = firebase.database().ref().child("challenges");
	var challenges = $firebaseArray(challengesRef);
	this.findChallenges = function(currentUser, activeUsers){
		var now = new Date().getTime();
	    var myChallenges = [];
	    for(var i=0; i<challenges.length; i++){
	    	// IF IT'S A CHALLENGE YOU RECIEVED
	    	if(challenges[i].playerO.uid === currentUser.uid){
	    		activeUsers.forEach(thisUser => {
	    			// AND CHALLENGER IS STILL LOGGED IN
	    			if(thisUser.uid === challenges[i].playerX.uid){
	    				myChallenges.push(challenges[i]);
	    			}
	    		});
	    	}
	    	// IF IT'S A CHALLENGE YOU SENT
	    	if(challenges[i].playerX.uid === currentUser.uid){
	    		myChallenges.push(challenges[i]);
	    	}
	    	// DELETE OLD CHALLENGES
	    	if(challenges[i].timeStamp < now-3600000){
	    		challenges.$remove(challenges[i]);
	    	}
	    }
	    return myChallenges;
	}

	this.makeChallenge = function(currentUser, challengedUser){
	    var now = new Date().getTime();
    	challenges.$add({
	    	playerX: {
	    		userName: currentUser.displayName,
	    		uid: currentUser.uid
	    	},
	    	playerO: {
	    		userName: challengedUser.userName,
	    		uid: challengedUser.uid
	    	},
	    	timeStamp: now,
	    	started: false,
	    	game: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    	}).catch(e => console.log(e));
	}

}]);
