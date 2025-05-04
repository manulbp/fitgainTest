import express from 'express'
import { addLogin, getUser, updateUser, deleteUser } from '../controllers/loginController.js';
import { checkLogin } from '../controllers/checkingController.js';

const routerL = express.Router();
routerL.post('/addLogin', addLogin);
routerL.post('/checkLogin', checkLogin);
routerL.get('/users', getUser);
routerL.post('/updateuser', updateUser);
routerL.post('/deleteUser', deleteUser);


export default routerL;