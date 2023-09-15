import express from 'express';
import { SummaryController } from './summary.controllers';
const router = express.Router();

router.get('/getSummary', SummaryController.getSummary);

export const SummaryRoutes = router;
