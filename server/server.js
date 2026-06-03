const express = require('express');
const db = require('./config/db'); // ייבוא קובץ החיבור
const cors = require("cors");

const app = express();
require('dotenv').config();

async function testConnection() {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        console.log('✅ החיבור ל-SQL הצליח בהצלחה!');
    } catch (err) {
        console.error('❌ שגיאה בהתחברות ל-SQL:', err.message);
    }
}//למחוק לפני ההגשה?
testConnection();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/profile", require("./routes/profileRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/Assignments", require("./routes/assignmentsRoutes"));
app.use("/Submissions", require("./routes/submissionsRoutes")); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





