import express from 'express';
import { SaleControllers } from './sell.controller';

const router = express.Router();

router.post('/create-sell', SaleControllers.createSell);

router.get('/', SaleControllers.getSales);

router.get('/:sellId', SaleControllers.getSingleSale);

export const SellRoutes = router;
