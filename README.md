# CRUD API

This API allows you to perform CRUD operations on user records. Users are stored as `objects` that have following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

## Installation

1. **Clone this repository to your local machine:**

   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd node-crud-api/
   ```

3. **Switch to `develop` branch:**

   ```bash
   git checkout develop
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Open `node-crud-api` folder and create a `.env` file in the root directory and define the port. Default port is `3000`**

   ```plaintext
   PORT=5000
   ```

## Usage

### Running the Application

#### Development Mode

To run the application in development mode using
 - `ts-node-dev`, execute:
```bash
npm run start:dev
```
 - `nodemon`, execute:
```bash
npm run start:nodemon
```

#### Production Mode

To run the application in production mode, execute:

```bash
npm run start:prod
```

### Endpoints
-----

- **GET** `/api/users` is used to get all persons.

- **GET** `/api/users/{userId}` is used to get person by ID.

- **POST** `/api/users` is used to create record about new user and store it in database.

- **PUT** `/api/users/{userId}` is used to update existing user.

- **DELETE** `/api/users/{userId}` is used to delete existing user from database.

### Running Tests
-----

To run tests, execute:

```bash
npm run test:verbose
```
or in `silent` mode, execute:
```bash
npm run test
```
By default tests run in `develop` mode. If you want to run tests in `prod` mode, you should comment out the line `hostname: 'localhost',` and uncomment the line `// hostname: '127.0.0.1',` in `getOptions()` method in `src/tests/api.test.ts` file. 

```typescript
// example
const getOptions = (options: options): RequestOptions => ({
  hostname: 'localhost',
  // hostname: '127.0.0.1',
  port,
  path: some.path,
  method: options.method,
});
```
> **_NOTE:_**  Since the tests are not complete, you should clear the database manually before running them again (use `GET` method to get the user's `id` and then use `DELETE` method with that `id` to delete them). Or you can contact me to get all the test cases [Discord](https://discord.com/users/1031241853376401428)

### Request and Response Examples
-----

 - #### GET /api/users

**Request:**

```bash
# example
curl -X GET http://localhost:3000/api/users
```

**Response (200 OK):**

```bash
# example
[
    {
        "id": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        "username": "Jane Doe",
        "age": 15,
        "hobbies": ["reading", "jogging"]
    },
]
```

 - #### GET /api/users/{userId}

**Request:**

```bash
# example
curl -X GET http://localhost:3000/api/users/{userID}
```

**Response (200 OK):**

```bash
# example
{
    "id": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    "username": "Jane Doe",
    "age": 15,
    "hobbies": ["reading", "jogging"]
}
```

 - #### POST /api/users

**Request:**

```bash
# example
curl -X POST http://localhost:3000/api/users -H 'Content-Type: application/json' -d '{"username":"Robby","age": 33,"hobbies": ["traveling"]}'
```

**Response (201 Created):**

```bash
# example
{
    "id": "1b671a64-40d5-491e-99b0-da01ff1f3341",
    "username": "Robby",
    "age": 33,
    "hobbies": ["traveling"]
}
```

 - #### PUT /api/users/{userId}

**Request:**

```bash
# example
curl -X PUT http://localhost:3000/api/users/{userID} -H 'Content-Type: application/json' -d '{"username": "Bobby not Robby","age": 55,"hobbies": ["swimming"]}'
```

**Response (200 OK):**

```bash
# example
{
    "id": "1b671a64-40d5-491e-99b0-da01ff1f3341",
    "username": "Bobby not Robby",
    "age": 55,
    "hobbies": ["swimming"]
}
```

 - #### DELETE /api/users/{userId}

**Request:**

```bash
# example
curl -X DELETE http://localhost:3000/api/users/{userID}
```

**Response (204 No Content)**

### Error Handling
-----

- Requests to non-existing endpoints will get response with `status code` **404** and corresponding message.

- Server-side errors will rget response with `status code` **500** and corresponding message.
