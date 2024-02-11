import { DataBase, User } from "./models/user.model";
import { v4 as getUuid } from "uuid";

export const Users_DB = (() => {
  const dataBase: DataBase = [];

  return {
    getUsers: (): DataBase => dataBase,

    addUser: (user: User): User => {
      const id = getUuid();
      const { username, age, hobbies } = user;
      const newUser: User = { id, username, age, hobbies }
      dataBase.push(newUser);
      return newUser;
    },

    getUserWithId: (id: string): User | null =>
      dataBase.find((user: User) => user.id === id) || null,
  }
})();
