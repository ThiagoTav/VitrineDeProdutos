import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;