----  Dream Home Real Estate


/*
drop table dh_renter ;
drop table dh_viewing cascade constraint; 

drop table dh_propertyforrent  cascade constraint;
drop table DH_PrivateOwner cascade constraint;

drop table dh_client cascade constraint ;
drop table dh_staff cascade constraint;
drop table dh_branch cascade constraint;

drop table dh_lease cascade constraint;

drop table DH_REGISTRATION cascade constraint;

*/

create  table DH_Branch
(Branchno varchar2(50)  ,
 street varchar2(50),
 city varchar2(50),
 postcode varchar2(50),
 CONSTRAINT     DH_Branchno_pk33   PRIMARY KEY (Branchno) 
 );

create table DH_Staff
(staffno varchar2(50) primary key ,
 fname varchar2(50),
 lname varchar2(50),
 position varchar2(50),
 sex varchar2(50),
 dob date,
 salary number(7),
 branchno varchar2(50),
 telephone  varchar2(16),
 mobile varchar2(16),
 email  varchar2(50)
);

ALTER TABLE DH_Staff ADD CONSTRAINT property_staff_fk33 FOREIGN KEY (BranchNo) REFERENCES DH_Branch(Branchno) ;


create table DH_PrivateOwner 
(ownerNo char(5) PRIMARY KEY,
 fname varchar2(10),
 lname varchar2(10),
 address varchar2(50),
 telno char(15),
 eMail    varchar2(50),
 password varchar2(40)
)
;


create   table DH_PropertyForRent 
(propertyno  varchar2(10) primary key, 
 street varchar2(50), 
 city varchar2(50),
 postcode varchar2(50),
 type varchar2(50),
 rooms number(7),
 rent number(7),
 ownerno char(5) not null,
 Staffno varchar2(50) not null,
 Branchno varchar2(50),
 picture  varchar2 (50),
 floorPlan  varchar2 (100)
);



ALTER TABLE DH_PropertyForRent
ADD CONSTRAINT property_reg_fk33 FOREIGN KEY (Branchno) REFERENCES DH_Branch(Branchno) ;

ALTER TABLE DH_PropertyForRent
ADD CONSTRAINT Property_DH_Staff_fk33 FOREIGN KEY (Staffno) REFERENCES DH_Staff(Staffno) ;

ALTER TABLE DH_PropertyForRent
ADD CONSTRAINT Property_DH_Owner_fk33 FOREIGN KEY (OwnerNo) REFERENCES DH_PrivateOwner(Ownerno) ;




create table DH_Client
(Clientno varchar2(50),
 fname varchar2(30),
 lname varchar2(30),
 telno char(20),
 street  varchar2(30),
 city  varchar2(30),
 email varchar2(40),
 preftype varchar2(5),
 maxrent numeric,
 Primary Key (Clientno)
);

create      table DH_viewing
(ClientNo  varchar2(50) ,
 propertyNo varchar2(10),
 viewdate date ,
  comments  varchar2(200),
 primary key (ClientNo, PropertyNo) 
 );


ALTER TABLE DH_viewing
ADD CONSTRAINT DH_viewing_Property_fk33 FOREIGN KEY (Propertyno) REFERENCES DH_PropertyForRent(PropertyNo) ;

ALTER TABLE DH_viewing
ADD CONSTRAINT DH_viewing_DH_Client_fk33 FOREIGN KEY (Clientno) REFERENCES DH_Client (clientno) ;


CREATE TABLE DH_REGISTRATION
(clientNo  varchar2(50),
branchNo  varchar2(50), 
staffNo   varchar2(50)  ,
dateRegister   date,
primary key (clientNo, branchNo) )
;

ALTER TABLE  DH_REGISTRATION ADD CONSTRAINT DH_Reg_fk33 FOREIGN KEY (Clientno) REFERENCES DH_Client (ClientNo) ;
ALTER TABLE  DH_REGISTRATION ADD CONSTRAINT DH_Staff_fk33 FOREIGN KEY (Staffno) REFERENCES DH_Staff (StaffNo) ;
ALTER TABLE  DH_REGISTRATION ADD CONSTRAINT DH_Branch_fk33 FOREIGN KEY (Branchno) REFERENCES DH_Branch (BranchNo) ;


 CREATE TABLE DH_LEASE
 (
 leaseNo  Number(7) Primary Key,
 clientNo varchar2(50)   ,
 PropertyNo varchar2(10),
 leaseAmount  number(9,2),
 lease_start   date,
 lease_end   date
  );
  
 ALTER TABLE DH_LEASE  ADD CONSTRAINT DH_Reg_fk44 FOREIGN KEY (Clientno) REFERENCES DH_Client (ClientNo) ;
 
 ALTER TABLE DH_LEASE  ADD CONSTRAINT DH_prop_fk44 FOREIGN KEY (Propertyno) REFERENCES DH_PropertyForRent (Propertyno) ;
 
 
 
 
 
 
 
 

