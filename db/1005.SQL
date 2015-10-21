/************/
/*          */
/* 1005.SQL */
/*          */
/************/

/* Disable Foreign Keys */
pragma foreign_keys = off;
/* Begin Transaction */
begin transaction;

/* Database [3] */
pragma auto_vacuum=2;
pragma encoding='UTF-8';
pragma page_size=4096;

/* Drop table [main].[goods] */
drop table if exists [main].[goods];

/* Table structure [main].[goods] */
CREATE TABLE [main].[goods] (
  [goodsId] integer PRIMARY KEY, 
  [goodsName] text, 
  [number] integer, 
  [createdate] REAL, 
  [modifydate] REAL, 
  [goodsAttrs] text, 
  [members] text, 
  [goodsType] integer, 
  [location] integer, 
  [roomId] integer, 
  [isSync] integer, 
  [syncDate] REAL, 
  [note] text);

/* Data [main].[goods] */


/* Drop table [main].[goodsAttrs] */
drop table if exists [main].[goodsAttrs];

/* Table structure [main].[goodsAttrs] */
CREATE TABLE [main].[goodsAttrs] (
  [attrId] integer PRIMARY KEY, 
  [attrName] text, 
  [parentId] integer, 
  [parentpath] text, 
  [depth] integer, 
  [isTemplate] integer, 
  [roomId] integer);

/* Data [main].[goodsAttrs] */
insert into [main].[goodsAttrs] values(1, '季节', 0, '0', 1, 1, null);
insert into [main].[goodsAttrs] values(2, '场合', 0, '0', 1, 1, null);
insert into [main].[goodsAttrs] values(3, '自定义', 0, '0', 1, 1, null);
insert into [main].[goodsAttrs] values(4, '春', 1, '0,1', 2, 1, null);
insert into [main].[goodsAttrs] values(5, '夏', 1, '0,1', 2, 1, null);
insert into [main].[goodsAttrs] values(6, '秋', 1, '0,1', 2, 1, null);
insert into [main].[goodsAttrs] values(7, '冬', 1, '0,1', 2, 1, null);
insert into [main].[goodsAttrs] values(8, '休闲', 2, '0,2', 2, 1, null);
insert into [main].[goodsAttrs] values(9, '正式', 2, '0,2', 2, 1, null);


/* Drop table [main].[goodsPhotos] */
drop table if exists [main].[goodsPhotos];

/* Table structure [main].[goodsPhotos] */
CREATE TABLE [main].[goodsPhotos] (
  [photoId] integer PRIMARY KEY, 
  [filePath] text, 
  [goodsId] integer, 
  [isMain] integer, 
  [isUploaded] integer);

/* Data [main].[goodsPhotos] */


/* Drop table [main].[goodsTypes] */
drop table if exists [main].[goodsTypes];

/* Table structure [main].[goodsTypes] */
CREATE TABLE [main].[goodsTypes] (
  [gTypeId] integer PRIMARY KEY, 
  [gTypeName] text, 
  [gParentId] integer, 
  [gParentPath] text, 
  [gDepth] integer, 
  [isTemplate] integer, 
  [roomId] INTEGER, 
  [isLocked] integer);

/* Data [main].[goodsTypes] */
insert into [main].[goodsTypes] values(1, '食品', 0, '0', 0, 1, null, 0);
insert into [main].[goodsTypes] values(2, '衣物', 0, '0', 0, 1, null, 0);
insert into [main].[goodsTypes] values(3, '鞋子', 0, '0', 0, 1, null, 0);
insert into [main].[goodsTypes] values(4, '化妆品', 0, '0', 0, 1, null, 0);
insert into [main].[goodsTypes] values(5, '办公用品', 0, '0', 0, 1, null, 0);
insert into [main].[goodsTypes] values(6, '贵重物品', 0, '0', 0, 1, null, 0);


/* Drop table [main].[members] */
drop table if exists [main].[members];

/* Table structure [main].[members] */
CREATE TABLE [main].[members] (
  [memberId] integer PRIMARY KEY, 
  [memberName] text, 
  [isTemplate] integer, 
  [roomId] integer);

