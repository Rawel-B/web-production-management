import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: { type: Number, required: true },
    currency: { type: String, enum: ["USD", "EUR", "HKD", "CAD", "GBP"], required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    rating: Number,
    supply: Number,
    components: [{
      stockRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true
      },
      stockItem: { // Number
        type: String,
        required: true
      },
      quantityNeeded: {
        type: Number,
        required: true,
        min: 1
      },
      notes: String
    }],
    assemblyRequired: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, collection: "products", _id: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
