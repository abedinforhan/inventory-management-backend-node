"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("./customer.controller");
const router = express_1.default.Router();
router.post('/create-customer', customer_controller_1.CustomerControllers.createCustomer);
router.get('/:id', customer_controller_1.CustomerControllers.getSingleCustomer);
router.patch('/:id', customer_controller_1.CustomerControllers.updateCustomer);
router.delete('/:id', customer_controller_1.CustomerControllers.deleteCustomer);
router.get('/', customer_controller_1.CustomerControllers.getCustomers);
exports.CustomerRoutes = router;
