tictacpro.controller("firebaseCtrl", ["$rootScope", '$firebaseAuth',
  function($rootScope, $firebaseAuth) {

  $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
    $rootScope.firebaseUser = firebaseUser;
  });

}]);