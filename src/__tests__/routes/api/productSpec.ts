import supertest from 'supertest';
import db from '../../../database';
import app from '../../../server';
import UserModel from '../../../models/user.model';
import User from '../../../types/user.type';

const userModel = new UserModel();
const request = supertest(app);
let token = '';

describe('Products API Endpoints', () => {
    beforeAll(async () => {
        const user = {
            email: 'test@a.com',
            user_name: 'testUser',
            first_name: 'Test',
            last_name: 'User',
            password: 'test123',
        } as User;

        await userModel.create(user);
    });
    afterAll(async () => {
        // clean database
        const connection = await db.connect();
        const sql = 'DELETE FROM users;'; //\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
    });
    describe('Test Authentication method', () => {
        it('should authenticate to get token', async () => {
            const res = await request
                .post('/api/user/auth')
                .set('Content-type', 'application/json')
                .send({
                    email: 'test@a.com',
                    password: 'test123',
                });
            expect(res.status).toBe(200);
            const { email, token: userToken } = res.body.data;
            expect(email).toBe('test@a.com');
            token = userToken;
        });
    });

    describe('Test CRUD API methods', () => {
        it('should create new product', async () => {
            const res = await request
                .post('/api/product/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'product name',
                    description: 'product description',
                    price: 9,
                    category: 'category.',
                });
            expect(res.status).toBe(200);
            const { name, description, price, category } = res.body.data;
            expect(name).toBe('product name');
            expect(description).toBe('product description');
            expect(price).toBe(9);
            expect(category).toBe('category.');
        });

        it('should get list of products', async () => {
            const res = await request
                .get('/api/product/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.product).not.toBeNull;
        });

        it('should get product info', async () => {
            const res = await request
                .get('/api/product/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data).not.toBeNull;
        });

        it('should update the target product data', async () => {
            const res = await request
                .put('/api/product/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    id: 1,
                    name: 'product',
                    description: 'description',
                    price: 20,
                    category: 'category.',
                });
            expect(res.status).toBe(200);
        });

        it('should delete the selected product by id', async () => {
            const res = await request
                .delete('/api/product/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data).not.toBeNull;
        });
    });
});
