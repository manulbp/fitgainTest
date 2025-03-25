import express from 'express';
import { deleteProduct, test, updateProduct, addproducts , getbyId } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', test);
router.post('/add', addproducts);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);
 router.get('/:pid', getbyId); // Correct route for getting product by ID

export default router;
