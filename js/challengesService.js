tictacpro.service('challengesService', ['$firebaseArray', 'activeUsersService', 
	function($firebaseArray, activeUsersService){

	var challengesRef = firebase.database().ref().child("challenges");
	var challenges = $firebaseArray(challengesRef);
	var activeUsers = activeUsersService.activeUsers;
	this.challenges = challenges;
	this.activeUsers = activeUsers;
	var statsRef = firebase.database().ref().child("stats");
	this.stats = $firebaseArray(statsRef);

	this.findChallenges = function(currentUser, activeUsersLocal){
		var now = new Date().getTime();
	    var myChallenges = [];
	    for(var i=0; i<challenges.length; i++){
	    	// IF IT'S A CHALLENGE YOU RECIEVED
	    	if(challenges[i].playerO.uid === currentUser.uid){
	    		// CHECK IF USER IS LOGGED IN
	    		challenges[i].challengerAvailable = false;
	    		activeUsersLocal.forEach(thisUser => {
	    			if(thisUser.uid === challenges[i].playerX.uid && !thisUser.inGame){
	    				challenges[i].challengerAvailable = true;
	    			}
	    		});
	    		myChallenges.push(challenges[i]);
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
	    	finished: false,
	    	forfeitedBy: '',
	    	wonBy: '',
	    	game: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    	}).catch(e => console.log(e));
	}

	this.acceptChallenge = function(challenge){
		challenge.started = true;
		challenges.$save(challenge);
		activeUsers.forEach(user => {
			if(user.uid === challenge.playerO.uid){
				user.inGame = true;
				activeUsers.$save(user).catch(e => console.log(e));
			}
			if(user.uid === challenge.playerX.uid){
				user.inGame = true;
				activeUsers.$save(user).catch(e => console.log(e));
			}
		});
		return challenge;
	}

	this.getGame = function(currentUser, currentGame){
		if(!currentGame){
			activeUsers.forEach(user => {
				if(currentUser.uid===user.uid){
					user.inGame = false;
					activeUsers.$save(user).catch(e => console.log(e));
				}
			})
			currentUser.inGame = false;
			activeUsers.$save(currentUser);
		}
		var currentGame = null;
		challenges.forEach(challenge => {
			if(challenge.started && !challenge.finished && 
				(challenge.playerX.uid===currentUser.uid || challenge.playerO.uid===currentUser.uid)){
				currentGame=challenge;
				activeUsers.forEach(user => {
					if(user.uid === challenge.playerO.uid){
						user.inGame = true;
						activeUsers.$save(user).catch(e => console.log(e));
					}
					if(user.uid === challenge.playerX.uid){
						user.inGame = true;
						activeUsers.$save(user).catch(e => console.log(e));
					}
				});
			}
		});
		return currentGame;
	}

	this.forfeit = function(currentGame, currentUser, XorO){
		currentGame.finished = true;
		currentGame.forfeitedBy = currentUser.displayName;
		challenges.$save(currentGame);
		activeUsers.forEach(user =>{
			if(user.uid===currentGame.playerO.uid || user.uid===currentGame.playerX.uid){
				user.inGame = false;
				activeUsers.$save(user).catch(e => console.log(e));
			}
		});
		if(XorO==='X'){
			var opponent = currentGame.playerO.uid;
		} else{
			var opponent = currentGame.playerX.uid;
		}
		var savedWinner = false;
		var savedLooser = false;
		this.stats.forEach(stat => {
			if(stat.uid===currentUser.uid){
				stat.losses++;
				this.stats.$save(stat);
				savedWinner = true;
			}
			if(stat.uid===opponent){
				stat.wins++;
				this.stats.$save(stat).catch(e => console.log(e));
				savedLooser = true;
			}
		});
		if(!savedWinner){
			this.stats.$add({
				uid: currentUser.uid,
				losses: 1,
				wins: 0
			})
		}
		if(!savedLooser){
			this.stats.$add({
				uid: opponent,
				losses: 0,
				wins: 1
			}).catch(e => console.log(e));
		}
	}

	this.endGame = function(currentGame, currentUser){
		currentGame.finished = true;
		challenges.$save(currentGame);
		activeUsers.forEach(user =>{
			if(user.uid===currentGame.playerO.uid || user.uid===currentGame.playerX.uid){
				user.inGame = false;
				activeUsers.$save(user).catch(e => console.log(e));
			}
		})
	}


}]);
