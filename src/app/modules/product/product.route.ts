import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/create-product', ProductControllers.createProduct);

router.get('/:id', ProductControllers.getSingleProduct);

router.patch('/:id', ProductControllers.updateProduct);

router.delete('/:id', ProductControllers.deleteProduct);

router.get('/', ProductControllers.getProducts);

export const ProductRoutes = router;
