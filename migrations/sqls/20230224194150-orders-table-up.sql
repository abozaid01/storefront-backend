--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(200),
    user_id integer NOT NULL REFERENCES users(id)
);

ALTER TABLE orders ADD FOREIGN KEY (user_id)
REFERENCES users(id) ON DELETE CASCADE;