import mongoose from 'mongoose';
import { MONGODB_URI, NODE_ENV } from '../config/env.js';

if (!MONGODB_URI) {
    throw new Error(`Please define the MONGODB_URI environment variable inside .env.${NODE_ENV}`);
}

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`Connected to MongoDB Database in ${NODE_ENV} mode`);
    }
    catch (error) {
        console.error("MongoDB connection failed ", error);
        process.exit(1);
    }
}

export default ConnectDB;