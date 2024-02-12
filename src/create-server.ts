import { createServer } from 'node:http';
import { validate } from 'uuid';

import { Users_DB } from './users.db';
import { sendResponse } from './utils/send-response';
import { StatusCode } from './enums/status-codes';
import {
  getInvalidEndpointMessage,
  getInvalidUserIdMessage,
  getUserDoesntExistMessage,
} from './utils/messages';
import { ENDPOINT } from './constants';
import { User } from './models/user.model';
import { handleBaseEndpoint } from './utils/handle-base-endpoint';
import { handleEndpointWithId } from './utils/handle-endpoint-with-id';

export const create = (port: string | number) => {
  const server = createServer((req, res) => {
    const { url } = req;

    if (!url?.startsWith(ENDPOINT)) {
      const message = getInvalidEndpointMessage(url);
      sendResponse(res, message, StatusCode.NOT_FOUND);
      return;
    }

    if (url === ENDPOINT || url === `${ENDPOINT}/`) {
      handleBaseEndpoint(req, res);
    } else {
      const uuid = url.replace(`${ENDPOINT}/`, '');
      if (validate(uuid)) {
        const user: User | null = Users_DB.getUserWithId(uuid);
        if (user === null) {
          const message = getUserDoesntExistMessage(uuid);
          sendResponse(res, message, StatusCode.NOT_FOUND);
          return;
        }
        handleEndpointWithId(req, res, user);
      } else {
        const message = getInvalidUserIdMessage(uuid);
        sendResponse(res, message, StatusCode.BAD_REQUEST);
      }
    }
  });

  server.listen(port, () => console.log(`Server started on port: ${port}`));
};
