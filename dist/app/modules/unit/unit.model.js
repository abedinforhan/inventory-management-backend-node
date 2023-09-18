"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
const mongoose_1 = require("mongoose");
const UnitSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Unit = (0, mongoose_1.model)('Unit', UnitSchema);
