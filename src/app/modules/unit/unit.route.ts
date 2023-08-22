import express from 'express';
import { UnitControllers } from './unit.controller';

const router = express.Router();

router.post('/create-unit', UnitControllers.createUnit);

router.get('/:id');

router.patch('/:id', UnitControllers.updateUnit);

router.delete('/:id', UnitControllers.deleteUnit);

router.get('/', UnitControllers.getUnits);

export const UnitRoutes = router;
