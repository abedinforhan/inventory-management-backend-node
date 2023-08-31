import express from 'express';
import { CustomerControllers } from './customer.controller';

const router = express.Router();

router.post('/create-customer', CustomerControllers.createCustomer);

router.get('/:id', CustomerControllers.getSingleCustomer);

router.patch('/:id', CustomerControllers.updateCustomer);

router.delete('/:id', CustomerControllers.deleteCustomer);

router.get('/', CustomerControllers.getCustomers);

export const CustomerRoutes = router;
