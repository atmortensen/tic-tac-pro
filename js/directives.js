// DIRECTIVES
tictacpro.directive('userList', function(){
	return {
		templateUrl: '../directives/userList.html',
		replace: true,
		scope: {
			activeUsers: "=",
			currentUser: "="
		}
	}
});