import express from 'express';
import { PurchaseHistoryControllers } from './purchaseHistory.controller';

const router = express.Router();

router.post(
  '/create-purchase',
  PurchaseHistoryControllers.createPurchaseHistory
);

router.get('/', PurchaseHistoryControllers.getPurchaseHistories);

export const PurchaseHistoryRoutes = router;
