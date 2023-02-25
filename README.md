# storefront-backend

# Storefront project UDacity Nanodgree.

This is a part of Udacity Nanodgree Course for developing a backend server with the Following technologies (Postgres,db-migrate , dotenv , express, jsonwebtoken , Node js , TypeScript ,Jasmine Unit Test, supertest )

1-`yarn` or `npm install` to insatll project dependencies.
2- yarn dev to start the server on port 5555
3- Env Variables as the following :

# ENV VARIABLES EXAMPLES

```
PORT=555

ENV=dev
#database info
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_dev
POSTGRES_DB_TEST=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123
BCRYPT_PASSWORD=secret,
SALT_ROUNDS=10,
TOKEN_SECRET=secret-token
```

---

## Setup

To make sure the API can connect to the db it is necessary to create a `database.json` file with the following format

```json
{
    "dev": {
        "driver": "pg",
        "host": { "ENV": "POSTGRES_HOST" },
        "port": { "ENV": "POSTGRES_PORT" },
        "database": { "ENV": "POSTGRES_DATABASE" },
        "user": { "ENV": "POSTGRES_USER" },
        "password": { "ENV": "POSTGRES_PASSWORD" }
    },
    "test": {
        "driver": "pg",
        "host": { "ENV": "POSTGRES_HOST" },
        "port": { "ENV": "POSTGRES_PORT" },
        "database": { "ENV": "POSTGRES_DATABASE_TEST" },
        "user": { "ENV": "POSTGRES_USER" },
        "password": { "ENV": "POSTGRES_PASSWORD" }
    }
}
```

### Database config

The API connects to a postgres database. As a first step, it is necessary to create two databases (development and test) on your local machine. Run the command `psql -U postgres -d postgres` in terminal to open the postgres CLI. after entering `your password` to make sure you are connected to your physical database

### Migration

`npm i db-migrate migrate-pg`

`npx db-migrate create users-table --sql-file`

# Database Schema

implement the schema in sql files

### Users Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(60) UNIQUE,
    user_name VARCHAR(60) NOT NULL,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    password  VARCHAR(255) NOT NULL

);

ALTER SEQUENCE users_id_seq RESTART WITH 1;
```

### Products Schema

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(255),
    price integer NOT NULL,
    category VARCHAR(150) NOT NULL

);
```

### Orders Schema

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(100),
    user_id bigint NOT NULL REFERENCES users(id)
);
```

### orders-Products Schema

```sql
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id BIGINT REFERENCES orders(id) NOT NULL,
    product_id bigint REFERENCES products(id)
);
```

`npx db-migrate up` to create the table in the physical database

and then you can start development with `npm run dev` or testing with `npm run test`

## innitaing the databases in dev mode

npx migrate up

Available endpoints are (products ,users , orders)

## Token and Authentication

added as a middle ware and passed to requested routes to authenticated.

# API Endpoints

#### Users

-   Index [token required]: `'users/' [GET] (token)`
-   Show [token required]: `'users/:id' [GET] (token)`
-   Create (args: User)[token required]: `'users/' [POST] (token)`
-   Update order (args: new user data)[token required]: `'users/:id [PATCH] (token)`
-   Delete [token required]: `'users/:id' [DELETE] (token)`

#### Products

-   Index: `'products/' [GET]`
-   Show: `'products/:id' [GET]`
-   Create (args: Product)[token required]: `'products/' [POST] (token)`
-   Update order (args: new order data)[token required]: `'products/:id [PATCH] (token)`
-   Delete: `'products/:id [DELETE]`

#### Orders

-   Index [token required]: `'orders/' [GET] (token)`
-   Create [token required]: `'orders/' [POST] (token)`
-   Show Order by user [token required]: `'orders/:id' [GET] (token)`
-   Update order [token required]: `'orders/:id [PUT] (token)`
-   Delete [token required]: `'orders/:id [DELETE] (token)`

### Order-Products

-   Create [token required]: `'/order-products/orders/:id/products' [POST] (token)`
-   Index [token required]: `'order-products/orders/:id/products/:id' [GET] (token)`
-   Show Order by user [token required]: `'order-products/orders/:id/products/:id' [GET] (token)`
-   Update order [token required]: `'order-products/orders/:id/products/:id' [PATCH] (token)`
    -Delete [token required]: `'order-products/orders/:id/products/:id' [DELETE] (token)`
