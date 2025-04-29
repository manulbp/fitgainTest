import express from 'express';
import { deleteProduct, test, updateProduct, addproducts , getbyId, getAllProducts } from '../controllers/product.controller.js';


const router = express.Router();

router.get('/', test);
router.post('/add', addproducts);
router.get('/all', getAllProducts);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);
router.get('/:pid', getbyId);



export default router;
