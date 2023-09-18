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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.findLastAdminId = exports.generateManagerId = exports.findLastManagerId = void 0;
const user_model_1 = require("./user.model");
// manager ID
const findLastManagerId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastManager = yield user_model_1.User.findOne({
        role: 'manager',
    }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastManager === null || lastManager === void 0 ? void 0 : lastManager.id) ? lastManager.id.substring(7) : null;
});
exports.findLastManagerId = findLastManagerId;
const generateManagerId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastManagerId = (yield (0, exports.findLastManagerId)()) || (0).toString().padStart(5, '0'); //00000
    //increment by 1
    let incrementedId = (parseInt(lastManagerId) + 1).toString().padStart(5, '0');
    incrementedId = `manager${incrementedId}`;
    return incrementedId;
});
exports.generateManagerId = generateManagerId;
// admin ID
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield user_model_1.User.findOne({
        role: 'admin',
    }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin.id.substring(5) : null;
});
exports.findLastAdminId = findLastAdminId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastAdminId)()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `admin${incrementedId}`;
    return incrementedId;
});
exports.generateAdminId = generateAdminId;
