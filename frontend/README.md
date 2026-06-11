# Role Based Authentication Frontend

A modern, responsive task management application built with **React** and **Vite**, featuring **JWT Authentication**, **Role-Based Access Control (RBAC)**, and a powerful **Admin Dashboard** for monitoring users and system activities.

---

## ✨ Key Features

### 🔐 Authentication & Security

- Secure JWT-based authentication
- Persistent login sessions
- Protected routes with role-based access
- Axios interceptors for automatic token handling

### 👥 Role-Based Access Control (RBAC)

- Separate experiences for **Admin** and **User** roles
- Route protection based on user permissions
- Dynamic UI rendering according to user roles

### ✅ User Dashboard

Users can:

- Create new tasks
- View personal task lists
- Mark tasks as completed
- Delete tasks
- Manage their daily workflow efficiently

### 📊 Admin Dashboard

Administrators have access to:

#### Analytics

- Real-time platform statistics
- User and task insights

#### User Management

- View all registered users
- Activate or deactivate user accounts
- Delete user accounts

#### Task Monitoring

- View all tasks across the platform
- Monitor task activity system-wide

#### Activity Logs

- Audit trail for key actions
- Login tracking
- Task creation and management history

### 📱 Responsive Design

- Fully responsive interface
- Optimized for desktop, tablet, and mobile devices
- Styled with Tailwind CSS

---

## 🛠️ Tech Stack

| Category           | Technology          |
| ------------------ | ------------------- |
| Frontend Framework | React 18            |
| Build Tool         | Vite                |
| Routing            | React Router DOM v6 |
| State Management   | React Context API   |
| HTTP Client        | Axios               |
| Styling            | Tailwind CSS        |

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── Navbar
│   └── ProtectedRoute
│
├── context/             # Global state management
│   └── AuthContext
│
├── pages/               # Application pages
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   └── AdminDashboard
│
├── services/            # API services & Axios configuration
│
├── App.jsx              # Route definitions and guards
└── main.jsx             # Application entry point
```

---

## ⚙️ Installation & Setup

### Prerequisites

Before starting, ensure you have:

- Node.js (v18+ recommended)
- npm or yarn
- Avidus Backend Server running locally on port **3000**

---

### 1️⃣ Install Dependencies

```bash
npm install
```

---

### 2️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000/api
```

> Update the URL if your backend is hosted elsewhere.

---

### 3️⃣ Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🧪 Testing the Application

### 👤 User Workflow

1. Visit:

```text
http://localhost:5173/register
```

2. Create a new account
3. Sign in using your credentials
4. Access the **My Tasks Dashboard**
5. Create, complete, and manage tasks

---

### 👨‍💼 Admin Workflow

Login using an existing administrator account:

```text
Email: admin@avidus.com
Password: admin123
```

After successful authentication, you'll be redirected to the **Admin Dashboard**, where you can:

- Manage users
- Monitor tasks
- View analytics
- Review activity logs

---

## 🚦 Available Scripts

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🔗 Backend Dependency

This frontend application requires the **Avidus Backend Server** to be running and accessible through the configured API endpoint.

Ensure both applications are running simultaneously during development.

---

## 📄 License

This project is developed as part of the **Avidus Task Management System**
