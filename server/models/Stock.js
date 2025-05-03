import mongoose from "mongoose";

const StockSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      trim: true,
    },
    item : { type: String, required: true }, // Can Be A Part Or A Finished Product
    type: {
      type: String,
      enum: ["raw-material", "component"],
      required: true
    },
    location: {
      type: String,
      enum: ["loading", "storage", "production", "receipt"],
    },
    description: { type: String, required: true  },
    attribute1: String,
    attribute2: String,
    attribute3: String,
    attribute4: String,
    quantity: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  { timestamps: true, collection: "stocks", _id: true }
);

const Stock = mongoose.model("Stock", StockSchema);
export default Stock;
