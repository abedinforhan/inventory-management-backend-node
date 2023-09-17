import { Summary } from './summary.model';

const getSummary = async () => {
  const result = await Summary.aggregate([
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
};

export const SummaryService = {
  getSummary,
};
