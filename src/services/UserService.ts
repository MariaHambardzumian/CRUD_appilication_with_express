import fs from 'fs';
import { User } from '../models/User';
import path from 'path';


export default class UserService {
  private jsonFilePath = path.join(__dirname, '..', '..', 'users.json');
  getUsers(): User[] {
    if (!fs.existsSync(this.jsonFilePath)) {
      throw new Error('User list file does not exist');
    }
    const data = fs.readFileSync(this.jsonFilePath, 'utf-8');
    const users: User[] = JSON.parse(data);
    return users;
  }

  getUser(id: number): User | undefined {
    this.validId(id);
    const users = this.getUsers();
    return users.find((user) => user.id === id);
  }

  createUser(user: User): void {
    if (!this.isValid(user)) {
      throw new Error('Invalid user data');
    }

    if (!fs.existsSync(this.jsonFilePath)) fs.writeFileSync(this.jsonFilePath, '[]')

    const existingUser = this.getUser(user.id);

    if (existingUser) {
      throw new Error(
        `Creating a user with the ID ${user.id} is not possible as there is already an existing user with the same ID. Please choose a different ID for the new user and try again.`
      );
    }

    const newUser: User = {
      ...user,
      status: false,
      creation_timestamp: Date.now(),
      modification_timestamp: null,
    };

    const users = this.getUsers();
    users.push(newUser);
    this.saveUsers(users);
  }

  updateUser(id: number, updatedUser: User): void {
    this.validId(id);
    if (!this.isValid(updatedUser)) {
      throw new Error('Invalid user data');
    }

    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const existingUser = this.getUser(updatedUser.id);
      if (existingUser && existingUser.id !== id) {
        throw `Updating the user with ID ${id} to ${updatedUser.id} is not possible due to an existing user with the same ID. Please choose a different ID for the update and try again.`
      }

      users[userIndex] = {
        ...users[userIndex],
        ...updatedUser,
        modification_timestamp: Date.now(),
      };
      this.saveUsers(users);
    }
     else {
        throw new Error(`The user with ID ${id} does not exist in records to update. Please verify the ID and try again. `)
    }
  }

  activateUser(id: number): void {
    this.validId(id)
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        status: true,
        modification_timestamp: Date.now(),
      };
      this.saveUsers(users);
    } else {
      throw new Error(`The user with ID ${id} does not exist in records. Please verify the ID and try again. `);
    }
  }

  deleteUser(id: number): void {
    this.validId(id);
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      this.saveUsers(users);
    } else {
      throw new Error(`The user with ID ${id} does not exist in records. Please verify the ID and try again. `);
    }
  }

  private saveUsers(users: User[]): void {
    const data = JSON.stringify(users);
    fs.writeFileSync(this.jsonFilePath, data);
  }

  private validId(id: number): void {
    if (isNaN(id)) {
      throw new Error("The ID should be a numeric value. Please ensure that you provide a valid numerical ID and try again.");
    }
  }

  private isValid(user: User): boolean {
    if (!user) {
      return false;
    }
    if (!user.id || typeof user.id !== 'number') {
      return false;
    }
    if (!user.name || typeof user.name !== 'string') {
      return false;
    }
    if (!user.age || typeof user.age !== 'number') {
      return false;
    }
    if (!['female', 'male', 'other'].includes(user.gender)) {
      return false;
    }
    return true;
  }
}
