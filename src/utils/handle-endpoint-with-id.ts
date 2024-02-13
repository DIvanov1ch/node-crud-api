import { IncomingMessage, ServerResponse } from 'node:http';
import { HTTPRequestMethod } from '../enums/request-methods';
import { StatusCode } from '../enums/status-codes';
import { sendResponse } from './send-response';
import { User } from '../models/user.model';
import { Users_DB } from '../users.db';
import { isValidUser } from './is-valid-user';
import {
  getInvalidDataMessage,
  getInternalServerErrorMessage,
} from './messages';
import { parseRequestBody } from './parse-request-body';

export const handleEndpointWithId = async (
  req: IncomingMessage,
  res: ServerResponse,
  user: User,
) => {
  const { method } = req;
  if (method === HTTPRequestMethod.GET) {
    sendResponse(res, user, StatusCode.OK);
  } else if (method === HTTPRequestMethod.PUT) {
    const body = await parseRequestBody(req);
    if (body === null) {
      const message = getInternalServerErrorMessage();
      sendResponse(res, message, StatusCode.INTERNAL_SERVER_ERROR);
      return;
    }
    if (!isValidUser(body)) {
      const message = getInvalidDataMessage();
      sendResponse(res, message, StatusCode.BAD_REQUEST);
      return;
    }
    const updatedUser = Users_DB.updateUser(user.id!, body);
    sendResponse(res, updatedUser, StatusCode.OK);
  } else if (method === HTTPRequestMethod.DELETE) {
    Users_DB.deleteUser(user.id!);
    sendResponse(res, '', StatusCode.NO_CONTENT);
  } else {
    const message = getInvalidDataMessage();
    sendResponse(res, message, StatusCode.BAD_REQUEST);
  }
};
