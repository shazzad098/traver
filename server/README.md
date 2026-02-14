# Traver Server Side

This is the backend for the Traver Travel Landing Page.

## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **JWT** (JSON Web Tokens) for authentication
- **Bcryptjs** for password hashing

## Prerequisites
- Node.js installed
- MongoDB installed and running locally (or provide a URI in `.env`)

## Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file (one has been created for you)
   - Update `MONGODB_URI` and `JWT_SECRET` as needed.

## Running the Server

- **Development mode** (with nodemon):
  ```bash
  npm run dev
  ```

- **Production mode**:
  ```bash
  npm start
  ```

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get token

### User (Requires `x-auth-token` header)
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/saved-places` - Get saved destinations
- `POST /api/user/saved-places` - Toggle a saved destination
