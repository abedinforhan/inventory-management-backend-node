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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const summary_model_1 = require("../summary/summary.model");
const customer_constant_1 = require("./customer.constant");
const customer_model_1 = require("./customer.model");
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Create the customer
    const result = yield customer_model_1.Customer.create(payload);
    // Update the totalCustomer field in the Summary model
    try {
        const summary = yield summary_model_1.Summary.findOne();
        if (summary) {
            summary.totalCustomer += 1; // Increment the totalCustomer field
            yield summary.save(); // Save the updated summary document
        }
    }
    catch (error) {
        // Handle any errors that occur during the update process
        console.error('Error updating totalCustomer in Summary:', error);
        throw error;
    }
    return result;
});
const getCustomers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: customer_constant_1.customerSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield customer_model_1.Customer.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield customer_model_1.Customer.countDocuments(whereConditions);
    // calculate the page
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
const getSingleCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customer_model_1.Customer.findById(id);
});
const updateCustomer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customer_model_1.Customer.findByIdAndUpdate(id, payload, {
        new: true,
    });
});
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customer_model_1.Customer.findByIdAndDelete(id);
});
exports.CustomerServices = {
    createCustomer,
    getCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
};
