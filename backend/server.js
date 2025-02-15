import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js'

dotenv.config();
const app = express();
const port = 3001;
const host = '127.0.0.1';

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const uri = 'mongodb+srv://dinithi2290:1234@clustertaskmanager.c5bjz.mongodb.net/?retryWrites=true&w=majority&appName=clusterTaskManager'

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("✅ MongoDB connected");
    } catch (error){
        console.log("❌ MongoDB connection error: ", error);
    }
};
connect();

const server = app.listen(port, host, () => {
    console.log(`Node server is running on ${server.address().port}`);
})
