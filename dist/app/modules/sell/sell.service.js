"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_model_1 = require("../product/product.model");
const summary_model_1 = require("../summary/summary.model");
const sell_constant_1 = require("./sell.constant");
const sell_model_1 = require("./sell.model");
const createSell = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const { products, grandTotal } = payload;
    //calculate total purchased products quantity
    let totalSalesProduct = 0;
    try {
        const newPurchase = yield sell_model_1.Sell.create([payload], {
            session,
        });
        for (const pd of products) {
            const { id, sellingQuantity } = pd;
            const existingProduct = yield product_model_1.Product.findById(id).session(session);
            if (!existingProduct) {
                throw new Error(`Product with ID ${id} not found.`);
            }
            // decrement  to calculate purchased products quantity
            existingProduct.buyingQuantity -= sellingQuantity;
            totalSalesProduct += sellingQuantity;
            yield existingProduct.save();
        }
        // Update the Summary model
        const existingSummary = yield summary_model_1.Summary.findOne({}).session(session);
        if (existingSummary) {
            existingSummary.totalSaleAmount += grandTotal;
            existingSummary.totalSaleInvoices += 1;
            existingSummary.totalSalesProduct += totalSalesProduct;
            yield existingSummary.save();
        }
        yield session.commitTransaction();
        return newPurchase[0];
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const getSales = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: sell_constant_1.saleSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fulfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic Sort needs a field to do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield sell_model_1.Sell.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield sell_model_1.Sell.countDocuments(whereConditions);
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
});
const getSingleSell = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sell_model_1.Sell.findById(id);
    return result;
});
exports.SellServices = {
    createSell,
    getSales,
    getSingleSell,
};
