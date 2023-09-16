import express from 'express';
import { BrandControllers } from './brand.controller';

const router = express.Router();

router.post('/create-brand', BrandControllers.createBrand);

router.get('/:id');

router.patch('/:id', BrandControllers.updateBrand);

router.delete('/:id', BrandControllers.deleteBrand);

router.get('/', BrandControllers.getBrands);

export const BrandRoutes = router;
