import express from 'express';
import { deleteProduct, test, updateProduct } from '../controllers/product.controller.js';
import {addproducts} from '../controllers/product.controller.js';
import {getbyId} from '../controllers/product.controller.js'


const router = express.Router();
 
router.get('/', test);
router.post('/add',addproducts);
router.get('/:pid',getbyId);
router.put('/:pid',updateProduct);
router.delete('/:pid',deleteProduct);

  


export default router;