/* Data [main].[members] */
insert into [main].[members] values(1, '我', 1, null);
insert into [main].[members] values(2, '宝宝', 1, null);


/* Drop table [main].[rooms] */
drop table if exists [main].[rooms];

/* Table structure [main].[rooms] */
CREATE TABLE [main].[rooms] (
  [roomId] integer PRIMARY KEY, 
  [roomName] text, 
  [roomType] integer, 
  [isDefault] integer);

/* Data [main].[rooms] */


/* Drop table [main].[roomStructures] */
drop table if exists [main].[roomStructures];

/* Table structure [main].[roomStructures] */
CREATE TABLE [main].[roomStructures] (
  [sId] integer PRIMARY KEY, 
  [sNode] text, 
  [parentId] integer, 
  [parentpath] text, 
  [depth] integer, 
  [isTemplate] integer, 
  [roomId] integer);

/* Data [main].[roomStructures] */
insert into [main].[roomStructures] values(1, '客厅', 0, '0', 0, 1, null);
insert into [main].[roomStructures] values(2, '卧室', 0, '0', 0, 1, null);
insert into [main].[roomStructures] values(3, '厨房', 0, '0', 0, 1, null);
insert into [main].[roomStructures] values(4, '卫生间', 0, '0', 0, 1, null);
insert into [main].[roomStructures] values(5, '书房', 0, '0', 0, 1, null);
insert into [main].[roomStructures] values(6, '餐厅', 0, '0', 0, 1, null);
insert into [main].[roomStructures] values(7, '阳台', 0, '0', 0, 1, null);
insert into [main].[roomStructures] values(8, '茶几', 1, '0,1', 1, 1, null);
insert into [main].[roomStructures] values(9, '大厨', 2, '0,2', 1, 1, null);
insert into [main].[roomStructures] values(10, '床头柜', 2, '0,2', 1, 1, null);
insert into [main].[roomStructures] values(11, '壁橱', 3, '0,3', 1, 1, null);
insert into [main].[roomStructures] values(12, '架子', 4, '0,4', 1, 1, null);
insert into [main].[roomStructures] values(13, '书橱', 5, '0,5', 1, 1, null);
insert into [main].[roomStructures] values(14, '长壁橱', 6, '0,6', 1, 1, null);
insert into [main].[roomStructures] values(15, '吊橱', 7, '0,7', 1, 1, null);
insert into [main].[roomStructures] values(16, '床底', 2, '0,2', 1, 1, null);
insert into [main].[roomStructures] values(17, '右上格', 9, '0,2,9', 2, 1, null);
insert into [main].[roomStructures] values(18, '左手抽屉', 9, '0,2,9', 2, 1, null);


/* Drop table [main].[roomTypes] */
drop table if exists [main].[roomTypes];

/* Table structure [main].[roomTypes] */
CREATE TABLE [main].[roomTypes] (
  [typeId] integer PRIMARY KEY, 
  [typesName] text, 
  [roomStructure] text, 
  [isTemplate] integer, 
  [roomId] integer);

/* Data [main].[roomTypes] */
insert into [main].[roomTypes] values(1, '一室一厅', '1,2,3,4,7', 1, null);
insert into [main].[roomTypes] values(2, '二室一厅', '1,2,3,4,5,7', 1, null);


/* Drop table [main].[__WebKitDatabaseInfoTable__] */
drop table if exists [main].[__WebKitDatabaseInfoTable__];

/* Table structure [main].[__WebKitDatabaseInfoTable__] */
CREATE TABLE [main].[__WebKitDatabaseInfoTable__] (
  [key] TEXT NOT NULL ON CONFLICT REPLACE UNIQUE ON CONFLICT REPLACE, 
  [value] TEXT NOT NULL ON CONFLICT FAIL);

/* Data [main].[__WebKitDatabaseInfoTable__] */
insert into [main].[__WebKitDatabaseInfoTable__] values('WebKitDatabaseVersionKey', '1');


/* Commit Transaction */
commit transaction;

/* Enable Foreign Keys */
pragma foreign_keys = on;
