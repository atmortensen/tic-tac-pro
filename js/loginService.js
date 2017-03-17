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
			deferred.resolve(false);
		} else{
			$firebaseAuth().$signInWithEmailAndPassword(email, password)
			.then(() => deferred.resolve(true))
			.catch(function(error) {
	        	loginMessage = error.message;
	        	deferred.resolve(false);
	      	});
		}
		return deferred.promise;
	};

	// CREATE ACCOUNT
	this.createAccount = function(email, password){
		var deferred = $q.defer();
		if(!email || !password){
			loginMessage = 'Invalid email or password!';
			deferred.resolve(false);
		} else{
			$firebaseAuth().$createUserWithEmailAndPassword(email, password)
			.then(() => deferred.resolve(true))
			.catch(function(error) {
	        	loginMessage = error.message;
	        	deferred.resolve(false);
	      	});
		}
		return deferred.promise;
	};

	// LOGOUT
	this.logout = function(){
		var deferred = $q.defer();
		$firebaseAuth().$signOut()
		.then(() => deferred.resolve(true))
		.catch(function(error) {
        	loginMessage = error.message;
        	deferred.resolve(false);
      	});
		return deferred.promise;
	};

	// GUEST LOGIN
	this.guestLogin = function(){
		var deferred = $q.defer();
		$firebaseAuth().$signInAnonymously()
		.then(() => deferred.resolve(true))
		.catch(function(error) {
        	loginMessage = error.message;
        	deferred.resolve(false);
      	});
		return deferred.promise;
	};

	// RESET PASSWORD
	this.forgotPassword = function(email){
		var deferred = $q.defer();
		if(!email){
			loginMessage = 'Invalid email!';
			deferred.resolve(false);
		} else{
			$firebaseAuth().$sendPasswordResetEmail(email)
			.then(() => {
				loginMessage = 'Reset email sent successfully.'
				deferred.resolve(true)
			})
			.catch(function(error) {
	        	loginMessage = error.message;
	        	deferred.resolve(false);
	      	});
		}
		return deferred.promise;
	};


	
	// var firbaseDB = firebase.database().ref();
	// console.log($firebaseObject(firbaseDB));

}]);