# Subscription Tracker API

## Overview
The Subscription Tracker API enables users to efficiently manage their subscriptions by providing a secure and structured way to record subscription details, receive timely renewal reminders, and ensure proper authentication and data protection.

## Tech Stack
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT (JSON Web Token)** - Authentication
- **Nodemailer** - Email service for reminders
- **Upstash Workflow** - Task scheduling
- **Arcjet** - API rate limiting

## API Endpoints

### **User Routes**  
- **`POST /api/users`** - Create a new user  
- **`GET /api/users`** - Get all users  
- **`GET /api/users/:id`** - Get a specific user  
- **`PUT /api/users/:id`** - Update user details  
- **`DELETE /api/users/:id`** - Delete a user  

### **Auth Routes**  
- **`POST /api/auth/sign-up`** - Register a new user  
- **`POST /api/auth/sign-in`** - Log in a user  
- **`POST /api/auth/sign-out`** - Log out a user  

### **Subscription Routes**  
- **`GET /api/subscriptions/upcoming-renewals`** - Get upcoming renewals  
- **`GET /api/subscriptions`** - Get all subscriptions  
- **`GET /api/subscriptions/:id`** - Get a specific subscription  
- **`POST /api/subscriptions`** - Create a new subscription  
- **`PUT /api/subscriptions/:id`** - Update a subscription  
- **`DELETE /api/subscriptions/:id`** - Delete a subscription  
- **`GET /api/subscriptions/user/:id`** - Get all subscriptions of a user  
- **`PUT /api/subscriptions/:id/cancel`** - Cancel a subscription  

### **Workflow Routes**  
- **`POST /api/workflow/subscription/reminder`** - Send subscription reminders  

## Setup Instructions
1. Clone the repository:  
```sh
git clone https://github.com/SupratitDatta/Subscription-Tracker
```
2. Install dependencies:  
```sh
npm install
```
3. Setup your Upstack and Nodemailer account and project
4. Set up environment variables in `.env` file:  
```env
    NODE_ENV=
    PORT=
    SERVER_URL=
    MONGODB_URI=
    JWT_SECRET=
    JWT_EXPIRES_IN=
    ARCJET_KEY=
    ARCJET_ENV=
    QSTASH_URL=
    QSTASH_TOKEN=
    QSTASH_CURRENT_SIGNING_KEY=
    QSTASH_NEXT_SIGNING_KEY=
    EMAIL_ID=
    EMAIL_PASSWORD=
```
5. Start the server:  
```sh
npm start
```

## Contact
- This project is created by Supratit Datta
- Email - supratitdatta@gmail.com