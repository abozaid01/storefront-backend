--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id integer NOT NULL REFERENCES orders(id),
    product_id integer REFERENCES products(id)
);

ALTER TABLE order_products ADD FOREIGN KEY (order_id)
REFERENCES orders(id) ON DELETE CASCADE;