DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
	id SERIAL, 
	titulo VARCHAR(25), 
	img VARCHAR(1000),
	descripcion VARCHAR(255), 
	likes INT
);

insert into posts ( titulo, img, descripcion, likes )values ('posts #1', 'img #1', 'description #1', 0);

SELECT * FROM  posts;

