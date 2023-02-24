import db from '../database';
import User from '../types/user.type';

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
                user.password,
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
    async getOne(id: string): Promise<User> {
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
                user.password,
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
}

export default UserModel;
