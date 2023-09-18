"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNo1: {
        type: String,
        required: true,
    },
    contactNo2: {
        type: String,
        required: false,
    },
    shippingAddress: {
        type: String,
    },
    city: {
        type: String,
        required: true,
        enum: [
            'Dhaka',
            'Chattogram',
            'Khulna',
            'Rajshahi',
            'Barisal',
            'Sylhet',
            'Rangpur',
            'Comilla',
            'Mymensingh',
        ],
    },
    zipCode: {
        type: Number,
        required: true,
    },
    profileImage: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Customer = (0, mongoose_1.model)('Customer', customerSchema);
