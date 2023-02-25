import db from '../../database/';
import User from '../../types/user.type';
import Product from '../../types/product.type';
import Order from '../../types/order.type';
import OrderProduct from '../../types/order-product.type';
import UserModel from '../../models/user.model';
import ProductModel from '../../models/product.model';
import OrderProductModel from '../../models/order-product.model';
import OrderModel from '../../models/order.model';

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();
const orderProductModel = new OrderProductModel();

describe('Order Product Model', () => {
    describe('Test if methods exist', () => {
        it('should have an index method', () => {
            expect(orderProductModel.index).toBeDefined();
        });

        it('should have a show method', () => {
            expect(orderProductModel.show).toBeDefined();
        });

        it('should have a create method', () => {
            expect(orderProductModel.create).toBeDefined();
        });

        it('should have a delete method', () => {
            expect(orderProductModel.delete).toBeDefined();
        });
    });

    describe('Test Order Products Model logic', () => {
        const user = {
            email: 'test@test.com',
            user_name: 'testUser',
            first_name: 'Test',
            last_name: 'User',
            password: 'test123',
        } as User;

        const product = {
            name: 'product name',
            description: 'product description',
            price: 9,
            category: 'Electronics.',
        } as Product;

        const order = {
            user_id: 1,
            status: 'active',
        } as Order;

        const orderProduct = {
            quantity: 1,
            orderId: '1',
            productId: '1',
        } as OrderProduct;

        beforeAll(async () => {
            // setup user/product to test with
            await userModel.create(user);
            await productModel.createProduct(product);
            await orderModel.createOrder(order);
        });

        afterAll(async () => {
            const connection = await db.connect();
            const sql =
                'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
            await connection.query(sql);
            connection.release();
        });

        it('Create method should return an order product', async () => {
            const createdOrderProduct = await orderProductModel.create(
                orderProduct.quantity,
                orderProduct.productId,
                orderProduct.productId
            );
            expect(createdOrderProduct.quantity).toBe(1);
        });

        it('Index method should return a list of products in a specific order', async () => {
            const orderProducts = await orderProductModel.index(1);
            expect(orderProducts[0].id).toBe(1);
        });

        it('Show method should return the correct product in a specific order', async () => {
            const targetOrderProduct = await orderProductModel.show('1', '1');
            expect(targetOrderProduct.quantity).toBe(1);
        });

        it('Edit method should return a order with edited properties', async () => {
            const editOrderProduct = await orderProductModel.edit({
                id: 1,
                quantity: 10,
                orderId: '1',
                productId: '1',
            });
            expect(editOrderProduct.quantity).toEqual(10);
        });

        it('Delete method should remove products from list of product in order', async () => {
            const deletedOrderProduct = await orderProductModel.delete(
                '1',
                '1'
            );
            expect(deletedOrderProduct.id).toBe(1);
        });
    });
});
