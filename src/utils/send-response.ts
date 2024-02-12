import { ServerResponse } from 'node:http';
import { StatusCode } from '../enums/status-codes';
import { User } from 'src/models/user.model';
import { ErrorResponse } from 'src/models/error-response.model';

type Response = User | User[] | ErrorResponse;

export const sendResponse = (
  res: ServerResponse,
  data: User | User[] | string,
  statusCode = StatusCode.OK,
): void => {
  const response: Response =
    typeof data === 'string' ? { message: data } : data;
  res.writeHead(statusCode);
  res.end(JSON.stringify(response));
};
