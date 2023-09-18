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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
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
    console.log(lastUser);
    return (lastUser === null || lastUser === void 0 ? void 0 : lastUser.id) ? lastUser === null || lastUser === void 0 ? void 0 : lastUser.id.substring(1) : '00000';
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ id }, { password: 0 });
    return result;
});
const updateSingleUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ payload });
    const result = yield user_model_1.User.findOneAndUpdate({ id }, payload, { new: true });
    console.log({ result });
    return result;
});
exports.UserService = {
    createUser,
    getLastUserId,
    getSingleUser,
    updateSingleUser,
};
