import express from 'express';
import { 
  deleteProduct, 
  test, 
  updateProduct, 
  addproducts, 
  getbyId, 
  getAllProducts,
  uploadMiddleware,
  updateProductStock 
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', test);
router.post('/add', uploadMiddleware, addproducts);
router.get('/all', getAllProducts);
router.put('/:pid', uploadMiddleware, updateProduct);
router.put('/:pid/stock', updateProductStock); 
router.delete('/:pid', deleteProduct);
router.get('/:pid', getbyId);

export default router;
