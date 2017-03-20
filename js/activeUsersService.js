tictacpro.service('activeUsersService', ['$firebaseArray', 
	function($firebaseArray){

	var activeUsersRef = firebase.database().ref().child("activeUsers").orderByChild('userName');
	var activeUsers = $firebaseArray(activeUsersRef);
	this.activeUsers = activeUsers;

	this.checkUsers = function(uid, userName){
	    var now = new Date().getTime();
	    var updated = false;
	    for(var i=0; i<activeUsers.length; i++){
	    	if(activeUsers[i].uid === uid && !updated){
	    		activeUsers[i].timeStamp = now;
	    		activeUsers[i].userName = userName;
	    		activeUsers.$save(activeUsers[i]).catch(e => console.log(e));
	    		updated = true;
	    	}
	    	if(activeUsers[i].timeStamp < now-60000){
	    		activeUsers.$remove(activeUsers[i]).catch(e => console.log(e));
	    	}
	    }
	    if(!updated){
	    	activeUsers.$add({
		    	uid: uid,
		    	userName: userName,
		    	timeStamp: now,
		    	inGame: false
	    	}).catch(e => console.log(e));
	    }
	    return activeUsers;
	}


}]);
