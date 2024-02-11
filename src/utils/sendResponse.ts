import { ServerResponse } from "node:http";
import { StatusCode } from "../enums/status-codes";
import { User } from "src/models/user.model";

export const sendResponse = (
  res: ServerResponse,
  data: User | User[] | string,
  statusCode = StatusCode.OK
): void => {
  res.writeHead(statusCode);
  res.end(JSON.stringify(data));
}
