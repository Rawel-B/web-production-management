import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    number: {
      type: String,
      required: true,
      trim: true,
    },
    type: { 
      type: String, 
      enum: ["Sales", "Picking", "Purchase", "Production"], 
      required: true
     },
    remark: { 
      type: String, 
      required: true 
    },
    plannedDate: {
      type: Date,
      required: true,
    },
    deadline: {
      type: Date,
    },
    supplier: {
      type: String,
      required: false,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "HKD", "CAD", "GBP"],
      required: "USD",
    },
    costCenter: {
      type: Boolean,
      enum: ["100", "101", "102", "103", "104"],
      default: "100"
    },
    isForeign: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true, collection: "orders", _id: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
