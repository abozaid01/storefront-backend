CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(255),
    price integer NOT NULL,
    category VARCHAR(150) NOT NULL

);
ALTER SEQUENCE products_id_seq RESTART WITH 1;