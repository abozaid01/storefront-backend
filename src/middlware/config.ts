import dotenv from 'dotenv';

dotenv.config();

const {
    PORT,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DATABASE,
    POSTGRES_DATABASE_TEST,
    POSTGRES_USER,
    POStGRES_PASSWORD,
    NODE_ENV,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
} = process.env;

export default {
    port: PORT,
    host: POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    user: POSTGRES_USER,
    databse: NODE_ENV === 'dev' ? POSTGRES_DATABASE : POSTGRES_DATABASE_TEST,
    password: POStGRES_PASSWORD,
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
};
