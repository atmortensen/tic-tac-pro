tictacpro.service('gameService', ['$firebaseArray', 'challengesService', 
	function($firebaseArray, challengesService){

	var challenges = challengesService.challenges;

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

	this.squareClick = function(currentGame, square, XorO){
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
					(g[3]===XorO && g[7]===XorO && g[9]===XorO && g[12]===XorO)){
					console.log('won');
				} else if(move===15){
					console.log('tie');
				}
			}
		}
	}

}]);
