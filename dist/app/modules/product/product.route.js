"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/create-product', product_controller_1.ProductControllers.createProduct);
router.get('/:id', product_controller_1.ProductControllers.getSingleProduct);
router.patch('/:id', product_controller_1.ProductControllers.updateProduct);
router.delete('/:id', product_controller_1.ProductControllers.deleteProduct);
router.get('/', product_controller_1.ProductControllers.getProducts);
exports.ProductRoutes = router;
