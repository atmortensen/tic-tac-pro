// SERVICES
tictacpro.service('loginService', ['$firebaseAuth', '$q', function($firebaseAuth, $q){
	
	// SEND LOGIN MESSAGE TO CONTROLLER
	var loginMessage = '';
	this.getMessage = function(){
		return loginMessage;
	};

	// LOGIN
	this.login = function(email, password){
		var deferred = $q.defer();
		if(!email || !password){
			loginMessage = 'Invalid email or password!';
			deferred.resolve();
		} else{
			$firebaseAuth().$signInWithEmailAndPassword(email, password)
			.then(deferred.resolve)
			.catch(function(error) {
	        	loginMessage = error.message;
	        	deferred.resolve();
	      	});
		}
		return deferred.promise;
	};

	// CREATE ACCOUNT
	this.createAccount = function(email, password){
		var deferred = $q.defer();
		if(!email || !password){
			loginMessage = 'Invalid email or password!';
			deferred.resolve();
		} else{
			$firebaseAuth().$createUserWithEmailAndPassword(email, password)
			.then(deferred.resolve)
			.catch(function(error) {
	        	loginMessage = error.message;
	        	deferred.resolve();
	      	});
		}
		return deferred.promise;
	};

	// LOGOUT
	this.logout = function(){
		var deferred = $q.defer();
		$firebaseAuth().$signOut()
		.then(deferred.resolve)
		.catch(function(error) {
        	loginMessage = error.message;
        	deferred.resolve();
      	});
		return deferred.promise;
	};

	// GUEST LOGIN
	this.guestLogin = function(){
		var deferred = $q.defer();
		$firebaseAuth().$signInAnonymously()
		.then(deferred.resolve)
		.catch(function(error) {
        	loginMessage = error.message;
        	deferred.resolve();
      	});
		return deferred.promise;
	};

	// RESET PASSWORD
	this.forgotPassword = function(email){
		var deferred = $q.defer();
		if(!email){
			loginMessage = 'Invalid email!';
			deferred.resolve();
		} else{
			$firebaseAuth().$sendPasswordResetEmail(email)
			.then(deferred.resolve)
			.catch(function(error) {
	        	loginMessage = error.message;
	        	deferred.resolve();
	      	});
		}
		return deferred.promise;
	};


	
	// var firbaseDB = firebase.database().ref();
	// console.log($firebaseObject(firbaseDB));

}]);