/**
 * Created by Cara on 2015/10/5.
 */
angular.module('myBox.controllers')
.controller('myItemsCtrl', function($scope, myBoxDB){
    myBoxDB.queryDefaultRoom(function(rooms){
      if(rooms.rows.length > 0){
        $scope.myRoom = {roomId: rooms.rows.item(0).roomId, roomName: rooms.rows.item(0).roomName, sId: rooms.rows.item(0).sId,
          sNode:rooms.rows.item(0).sNode, roomType: rooms.rows.item(0).roomTypeId};
        $scope.goodForm.localId = $scope.myRoom.sId;
        $scope.goodForm.localName = $scope.myRoom.sNode;
        $scope.goodForm.goodType = rooms.rows.item(0).gTypeName;
        $scope.goodForm.goodTypeId = rooms.rows.item(0).gTypeId;
      } else {
        window.location.hash = "#/myBoxes"; // If there's no room yet, redirect user.
      }
      console.log($scope.myRoom);
    });

    $scope.addItem = function(){
      window.location.hash = "#/myItems/newItem";
    };

    $scope.selectLocation = function(sId, roomTypeId){
      $scope.sId = sId;
      $scope.roomTypeId = roomTypeId;
      window.location.hash = "#/myItems/selectLocation";
    };

    $scope.selectType = function () {
      window.location.hash = "#/myItems/selectType";
    };

    $scope.goodForm = {
      localId: -1,
      localName: null,
      goodTypeId: -1,
      goodType: null
    };
})
  .controller('newItemsCtrl', function($scope, $cordovaImagePicker, $ionicActionSheet, $cordovaCamera){
    $scope.imagesList = [];

    /* for test purpose TODO:*/
    //var testImage = [];
    //testImage.push("img/testPhotos/IMG_20151017_102154.jpg");
    //testImage.push("img/testPhotos/IMG_20151017_102158.jpg");
    //testImage.push("img/testPhotos/IMG_20151017_102203.jpg");
    //$scope.imagesList = $scope.imagesList.concat(testImage);

    $scope.addPhoto = function(){
      $ionicActionSheet.show({
        buttons: [
          { text: '相机' },
          { text: '图库' }
        ],
        //cancelText: '关闭',
        cancel: function() {
          return true;
        },
        buttonClicked: function(index) {
          switch (index){
            case 0:
              appendByCamera();
              break;
            case 1:
              pickImage();
              break;
            default:
              break;
          }
          return true;
        }
      });
    };

    var pickImage = function () {
      var options = {
        maximumImagesCount: 9,
        width: 800,
        height: 800,
        quality: 80
      };

      $cordovaImagePicker.getPictures(options)
        .then(function (results) {

          $scope.imagesList = $scope.imagesList.concat(results);

        }, function (error) {
          // error getting photos
        });

    };

    function appendByCamera(){
      console.log(["appendByCamera", Camera.DestinationType.DATA_URL, Camera.PictureSourceType.CAMERA, Camera.EncodingType.JPEG]);
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };
console.log($cordovaCamera.getPicture);
      $cordovaCamera.getPicture(options).then(function(imageData) {
        var src = "data:image/jpeg;base64," + imageData;
        $scope.imagesList.push(src);
      }, function(err) {
        // error
      });
    }
  })
  .controller('selectLocalCtrl', function($scope, myBoxDB, $state){
    $scope.selectedId = [0, -1, -1]; // the default selected item for each layer

    $scope.changeList = function (layer, sId) {
      $scope.selectedId[layer + 1] = sId;
      if(layer < 1)
        $scope.selectedId[layer + 2] = $scope.roomStructure[sId][0].sId
    };

    $scope.selectLoc = function(sId, sNode){
      $scope.goodForm.localId = sId;
      $scope.goodForm.localName = sNode;
      //$state.go("myItems.newItem");
      myBoxDB.updateDefaultLocal($scope.sId, sId, function(){
        $scope.sId = sId;
        window.history.back();
      });
    };

    myBoxDB.queryRoomStructure($scope.roomTypeId, function(res){
      $scope.roomStructure = {};
      for(var i = 0; i < res.rows.length; i++) {
        var record = res.rows.item(i);
        if(!$scope.roomStructure[record.parentId]) {
          $scope.roomStructure[record.parentId] = [];
        }
        $scope.roomStructure[record.parentId].push({sId: record.sId, sNode: record.sNode});
        if(record.sId == $scope.sId) {
          $scope.selectedId[record.depth + 1] = record.sId;
          var pp = record.parentpath.split(",");
          for(var j = 1; j < pp.length; j++) {
            $scope.selectedId[j] = pp[j];
          }
        }
      }

      // if there's no selected item in the layer, make the first item in the layer as default
     for(i = 1; i < $scope.selectedId.length; i++) {
       if($scope.selectedId[i] == -1) {
         $scope.selectedId[i] = $scope.roomStructure[$scope.selectedId[i - 1]][0].sId;
       }
     }
    });
  })
  .controller('selectTypeCtrl', function($scope, myBoxDB){
    $scope.goodsTypes = [];
    myBoxDB.queryGoodsType(function (res) {
      for(var i = 0; i < res.rows.length; i++) {
        $scope.goodsTypes.push({gTypeId:res.rows.item(i).gTypeId, gTypeName: res.rows.item(i).gTypeName});
      }
    });
  })
;
