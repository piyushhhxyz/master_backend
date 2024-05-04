import express from 'express';
const router = express.Router();
import AuthController from '../controllers/Auth.controller.js';

router.post('/auth/register', AuthController.register);

export default router;
