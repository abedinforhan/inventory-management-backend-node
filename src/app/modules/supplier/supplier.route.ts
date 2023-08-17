import express from 'express';
import { supplierController } from './supplier.controller';

const router = express.Router();

router.post('/create-supplier', supplierController.createSupplier);

router.get('/:id', supplierController.getSingleSupplier);

router.get('/', supplierController.getAllSuppliers);

router.delete('/:id', supplierController.deleteSupplier);

router.patch('/:id', supplierController.updateSupplier);

export const SupplierRoutes = router;
