import express from 'express';
import { CustomerControllers } from './customer.controller';

const router = express.Router();

// Endpoint to create a new customer
router.post('/create-customer', CustomerControllers.createCustomer);

// Endpoint to get a single customer by ID
router.get('/:id', CustomerControllers.getSingleCustomer);

// Endpoint to update a customer by ID
router.patch('/:id', CustomerControllers.updateCustomer);

// Endpoint to delete a customer by ID
router.delete('/:id', CustomerControllers.deleteCustomer);

// Endpoint to get a list of customers (with optional filtering and pagination)
router.get('/', CustomerControllers.getCustomers);

export const CustomerRoutes = router;
