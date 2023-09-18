"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summary = void 0;
const mongoose_1 = require("mongoose");
const summarySchema = new mongoose_1.Schema({
    totalPurchaseAmount: {
        type: Number,
        default: 0,
    },
    totalSaleAmount: {
        type: Number,
        default: 0,
    },
    totalPurchasedProduct: {
        type: Number,
        default: 0,
    },
    totalSalesProduct: {
        type: Number,
        default: 0,
    },
    profitLoss: {
        type: Number,
        default: 0,
    },
    totalPurchaseInvoices: {
        type: Number,
        default: 0,
    },
    totalSaleInvoices: {
        type: Number,
        default: 0,
    },
    totalCustomer: {
        type: Number,
        default: 0,
    },
    totalSupplier: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.Summary = (0, mongoose_1.model)('Summary', summarySchema);
