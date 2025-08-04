const mysql = require('mysql2/promise');
require('dotenv').config(); // Load DB credentials from .env

const setupDatabase = async () => {
  try {
    // Connect to MySQL using .env variables
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root'
    });

    console.log('✅ Connected to MySQL server');

    // Use DB name from .env or fallback to 'mindcare'
    const dbName = process.env.DB_NAME || 'mindcare';

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database "${dbName}" created or already exists`);

    // Switch to that database
    await connection.query(`USE \`${dbName}\``);

    // Create users table
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        otp VARCHAR(10),
        is_verified BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await connection.query(createUsersTable);
    console.log('✅ Users table ready');

    // Add is_admin column only if it doesn't exist
    const [columns] = await connection.query("SHOW COLUMNS FROM users LIKE 'is_admin'");
    if (columns.length === 0) {
      await connection.query("ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT 0");
      console.log("✅ is_admin column added");
    } else {
      console.log("ℹ️ is_admin column already exists");
    }

    // Insert default admin user (won’t duplicate due to IGNORE)
    const insertAdminUser = `
      INSERT IGNORE INTO users (name, email, password, otp, is_verified, is_admin)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const adminUserData = [
      'Admin User',
      'admin@mindcare.com',
      '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: admin123
      null,
      1,
      1
    ];
    await connection.execute(insertAdminUser, adminUserData);
    console.log("✅ Admin user ensured");

    // Create journals table
    const createJournalsTable = `
      CREATE TABLE IF NOT EXISTS journals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        mood VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await connection.query(createJournalsTable);
    console.log('✅ Journals table ready');

    // Insert a test user
    const insertTestUser = `
      INSERT IGNORE INTO users (name, email, password, otp, is_verified) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const testUserData = [
      'Test User',
      'test@example.com',
      '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
      '123456',
      1
    ];
    await connection.execute(insertTestUser, testUserData);
    console.log("✅ Test user ensured");

    await connection.end();
    console.log('🎉 Production DB setup completed successfully!');
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
};

setupDatabase();
