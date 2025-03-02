import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js'
import { createUser, getUser, getUsers, updateUser, deleteUser } from '../controllers/user.controller.js'

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', authorize, getUser);
userRouter.put('/:id', authorize, updateUser);
userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;