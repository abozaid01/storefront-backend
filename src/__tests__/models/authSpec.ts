import UserModel from '../../models/user.model';
import db from '../../database';
import User from '../../types/user.type';

const userModel = new UserModel();

describe('Auth Module', () => {
    describe('Test methods exists', () => {
        it('should have an Authenticate User method', () => {
            expect(userModel.auth).toBeDefined();
        });
    });

    describe('test authentication method logic', () => {
        const user = {
            email: 'a@gmail.com',
            user_name: 'a',
            first_name: 'b',
            last_name: 'c',
            password: '123',
        } as User;

        beforeAll(async () => {
            const createdUser = await userModel.create(user);
            user.id = createdUser.id;
        });

        afterAll(async () => {
            const connection = await db.connect();
            const sql = 'DELETE FROM users;'; //incase of serial id (not uuid) use => \nALTER SEQUENCE users_id_seq RESTART WITH 1;
            await connection.query(sql);
            connection.release();
        });

        it('authent method returning authenticated user', async () => {
            const authenticatedUser = await userModel.auth(
                user.email,
                user.password as string
            );
            expect(authenticatedUser?.email).toBe(user.email);
            expect(authenticatedUser?.user_name).toBe(user.user_name);
            expect(authenticatedUser?.first_name).toBe(user.first_name);
            expect(authenticatedUser?.last_name).toBe(user.last_name);
        });

        it('Auth method should return null for not auth users', async () => {
            const authenticatedUser = await userModel.auth(
                'fakemail@mail.com',
                'fake'
            );
            expect(authenticatedUser).toBe(null);
        });
    });
});