insert into DH_Branch values ('B002','56 Cover Drive','London','NW10 6EU');
insert into DH_Branch values ('B003','163 Main Street','Glasgow','G11 9QX');
insert into DH_Branch values ('B004','32 Manse Road','Bristol','BS99 1NZ');
insert into DH_Branch values ('B005','22 Deer Road','London','SW1 4EH');
insert into DH_Branch values ('B007','16 Argyll Street','Aberdeen','AB2 3SU');


insert into DH_Staff values ('SA9','Mary','Howe','Assistant','F',to_date('1970-02-19','yyyy-mm-dd'),9000,'B007','1338','079555 12345','MaryHowe@Dreamhome.co.uk');
insert into DH_Staff values ('SG14','David','Ford','Supervisor','M',to_date('1958-03-24','yyyy-mm-dd'),18000,'B003','0223','079555 12344','DavidFord@Dreamhome.co.uk');
insert into DH_Staff values ('SG37','Ann','Beech','Assistant','F',to_date('1960-11-10','yyyy-mm-dd'),12000,'B003','0224','079555 12346','AnnBeech@Dreamhome.co.uk');
insert into DH_Staff values ('SG5','Susan','Brand','Manager','F',to_date('1940-6-3','yyyy-mm-dd'),24000,'B003','0225','079555 12347','SusanBrand@Dreamhome.co.uk');
insert into DH_Staff values ('SL21','John','White','Manager','M',to_date('1945-10-1','yyyy-mm-dd'),30000,'B005','1512','090555 12345','JohnWhite@Dreamhome.co.uk');
insert into DH_Staff values ('SL41','Julie','Lee','Assistant','F',to_date('1965-6-13','yyyy-mm-dd'),9000,'B005','1514','090555 12346','JulieLee@Dreamhome.co.uk');



insert into DH_PrivateOwner values ('CO46','Jonathan','Donaway', 'Abbey street','99095559','jd@gmail.com', '1111' );
insert into DH_PrivateOwner values ('CO93','Janet','Duncan', 'Abbey street','99095559','jd@gmail.com', '1111' );

insert into DH_PrivateOwner values ('CO87','Bobby','Gilles', '35 Abbey street','97095559','bg@gmail.com', '1111' );
insert into DH_PrivateOwner values ('CO40','Gillan','Moneskun', '44 Balder street','99095559','gm@gmail.com', '1111' );
insert into DH_PrivateOwner values ('CO66','Samantha','Kirk', '34 King street','99095559','sk@gmail.com', '1111' );
insert into DH_PrivateOwner values ('CO73','Bruce','Willes', '56 Bogdan street','99095559','bw@gmail.com', '1111' );
insert into DH_PrivateOwner values ('CO77','Giselle','Bunchen', '45 Queen Abbey street','99095559','jd@gmail.com', '1111' );


insert into DH_PropertyForRent values ('PA14','16 Holhead','Aberdeen','AB7 5SU','House',6,650,'CO46','SA9','B007','images/house2.jpg','images/plan1.jpg');
insert into DH_PropertyForRent values ('PG16','5 Novar Drive','Glasgow','G12 9AX','Flat',4,450,'CO93','SG14','B003','images/house3.jpg','images/plan1.jpg');
insert into DH_PropertyForRent values ('PG21','18 Dale Road','Glasgow','G12','House',5,600,'CO87','SG37','B003','images/house4.jpg','images/plan1.jpg');
insert into DH_PropertyForRent values ('PG36','2 Manor Road','Glasgow','G32 4QX','Flat',3,375,'CO93','SG37','B003','images/house5.jpg','images/plan1.jpg');
insert into DH_PropertyForRent values ('PG4','6 Lawrence Street','Glasgow','G11 9QX','Flat',3,350,'CO40','SA9','B003','images/house2.jpg','images/plan1.jpg');
insert into DH_PropertyForRent values ('PG97','Muir Drive','Aberdeen','AB42 1DD','House',3,380,'CO46','SA9','B007','images/house1.jpg','images/plan1.jpg');
insert into DH_PropertyForRent values ('PL94','6 Argyll Street','London','NW2','Flat',4,400,'CO87','SL41','B005','images/house3.jpg','images/plan1.jpg');


