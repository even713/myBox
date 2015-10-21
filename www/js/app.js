// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('myBox', ['ionic', 'myBox.controllers', 'myBox.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

   /* myBoxes */
  .state('myBoxes', {
    abstract: true,
    url: '/myBoxes',
    views: {
      'appContent' :{
        templateUrl: "views/myBoxes/myBoxes.html",
        controller : "myBoxCtrl"
      }
    }
  })
    .state('myBoxes.list', {
      url: '/list',
      views: {
        'myBoxes' :{
          templateUrl: "views/myBoxes/myBoxes.list.html"
        }
      }
    })

    .state('myBoxes.newBox', {
      url: '/newBox',
      views: {
        'myBoxes' :{
          templateUrl: "views/myBoxes/newBoxes.html"
        }
      }
    })
    .state('myBoxes.roomsType', {
      url: '/roomsType',
      views: {
        'myBoxes' :{
          templateUrl: "views/myBoxes/myBoxes.roomsType.html",
          controller: "myBoxesRoomsTypeCtrl"
        }
      }
    })

  /* My Items */
  .state('myItems', {
    url: '/myItems',
    views: {
      'appContent' :{
        templateUrl: "views/myItems/myItems.html",
        controller : "myItemsCtrl"
      }
    }
  })

  /* My Houses*/
  .state('myHouse', {
    url: '/myHouse',
    views: {
      'appContent' :{
        templateUrl: "views/myHouse/myHouse.html",
        controller : "myHouseCtrl"
      }
    }
  })

  ;

  // Each tab has its own nav history stack:

  //.state('tab.dash', {
  //  url: '/dash',
  //  views: {
  //    'tab-dash': {
  //      templateUrl: 'templates/tab-dash.html',
  //      controller: 'DashCtrl'
  //    }
  //  }
  //})
  //
  //.state('tab.chats', {
  //    url: '/chats',
  //    views: {
  //      'tab-chats': {
  //        templateUrl: 'templates/tab-chats.html',
  //        controller: 'ChatsCtrl'
  //      }
  //    }
  //  })
  //  .state('tab.chat-detail', {
  //    url: '/chats/:chatId',
  //    views: {
  //      'tab-chats': {
  //        templateUrl: 'templates/chat-detail.html',
  //        controller: 'ChatDetailCtrl'
  //      }
  //    }
  //  })
  //
  //.state('tab.account', {
  //  url: '/account',
  //  views: {
  //    'tab-account': {
  //      templateUrl: 'templates/tab-account.html',
  //      controller: 'AccountCtrl'
  //    }
  //  }
  //});

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/myBoxes/list');

});
