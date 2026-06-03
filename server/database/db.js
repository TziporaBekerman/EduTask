const express = require('express');
const db = require('./config/db'); // ייבוא קובץ החיבור

const app = express();
require('dotenv').config();

// בדיקת חיבור לדיבייטס בהפעלת השרת
async function testConnection() {
    try {
        // מריץ שאילתה פשוטה רק כדי לראות שיש תגובה
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        console.log('✅ החיבור ל-SQL הצליח בהצלחה!');
    } catch (err) {
        console.error('❌ שגיאה בהתחברות ל-SQL:', err.message);
    }
}

testConnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));