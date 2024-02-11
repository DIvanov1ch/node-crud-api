import { User } from "src/models/user.model";

export const isValidUser = (user: User): boolean => {
  if (user === null
    || user === undefined
    || Array.isArray(user)
    || typeof user !== 'object'
    || !user.username
    || typeof user.username !== 'string'
    || !user.age
    || typeof user.age !== 'number'
    || !user.hobbies
    || !Array.isArray(user.hobbies)
    || !user.hobbies.every((hobby) => typeof hobby === 'string')) {
    return false;
  }
  const expectedKeys = 3;
  const actualKeys = Object.getOwnPropertyNames(user).length;
  if (expectedKeys !== actualKeys) {
    return false;
  }
  return true;
};
