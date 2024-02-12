import { IncomingMessage, get, request } from 'node:http';
import { getServerPort } from '../utils/get-server-port';
import { User } from '../models/user.model';
import { ENDPOINT } from '../constants';
import { RequestOptions } from 'node:https';

const port = getServerPort();

const newUser: User = {
  username: 'Bobby',
  age: 25,
  hobbies: ['reading', 'jogging'],
};

const updatedUser: User = {
  username: 'Monika',
  age: 44,
  hobbies: [],
};

const lastRecordId = (() => {
  let uuid: string = '';

  return {
    getId: (): string => uuid,
    setId: (id: string): void => {
      uuid = id;
    },
  };
})();

type options = {
  id: string;
  method: string;
};

const getOptions = (options: options): RequestOptions => ({
  hostname: 'localhost',
  // hostname: '127.0.0.1',
  port,
  path: `${ENDPOINT}/${options.id}`,
  method: options.method,
});

const sendGetRequest = (options: RequestOptions) => {
  return new Promise((resolve) => {
    get(options, async (res: IncomingMessage) => {
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(rawData));
      });
    });
  });
};

const sendRequest = (options: RequestOptions, body: User | '') => {
  return new Promise((resolve) => {
    const req = request(options, async (res: IncomingMessage) => {
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(rawData));
      });
    });
    req.write(JSON.stringify(body));
    req.end();
  });
};

describe('GET api/users request', () => {
  test('should get all records  (an empty array is expected)', async () => {
    const options = getOptions({ id: '', method: 'GET' });
    expect(await sendGetRequest(options)).toStrictEqual([]);
  });
});

describe('POST api/users request', () => {
  test('should create and get new object back', async () => {
    const options = getOptions({ method: 'POST', id: '' });
    const receivedUser = (await sendRequest(options, newUser)) as User;

    lastRecordId.setId(receivedUser.id!);
    const actualKeys = Object.getOwnPropertyNames(receivedUser).length;

    expect(actualKeys).toBe(4);

    expect(receivedUser).toMatchObject<User>(newUser);

    expect(receivedUser).toHaveProperty<number>('age', 25);
    expect(receivedUser).toHaveProperty<string>('username', newUser.username);
    expect(receivedUser).toHaveProperty<string[]>('hobbies', newUser.hobbies);
    expect(receivedUser).toHaveProperty<string>('id');
  });
});

describe('GET api/user/{userId} request', () => {
  test('should get record by its id', async () => {
    const options = getOptions({ method: 'GET', id: lastRecordId.getId() });
    newUser.id = lastRecordId.getId();
    expect(await sendGetRequest(options)).toEqual<User>(newUser);
  });
});

describe('PUT api/users/{userId} request', () => {
  test('should update the record with the same id', async () => {
    const options = getOptions({ method: 'PUT', id: lastRecordId.getId() });
    const userAfterUpdate = await sendRequest(options, updatedUser);
    updatedUser.id = lastRecordId.getId();
    expect(userAfterUpdate).toEqual<User>(updatedUser);
  });
});

// describe('DELETE api/users/{userId}', () => {
//   test('should delete the created object by id', async () => {
//     const options = getOptions({ method: 'DELETE', id: lastRecordId.getId() });
//     expect(await sendRequest(options, '')).toEqual<User>(updatedUser);
//   });
// });
