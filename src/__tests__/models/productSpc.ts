import ProductModel from '../../models/product.model';
import Product from '../../types/product.type';
import db from '../../database/';

const productModel = new ProductModel();

describe('Product Model', () => {
    describe('Test methods exist', () => {
        it('should have an getAllProducts method', () => {
            expect(productModel.getProducts).toBeDefined();
        });

        it('should have a getOneProduct method', () => {
            expect(productModel.getOneProduct).toBeDefined();
        });

        it('should have a createProduct method', () => {
            expect(productModel.createProduct).toBeDefined();
        });

        it('should have a deleteProduct method', () => {
            expect(productModel.deleteProduct).toBeDefined();
        });
    });

    describe('Test Model logic', () => {
        const product = {
            name: 'iphone 14',
            description: 'product description',
            price: 50,
            category: 'Phones.',
        } as Product;

        afterAll(async () => {
            const connection = await db.connect();
            const sql =
                'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
            await connection.query(sql);
            connection.release();
        });

        it('Create method should add a new product', async () => {
            const createdProduct = await productModel.createProduct(product);
            expect(createdProduct).toEqual({
                ...product,
                id: createdProduct.id,
                price: createdProduct.price,
            });
        });

        it('Index method should return a list of products', async () => {
            const products = await productModel.getProducts();
            expect(products.length).toBe(1);
            expect(products[0].name).toBe('iphone 14');
        });

        it('Show method should return the correct product', async () => {
            const returnedProduct = await productModel.getOneProduct(1);
            expect(returnedProduct).toEqual({
                ...product,
                id: 1,
                price: returnedProduct.price,
            });
        });

        it('Edit method should return a product with edited attributes', async () => {
            const returnedProduct = await productModel.updateProduct({
                id: 1,
                name: 'iphone 14 pro',
                description: 'product description modified',
                price: 10,
                category: 'Phones.',
            });
            expect(returnedProduct.name).toBe('iphone 14 pro');
            expect(returnedProduct.description).toBe(
                'product description modified'
            );
        });

        it('Delete method should delete the product', async () => {
            const deletedProduct = await productModel.deleteProduct(1);
            expect(deletedProduct.id).toBe(1);
        });
    });
});
