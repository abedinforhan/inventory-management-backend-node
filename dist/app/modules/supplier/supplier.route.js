"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRoutes = void 0;
const express_1 = __importDefault(require("express"));
const supplier_controller_1 = require("./supplier.controller");
const router = express_1.default.Router();
router.post('/create-supplier', supplier_controller_1.supplierController.createSupplier);
router.get('/:id', supplier_controller_1.supplierController.getSingleSupplier);
router.get('/', supplier_controller_1.supplierController.getAllSuppliers);
router.delete('/:id', supplier_controller_1.supplierController.deleteSupplier);
router.patch('/:id', supplier_controller_1.supplierController.updateSupplier);
exports.SupplierRoutes = router;
