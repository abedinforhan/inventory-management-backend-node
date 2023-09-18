"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const purchase_controller_1 = require("./purchase.controller");
const router = express_1.default.Router();
router.post('/create-purchase', purchase_controller_1.PurchaseControllers.createPurchase);
router.get('/', purchase_controller_1.PurchaseControllers.getPurchases);
router.get('/:purchaseId', purchase_controller_1.PurchaseControllers.getSinglePurchase);
exports.PurchaseRoutes = router;
