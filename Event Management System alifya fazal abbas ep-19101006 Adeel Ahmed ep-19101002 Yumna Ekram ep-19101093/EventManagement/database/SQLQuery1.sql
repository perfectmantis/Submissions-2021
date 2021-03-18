create database event_management
use event_management
create table user_details
(id int primary key identity(1,1), fName varchar(30) not null, lName varchar(30) not null, userName nvarchar(30) unique not null, pas nvarchar(20) not null, age varchar(20) not null)


create table event_details
(eId int primary key identity(1,1), user_name nvarchar(30) foreign key references user_details(userName), eTitle varchar(40) not null, eDate date not null, eTime nvarchar(20) not null, eDesc varchar(max) not null, ecolor nvarchar(30) not null)

