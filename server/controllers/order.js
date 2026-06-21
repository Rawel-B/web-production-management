import Order from "../models/Order.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    
    console.log("Fetched orders:", orders);
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const releaseNewOrder = async (req, res) => {
  try {
    console.log("received body when releasing a new order :", req.body)
    const { number, type, remark, plannedDate, deadline, supplier, currency, costCenter, isForeign } = req.body;

    if (!number || !type || !remark || !plannedDate) {
      return res.status(400).json({ message: "missing required fields to create a new order." });
    }

    const newOrder = new Order({
      number,
      type,
      remark,
      plannedDate,
      deadline,
      supplier,
      currency,
      costCenter,
      isForeign
    });
    console.log("new order created as ", newOrder);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create new order." });
  }
};