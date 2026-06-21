import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const taskTypes = {
  INVENTORY_CHECK: "Inventory Check",
  ORDER_FULFILLMENT: "Order Fulfillment",
  STOCK_RECEIVING: "Stock Receiving",
  QUALITY_CHECK: "Quality Check",
  CLEANING: "Cleaning",
  MAINTENANCE: "Equipment Maintenance"
};

const UserSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: {
      type: String,
      required: true,
      min: 3,
      max: 40,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    phoneNumber: String,
    tasks: Array,
    role: {
      type: String,
      enum: ["unauthorized" ,"manager", "worker", "admin"],
      default: "unauthorized",
    },
    permission: {
      type: [String],
      enum: ["Overview","Daily","Monthly","Breakdown","Workers","Support","Admin","Performance","Dashboard", "Orders","Products","Stocks","Geography"],
      default: ["Dashboard"],
    }
  },
  { timestamps: true, collection: "users", _id: true }
);

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", UserSchema);

export default User;
