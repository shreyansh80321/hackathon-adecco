//create server file
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const { connectDB } = require('./lib/db');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

//Connect to Database and Start Server


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
 });