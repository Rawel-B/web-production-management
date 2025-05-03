import Sales from "../models/Sales.js";
import Product from "../models/Product.js";
import Stock from "../models/Stock.js";
import User from "../models/User.js";

export const getAllSalesStats = async (req, res) => {
  try {
    const users = await Sales.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const getSalesStats = async (req, res) => {
  try {

    const totalSales = await Sales.countDocuments();
    console.log("Total Sales :", totalSales);

    const totalRevenue = await Sales.aggregate([
      { $group: { _id: null, total: { $sum: { $multiply: ["$price", "$quantity"] } } } },
    ]);
    console.log("Total Revenue :", totalRevenue);

    const totalProducts = await Product.countDocuments();
    console.log("Total Products :", totalProducts);

    const totalInventoryValue = await Stock.aggregate([
      { $group: { _id: null, total: { $sum: { $multiply: ["$quantity", "$price"] } } } },
    ]);
    console.log("Total Stocks :", totalInventoryValue);

    const totalWorkers = await User.countDocuments({ role: "worker" });
    console.log("Total Workers :", totalWorkers);

    res.status(200).json({
      totalRevenue: totalRevenue[0]?.total || 0,
      totalSales,
      totalProducts,
      totalWorkers,
      inventoryValue: totalInventoryValue[0]?.total || 0,
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};