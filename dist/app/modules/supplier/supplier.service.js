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
exports.SupplierService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const summary_model_1 = require("../summary/summary.model");
const supplier_constant_1 = require("./supplier.constant");
const supplier_model_1 = require("./supplier.model");
// const createSupplier = async (
//   payload: ISupplier
// ): Promise<ISupplier | null> => {
//   const result = await Supplier.create(payload);
//   return result;
// };
const createSupplier = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield supplier_model_1.Supplier.create(payload);
    // Update the totalSupplier field in the Summary model
    yield summary_model_1.Summary.updateOne({}, { $inc: { totalSupplier: 1 } } // Increment totalSupplier by 1 for each new supplier created
    );
    return result;
});
const getAllSuppliers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: supplier_constant_1.supplierSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield supplier_model_1.Supplier.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate('brand');
    // total count
    const total = yield supplier_model_1.Supplier.countDocuments(whereConditions);
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
const getSingleSupplier = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield supplier_model_1.Supplier.findById(id).populate('brand');
    return result;
});
const updateSupplier = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield supplier_model_1.Supplier.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Supplier not found !');
    }
    const result = yield supplier_model_1.Supplier.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteSupplier = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the student is exist
    const isExist = yield supplier_model_1.Supplier.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Supplier  not found !');
    }
    const result = yield supplier_model_1.Supplier.findByIdAndDelete(id);
    return result;
});
exports.SupplierService = {
    createSupplier,
    getAllSuppliers,
    getSingleSupplier,
    updateSupplier,
    deleteSupplier,
};
