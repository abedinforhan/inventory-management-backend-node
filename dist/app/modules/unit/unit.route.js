"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitRoutes = void 0;
const express_1 = __importDefault(require("express"));
const unit_controller_1 = require("./unit.controller");
const router = express_1.default.Router();
router.post('/create-unit', unit_controller_1.UnitControllers.createUnit);
router.get('/:id');
router.patch('/:id', unit_controller_1.UnitControllers.updateUnit);
router.delete('/:id', unit_controller_1.UnitControllers.deleteUnit);
router.get('/', unit_controller_1.UnitControllers.getUnits);
exports.UnitRoutes = router;
