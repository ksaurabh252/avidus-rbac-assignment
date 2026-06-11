# Role-Based Task Management API

A secure backend application built with **Node.js**, **Express.js**, and **MongoDB** that provides **Role-Based Access Control (RBAC)**, task management, and activity tracking.

This project was developed as part of the **Avidus Backend Assignment**.

---

## ✨ Features

### 🔐 Authentication & Security

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Role-Based Authorization

### 👤 User Features

- Create Tasks
- View Own Tasks
- Update Own Tasks
- Delete Own Tasks

### 👨‍💼 Admin Features

- View All Users and Tasks
- Delete Users
- Update User Status (Active / Inactive)
- Delete Any Task
- View Activity Logs

### 📊 Activity Logging

The system automatically tracks:

- User Login
- Task Creation
- Task Update
- Task Deletion

---

## 🛠 Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Runtime Environment   |
| Express.js | Backend Framework     |
| MongoDB    | Database              |
| Mongoose   | ODM                   |
| JWT        | Authentication        |
| bcryptjs   | Password Hashing      |
| dotenv     | Environment Variables |

---

## 📁 Project Structure

```text
project-root/
│
├── config/
│   └── dbConfig.js
│
├── controllers/
│   ├── user.controller.js
│   ├── task.controller.js
│   └── admin.controller.js
│
├── middleware/
│   └── auth.middleware.js
│
├── models/
│   ├── user.model.js
│   ├── task.model.js
│   └── activityLog.model.js
│
├── routes/
│   ├── user.routes.js
│   ├── task.routes.js
│   └── admin.routes.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd project-folder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

### Production

```bash
node server.js
```

---

## 🔒 Authorization Flow

### User Role

Allowed Actions:

- Create Own Tasks
- View Own Tasks
- Update Own Tasks
- Delete Own Tasks

### Admin Role

Allowed Actions:

- View All Users
- Manage Users
- View All Tasks
- Delete Any Task
- View Activity Logs

---

## 🧪 Testing

The API can be tested using:

- Postman
- Thunder Client

For protected routes, include the JWT token:

```http
Authorization: Bearer <your_token>
```

---

## 📌 Assignment Requirements Covered

### Backend

- User Roles (Admin/User)
- Protected Routes
- Admin Authorization Middleware
- User Management APIs
- Task Management APIs
- Activity Logging System
- JWT Authentication
- Password Hashing

---

## 👨‍💻 Author

Developed as part of the Avidus Assignment using Node.js, Express.js, and MongoDB.
