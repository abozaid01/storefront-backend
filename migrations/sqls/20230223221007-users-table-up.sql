--CREATE users table
--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(30) UNIQUE,
    user_name VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    password  VARCHAR(250) NOT NULL
);

ALTER SEQUENCE users_id_seq RESTART WITH 1;