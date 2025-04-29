import express from 'express';
import { deleteProduct, test, updateProduct, addproducts , getbyId, getAllProducts } from '../controllers/product.controller.js';
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/', test);
router.post('/add', upload.single("image"), addproducts);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);
router.get('/:pid', getbyId);
router.get('/all', getAllProducts);



export default router;
