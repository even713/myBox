/************/
/*          */
/* 1102.SQL */
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
insert into [main].[goodsAttrs] values(1, '����', 0, '0', 1, 1, null);
insert into [main].[goodsAttrs] values(2, '����', 0, '0', 1, 1, null);
insert into [main].[goodsAttrs] values(3, '�Զ���', 0, '0', 1, 1, null);
insert into [main].[goodsAttrs] values(4, '��', 1, '0,1', 2, 1, null);
insert into [main].[goodsAttrs] values(5, '��', 1, '0,1', 2, 1, null);
insert into [main].[goodsAttrs] values(6, '��', 1, '0,1', 2, 1, null);
insert into [main].[goodsAttrs] values(7, '��', 1, '0,1', 2, 1, null);
insert into [main].[goodsAttrs] values(8, '����', 2, '0,2', 2, 1, null);
insert into [main].[goodsAttrs] values(9, '��ʽ', 2, '0,2', 2, 1, null);


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
  [roomId] integer, 
  [isLocked] integer, 
  [isDefault] integer);

/* Data [main].[goodsTypes] */
insert into [main].[goodsTypes] values(1, 'ʳƷ', 0, '0', 0, 1, null, 0, null);
insert into [main].[goodsTypes] values(2, '����', 0, '0', 0, 1, null, 0, 0);
insert into [main].[goodsTypes] values(3, 'Ь��', 0, '0', 0, 1, null, 0, 0);
insert into [main].[goodsTypes] values(4, '��ױƷ', 0, '0', 0, 1, null, 0, null);
insert into [main].[goodsTypes] values(5, '�칫��Ʒ', 0, '0', 0, 1, null, 0, 1);
insert into [main].[goodsTypes] values(6, '������Ʒ', 0, '0', 0, 1, null, 0, null);


/* Drop table [main].[members] */
drop table if exists [main].[members];

/* Table structure [main].[members] */
CREATE TABLE [main].[members] (
  [memberId] integer PRIMARY KEY, 
  [memberName] text, 
  [isTemplate] integer, 
  [roomId] integer, 
  [isDefault] integer);

/* Data [main].[members] */
insert into [main].[members] values(1, '��', 1, null, 1);
insert into [main].[members] values(2, '����', 1, null, null);


/* Drop table [main].[rooms] */
drop table if exists [main].[rooms];

/* Table structure [main].[rooms] */
CREATE TABLE [main].[rooms] (
  [roomId] integer PRIMARY KEY, 
  [roomName] text, 
  [roomType] integer, 
  [isDefault] integer);

/* Data [main].[rooms] */
insert into [main].[rooms] values(1, 'my house', 3, 1);


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
  [roomTypeId] integer, 
  [isDefault] integer);

