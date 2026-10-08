# LeihenMan

**Language / Langue:** [Français](README.md) | English

**Version:** 0.9.0

## Description

LeihenMan is an application built with Node.js and Express to manage a library of items borrowed between individuals.

## Configuration

Create your local configuration file by copying the template. Use the command for your terminal:

PowerShell:

```powershell
Copy-Item .conf.example .conf
```

Linux or Git Bash:

```bash
cp .conf.example .conf
```

In `.conf`, uncomment and set the following parameters:

- `MONGODB_URI`: MongoDB connection URI, including the username, password, cluster address, and database name.
- `JWT_SECRET`: a long, random key used to sign and verify authentication tokens. Changing it invalidates previously issued tokens.
- `PORT`: the application's HTTP port. The default is `3000`.

The `.conf` file contains private settings and is ignored by Git. Do not publish it.

## Run the application

Requirements: Node.js 20.19 or later, npm, and access to a MongoDB database.

From the project root, install the dependencies:

```bash
npm install
```

Then start the server:

```bash
node --env-file=.conf server.js
```

The server listens on the port set by `PORT` (default: `3000`). If you change the port, update the URL used by your HTTP client.

Once the API is running, you can send requests using an HTTP client such as [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

If your database does not contain any users yet, create one by sending a `POST` request to `http://localhost:3000/api/auth/signup` with this JSON body. Signup does not automatically log in the user or return a token. The email address must be unique.

```json
{
  "firstname": "Test",
  "lastname": "User",
  "email": "test@example.com",
  "password": "ChangeMe123!",
  "role": "user"
}
```

The `role` field is optional when creating an account; it can describe the account type or permissions. For public signup, assign roles on the server instead of letting users choose a privileged role.

Then log in by sending a `POST` request to `http://localhost:3000/api/auth/login` with the same email and password. The response contains the user ID at `user.userId` and the authentication token at `user.token`.

To retrieve the list of articles, send a `GET` request to:

```text
http://localhost:3000/api/articles
```

Some routes are protected and require the token obtained from the login route. For those requests, add the `Authorization` header in the format `Bearer <your_token>`. The token expires after 24 hours. Signup and login do not require a token.
