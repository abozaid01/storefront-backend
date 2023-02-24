import UserModel from '../../models/user.model';
import db from '../../database';
import User from '../../types/user.type';

const userModel = new UserModel();

describe('Test User Model', () => {
    describe('Test methods in the user model', () => {
        it('Should have creat method', () => {
            expect(userModel.create).toBeDefined();
        });

        it('should return one user', () => {
            expect(userModel.getOne).toBeDefined();
        });

        it('should return all users', () => {
            expect(userModel.getAll).toBeDefined();
        });

        it('Should update user method', () => {
            expect(userModel.updateUser).toBeDefined();
        });

        it('should  del User method', () => {
            expect(userModel.deleteUser).toBeDefined();
        });

        it('should Authenticate User method', () => {
            expect(userModel.auth).toBeDefined();
        });
    });

    describe('Test User Model Logic', () => {
        const user = {
            email: 'test@test.com',
            user_name: 'test',
            first_name: 'first',
            last_name: 'last',
            password: 'test123',
        } as User;

        beforeAll(async () => {
            const createdUser = await userModel.create(user);
            user.id = createdUser.id;
        });

        afterAll(async () => {
            const connection = await db.connect();
            const sql = 'DELETE FROM users;'; //\nALTER SEQUENCE users_id_seq RESTART WITH 1;'
            await connection.query(sql);
            connection.release();
        });

        it('Create method should return a New User', async () => {
            const newUser = await userModel.create({
                email: 'test2@test2.com',
                user_name: 'test2',
                first_name: 'test2',
                last_name: 'last2',
                password: 'test1234',
            } as User);
            expect(newUser).toEqual({
                id: newUser.id,
                email: 'test2@test2.com',
                user_name: 'test2',
                first_name: 'test2',
                last_name: 'last2',
            } as User);
        });

        it('Get All method should return all users available in DB', async () => {
            const users = await userModel.getAll();
            expect(users.length).toBe(2);
        });

        it('Get user method should return ab when called with ID', async () => {
            const retrieved = await userModel.getOne(user.id as string);
            expect(retrieved.id).toBe(user.id);
            expect(retrieved.email).toBe(user.email);
            expect(retrieved.user_name).toBe(user.user_name);
            expect(retrieved.first_name).toBe(user.first_name);
            expect(retrieved.last_name).toBe(user.last_name);
        });

        it('Update user  method should return a user with the new data', async () => {
            const updatedUser = await userModel.updateUser({
                ...user,
                user_name: 'test1 update',
                first_name: 'Hossam',
                last_name: 'Gouda',
            });
            expect(updatedUser.id).toBe(user.id);
            expect(updatedUser.email).toBe(user.email);
            expect(updatedUser.user_name).toBe('test1 update');
            expect(updatedUser.first_name).toBe('Hossam');
            expect(updatedUser.last_name).toBe('Gouda');
        });

        it('Delete user method should delete user from DB', async () => {
            const deletedUser = await userModel.deleteUser(user.id as string);
            expect(deletedUser.id).toBe(user.id);
        });
    });
});
