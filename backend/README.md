# MindCare Backend

A simple Node.js/Express/MySQL backend for a journaling app with user authentication and OTP email verification.

## Features
- User registration with OTP email verification
- JWT-based login and protected routes
- MySQL database connection

## Folder Structure
```
backend/
  db/connection.js
  models/User.js
  routes/authRoutes.js
  controllers/authController.js
  middleware/authMiddleware.js
  utils/otpUtil.js
  server.js
  .env.example
```

## .env Variables
```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
JWT_SECRET=your_jwt_secret
```

## Setup
1. Install dependencies:
   ```bash
   npm install express mysql2 bcrypt jsonwebtoken nodemailer dotenv
   ```
2. Copy `.env.example` to `.env` and fill in your values.
3. Create a MySQL database and a `users` table:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     email VARCHAR(100) UNIQUE,
     password VARCHAR(255),
     otp VARCHAR(10),
     is_verified BOOLEAN DEFAULT 0
   );
   ```
4. Start the server:
   ```bash
   node backend/server.js
   ```

## Auth Endpoints
- `POST /auth/register` (name, email, password)
- `POST /auth/verify-otp` (email, otp)
- `POST /auth/login` (email, password)

---
For any issues, please check your .env values and database connection. 