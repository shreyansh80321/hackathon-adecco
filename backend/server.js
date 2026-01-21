import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';

import {userRoutes} from './routes/user.js';

import {postRoutes} from './routes/post.js';
dotenv.config();
const app=express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});