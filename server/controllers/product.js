import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    console.log("Fetched products:", products);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const deleteSelectedProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) { return res.status(400).json({ message: "Product ID is required" }); }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ 
      message: "Product removed successfully",
      deletedProduct
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ 
      message: "Failed to delete product",
      error: error.message 
    });
  }
};
