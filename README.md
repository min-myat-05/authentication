# Authentication App

This repository contains a full-stack authentication project with a React + Vite frontend and an Express + MongoDB backend.

## Project structure

- `backend/` - Express API server
- `frontend/` - React application built with Vite
- `tmp_register.json` - temporary file used during development

## Features

- User registration with validation
- User login with JWT cookie handling
- Logout endpoint
- Forgot password / reset password workflow
- MongoDB data persistence

## Backend setup

1. Open a terminal in `backend/`
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with these values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
PORT=5000
```

4. Start the server:

```bash
npm run dev
```

The backend runs on `http://localhost:5000` by default.

## Frontend setup

1. Open a terminal in `frontend/`
2. Install dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

## API endpoints

- `POST /api/user/register` - register new user
- `POST /api/user/login` - login user
- `POST /api/user/logout` - clear JWT cookie
- `POST /api/user/forgot-password` - request password reset
- `POST /api/user/reset-password` - reset password with token

## Notes

- The backend requires `MONGO_URI` and `JWT_SECRET` to be configured.
- The frontend is configured to communicate with `http://localhost:5173` and the backend CORS origin is set accordingly.
- If you change the frontend host or port, update the backend `cors` origin and `FRONTEND_URL`.

## License

This project is provided as-is.
