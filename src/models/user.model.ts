import db from '../database';
import User from '../types/user.type';
import config from '../middleware/config';
import bcrypt from 'bcrypt';

const hash = async (password: string) => {
    const salt = parseInt(config.salt as string, 10);
    return await bcrypt.hash(`${password}${config.pepper}`, salt);
};

class UserModel {
    //create new user
    async create(user: User): Promise<User> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) values ($1, $2, $3, $4, $5) RETURNING id, email, user_name, first_name, last_name`;

            //run query
            const result = await conn.query(sql, [
                user.email,
                user.user_name,
                user.first_name,
                user.last_name,
                await hash(user.password),
            ]);

            //close connection
            conn.release();

            //return created user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to create user: ${user.user_name}): ${
                    (error as Error).message
                }`
            );
        }
    }
    //get all users
    async getAll(): Promise<User[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT id ,email, user_name, first_name, last_name from users`;

            //run query
            const result = await conn.query(sql);

            //close connection
            conn.release();

            //return all users
            return result.rows;
        } catch (error) {
            throw new Error(
                `unable to get the requested user ${(error as Error).message}`
            );
        }
    }

    //get specific user
    async getOne(id: number): Promise<User> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT id ,email, user_name, first_name, last_name from users WHERE id=($1)`;

            //run query
            const result = await conn.query(sql, [id]);

            //close connection
            conn.release();

            //return specific user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to get the requested user ${id}  ${
                    (error as Error).message
                }`
            );
        }
    }

    //update user
    async updateUser(user: User): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING id, email, user_name, first_name, last_name`;

            //run query
            const result = await conn.query(sql, [
                user.email,
                user.user_name,
                user.first_name,
                user.last_name,
                await hash(user.password),
                user.id,
            ]);

            //release connection
            conn.release();

            //return the updated user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to update the requested user : ${
                    (error as Error).message
                }`
            );
        }
    }

    //delete user
    async deleteUser(id: number): Promise<User> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `DELETE FROM users WHERE id= ($1) RETURNING id, email, user_name, first_name, last_name`;

            //run query
            const result = await conn.query(sql, [id]);

            //release connection
            conn.release();

            //return the deleted user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to delete the requested user ${id}  ${
                    (error as Error).message
                }`
            );
        }
    }

    //authenticate user
    async auth(email: string, password: string): Promise<User | null> {
        try {
            //open connection
            const conn = await db.connect();
            const sql = 'SELECT password FROM users WHERE email=$1';

            //run query
            const result = await conn.query(sql, [email]);

            //if user was found in the database
            if (result.rows.length) {
                const { password: hashPassword } = result.rows[0];
                const passwordValid = await bcrypt.compare(
                    `${password}${config.pepper}`,
                    hashPassword
                );

                //check if the password is correct in the database
                if (passwordValid) {
                    const userInfo = await conn.query(
                        'SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)',
                        [email]
                    );
                    return userInfo.rows[0];
                }
            }

            //release connection
            conn.release();

            //return null if user not found in the database
            return null;
        } catch (error) {
            throw new Error(`Unable to login: ${(error as Error).message}`);
        }
    }
}

export default UserModel;
