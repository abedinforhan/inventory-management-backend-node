"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const summary_controllers_1 = require("./summary.controllers");
const router = express_1.default.Router();
router.get('/', summary_controllers_1.SummaryController.getSummary);
exports.SummaryRoutes = router;
