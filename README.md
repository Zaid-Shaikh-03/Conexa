# Conexa

Conexa is a real-time chat application built with React, TypeScript, Express, MongoDB, and Socket.IO. It supports one-to-one chat, group chat, AI conversations, file/image sharing, and live messaging updates.

## About the project

Conexa is designed to provide a modern messaging experience with a clean dashboard and real-time interaction. The application includes:

- user authentication and protected routes
- chat list with live updates
- real-time message delivery via Socket.IO
- AI assistant chat support
- image uploads using Cloudinary
- responsive UI for desktop and mobile-like layouts

## Features

- User sign up and sign in
- JWT-based authentication
- Real-time online user tracking
- Create chats and group chats
- Send messages with replies
- Image support in chats
- AI-powered assistant chat
- Live message updates in the sidebar and chat windows
- Modern UI built with React + Tailwind CSS
- Type-safe frontend/backend setup with TypeScript

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Socket.IO Client
- Axios
- Zustand

### Backend

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- Socket.IO
- Passport + JWT
- Cloudinary
- Google Generative AI SDK

## Project structure

```bash
Conexa/
├── client/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig*.json
├── server/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
├── README.md
└── .gitignore
```

## Prerequisites

Before running the app, make sure you have installed:

- Node.js (v18 or later recommended)
- npm or pnpm
- MongoDB instance or MongoDB Atlas connection
- Cloudinary account
- Google AI API key

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Zaid-Shaikh-03/Conexa.git
cd Conexa
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

## Environment setup

### Frontend environment

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:8000
```

### Backend environment

Create a `.env` file inside the `server` folder:

```env
NODE_ENV=development
PORT=8000
MONGO_URI=mongodb://localhost:27017/conexa
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
FRONTEND_ORIGIN=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
```

## Running the application

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

```bash
cd client
npm run dev
```

Then open:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Health check: http://localhost:8000/health

## Production build

### Build frontend

```bash
cd client
npm run build
```

### Build backend

```bash
cd server
npm run build
```

### Start backend in production

```bash
cd server
npm run start
```

## Notes

This project is a full-stack chat platform with a real-time messaging layer and AI assistant support. It is suitable for learning full-stack development, chat app architecture, and integrated AI features in a production-style application.

## License

This project is for learning and personal development purposes.
