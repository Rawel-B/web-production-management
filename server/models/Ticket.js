import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const TicketSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Login Issue", "Unauthorized Access", "Bug Report", "Other"],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, collection: "tickets", _id: true }
);

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;
