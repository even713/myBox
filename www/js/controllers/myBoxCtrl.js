/**
 * Created by Cara on 2015/10/5.
 */
angular.module('myBox.controllers')
.controller('myBoxCtrl', function($scope, myBoxDB){
    myBoxDB.queryRooms(function(rooms) {
      if(rooms.rows.length == 0) {
        console.log("no room yet");
      } else {
        console.log(["rooms records:", rooms.rows.length, rooms.rows]);
      }
      $scope.rooms = [];
      for(var i = 0; i < rooms.rows.length; i++) {
        $scope.rooms.push({roomId: rooms.rows[i].roomId, roomName: rooms.rows[i].roomName, isDefault: rooms.rows[i].isDefault});
      }
    });

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
      for(var i = 0; i < roomsTypes.rows.length; i++) {
        $scope.roomsTypes.push({typeId: roomsTypes.rows[i].typeId, typesName: roomsTypes.rows[i].typesName});
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
