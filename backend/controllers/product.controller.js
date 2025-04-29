import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const test = (req, res) => {
    res.json({
        message: "API is working!",
    });
};

export const addproducts = async (req, res) => {
    const { productname, description, category, condition, quantity, price, guidance } = req.body;
  
    if (!productname || !description || !category || !quantity || !price) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }
  
    try {
      const product = new Product({ 
        productname, 
        description, 
        category, 
        condition: condition || "New",  
        quantity, 
        price, 
        guidance: guidance || "No guidance available"  
      });
      
      await product.save();
      return res.status(201).json({ success: true, message: "Product added successfully", product });
      
    } catch (err) {
      console.error("Error adding product:", err);
      return res.status(500).json({ success: false, message: "Unable to add product", error: err.message });
    }
};

export const getbyId = async (req, res) => {
    const { pid } = req.params;  

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }

    try {
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ product });
    } catch (err) {
        console.error("Error fetching product:", err);
        return res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    const { pid } = req.params;

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }

    const { productname, description, category, condition, quantity, price, guidance } = req.body;

    try {
        // Update the product by ID
        const productu = await Product.findByIdAndUpdate(
            pid,
            { productname, description, category, condition, quantity, price, guidance },
            { new: true }
        );

        if (!productu) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ product: productu });

    } catch (err) {
        console.error("Error updating product:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};


export const deleteProduct = async (req, res) => {
    const { pid } = req.params; // ✅ Correctly extract pid

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const productd = await Product.findByIdAndDelete(pid);

        if (!productd) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted successfully" });

    } catch (err) {
        console.error("Error deleting product:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ products });
    } catch (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};
