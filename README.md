# Notes App

A full-stack notes application built with the MERN stack. Users create an account, log in, and manage their own private notes. Every note belongs to one user, and nobody else can see it.

## Features

- Sign up and log in with email and password
- Passwords are hashed before they are stored
- Token-based authentication (JWT, expires in 1 hour)
- Create, view and delete your own notes
- Each user only sees their own notes
- Protected backend routes, a request without a valid token is rejected
- Responsive dark UI

## Tech Stack

**Frontend:** React (Vite), React Router, Axios

**Backend:** Node.js, Express

**Database:** MongoDB Atlas with Mongoose

**Auth and security:** bcryptjs (password hashing), jsonwebtoken (JWT), CORS, dotenv

## How It Works

1. **Sign up:** the password is hashed with bcrypt and saved. The plain password is never stored.
2. **Log in:** the server compares the entered password with the stored hash. If it matches, it signs a JWT containing the user's id and sends it back.
3. **Token storage:** the frontend keeps the token in `localStorage` and sends it in the `Authorization: Bearer <token>` header with every notes request.
4. **Protection:** a middleware verifies the token before any notes route runs. It puts the user's id on `req.user`.
5. **Ownership:** notes are created with the id from the verified token (never from the request body), and every query filters by that id. A user can only read or delete their own notes.

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | No | Create a new account (`name`, `email`, `password`) |
| POST | `/api/auth/login` | No | Log in, returns a `token` |
| GET | `/api/notes` | Yes | Get all notes of the logged-in user |
| POST | `/api/notes` | Yes | Create a note (`title`, `content`) |
| DELETE | `/api/notes/:id` | Yes | Delete one of your own notes |

Protected routes need the header `Authorization: Bearer <token>`.

## Project Structure

```
notes-app/
├── back/      Express API (routes, models, middleware)
└── front/     React app (pages: Home, Signup, Login, Notes)
```

## Getting Started

You need Node.js and a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster.

**1. Clone the repository**

```bash
git clone https://github.com/rayhan-ui/notes-app.git
cd notes-app
```

**2. Set up the backend**

```bash
cd back
npm install
```

Create a file named `.env` inside the `back` folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=any_long_random_string
```

Start the server:

```bash
node server.js
```

**3. Set up the frontend**

Open a second terminal:

```bash
cd front
npm install
npm run dev
```

Open the address shown in the terminal (usually `http://localhost:5173`).

> The frontend calls the API at `http://localhost:5000`, so keep the backend on port 5000.

## Future Improvements

- Edit existing notes
- Show clear error messages on signup
- Deploy the app online