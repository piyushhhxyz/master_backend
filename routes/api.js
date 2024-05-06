import express from 'express';
const router = express.Router();
import AuthController from '../controllers/Auth.controller.js';
import ProfileController from '../controllers/Profile.controller.js';
import authMiddleware from '../middleware/Authenticate.js';
import NewsController from '../controllers/News.controller.js';

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

//profile
router.get('/profile',authMiddleware,  ProfileController.index); //private route
router.put('/profile/:id',authMiddleware,  ProfileController.update); //private route

//News
router.get('/news',authMiddleware,  NewsController.index); 
router.post('/news',authMiddleware,  NewsController.store); 
router.get('/news/:id',authMiddleware,  NewsController.show); 
router.put('/news/:id',authMiddleware,  NewsController.update); 
router.delete('/news/:id',authMiddleware,  NewsController.destroy); 

export default router;
 