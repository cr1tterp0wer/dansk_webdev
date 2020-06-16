#Users table.
CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	email VARCHAR(100) NOT NULL UNIQUE KEY,
	password_digest VARCHAR(255) NOT NULL
);

#Sessions table.
# One user may have multiple sessions, TTL of sessions can be set from app (DEFAULT = 1day in secs)
CREATE TABLE sessions(
 	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	created_at TIMESTAMP NOT NULL,
 	user_id INT NOT NULL KEY,
 	session_token VARCHAR(100) NOT NULL UNIQUE KEY,
 	TTL INT NOT NULL DEFAULT 86400 # 1 day
);


#Paints table
CREATE TABLE paints(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	created_by INT NOT NULL, 
	updated_by INT NOT NULL,

	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	created_at TIMESTAMP NOT NULL,

	title VARCHAR(100) NOT NULL UNIQUE KEY,
	color_hex varchar(6) DEFAULT NULL,
	description TEXT DEFAULT NULL,
	quantitiy INT NOT NULL,
	special_instructions TEXT DEFAULT NULL,
	SKU VARCHAR(100) DEFAULT NULL
);