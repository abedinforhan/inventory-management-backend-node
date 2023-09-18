"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandRoutes = void 0;
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("./brand.controller");
const router = express_1.default.Router();
router.post('/create-brand', brand_controller_1.BrandControllers.createBrand);
router.get('/:id');
router.patch('/:id', brand_controller_1.BrandControllers.updateBrand);
router.delete('/:id', brand_controller_1.BrandControllers.deleteBrand);
router.get('/', brand_controller_1.BrandControllers.getBrands);
exports.BrandRoutes = router;
