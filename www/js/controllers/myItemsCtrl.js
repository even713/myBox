/**
 * Created by Cara on 2015/10/5.
 */
angular.module('myBox.controllers')
.controller('myItemsCtrl', function($scope, myBoxDB, $ionicPopover){
    $scope.structureData = [];
    var structData = {};
    myBoxDB.queryMyStructure(function(res){
      for(var i = 0; i < res.rows.length; i++) {
        var parentId = res.rows.item(i).parentId;
        if(parentId == 0) {
          $scope.structureData.push({sNode: res.rows.item(i).sNode, sId: res.rows.item(i).sId, children: structData[res.rows.item(i).sId]});
        } else {
          if(structData[parentId]) {
            structData[parentId].push({sNode: res.rows.item(i).sNode, sId: res.rows.item(i).sId, children: structData[res.rows.item(i).sId]});
          } else {
            structData[parentId] = [{sNode: res.rows.item(i).sNode, sId: res.rows.item(i).sId, children: structData[res.rows.item(i).sId]}];
          }
        }
      }
    });

    myBoxDB.queryDefaultRoom(function(rooms){
      if(rooms.rows.length > 0){
        $scope.myRoom = {roomId: rooms.rows.item(0).roomId, roomName: rooms.rows.item(0).roomName, sId: rooms.rows.item(0).sId,
          sNode:rooms.rows.item(0).sNode, roomType: rooms.rows.item(0).roomTypeId};
        $scope.goodForm.roomId = $scope.myRoom.roomId;
        $scope.goodForm.localId = $scope.myRoom.sId;
        $scope.goodForm.localName = $scope.myRoom.sNode;
        $scope.goodForm.goodType = rooms.rows.item(0).gTypeName;
        $scope.goodForm.goodTypeId = rooms.rows.item(0).gTypeId;
        $scope.goodForm.ownerId = "";
        $scope.goodForm.owner = "";
        for(var i = 0; i < rooms.rows.length; i++) {
          $scope.goodForm.ownerId += "," + rooms.rows.item(i).memberId;
          $scope.goodForm.owner += "," + rooms.rows.item(i).memberName;
        }
        queryMyItems($scope.goodForm.roomId);
      } else {
        window.location.hash = "#/myBoxes"; // If there's no room yet, redirect user.
      }
      console.log($scope.myRoom);
    });

    $ionicPopover.fromTemplateUrl('room-structure.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $("ion-header-bar>div.title").off("click").on("click", function(event){
      $scope.popover.show($(this));
    });

    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });

    function queryMyItems(roomId){
      myBoxDB.queryMyItems(roomId, function(res){
        for(var i = 0; i < res.rows.length; i++) {
          $scope.myItems.push({goodsId:res.rows.item(i).goodsId, goodsName: res.rows.item(i).goodsName,
            location: res.rows.item(i).sNode, photo: res.rows.item(i).filePath, note: res.rows.item(i).note});
        }
      });
    }

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

    $scope.selectOwner = function(){
      window.location.hash = "#/myItems/selectOwner";
    };

    $scope.myItems = [];

    $scope.goodForm = {
      roomId: -1,
      goodName: null,
      goodNum: 1,
      localId: -1,
      localName: null,
      goodTypeId: -1,
      goodType: null,
      ownerId: -1,
      owner: null,
      note: null,
      photos: []
    };

    $scope.saveItem = function(){
      //TODO: validation
      myBoxDB.saveItem($scope.goodForm, function(){
        console.log("success");
      });
    };
})
  .controller('newItemsCtrl', function($scope, $cordovaImagePicker, $ionicActionSheet, $cordovaCamera){
    //$scope.imagesList = [];
    $scope.goodForm.photos = [];

    /* for test purpose TODO:*/
    var testImage = [];
    testImage.push("img/testPhotos/IMG_20151017_102154.jpg");
    testImage.push("img/testPhotos/IMG_20151017_102158.jpg");
    testImage.push("img/testPhotos/IMG_20151017_102203.jpg");
    $scope.goodForm.photos = $scope.goodForm.photos.concat(testImage);

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

          $scope.goodForm.photos = $scope.goodForm.photos.concat(results);

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
        $scope.goodForm.photos.push(src);
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

    $scope.changeType = function(typeId, typeName){
      myBoxDB.updateDefaultGoodType($scope.goodForm.goodTypeId, typeId, function(){
        $scope.goodForm.goodTypeId = typeId;
        $scope.goodForm.goodType = typeName;
        window.history.back();
      });
    };

    myBoxDB.queryGoodsType(function (res) {
      for(var i = 0; i < res.rows.length; i++) {
        $scope.goodsTypes.push({gTypeId:res.rows.item(i).gTypeId, gTypeName: res.rows.item(i).gTypeName});
      }
    });
  })
  .controller('selectOwnerCtrl', function($scope, myBoxDB){
    $scope.members = [];

    $scope.selectMember = function (m,elem) {
      console.log([m, elem]);
    };

    $scope.updateOwners = function(ownerId, typeName){
      var ids = [], names = [];
      for(var i = 0; i < $scope.members.length; i++){
        if($scope.members[i].isDefault) {
          ids.push($scope.members[i].memberId);
          names.push($scope.members[i].memberName);
        }
      }
      if(ids.length == 0) {
        alert("请选择成员！");
        return;
      }

      myBoxDB.updateDefaultOwner(ids, function(){
        $scope.goodForm.ownerId = ids.join(",");
        $scope.goodForm.owner = names.join(",");
        window.history.back();
      });
    };

    myBoxDB.queryMembers(function (res) {
      for(var i = 0; i < res.rows.length; i++) {
        $scope.members.push({memberId: res.rows.item(i).memberId, memberName: res.rows.item(i).memberName, isDefault: res.rows.item(i).isDefault == null ? 0 : res.rows.item(i).isDefault});
      }
      console.log($scope.members);
    });
  })
;
