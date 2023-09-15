import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BrandRoutes } from '../modules/brand/brand.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { CustomerRoutes } from '../modules/customer/customer.route';
import { ProductRoutes } from '../modules/product/product.route';
import { PurchaseRoutes } from '../modules/purchase/purchase.route';
import { SellRoutes } from '../modules/sell/sell.route';
import { SummaryRoutes } from '../modules/summary/summary.routes';
import { SupplierRoutes } from '../modules/supplier/supplier.route';
import { UnitRoutes } from '../modules/unit/unit.route';
import { UserRoutes } from '../modules/user/user.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/brands',
    route: BrandRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/purchases',
    route: PurchaseRoutes,
  },
  {
    path: '/sales',
    route: SellRoutes,
  },
  {
    path: '/suppliers',
    route: SupplierRoutes,
  },
  {
    path: '/units',
    route: UnitRoutes,
  },
  {
    path: '/customers',
    route: CustomerRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  { path: '/summary', route: SummaryRoutes },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
