"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const mongoose_1 = require("mongoose");
const supplierSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
});
const purchasedProductSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    perUnitBuyingPrice: {
        type: Number,
        required: true,
    },
    perUnitSellingPrice: {
        type: Number,
        required: true,
    },
    perUnitMaxPrice: {
        type: Number,
        required: true,
    },
    buyingQuantity: {
        type: Number,
        required: true,
    },
    totalBuyingPrice: {
        type: Number,
        required: true,
    },
});
const purchaseSchema = new mongoose_1.Schema({
    vatTax: {
        type: Number,
        required: true,
    },
    shippingCost: {
        type: Number,
        required: true,
    },
    otherCost: {
        type: Number,
        required: true,
    },
    grandTotal: {
        type: Number,
        required: true,
    },
    supplier: supplierSchema,
    products: [purchasedProductSchema],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Purchase = (0, mongoose_1.model)('Purchase', purchaseSchema);
