angular.module('myBox.controllers', [])

.controller('DashCtrl', function($scope, myBoxDB) {
    $scope.initData = function(){
      myBoxDB.initData();
    }
  })
  .controller('appController', function($scope, $ionicSideMenuDelegate, myBoxDB) {
    $scope.menus = [
      {name: "我的物品", href: "/myItems", icon: "ion-filing"},
      {name: "我的房间", href: "/myHouse", icon: "ion-home"},
      {name: "我的收纳本组", href: "/myBoxes/list", icon: "ion-ios-box"}
    ];

    $scope.initData = function(){
      myBoxDB.initData();
    }
  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
