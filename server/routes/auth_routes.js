import express from 'express'
import  {register, login, logout, authenticateToken, send_all_user_data, id_based_data } from '../controllers/auth_controller.js';
const router =express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout);
router.get('/user/all-users',authenticateToken,send_all_user_data)
router.get('/userdata/:id',id_based_data)


export default router ;