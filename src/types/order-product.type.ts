import Product from './product.type';

type OrderProduct = {
    id?: number;
    quantity: number;
    orderId: string;
    productId: string;
    products?: Product[];
};

export default OrderProduct;
