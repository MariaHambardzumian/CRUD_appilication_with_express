import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
import { User } from '../models/User';

const userService = new UserService();

export default class UserController {
  getUsers(req: Request, res: Response, next: NextFunction): void {
    try {
      const users = userService.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  getUser(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params
    try {
      const user = userService.getUser(+id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  createUser(req: Request, res: Response, next: NextFunction): void {
    const user: User = req.body;
    try {
      userService.createUser(user);
      res.status(201).send('User created successfully');
    } catch (error) {
      next(error);
    }
  }

  updateUser(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params
    const updatedUser: User = req.body;
    try {
      userService.updateUser(+id, updatedUser);
      res.send('User updated successfully');
    } catch (error) {
      next(error);
    }
  }

  deleteUser(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params
    try {
      userService.deleteUser(+id);
      res.send('User deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  activateUser(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params;
    try {
      userService.activateUser(+id);
      res.status(200).send(`The user with ID ${id} has been successfully activated.`);
    } catch (error) {
      next(error);
    }
}

}
