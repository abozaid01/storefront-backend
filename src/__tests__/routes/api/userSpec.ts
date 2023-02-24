import supertest from 'supertest';
import db from '../../../database';
import UserModel from '../../../models/user.model';
import User from '../../../types/user.type';
import app from '../../../server';

const userModel = new UserModel();
const request = supertest(app);
let token = '';

describe('Users API Endpoints', () => {
    const user = {
        email: 'test@test.com',
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123',
    } as User;

    beforeAll(async () => {
        const createdUser = await userModel.create(user);
        user.id = createdUser.id;
    });

    afterAll(async () => {
        // clean database
        const connection = await db.connect();
        const sql = 'DELETE FROM users;'; //\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
    });

    describe('Test Authenticate methods', () => {
        it('should authenticate to get token back', async () => {
            const res = await request
                .post('/api/user/auth')
                .set('Content-type', 'application/json')
                .send({
                    email: 'test@test.com',
                    password: 'test123',
                });
            expect(res.status).toBe(200);
            const { id, email, token: userToken } = res.body.data;
            expect(id).toBe(user.id);
            expect(email).toBe('test@test.com');
            token = userToken;
        });

        it('should be failed to authenticate with wrong email', async () => {
            const res = await request
                .post('/api/user/auth')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    email: 'wrong_email@email.com',
                    password: 'test123',
                });
            expect(res.status).toBe(401);
        });
    });

    describe('Test CRUD API methods', () => {
        it('should create new user', async () => {
            const res = await request
                .post('/api/user/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    email: 'test2@test2.com',
                    user_name: 'testUser2',
                    first_name: 'Test2',
                    last_name: 'User2',
                    password: 'test123',
                } as User);
            expect(res.status).toBe(200);
            const { email, user_name, first_name, last_name } = res.body.data;
            expect(email).toBe('test2@test2.com');
            expect(user_name).toBe('testUser2');
            expect(first_name).toBe('Test2');
            expect(last_name).toBe('User2');
        });

        it('should get list of users', async () => {
            const res = await request
                .get('/api/user/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data).toBeDefined;
        });

        it('should get user info', async () => {
            const res = await request
                .get(`/api/user/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.user_name).toBe('testUser');
            expect(res.body.data.email).toBe('test@test.com');
        });

        it('should update user info', async () => {
            const res = await request
                .patch(`/api/user/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...user,
                    user_name: 'MohamedAhmed',
                    first_name: 'Mohamed',
                    last_name: 'Ahmed',
                });
            expect(res.status).toBe(200);

            const { id, email, user_name, first_name, last_name } =
                res.body.data;
            expect(id).toBe(user.id);
            expect(email).toBe(user.email);
            expect(user_name).toBe('MohamedAhmed');
            expect(first_name).toBe('Mohamed');
            expect(last_name).toBe('Ahmed');
        });

        it('should delete user', async () => {
            const res = await request
                .delete(`/api/user/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(user.id);
            expect(res.body.data.user_name).toBe('MohamedAhmed');
        });
    });
});
