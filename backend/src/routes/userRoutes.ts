import express from 'express';
import {
  signup,
  getAllUsers,
  deleteUser,
  updateUser,
} from '../controllers/userControler';
import fileUpload from '../utils/s3Upload';

const router = express.Router();

router.post('/signup', fileUpload.single('avatar'), signup);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

export default router;
