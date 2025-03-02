import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './src/routes/user.routes.js';
import authRouter from './src/routes/auth.routes.js';
import subscriptionRouter from './src/routes/subscription.routes.js';
import ConnectDB from './src/database/ConnectDB.js';
import errorMiddleware from './src/middlewares/error.middleware.js';
import arcjetMiddleware from './src/middlewares/arcjet.middleware.js';
import workflowRouter from './src/routes/workflow.routes.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const PORT = process.env.PORT || 6000;

const StartServer = async () => {
    try {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(arcjetMiddleware);

        app.use('/sub/auth', authRouter);
        app.use('/sub/users', userRouter);
        app.use('/sub/subscriptions', subscriptionRouter);
        app.use('/sub/workflows', workflowRouter);

        app.use(errorMiddleware);

        app.get('/', (req, res) => {
            res.send('Welcome to the Subscription Tracker API!');
        });

        app.listen(PORT, async () => {
            console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
            await ConnectDB();
        });
    }
    catch (error) {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
};

StartServer();