--CREATE users table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(30) UNIQUE,
    user_name VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    password  VARCHAR(50) NOT NULL
)