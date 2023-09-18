"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = exports.SupplierSchema = void 0;
const mongoose_1 = require("mongoose");
const supplier_constant_1 = require("./supplier.constant");
exports.SupplierSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: supplier_constant_1.gender,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Supplier = (0, mongoose_1.model)('Supplier', exports.SupplierSchema);
