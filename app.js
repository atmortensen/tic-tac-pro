// MODULE
var tictacpro = angular.module('tictacpro', ['ui.router', 'firebase']);

// ROUTES
tictacpro.config(['$stateProvider', '$urlRouterProvider', 
    function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('loginParent',{
            templateUrl: "views/loginParent.html"
        })
        .state('login',{
            url:'/login',
            templateUrl: "views/login.html",
            controller: 'loginCtrl',
            parent: 'loginParent'
        })
        .state('forgotPassword',{
            url:'/forgotPassword',
            templateUrl: "views/forgotPassword.html",
            controller: 'loginCtrl',
            parent: 'loginParent'
        })
        .state('createAccount',{
            url:'/createAccount',
            templateUrl: "views/createAccount.html",
            controller: 'loginCtrl',
            parent: 'loginParent'
        })
        .state('setUserName',{
            url:'/setUserName',
            templateUrl: "views/setUserName.html",
            controller: 'loginCtrl',
            parent: 'loginParent'
        })
        .state('emailSuccess',{
            url:'/emailSuccess',
            templateUrl: "views/emailSuccess.html",
            controller: 'loginCtrl',
            parent: 'loginParent'
        })
        .state('linkAccount',{
            url:'/linkAccount',
            templateUrl: "views/linkAccount.html",
            controller: 'loginCtrl',
            parent: 'loginParent'
        })
        .state('main',{
            url:'/',
            templateUrl: "views/main.html",
            controller: 'mainCtrl',
            resolve: {
                // FACTORY - MUST BE IN QUOTES TO PREVENT MINIFICATION
                "user": ['$firebaseAuth', function($firebaseAuth) {
                    // RUN BLOCK REDIRECTS IF PROMISE RETURNS AN ERROR
                    return $firebaseAuth().$requireSignIn();
                }]
            }
        })

    $urlRouterProvider.otherwise('/');
}]);

// NOT LOGGED IN REDIRECT
tictacpro.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    if (error === "AUTH_REQUIRED") {
      $state.go("login");
    }
  });
  
}]);

