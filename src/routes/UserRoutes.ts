// src/routes/userRoutes.ts
import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();
const userController = new UserController();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/activate/:id', userController.activateUser);

export default router;
