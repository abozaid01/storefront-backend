import Order from '../types/order.type';
import db from '../database/';

class OrderModel {
    // create
    async createOrder(o: Order): Promise<Order> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `INSERT INTO orders (status, user_id) VALUES ($1 ,$2) RETURNING * `;

            //run query
            const result = await conn.query(sql, [o.status, o.user_id]);

            //close connection
            conn.release();

            //return created user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to create new order ${o.status}): ${
                    (error as Error).message
                }`
            );
        }
    }

    //get all orders
    async getOrders(): Promise<Order[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT orders.*, array_agg(row_to_json(order_products)) AS items FROM orders FULL JOIN order_products ON orders.id = order_products.order_id GROUP BY orders.id`;

            //run query
            const result = await conn.query(sql);

            //close connection
            conn.release();

            //return all orders
            return result.rows;
        } catch (error) {
            throw new Error(
                `unable to get the requested orders list ${
                    (error as Error).message
                }`
            );
        }
    }

    //get specifc order
    async getOneOrder(id: number): Promise<Order> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT id ,status, user_id from orders WHERE id=($1)`;

            //run query
            const result = await conn.query(sql, [id]);

            //close connection
            conn.release();

            //return specifc order
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to get the requested order ${id}  ${
                    (error as Error).message
                }`
            );
        }
    }

    //update order
    async updateOrder(o: Order): Promise<Order> {
        try {
            //open connection
            const conn = await db.connect();
            const sql = `UPDATE orders SET status=($2) WHERE id=($1) RETURNING *`;

            //run query
            const result = await conn.query(sql, [o.id, o.status]);

            //close connection
            conn.release();

            //return updated
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to update the requested order : ${
                    (error as Error).message
                }`
            );
        }
    }

    //delete order
    async deleteOrder(id: number): Promise<Order> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `DELETE FROM orders WHERE id= ($1) RETURNING *`;

            //run query
            const result = await conn.query(sql, [id]);

            //close connection
            conn.release();

            //return deleted order
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to delete the requested order ${id}  ${
                    (error as Error).message
                }`
            );
        }
    }
}

export default OrderModel;
