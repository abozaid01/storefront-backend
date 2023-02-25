import supertest from 'supertest';
import db from '../../../database/';
import app from '../../../server';
import UserModel from '../../../models/user.model';
import User from '../../../types/user.type';
//import Order from '../../../types/order.type';

const userModel = new UserModel();
const request = supertest(app);
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
let token: string = '';

describe('Test Orders API Endpoints', () => {
    beforeAll(async () => {
        const user = {
            email: 'gouda@h.com',
            user_name: 'hos',
            first_name: 'Hossam',
            last_name: 'Gouda',
            password: '321',
        } as User;

        await userModel.create(user);
    });

    afterAll(async () => {
        // clean db
        const connection = await db.connect();
        const sql =
            'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
    });

    describe('Test Authenticate method', () => {
        it('should be able to authenticate to get token', async () => {
            const res = await request
                .post('/api/users/auth')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

                .send({
                    email: 'gouda@h.com',
                    password: '321',
                });
            expect(res.status).toBe(200);
            const { id, email, token: userToken } = res.body.data;
            expect(id).toBe(1);
            expect(email).toBe('gouda@h.com');
            token = userToken;
        });
    });

    describe('Test CRUD API methods', () => {
        it('should create new Product item', async () => {
            const res = await request
                .post('/api/orders')
                .set('Content-type', 'application/json')
                .send({
                    status: 'active',
                    user_id: 1,
                });
            expect(res.status).toBe(200);
            const { user_id } = res.body.data;
            expect(user_id).toBe('1');
        });

        it('should get list of orders in the DB', async () => {
            const res = await request
                .get('/api/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.orders).not.toBeFalse;
        });

        it('should get target order info', async () => {
            const res = await request
                .get('/api/orders/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        });

        it('should get order info for current user', async () => {
            const res = await request
                .get('/api/orders/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        });

        it('should update the target order informations', async () => {
            const res = await request
                .patch('/api/orders/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    status: 'active',
                    user_id: 1,
                });
            expect(res.status).toBe(200);
        });

        it('should delete order', async () => {
            const res = await request
                .delete('/api/orders/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        });
    });
});
