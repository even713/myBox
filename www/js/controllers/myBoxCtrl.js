/**
 * Created by Cara on 2015/10/5.
 */
angular.module('myBox.controllers')
.controller('myBoxCtrl', function($scope, myBoxDB, clog){

    //$scope.myinit = function () {
      clog.log("myBoxctrl");
      myBoxDB.queryRooms(function(rooms) {
        if(rooms.rows.length == 0) {
          console.log("no room yet");
        } else {
          console.log(["rooms records:", rooms.rows.length, rooms.rows]);
        }
        $scope.rooms = [];
        for(var i = 0; i < rooms.rows.length; i++) {
          $scope.rooms.push({roomId: rooms.rows.item(i).roomId, roomName: rooms.rows.item(i).roomName, isDefault: rooms.rows.item(i).isDefault});
        }
      });
    //};

    // default form value for setup new house
    $scope.new = {
      roomName: '',
      roomType: 0
    };

    $scope.newBox = function(){
      window.location.hash = "#/myBoxes/newBox";
    };

    $scope.gotoRoomsType = function(){
      window.location.hash = "#/myBoxes/roomsType";
    };
})
  .controller('myBoxesRoomsTypeCtrl', function($scope, myBoxDB){
    myBoxDB.queryRoomsTypes(function(roomsTypes) {
      if(roomsTypes.rows.length == 0) {
        console.log("no room yet");
      } else {
        console.log(["rooms records:", roomsTypes.rows.length, roomsTypes.rows]);
      }
      $scope.roomsTypes = [];
      /*for(var tt in roomsTypes.rows) {
        console.log([tt, roomsTypes.rows[tt]]);
        for(var c in roomsTypes.rows[tt]) {
          console.log([c, roomsTypes.rows[tt][c]]);
        }
      }*/
      for(var i = 0; i < roomsTypes.rows.length; i++) {
        /*console.log([i, roomsTypes.rows[i]]);
        for(var t in roomsTypes.rows[i]){
          console.log([t, roomsTypes.rows[i][t]]);
        }*/
        $scope.roomsTypes.push({typeId: roomsTypes.rows.item(i).typeId, typesName: roomsTypes.rows.item(i).typesName});
      }
      console.log($scope.roomsTypes);
    });

    $scope.createBox = function(){
      console.log( $scope.new);
      myBoxDB.createRoom($scope.new.roomName, $scope.new.roomType);
    };
  })
/*.controller('myBoxListCtrl', function($scope, myBoxDB){

})*/
;
