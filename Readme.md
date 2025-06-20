# DTS Test - Node.js REST API

A Node.js REST API application with authentication, authorization, and CRUD operations for user management. Built with Express.js, MongoDB, Redis, and Docker.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with access and refresh tokens
- **User Management**: Complete CRUD operations for user information
- **Security**: Password hashing with bcrypt, JWT token blacklisting
- **Database**: MongoDB for data persistence with Mongoose ODM
- **Caching**: Redis for token blacklisting
- **Validation**: Request validation using Joi
- **Containerization**: Docker and Docker Compose for easy deployment
- **Error Handling**: Centralized error handling with custom error classes

## 🛠 Tech Stack

### Core Dependencies
- **Node.js**: 20.18.1 (Alpine Linux)
- **Express.js**: ^5.1.0 - Web framework
- **MongoDB**: Latest (via Docker) - Database
- **Redis**: Latest (via Docker) - Caching and session storage

### Key Libraries
- **mongoose**: ^8.16.0 - MongoDB ODM
- **ioredis**: ^5.6.1 - Redis client
- **jsonwebtoken**: ^9.0.2 - JWT token handling
- **bcryptjs**: ^3.0.2 - Password hashing
- **joi**: ^17.13.3 - Request validation
- **helmet**: ^8.1.0 - Security middleware
- **compression**: ^1.8.0 - Response compression
- **morgan**: ^1.10.0 - HTTP request logger
- **dotenv**: ^16.5.0 - Environment variables

### Development Dependencies
- **nodemon**: ^3.1.10 - Development server with auto-restart

## 📋 Prerequisites

- Docker and Docker Compose installed on your system
- Git for cloning the repository

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd DTS_Test
```

### 2. Environment Setup

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Update the `.env` file with your preferred configurations:

```env
# --- App Configuration ---
NODE_PORT=3000

# --- MongoDB Configuration ---
MONGO_USER=dts_user
MONGO_PASS=123456
MONGO_HOST=mongodb_service
MONGO_PORT=27017
MONGO_DB_NAME=DTS_Test

# --- Redis Configuration ---
REDIS_PASSWORD=your_redis_password
REDIS_HOST=redis_service
REDIS_PORT=6379
REDIS_USER=default

# --- JWT Configuration ---
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_EXPIRES_IN=2h
JWT_EXPIRES_REFRESH_IN=7d
```

### 3. Start the Application

Using Docker Compose (Recommended):

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop all services
docker-compose down
```

### 4. Verify Installation

The application will be available at:
- **API Server**: http://localhost:3000
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379

## 📚 API Documentation

### Base URL
```
http://localhost:3000/v1/api
```

### Authentication Endpoints

#### Register User
```http
POST /v1/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /v1/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Refresh Token
```http
POST /v1/api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "your_refresh_token_here"
}
```

#### Logout (Protected)
```http
POST /v1/api/auth/logout
Authorization: Bearer your_access_token_here
```

### User Management Endpoints

#### Get All Users
```http
GET /v1/api/users
```

#### Get User Profile (Protected)
```http
GET /v1/api/users/profile
Authorization: Bearer your_access_token_here
```

#### Get User by ID
```http
GET /v1/api/users/:id
```

#### Create User
```http
POST /v1/api/users
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

#### Update User Profile (Protected)
```http
PATCH /v1/api/users/:id
Authorization: Bearer your_access_token_here
Content-Type: application/json

{
  "name": "Updated Name",
  "phone": "0987654321"
}
```

#### Delete User (Protected)
```http
DELETE /v1/api/users/:id
Authorization: Bearer your_access_token_here
```

#### Restore User
```http
GET /v1/api/users/restore/:id
```

## 🏗 Project Structure

```
DTS_Test/
├── src/
│   ├── app.js              # Express app configuration
│   ├── auth/
│   │   └── authGuard.js    # Authentication middleware
│   ├── config/
│   │   └── env.config.js   # Environment configuration
│   ├── controllers/        # Route controllers
│   ├── dbs/               # Database connections
│   ├── middlewares/       # Custom middlewares
│   ├── models/            # Database models
│   ├── routers/           # Route definitions
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
├── docker-compose.yml     # Docker services configuration
├── Dockerfile            # Docker image configuration
├── package.json          # Node.js dependencies
└── server.js            # Application entry point
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Token Blacklisting**: Redis-based token invalidation
- **Request Validation**: Joi schema validation
- **Security Headers**: Helmet.js for security headers
- **Input Sanitization**: Built-in Express security features

## 🛠 Development

### Local Development (without Docker)

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Make sure MongoDB and Redis are running locally and update your `.env` file accordingly.

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (not implemented yet)

## 🐳 Docker Configuration

The application uses multi-stage Docker builds for optimized production images:

- **Stage 1**: Build dependencies and copy source code
- **Stage 2**: Create lightweight production image with only necessary files

### Services

- **nodejs-app**: Main application container
- **mongodb_service**: MongoDB database
- **redis_service**: Redis cache server

## 📝 Response Format

### Success Response
```json
{
  "message": "Success message",
  "metadata": {
    // Response data
  },
  "statusCode": 200
}
```

### Error Response
```json
{
  "status": "error",
  "code": 400,
  "message": "Error message"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please contact the development team.