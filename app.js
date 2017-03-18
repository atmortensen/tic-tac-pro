// MODULE
var tictacpro = angular.module('tictacpro', ['ui.router', 'firebase']);

// ROUTES
tictacpro.config(['$stateProvider', '$urlRouterProvider', 
    function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('mainTemplate',{
            templateUrl: "views/mainTemplate.html"
        })
        .state('login',{
            url:'/login',
            templateUrl: "views/login.html",
            controller: 'loginCtrl',
            parent: 'mainTemplate'
        })
        .state('forgotPassword',{
            url:'/forgotPassword',
            templateUrl: "views/forgotPassword.html",
            controller: 'loginCtrl',
            parent: 'mainTemplate'
        })
        .state('createAccount',{
            url:'/createAccount',
            templateUrl: "views/createAccount.html",
            controller: 'loginCtrl',
            parent: 'mainTemplate'
        })
        .state('setUserName',{
            url:'/setUserName',
            templateUrl: "views/setUserName.html",
            controller: 'loginCtrl',
            parent: 'mainTemplate'
        })
        .state('emailSuccess',{
            url:'/emailSuccess',
            templateUrl: "views/emailSuccess.html",
            controller: 'loginCtrl',
            parent: 'mainTemplate'
        })
        .state('linkAccount',{
            url:'/linkAccount',
            templateUrl: "views/linkAccount.html",
            controller: 'loginCtrl',
            parent: 'mainTemplate'
        })
        .state('main',{
            url:'/',
            templateUrl: "views/main.html",
            controller: 'mainCtrl',
            parent: 'mainTemplate',
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

