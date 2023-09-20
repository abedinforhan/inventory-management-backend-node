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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const allowedRoles = [user_1.ENUM_USER_ROLE.Manager, user_1.ENUM_USER_ROLE.ADMIN];
    console.log(user);
    if (!allowedRoles.includes(user.role)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid user role');
    }
    const newUser = yield user_model_1.User.create(user);
    if (!newUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user ');
    }
    return newUser;
});
const getLastUserId = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield user_model_1.User.findOne({
        role: role,
    }, { id: 1, role: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastUser === null || lastUser === void 0 ? void 0 : lastUser.id) ? lastUser === null || lastUser === void 0 ? void 0 : lastUser.id.substring(1) : '00000';
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ id }, { password: 0 });
    return result;
});
const getUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.userSearchableFields.map(field => ({
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
    const result = yield user_model_1.User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.countDocuments(whereConditions);
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
const updateSingleUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
// this bulk update is created for testing purposes
const updateAllUsers = (update) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateMany({}, update);
    return result;
});
exports.UserService = {
    createUser,
    getLastUserId,
    getSingleUser,
    updateSingleUser,
    getUsers,
    updateAllUsers,
};
