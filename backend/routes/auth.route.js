import express from 'express';
import { packaging  } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/Product',packaging);


export default router;
