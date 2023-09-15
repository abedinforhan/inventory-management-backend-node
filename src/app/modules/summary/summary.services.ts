import { Purchase } from '../purchase/purchase.model';
import { Sell } from '../sell/sell.model';
import { ISummary, Summary } from './summary.model';

const calculateSummary = async (): Promise<ISummary> => {
  const totalPurchases = await calculateTotalPurchases();
  const totalSales = await calculateTotalSales();
  const totalPurchasedProducts = await calculateTotalPurchasedProducts();
  const totalSalesProducts = await calculateTotalSalesProducts();
  const profitLoss = totalSales - totalPurchases;

  const summary = new Summary({
    totalPurchase: totalPurchases,
    totalSale: totalSales,
    totalPurchasedProduct: totalPurchasedProducts,
    totalSalesProduct: totalSalesProducts,
    profitLoss,
  });

  await summary.save();

  return summary;
};

const calculateTotalPurchases = async (): Promise<number> => {
  // Implement the logic to calculate total purchases from your Purchase model
  const totalPurchases = await Purchase.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$grandTotal' },
      },
    },
  ]);

  return totalPurchases.length > 0 ? totalPurchases[0].total : 0;
};

const calculateTotalSales = async (): Promise<number> => {
  // Implement the logic to calculate total sales from your Sell model
  const totalSales = await Sell.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$grandTotal' },
      },
    },
  ]);

  return totalSales.length > 0 ? totalSales[0].total : 0;
};

const calculateTotalPurchasedProducts = async (): Promise<number> => {
  // Implement the logic to calculate total purchased products count from your Purchase model
  const totalPurchasedProducts = await Purchase.aggregate([
    {
      $unwind: '$products',
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$products.buyingQuantity' },
      },
    },
  ]);

  return totalPurchasedProducts.length > 0
    ? totalPurchasedProducts[0].total
    : 0;
};

const calculateTotalSalesProducts = async (): Promise<number> => {
  // Implement the logic to calculate total sales products count from your Sell model
  const totalSalesProducts = await Sell.aggregate([
    {
      $unwind: '$products',
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$products.sellingQuantity' },
      },
    },
  ]);

  return totalSalesProducts.length > 0 ? totalSalesProducts[0].total : 0;
};

export const SummaryService = {
  calculateSummary,
  calculateTotalPurchases,
  calculateTotalSales,
  calculateTotalPurchasedProducts,
  calculateTotalSalesProducts,
};
