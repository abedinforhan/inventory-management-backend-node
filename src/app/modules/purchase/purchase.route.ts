import express from 'express';
import { PurchaseControllers } from './purchase.controller';

const router = express.Router();

router.post('/create-purchase', PurchaseControllers.createPurchase);

router.get('/', PurchaseControllers.getPurchases);

router.get('/:purchaseId', PurchaseControllers.getSinglePurchase);

export const PurchaseRoutes = router;
