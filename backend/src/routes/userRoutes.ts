import express from 'express';
import { signup } from '../controllers/userControler';
// import fileUpload from '../utils/s3Upload';

const router = express.Router();

router.post('/signup', signup);

export default router;
