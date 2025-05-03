import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

export const getAllAdmins = async (req, res) => {
  try {
    const users = await User.find({ role : "admin" });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const getAllWorkers = async (req, res) => {
  try {
    const users = await User.find({ role : "worker" || "unauthorized" });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const getAllManagers = async (req, res) => {
  try {
    const users = await User.find({ role : "manager" });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await User.find({ _id : _id });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const deleteSelectedUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) { return res.status(400).json({ message: "User ID is required" }); }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "User removed successfully",
      deletedUser 
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ 
      message: "Failed to delete user",
      error: error.message 
    });
  }
};
export const updateCurrentUser = async (req, res) => {
  try {
    console.log("update started...");
    console.log("req params :", req.params);
    console.log("req body :", req.body);
    const { email } = req.params;
    const updates = req.body;

    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    console.log("email when updating :", email);

    const allowedUpdates = ['email', 'name', 'phoneNumber', 'city', 'state', 'country', 'role', 'permission'];
    const updateFields = Object.keys(updates).reduce((acc, field) => {
      if (allowedUpdates.includes(field)) {
        acc[field] = updates[field];
      }
      return acc;
    }, {});

    console.log("update fields :", updateFields);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedUser
    });

  } catch (error) {
    console.error("Update error:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error",
        error: error.message 
      });
    }
    
    res.status(500).json({ 
      message: "Failed to update user",
      error: error.message 
    });
  }
};

//====> Support Tickets
export const getAllTickets = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = "createdAt", search = "" } = req.query;

    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);
    const searchQuery = search ? { $or: [{ email: { $regex: search, $options: "i" } }, { subject: { $regex: search, $options: "i" } }] } : {};
    const tickets = await Ticket.find(searchQuery).sort({ [sort]: 1 }).skip(skip).limit(limit);
    const totalTickets = await Ticket.countDocuments(searchQuery);

    res.status(200).json({ tickets, total: totalTickets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const openNewTicket = async (req, res) => {
  try {
    console.log("received body when sending ticket :", req.body)
    const { email, subject, type, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newTicket = new Ticket({
      email,
      subject,
      type: type || "Other",
      message,
    });

    const savedTicket = await newTicket.save();

    res.status(201).json(savedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create support ticket." });
  }
};
export const updateCurrentTicket = async (req, res) => {
  try {
    const { _id } = req.params;
    const { status } = req.body;

    if (!_id || !status) {
      return res.status(400).json({ message: "Ticket ID and status are required" });
    }

    console.log(`Updating ticket ${_id} with status: ${status}`);

    const updatedTicket = await Ticket.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({
      message: `Ticket status updated to ${status} successfully`,
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      message: "Failed to update ticket",
      error: error.message,
    });
  }
};