import Stock from "../models/Stock.js";

export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    
    console.log("Fetched stocks:", stocks);
    res.status(200).json(stocks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const getStocksByNumber = async (req, res) => {
  try {
    const { number } = req.params;

    const stock = await Stock.find({ number : number });
    
    console.log("Fetched stocks:", stock);
    res.status(200).json(stock);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const deleteSelectedStock = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) { return res.status(400).json({ message: "Stock ID is required" }); }

    const deletedStock = await Stock.findByIdAndDelete(id);

    if (!deletedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.status(200).json({ 
      message: "Stock removed successfully",
      deletedStock 
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ 
      message: "Failed to delete stock",
      error: error.message 
    });
  }
};

