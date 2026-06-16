const express = require('express');
const db = require('./database/db.js');
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler");

const app = express();
require('dotenv').config();

async function testConnection() {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        console.log('✅ החיבור ל-SQL הצליח בהצלחה!');
    } catch (err) {
        console.error('❌ שגיאה בהתחברות ל-SQL:', err.message);
    }
}
testConnection();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/groups", require("./routes/groupsRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/assignments", require("./routes/assignmentsRoutes"));
app.use("/submissions", require("./routes/submissionsRoutes"));
app.use("/reports", require("./routes/reportsRoutes"));

app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));