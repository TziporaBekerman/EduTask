const mysql = require('mysql2');
require('dotenv').config(); // טוען את המשתנים מקובץ ה-.env (יודע לעלות תיקייה אחת למעלה לבד)

// יצירת מאגר החיבורים (Connection Pool) ל-SQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();