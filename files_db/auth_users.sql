create table users(id INTEGER PRIMARY KEY AUTOINCREMENT, userId varchar(100) not null, password varchar(100) not null, status varchar(100) not null, createdDate timestamp default CURRENT_TIMESTAMP, updatedDate timestamp default CURRENT_TIMESTAMP, createdBy varchar(100) default 'DBVADMIN');

insert into users(userId, password, status) values('admin', 'Pwd@1', 'ACTIVE');
insert into users(userId, password, status) values('dev', 'Pwd@1', 'ACTIVE');
insert into users(userId, password, status) values('mgr', 'Pwd@1', 'ACTIVE');
insert into users(userId, password, status) values('csr', 'Pwd@1', 'ACTIVE');
insert into users(userId, password, status) values('cust', 'Pwd@1', 'ACTIVE');