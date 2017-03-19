// DIRECTIVES
tictacpro.directive('userList', function(){
	return {
		templateUrl: '../directives/userList.html',
		replace: true
	}
});

tictacpro.directive('game', function(){
	return {
		templateUrl: '../directives/game.html',
		replace: true
	}
});

tictacpro.directive('messageCenter', function(){
	return {
		templateUrl: '../directives/messageCenter.html',
		replace: true
	}
});