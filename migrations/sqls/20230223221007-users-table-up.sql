--CREATE users table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(30) UNIQUE,
    user_name VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    password  VARCHAR(50) NOT NULL
);
--ALTER SEQUENCE users_id_seq RESTART WITH 1;