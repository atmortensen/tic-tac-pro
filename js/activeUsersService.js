tictacpro.service('activeUsersService', ['$firebaseArray', 
	function($firebaseArray){

	var activeUsersRef = firebase.database().ref().child("activeUsers").orderByChild('userName');
	var activeUsers = $firebaseArray(activeUsersRef);
	this.checkUsers = function(uid, userName){
	    var now = new Date().getTime();
	    var updated = false;
	    for(var i=0; i<activeUsers.length; i++){
	    	if(activeUsers[i].uid === uid && !updated){
	    		activeUsers[i].timeStamp = now;
	    		activeUsers[i].userName = userName;
	    		activeUsers.$save(activeUsers[i]);
	    		updated = true;
	    	}
	    	if(activeUsers[i].timeStamp < now-3000){
	    		activeUsers.$remove(activeUsers[i]);
	    	}
	    }
	    if(!updated){
	    	activeUsers.$add({
		    	uid: uid,
		    	userName: userName,
		    	timeStamp: now
	    	});
	    }
	    return activeUsers;
	}

}]);
