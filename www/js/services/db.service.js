/**
 * Created by Cara on 2015/10/2.
 */
angular.module('myBox.services.db', ['ngCordova.plugins.sqlite'])
.factory('myBoxDB', ['$cordovaSQLite', function($cordovaSQLite){
    var db = $cordovaSQLite.openDB({ name: "myBox.db", createFromLocation: 1 });
    return{
      query: function(query, values){
        $cordovaSQLite.execute(db, query, values).then(function(res) {
          if(res.rows.length > 0) {
            console.log("select query");
            //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            return res.rows;
          } else {
            if(res.rowsAffected == 0) {
              console.log(["what's type of the query?", query]);
            } else {
              if(res.insertId) {
                console.log("insert/update query");
                return res.insertId;
              }
            }

          }
        }, function (err) {
          console.error(err);
        });
      },
      initData: function () {
        /* roomStructures table*/
        //this.query("DROP TABLE IF EXISTS roomStructures");
        //this.query("CREATE TABLE IF NOT EXISTS roomStructures (sId integer primary key, sNode text, parentId integer, parentpath text, depth integer, isTemplate integer, roomId integer)");
        // insert data
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["客厅", 0, "0", 0, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["卧室", 0, "0", 0, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["厨房", 0, "0", 0, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["卫生间", 0, "0", 0, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["书房", 0, "0", 0, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["餐厅", 0, "0", 0, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["阳台", 0, "0", 0, 1]);

        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["茶几", 1, "0,1", 1, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["大厨", 2, "0,2", 1, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["床头柜", 2, "0,2", 1, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["壁橱", 3, "0,3", 1, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["架子", 4, "0,4", 1, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["书橱", 5, "0,5", 1, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["长壁橱", 6, "0,6", 1, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["吊橱", 7, "0,7", 1, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["床底", 2, "0,2", 1, 1]);

        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["右上格", 9, "0,2,9", 2, 1]);
        //this.query("INSERT INTO roomStructures (sNode, parentId, parentPath,depth, isTemplate) VALUES (?,?,?,?,?)", ["左手抽屉", 9, "0,2,9", 2, 1]);

        /* roomTypes table*/
        //this.query("DROP TABLE IF EXISTS roomTypes");
        //this.query("CREATE TABLE IF NOT EXISTS roomTypes (typeId integer primary key, typesName text, roomStructure text, isTemplate integer, roomId integer)");
        //this.query("INSERT INTO roomTypes (typesName, roomStructure, isTemplate) VALUES (?,?,?)", ["一室一厅", '1,2,3,4,7', 1]);
        //this.query("INSERT INTO roomTypes (typesName, roomStructure, isTemplate) VALUES (?,?,?)", ["二室一厅", '1,2,3,4,5,7', 1]);

        /* members table*/
        //this.query("DROP TABLE IF EXISTS members");
        //this.query("CREATE TABLE IF NOT EXISTS members (memberId integer primary key, memberName text, isTemplate integer, roomId integer)");
        //this.query("INSERT INTO members (memberName, isTemplate) VALUES (?,?)", ["我", 1]);
        //this.query("INSERT INTO members (memberName, isTemplate) VALUES (?,?)", ["宝宝", 1]);

         /*goodsType table*/
        //this.query("DROP TABLE IF EXISTS goodsTypes");
        //this.query("CREATE TABLE IF NOT EXISTS goodsTypes (gTypeId integer primary key, gTypeName text, gParentId integer, gParentPath text, gDepth integer, isTemplate integer, roomId integer, isLocked integer)");
        //this.query("INSERT INTO goodsTypes (gTypeName, gParentId, gParentPath, gDepth, isTemplate, isLocked) VALUES (?,?,?,?,?,?)", ["食品", 0, "0", 0, 1, 0]);
        //this.query("INSERT INTO goodsTypes (gTypeName, gParentId, gParentPath, gDepth, isTemplate, isLocked) VALUES (?,?,?,?,?,?)", ["衣物", 0, "0", 0, 1, 0]);
        //this.query("INSERT INTO goodsTypes (gTypeName, gParentId, gParentPath, gDepth, isTemplate, isLocked) VALUES (?,?,?,?,?,?)", ["鞋子", 0, "0", 0, 1, 0]);
        //this.query("INSERT INTO goodsTypes (gTypeName, gParentId, gParentPath, gDepth, isTemplate, isLocked) VALUES (?,?,?,?,?,?)", ["化妆品", 0, "0", 0, 1, 0]);
        //this.query("INSERT INTO goodsTypes (gTypeName, gParentId, gParentPath, gDepth, isTemplate, isLocked) VALUES (?,?,?,?,?,?)", ["办公用品", 0, "0", 0, 1, 0]);
        //this.query("INSERT INTO goodsTypes (gTypeName, gParentId, gParentPath, gDepth, isTemplate, isLocked) VALUES (?,?,?,?,?,?)", ["贵重物品", 0, "0", 0, 1, 0]);

        /*goodsAttrs table*/
        //this.query("DROP TABLE IF EXISTS goodsAttrs");
        //this.query("CREATE TABLE IF NOT EXISTS goodsAttrs (attrId integer primary key, attrName text, parentId integer, parentpath text, depth integer, isTemplate integer, roomId integer)");
        //this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["季节", 0, "0", 1, 1, 0]);
        //this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["场合", 0, "0", 1, 1, 0]);
        //this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["自定义", 0, "0", 1, 1, 0]);

        //this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["春", 1, "0,1", 2, 1]);
        //this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["夏", 1, "0,1", 2, 1]);
        //this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["秋", 1, "0,1", 2, 1]);
        //this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["冬", 1, "0,1", 2, 1]);
        //this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["休闲", 2, "0,2", 2, 1]);
        //this.query("INSERT INTO goodsAttrs (attrName, parentId, parentpath, depth, isTemplate) VALUES (?,?,?,?,?)", ["正式", 2, "0,2", 2, 1]);

        /*rooms table*/
        //this.query("DROP TABLE IF EXISTS rooms");
        //this.query("CREATE TABLE IF NOT EXISTS rooms (roomId integer primary key, roomName text, roomType integer)");

        /*goods table*/
        //this.query("DROP TABLE IF EXISTS goods");
        //this.query("CREATE TABLE IF NOT EXISTS goods (goodsId integer primary key, goodsName text, number integer, createdate REAL, modifydate REAL, goodsAttrs text, members text, goodsType integer, location integer, roomId integer, isSync integer, syncDate REAL, note text)");

        /*goodsPhotos table*/
        //this.query("DROP TABLE IF EXISTS goodsPhotos");
        //this.query("CREATE TABLE IF NOT EXISTS goodsPhotos (photoId integer primary key, filePath text, goodsId integer, isMain integer, isUploaded integer)");
      }
    }
  }]);
