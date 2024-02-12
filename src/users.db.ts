import { DataBase, User } from './models/user.model';
import { v4 as getUuid } from 'uuid';

export const Users_DB = (() => {
  const dataBase: DataBase = [];

  return {
    getUsers: (): DataBase => dataBase,

    addUser: (user: User): User => {
      const id = getUuid();
      const { username, age, hobbies } = user;
      const newUser: User = { id, username, age, hobbies };
      dataBase.push(newUser);
      return newUser;
    },

    updateUser: (id: string, user: User): User => {
      const { age, hobbies, username } = user;
      const updatedUser: User = { id, username, age, hobbies };
      const index = dataBase.findIndex((user) => user.id === id);
      dataBase.splice(index, 1, updatedUser);
      return updatedUser;
    },

    deleteUser: (id: string): void => {
      const index = dataBase.findIndex((user) => user.id === id);
      dataBase.splice(index, 1);
    },

    getUserWithId: (id: string): User | null =>
      dataBase.find((user: User) => user.id === id) || null,
  };
})();
