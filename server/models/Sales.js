import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, collection: "sales", _id: true }
);

const Sales = mongoose.model("Sales", SalesSchema);

export default Sales;
