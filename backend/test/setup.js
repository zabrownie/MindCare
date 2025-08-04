// Test setup file
require('dotenv').config();

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 5001; // Use different port for testing
process.env.DB_HOST = 'localhost';
process.env.DB_USER = 'root';
process.env.DB_PASSWORD = 'root';
process.env.DB_NAME = 'testdb';
process.env.JWT_SECRET = 'test_jwt_secret_key_for_testing';

// Increase timeout for tests
jest.setTimeout(10000); 