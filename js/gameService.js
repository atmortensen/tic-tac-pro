tictacpro.service('gameService', ['$firebaseArray', 'challengesService', 
	function($firebaseArray, challengesService){

	var challenges = challengesService.challenges;
	var self = this;
	this.freeze = false;
	var stats = challengesService.stats;


	this.getMove = function(currentGame){
		if(currentGame){
			return currentGame.game.reduce(function(a, b){
				if(b){
					return a+1;
				} else {
					return a;
				}
			}, 0);
		} else {
			return null;
		}
		
	}

	this.squareClick = function(currentGame, square, XorO, currentUser){
		var move = currentGame.game.reduce(function(a, b){
			if(b){
				return a+1;
			} else {
				return a;
			}
		}, 0);
		if((XorO==='X' && move%2===0) || (XorO==='O' && move%2===1)){
			if(!currentGame.game[square]){
				currentGame.game[square] = XorO;
				challenges.$save(currentGame);
				var g = currentGame.game;
				if((g[0]===XorO && g[1]===XorO && g[2]===XorO && g[3]===XorO) || 
					(g[4]===XorO && g[5]===XorO && g[6]===XorO && g[7]===XorO) ||
					(g[8]===XorO && g[9]===XorO && g[10]===XorO && g[11]===XorO) ||
					(g[12]===XorO && g[13]===XorO && g[14]===XorO && g[15]===XorO) ||
					(g[0]===XorO && g[4]===XorO && g[8]===XorO && g[12]===XorO) ||
					(g[1]===XorO && g[5]===XorO && g[9]===XorO && g[13]===XorO) ||
					(g[2]===XorO && g[6]===XorO && g[10]===XorO && g[14]===XorO) ||
					(g[3]===XorO && g[7]===XorO && g[11]===XorO && g[15]===XorO) ||
					(g[0]===XorO && g[5]===XorO && g[10]===XorO && g[15]===XorO) ||
					(g[3]===XorO && g[6]===XorO && g[9]===XorO && g[12]===XorO)){
					self.freeze = true;
					if(XorO==='X'){
						var opponent = currentGame.playerO.uid;
					} else{
						var opponent = currentGame.playerX.uid;
					}
					var savedWinner = false;
					var savedLooser = false;
					stats.forEach(stat => {
						if(stat.uid===currentUser.uid){
							stat.wins++;
							stats.$save(stat);
							savedWinner = true;
						}
						if(stat.uid===opponent){
							stat.losses++;
							stats.$save(stat).catch(e => console.log(e));
							savedLooser = true;
						}
					});
					if(!savedWinner){
						stats.$add({
							uid: currentUser.uid,
							losses: 0,
							wins: 1
						})
					}
					if(!savedLooser){
						stats.$add({
							uid: opponent,
							losses: 1,
							wins: 0
						}).catch(e => console.log(e));
					}
					currentGame.wonBy = currentUser.displayName;
					challenges.$save(currentGame);
				} else if(move===15){
					currentGame.wonBy = 'Tie'
					challenges.$save(currentGame);
				}
			}
		}
	}

}]);
