"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellRoutes = void 0;
const express_1 = __importDefault(require("express"));
const sell_controller_1 = require("./sell.controller");
const router = express_1.default.Router();
router.post('/create-sell', sell_controller_1.SaleControllers.createSell);
router.get('/', sell_controller_1.SaleControllers.getSales);
router.patch('/', sell_controller_1.SaleControllers.updateSales);
router.get('/:sellId', sell_controller_1.SaleControllers.getSingleSale);
exports.SellRoutes = router;
