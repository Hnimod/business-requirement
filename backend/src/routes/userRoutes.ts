import express from 'express';
import { signup } from '../controllers/authControler';

const router = express.Router();

router.post('/signup', signup);
router.post('/login');

export default router;
