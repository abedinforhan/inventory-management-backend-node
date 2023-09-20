"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Brand',
    },
    unit: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Unit',
    },
    description: {
        type: String,
    },
    perUnitSellingPrice: {
        type: Number,
        default: 0,
    },
    perUnitMaxPrice: {
        type: Number,
        default: 0,
    },
    buyingQuantity: {
        type: Number,
        default: 0,
    },
    productImage: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        default: 'out-stock',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Product = (0, mongoose_1.model)('Product', productModel);
