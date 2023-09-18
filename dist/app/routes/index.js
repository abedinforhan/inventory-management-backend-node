"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const brand_route_1 = require("../modules/brand/brand.route");
const category_route_1 = require("../modules/category/category.route");
const customer_route_1 = require("../modules/customer/customer.route");
const product_route_1 = require("../modules/product/product.route");
const purchase_route_1 = require("../modules/purchase/purchase.route");
const sell_route_1 = require("../modules/sell/sell.route");
const summary_routes_1 = require("../modules/summary/summary.routes");
const supplier_route_1 = require("../modules/supplier/supplier.route");
const unit_route_1 = require("../modules/unit/unit.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/brands',
        route: brand_route_1.BrandRoutes,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/products',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/purchases',
        route: purchase_route_1.PurchaseRoutes,
    },
    {
        path: '/sales',
        route: sell_route_1.SellRoutes,
    },
    {
        path: '/suppliers',
        route: supplier_route_1.SupplierRoutes,
    },
    {
        path: '/units',
        route: unit_route_1.UnitRoutes,
    },
    {
        path: '/customers',
        route: customer_route_1.CustomerRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    { path: '/summaries', route: summary_routes_1.SummaryRoutes },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