insert into DH_Client values ('CR56','Fred','Flintstone','555 1234','12 Rock Way','Bedrock','fred@flintyrock.com','House',450);
insert into DH_Client values ('CR62','Wilma','Flintstone','555 1234','12 Rock Way','Bedrock','wilma@flintyrock.com','Flat',350);
insert into DH_Client values ('CR74','Albert','Johnstone','555 6677','1 Way St.','Chicago','albie@johnstone.com','Flat',450);
insert into DH_Client values ('CR77','Clark','Kent','555 9999','1 Super Way','Smallville','clark@supersite.com','Flat',400);
insert into DH_Client values ('CR79','Joe','Bloggs','123 4567','5 High St','Paisley','joe@paisley.com','House',450);
insert into DH_Client values ('CR83','Edward','Scissorhands','123 4567','1 Snip St.','Scissorland','eddie@scix.com','House',300);
insert into DH_Client values ('CR45','Albert','Enistein','555 6789','12 Long Island Way','New Jersey','bert@nuclearintent.com','Flat',450);
insert into DH_Client values ('CR90','Snorrie','Sturrluson','333 4567','1 Vik Way','Rekjavik','snorrie@iceland.com','Flat',400);

insert into DH_Client values ('CR34','Ferdinand','Oblogiotta','123 5555','12 Strumpetwise Street','Lagrange Orage', 'ferdy@orage.com','House',450);
insert into DH_Client values ('CR64','Joe','Schmoe','123 45678','1 High St','Largs','joes@largy.com','House',550);
insert into DH_Client values ('CR92','Bill','Gates','123 5555','1 Rich Street','Seattle','bill@gatesland.com','House',1000);
insert into DH_Client values ('CR55','Bruce','Wayne','555 6789','1 Wayne Manor','Gotham','wayne@batty.com','House',900);





insert into DH_viewing values ('CR62','PA14',to_date('2004-7-1','yyyy-mm-dd'),null);
insert into DH_viewing values('CR74','PG36',to_date('2004-7-1','yyyy-mm-dd'), null);
insert into DH_viewing values('CR74','PG4',to_date('2004-7-1','yyyy-mm-dd'),'Tidy but too small');
insert into DH_viewing values ('CR83','PA14',to_date('2004-7-2','yyyy-mm-dd'),null);
insert into DH_viewing values('CR83','PG4',to_date('2004-7-2','yyyy-mm-dd'),null);
insert into DH_viewing values ('CR55','PA14',to_date('2004-6-20','yyyy-mm-dd'),'size ok but location is not good');
insert into DH_viewing values('CR55','PG21',to_date('2004-6-21','yyyy-mm-dd'),null);
insert into DH_viewing values('CR64','PA14',to_date('2004-6-20','yyyy-mm-dd'),null);
insert into DH_viewing values('CR64','PG21',to_date('2004-11-22','yyyy-mm-dd'),'Not that bad ');
insert into DH_viewing values('CR64','PG36',to_date('2004-11-23','yyyy-mm-dd'),'Kitchen is too small.');
insert into DH_viewing values('CR34','PG16',to_date('2004-11-23','yyyy-mm-dd'),null);
insert into DH_viewing values('CR90','PG21',to_date('2004-11-25','yyyy-mm-dd'),null);
INSERT INTO DH_VIEWING VALUES ('CR90', 'PG4',SYSDATE,'rooms are too small');


 


INSERT INTO DH_REGISTRATION  values ('CR62','B002', 'SA9',to_date('2004-11-22','yyyy-mm-dd') );
INSERT INTO DH_REGISTRATION  values ('CR55','B003', 'SL21',to_date('2006-11-22','yyyy-mm-dd') );
INSERT INTO DH_REGISTRATION  values ('CR62','B004', 'SG37',to_date('2005-11-22','yyyy-mm-dd') );
INSERT INTO DH_REGISTRATION  values ('CR90','B004', 'SL21',to_date('2005-12-22','yyyy-mm-dd') );


INSERT INTO DH_LEASE values ( 1,'CR55','PG16',550,to_date('2005-12-22','yyyy-mm-dd'), to_date('2007-12-22','yyyy-mm-dd') );
INSERT INTO DH_LEASE values ( 2,'CR62','PG21',580,to_date('2006-11-22','yyyy-mm-dd'), to_date('2007-10-22','yyyy-mm-dd') );
INSERT INTO DH_LEASE values ( 3,'CR90','PG36',620,to_date('2003-10-22','yyyy-mm-dd'), to_date('2007-11-22','yyyy-mm-dd') );
INSERT INTO DH_LEASE values ( 4,'CR64','PG36',800,to_date('2002-12-22','yyyy-mm-dd'), to_date('2005-09-22','yyyy-mm-dd') );
INSERT INTO DH_LEASE values ( 5,'CR83','PL94',7500,to_date('2008-08-22','yyyy-mm-dd'), to_date('2009-12-22','yyyy-mm-dd') );