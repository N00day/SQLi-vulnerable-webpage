CREATE DATABASE IF NOT EXISTS vulnsi;
USE vulnsi;
CREATE USER 'threatActor'@'%' IDENTIFIED WITH mysql_native_password BY '12345';
GRANT ALL PRIVILEGES ON vulnsi.* TO 'threatActor'@'%';
CREATE TABLE users(
  name varchar(255),
  password int
);

INSERT INTO users(name, password) VALUES ('root', 1234), ('guest', 34), ('bob', 12)
