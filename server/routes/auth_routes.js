import express from 'express'
import  {register, login, logout, authenticateToken, send_all_user_data, id_based_data, update_user_data, delete_user } from '../controllers/auth_controller.js';
const router =express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout);
router.get('/user/all-users',authenticateToken,send_all_user_data)
router.get('/userdata/:id',authenticateToken,id_based_data)
router.post('/userdata/update/:id',update_user_data)
router.get('/delete-user/:id',authenticateToken,delete_user)


export default router ;