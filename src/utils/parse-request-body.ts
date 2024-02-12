import { IncomingMessage } from 'node:http';
import { User } from '../models/user.model';

export const parseRequestBody = async (
  req: IncomingMessage,
): Promise<User | null> => {
  try {
    const data = (await req.setEncoding('utf-8').toArray()).toString();
    const user = JSON.parse(data) as User;
    return user;
  } catch (error) {
    return null;
  }
};
