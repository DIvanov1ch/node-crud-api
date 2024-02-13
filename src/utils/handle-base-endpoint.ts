import { IncomingMessage, ServerResponse } from 'node:http';
import { HTTPRequestMethod } from '../enums/request-methods';
import { sendResponse } from './send-response';
import { Users_DB } from '../users.db';
import { StatusCode } from '../enums/status-codes';
import {
  getInternalServerErrorMessage,
  getInvalidDataMessage,
} from './messages';
import { parseRequestBody } from './parse-request-body';
import { isValidUser } from './is-valid-user';

export const handleBaseEndpoint = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const { method } = req;
  if (method === HTTPRequestMethod.GET) {
    sendResponse(res, Users_DB.getUsers());
  } else if (method === HTTPRequestMethod.POST) {
    const user = await parseRequestBody(req);
    if (user === null) {
      const message = getInternalServerErrorMessage();
      sendResponse(res, message, StatusCode.INTERNAL_SERVER_ERROR);
      return;
    }
    if (!isValidUser(user)) {
      const message = getInvalidDataMessage();
      sendResponse(res, message, StatusCode.BAD_REQUEST);
      return;
    }
    const newUser = Users_DB.addUser(user);
    sendResponse(res, newUser, StatusCode.CREATED);
  } else {
    const message = getInvalidDataMessage();
    sendResponse(res, message, StatusCode.BAD_REQUEST);
  }
};
