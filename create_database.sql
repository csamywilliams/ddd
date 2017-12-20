
CREATE TABLE sponsors ( id smallint unsigned not null auto_increment, 
						name varchar(100) not null, 
                        description varchar(1000) not null, 
                        link varchar(200),
                        image varchar(100),
                        isShown smallint not null,
                        constraint pk_sponsors primary key (id));
                        
INSERT INTO sponsors (id, name, description, link, image, isShown) VALUES (null, "SSDC",
		"This is a community for those who care and are proud of what they do. For those who are Developers, DBA's (Database Administrators), Testers, Dev Ops (Developer Operations), UX (User Experience) or UI (User Interface), regardless how experienced they are, who want to improve.",
		"https://www.meetup.com/Swansea-Software-Development-Meetup/",
		"ssdc.png",
        1);
        
INSERT INTO sponsors(id, name, description, link, image, isShown) VALUES (null, "SwanseaCon",
		"SwanseaCon is an agile development & software craftsmanship conference.",
		"http://www.swanseacon.co.uk",
		"swanseacon.png",
        1);
                        
CREATE TABLE contact ( id smallint unsigned not null auto_increment, 
						name varchar(100) not null, 
                        email varchar(100),
                        message varchar(500) not null, 
                        contactStatus smallint not null,
                        constraint pk_contact primary key (id));