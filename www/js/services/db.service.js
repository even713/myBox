/**
 * Created by Cara on 2015/10/2.
 */
angular.module('myBox.services.db', ['ngCordova.plugins.sqlite'])
.factory('myBoxDB', ['$cordovaSQLite', '$q', function($cordovaSQLite, $q){
    var db = $cordovaSQLite.openDB({ name: "myBox.db", createFromLocation: 1 });
    if($.isEmptyObject(db)) {
      //console.log("db is emtpy initialize db...");
      this.initData();
    }
    return{
      query: function(query, values, callback){
        var deferred = $q.defer();
        $cordovaSQLite.execute(db, query, values).then(function(res) {
          if(res.rows.length > 0) {
            console.log("select query");
            //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            deferred.resolve({rows: res.rows});
          } else {
            if(res.rowsAffected == 0) {
              console.log(["what's type of the query?", query]);
              deferred.resolve({rows: []});
            } else {
              if(res.insertId) {
                console.log("insert/update query");
                deferred.resolve({insertId: res.insertId, rows:[]});
              }
            }

          }

        }, function (err) {
          console.error(err);
          deferred.reject({err: true});
        });
        return deferred.promise;
      },

      transaction: function(sqlAry){
        var deferred = $q.defer();
        db.transaction(function(tx) {
          for(var i = 0; i <sqlAry.length; i++) {
            if(i == sqlAry.length - 1) {
              tx.executeSql(sqlAry[i], [], function(contexts, results){
                // TODO: when success, the callback is not called
                console.log(results);
                deferred.resolve(results);
              }, function(sqlTrans, sqlErr){
                console.log(sqlErr.message);
                return true;
              });
            } else {
              tx.executeSql(sqlAry[i]);
            }
          }
        });
        return deferred.promise;
      },

      queryRooms: function(callback){
        this.query("SELECT roomId, roomName, isDefault from rooms").then(callback, function(){
          console.log("error when query data from rooms");
        });
        /*this.query("SELECT memberId, memberName from members").then(callback, function(){
          console.log("error when query data from rooms");
        });*/
      },

      queryRoomsTypes: function(callback){
        this.query("SELECT typeId, typesName from roomTypes where istemplate=1").then(callback, function(){
          console.log("error when query data from roomsType");
        });
      },

      createRoom: function(roomName, roomType, callback){
        var sqls = [];
        //make the new house as default house
        sqls.push("UPDATE rooms set isDefault = 0");
        sqls.push("INSERT INTO rooms (roomName, roomType, isDefault) VALUES ('"+ roomName +"', "+ roomType +", 1)");

        var that = this;
        this.transaction(sqls).then(function(results){
          var roomId = results.insertId;
          sqls = [];
          // copy roomtype data from given roomtype template
          sqls.push("insert into roomTypes (typesName, roomStructure, isTemplate, roomId) SELECT typesName, roomStructure, 0, "+ roomId +" FROM roomTypes WHERE typeId="+ roomType +"");
         // update records in room with the new roomtype
          sqls.push("UPDATE rooms set roomType = (select typeId from roomTypes order by typeId desc limit 1) where roomId="+ roomId +"");
          // copy the first depth of nodes(depth=0) in roomstructures with the given roomtypeid
          sqls.push("insert into roomStructures(sNode, parentId, parentPath, depth, isTemplate, roomTypeId) select a.sNode, a.parentId, a.parentPath, a.depth, 0, b.typeId from roomStructures a, (select typeId from roomtypes order by typeId desc limit 1) b where a.roomTypeId="+ roomType +"");

          //insert into roomstructures the nodes copy from given template roomtype(the depth=1 nodes)
          sqls.push("insert into roomstructures(sNode, parentId, parentpath, depth, istemplate, roomtypeid) " +
            "select a.sNode, c.sId, c.parentpath||','||c.sId, a.depth, 0, d.typeId from roomstructures a join roomstructures b on b.sid = a.parentid " +
            "join (select typeId from roomtypes order by typeId desc limit 1) d " +
            "join  roomstructures c on c.[sNode] = b.[sNode] and c.[roomTypeId]=d.typeId " +
            "where a.parentid in (select sid from roomstructures where roomTypeId="+ roomType +") ");

          // copy nodes from roomstructures to roomstructures for the new roomtype id from template roomtype id(the depth=2 nodes)
          sqls.push("insert into roomstructures(sNode, parentId, parentpath, depth, istemplate, roomtypeid) " +
            "select a.sNode, c.sId, c.parentpath||','||c.sId, a.depth, 0, d.typeId from roomstructures a join roomstructures b on b.sid = a.parentid " +
            "join (select typeId from roomtypes order by typeId desc limit 1) d " +
            "join  roomstructures c on c.[sNode] = b.[sNode] and c.[roomTypeId]=d.typeId " +
            "where a.parentid in (select sid from roomstructures where roomTypeId="+ roomType +") and a.depth=2");

          that.transaction(sqls).then(function(results){
            callback && callback();
          });
        }, function(){
          console.log("error when create room");
        });
      },

      initData: function () {

        /* roomTypes table (column roomStructure is deprated)*/
        this.query("DROP TABLE IF EXISTS roomTypes");
        this.query("CREATE TABLE IF NOT EXISTS roomTypes (typeId integer primary key, typesName text, roomStructure text, isTemplate integer, roomId integer)");
        this.query("INSERT INTO roomTypes (typesName, roomStructure, isTemplate) VALUES (?,?,?)", ["一室一厅", '1,2,3,4,7', 1]);
        this.query("INSERT INTO roomTypes (typesName, roomStructure, isTemplate) VALUES (?,?,?)", ["二室一厅", '1,2,3,4,5,7', 1]);

        /* roomStructures table*/
        this.query("DROP TABLE IF EXISTS roomStructures");
        this.query("CREATE TABLE IF NOT EXISTS roomStructures (sId integer primary key, sNode text, parentId integer, parentpath text, depth integer, isTemplate integer, roomTypeId integer)");
        // insert data
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate, roomTypeId) VALUES (?,?,?,?,?)", ["客厅", 0, "0", 0, 1, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate, roomTypeId) VALUES (?,?,?,?,?)", ["卧室", 0, "0", 0, 1, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate, roomTypeId) VALUES (?,?,?,?,?)", ["厨房", 0, "0", 0, 1, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate, roomTypeId) VALUES (?,?,?,?,?)", ["卫生间", 0, "0", 0, 1, 1]);

        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate, roomTypeId) VALUES (?,?,?,?,?)", ["客厅", 0, "0", 0, 1, 2]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate, roomTypeId) VALUES (?,?,?,?,?)", ["卧室", 0, "0", 0, 1, 2]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate, roomTypeId) VALUES (?,?,?,?,?)", ["厨房", 0, "0", 0, 1, 2]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate, roomTypeId) VALUES (?,?,?,?,?)", ["卫生间", 0, "0", 0, 1, 2]);

        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate, roomTypeId) VALUES (?,?,?,?,?)", ["书房", 0, "0", 0, 1, 2]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["餐厅", 0, "0", 0, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate, roomTypeId) VALUES (?,?,?,?,?)", ["阳台", 0, "0", 0, 1, 1]);

        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["茶几", 1, "0,1", 1, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["大厨", 2, "0,2", 1, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["床头柜", 2, "0,2", 1, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["壁橱", 3, "0,3", 1, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["架子", 4, "0,4", 1, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["书橱", 5, "0,5", 1, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["长壁橱", 6, "0,6", 1, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["吊橱", 7, "0,7", 1, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["床底", 2, "0,2", 1, 1]);

        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["右上格", 9, "0,2,9", 2, 1]);
        this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["左手抽屉", 9, "0,2,9", 2, 1]);


        /* members table*/
        this.query("DROP TABLE IF EXISTS members");
        this.query("CREATE TABLE IF NOT EXISTS members (memberId integer primary key, memberName text, isTemplate integer, roomId integer)");
        this.query("INSERT INTO members (memberName, isTemplate) VALUES (?,?)", ["我", 1]);
        this.query("INSERT INTO members (memberName, isTemplate) VALUES (?,?)", ["宝宝", 1]);

         /*goodsType table*/
        this.query("DROP TABLE IF EXISTS goodsTypes");
        this.query("CREATE TABLE IF NOT EXISTS goodsTypes (gTypeId integer primary key, gTypeName text, gParentId integer, gParentPath text, gDepth integer, isTemplate integer, roomId integer, isLocked integer)");
        this.query("INSERT INTO goodsTypes (gTypeName, gParentId, gParentPath, gDepth, isTemplate, isLocked) VALUES (?,?,?,?,?,?)", ["食品", 0, "0", 0, 1, 0]);
        this.query("INSERT INTO goodsTypes (gTypeName, gParentId, gParentPath, gDepth, isTemplate, isLocked) VALUES (?,?,?,?,?,?)", ["衣物", 0, "0", 0, 1, 0]);
        this.query("INSERT INTO goodsTypes (gTypeName, gParentId, gParentPath, gDepth, isTemplate, isLocked) VALUES (?,?,?,?,?,?)", ["鞋子", 0, "0", 0, 1, 0]);
        this.query("INSERT INTO goodsTypes (gTypeName, gParentId, gParentPath, gDepth, isTemplate, isLocked) VALUES (?,?,?,?,?,?)", ["化妆品", 0, "0", 0, 1, 0]);
        this.query("INSERT INTO goodsTypes (gTypeName, gParentId, gParentPath, gDepth, isTemplate, isLocked) VALUES (?,?,?,?,?,?)", ["办公用品", 0, "0", 0, 1, 0]);
        this.query("INSERT INTO goodsTypes (gTypeName, gParentId, gParentPath, gDepth, isTemplate, isLocked) VALUES (?,?,?,?,?,?)", ["贵重物品", 0, "0", 0, 1, 0]);

        /*goodsAttrs table*/
        this.query("DROP TABLE IF EXISTS goodsAttrs");
        this.query("CREATE TABLE IF NOT EXISTS goodsAttrs (attrId integer primary key, attrName text, parentId integer, parentpath text, depth integer, isTemplate integer, roomId integer)");
        this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["季节", 0, "0", 1, 1, 0]);
        this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["场合", 0, "0", 1, 1, 0]);
        this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["自定义", 0, "0", 1, 1, 0]);

        this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["春", 1, "0,1", 2, 1]);
        this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["夏", 1, "0,1", 2, 1]);
        this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["秋", 1, "0,1", 2, 1]);
        this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["冬", 1, "0,1", 2, 1]);
        this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["休闲", 2, "0,2", 2, 1]);
        this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["正式", 2, "0,2", 2, 1]);

        /*rooms table*/
        this.query("DROP TABLE IF EXISTS rooms");
        this.query("CREATE TABLE IF NOT EXISTS rooms (roomId integer primary key, roomName text, roomType integer, isDefault integer)");

        /*goods table*/
        this.query("DROP TABLE IF EXISTS goods");
        this.query("CREATE TABLE IF NOT EXISTS goods (goodsId integer primary key, goodsName text, number integer, createdate REAL, modifydate REAL, goodsAttrs text, members text, goodsType integer, location integer, roomId integer, isSync integer, syncDate REAL, note text)");

        /*goodsPhotos table*/
        this.query("DROP TABLE IF EXISTS goodsPhotos");
        this.query("CREATE TABLE IF NOT EXISTS goodsPhotos (photoId integer primary key, filePath text, goodsId integer, isMain integer, isUploaded integer)");
      }
    }
  }]);
