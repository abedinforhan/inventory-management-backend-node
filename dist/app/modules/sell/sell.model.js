"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sell = void 0;
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
});
const soldProductSchema = new mongoose_1.Schema({
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
    perUnitSellingPrice: {
        type: Number,
        required: true,
    },
    sellingQuantity: {
        type: Number,
        required: true,
    },
    totalSellingPrice: {
        type: Number,
        required: true,
    },
});
const sellSchema = new mongoose_1.Schema({
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
    shippingAddress: {
        type: String,
        required: true,
    },
    customer: CustomerSchema,
    products: [soldProductSchema],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Sell = (0, mongoose_1.model)('Sell', sellSchema);
