// routes/cartRoutes.js

import express from "express";
import {
    createCartItem,
    getAllCartItems,
    getCartItemById,
    updateCartItem,
    deleteCartItem
} from "../controllers/cartController.js"; // Adjust the path as needed

const router = express.Router();

// CREATE a new cart item
router.post("/", createCartItem);

// READ all cart items
router.get("/", getAllCartItems);

// READ a single cart item by ID
router.get("/:id", getCartItemById);

// UPDATE only the quantity of a cart item by ID
router.put("/:id", updateCartItem);

// DELETE a cart item by ID
router.delete("/:id", deleteCartItem);

export default router;