/* Data [main].[roomStructures] */
insert into [main].[roomStructures] values(1, '����', 0, '0', 0, 1, 1, 0);
insert into [main].[roomStructures] values(2, '����', 0, '0', 0, 1, 1, null);
insert into [main].[roomStructures] values(3, '����', 0, '0', 0, 1, 1, null);
insert into [main].[roomStructures] values(4, '������', 0, '0', 0, 1, 1, null);
insert into [main].[roomStructures] values(5, '�鷿', 0, '0', 0, 1, null, null);
insert into [main].[roomStructures] values(6, '����', 0, '0', 0, 1, null, null);
insert into [main].[roomStructures] values(7, '��̨', 0, '0', 0, 1, 1, null);
insert into [main].[roomStructures] values(8, '�輸', 1, '0,1', 1, 1, 1, null);
insert into [main].[roomStructures] values(9, '���', 2, '0,2', 1, 1, 1, null);
insert into [main].[roomStructures] values(10, '��ͷ��', 2, '0,2', 1, 1, 1, null);
insert into [main].[roomStructures] values(11, '�ڳ�', 3, '0,3', 1, 1, 1, null);
insert into [main].[roomStructures] values(12, '����', 4, '0,4', 1, 1, 1, null);
insert into [main].[roomStructures] values(13, '���', 5, '0,5', 1, 1, null, null);
insert into [main].[roomStructures] values(14, '���ڳ�', 6, '0,6', 1, 1, null, null);
insert into [main].[roomStructures] values(15, '����', 7, '0,7', 1, 1, 1, null);
insert into [main].[roomStructures] values(16, '����', 2, '0,2', 1, 1, 1, null);
insert into [main].[roomStructures] values(17, '���ϸ�', 9, '0,2,9', 2, 1, 1, null);
insert into [main].[roomStructures] values(18, '���ֳ���', 9, '0,2,9', 2, 1, 1, null);
insert into [main].[roomStructures] values(19, '����', 0, '0', 0, 1, 2, null);
insert into [main].[roomStructures] values(20, '����', 0, '0', 0, 1, 2, null);
insert into [main].[roomStructures] values(21, '����', 0, '0', 0, 1, 2, null);
insert into [main].[roomStructures] values(22, '������', 0, '0', 0, 1, 2, null);
insert into [main].[roomStructures] values(23, '��̨', 0, '0', 0, 1, 2, null);
insert into [main].[roomStructures] values(30, '�輸', 19, '0,19', 1, 1, 2, null);
insert into [main].[roomStructures] values(31, '���', 20, '0,20', 1, 1, 2, null);
insert into [main].[roomStructures] values(32, '��ͷ��', 20, '0,20', 1, 1, 2, null);
insert into [main].[roomStructures] values(33, '�ڳ�', 21, '0,21', 1, 1, 2, null);
insert into [main].[roomStructures] values(34, '����', 22, '0,22', 1, 1, 2, null);
insert into [main].[roomStructures] values(35, '����', 23, '0,23', 1, 1, 2, null);
insert into [main].[roomStructures] values(36, '����', 20, '0,20', 1, 1, 2, null);
insert into [main].[roomStructures] values(37, '���ϸ�', 31, '0,20,31', 2, 1, 2, null);
insert into [main].[roomStructures] values(38, '���ֳ���', 31, '0,20,31', 2, 1, 2, null);
insert into [main].[roomStructures] values(39, '����', 0, '0', 0, 0, 3, 0);
insert into [main].[roomStructures] values(40, '����', 0, '0', 0, 0, 3, null);
insert into [main].[roomStructures] values(41, '����', 0, '0', 0, 0, 3, null);
insert into [main].[roomStructures] values(42, '������', 0, '0', 0, 0, 3, null);
insert into [main].[roomStructures] values(43, '��̨', 0, '0', 0, 0, 3, null);
insert into [main].[roomStructures] values(44, '�輸', 39, '0,39', 1, 0, 3, 1);
insert into [main].[roomStructures] values(45, '���', 40, '0,40', 1, 0, 3, null);
insert into [main].[roomStructures] values(46, '��ͷ��', 40, '0,40', 1, 0, 3, null);
insert into [main].[roomStructures] values(47, '�ڳ�', 41, '0,41', 1, 0, 3, null);
insert into [main].[roomStructures] values(48, '����', 42, '0,42', 1, 0, 3, null);
insert into [main].[roomStructures] values(49, '����', 43, '0,43', 1, 0, 3, null);
insert into [main].[roomStructures] values(50, '����', 40, '0,40', 1, 0, 3, null);
insert into [main].[roomStructures] values(51, '���ϸ�', 45, '0,40,45', 2, 0, 3, null);
insert into [main].[roomStructures] values(52, '���ֳ���', 45, '0,40,45', 2, 0, 3, null);


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
insert into [main].[roomTypes] values(1, 'һ��һ��', '1,2,3,4,7', 1, null);
insert into [main].[roomTypes] values(2, '����һ��', '1,2,3,4,5,7', 1, null);
insert into [main].[roomTypes] values(3, 'һ��һ��', '1,2,3,4,7', 0, 1);


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
