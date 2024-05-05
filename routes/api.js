import express from 'express';
const router = express.Router();
import AuthController from '../controllers/Auth.controller.js';
import ProfileController from '../controllers/Profile.controller.js';
import authMiddleware from '../middleware/Authenticate.js';

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
//profile
router.get('/profile',authMiddleware,  ProfileController.index); //private route
router.put('/profile/:id',authMiddleware,  ProfileController.update); //private route

export default router;
