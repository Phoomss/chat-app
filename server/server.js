const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB.js');
const cookiesParser = require('cookie-parser')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json())
app.use(cookiesParser())

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes.js');

app.use('/api/authen', authRouter);
app.use('/api/user', userRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on port: " + PORT);
    });
});
