// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('myBox', ['ionic', 'ngCordova', 'myBox.controllers', 'myBox.services', 'angularTreeview'])

.run(function($ionicPlatform, clog, myBoxDB) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    clog.log("$ionicPlatform ready");
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    myBoxDB.open();
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  // By default, views are cached to improve performance.
  // Disable cache globally
  // http://ionicframework.com/docs/api/directive/ionNavView/
  $ionicConfigProvider.views.maxCache(0);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

   /* myBoxes */
  .state('myBoxes', {
    abstract: true,
    //cache: false,
    url: '/myBoxes',
    views: {
      'appContent' :{
        templateUrl: "views/myBoxes/myBoxes.html",
        controller : "myBoxCtrl"
      }
    }
  })
    .state('myBoxes.list', {
      url: '',
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
    abstract: true,
    url: '/myItems',
    views: {
      'appContent' :{
        templateUrl: "views/myItems/myItems.html",
        controller : "myItemsCtrl"
      }
    }
  })
    .state('myItems.list', {
      url: '',
      views: {
        'myItems' :{
          templateUrl: "views/myItems/myItems.list.html"
        }
      }
    })
    .state('myItems.newItem', {
      url: '/newItem',
      views: {
        'myItems' :{
          templateUrl: "views/myItems/myItems.new.html",
          controller : "newItemsCtrl"
        }
      }
    })
    .state('myItems.selectLocation', {
      url: '/selectLocation',
      views: {
        'myItems' :{
          templateUrl: "views/myItems/myItems.selLocal.html",
          controller : "selectLocalCtrl"
        }
      }
    })
    .state('myItems.selectType', {
      url: '/selectType',
      views: {
        'myItems' :{
          templateUrl: "views/myItems/myItems.selType.html",
          controller : "selectTypeCtrl"
        }
      }
    })
    .state('myItems.selectOwner', {
      url: '/selectOwner',
      views: {
        'myItems' :{
          templateUrl: "views/myItems/myItems.selOwner.html",
          controller : "selectOwnerCtrl"
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
  $urlRouterProvider.otherwise('/myBoxes');

});
