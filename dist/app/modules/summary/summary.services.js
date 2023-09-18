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
exports.SummaryService = void 0;
const summary_model_1 = require("./summary.model");
const getSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield summary_model_1.Summary.aggregate([
        {
            $project: {
                profitLoss: { $subtract: ['$totalSaleAmount', '$totalPurchaseAmount'] },
                totalPurchaseAmount: 1,
                totalSaleAmount: 1,
                totalPurchasedProduct: 1,
                totalSalesProduct: 1,
                totalPurchaseInvoices: 1,
                totalSaleInvoices: 1,
                totalCustomer: 1,
                totalSupplier: 1,
            },
        },
    ]);
    return result[0];
});
exports.SummaryService = {
    getSummary,
};
